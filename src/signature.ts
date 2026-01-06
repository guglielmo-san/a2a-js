import { AgentCard, AgentCardSignature } from './types.js';
import * as jose from 'jose';

export type AgentCardSignatureGenerator = (agentCard: AgentCard) => Promise<AgentCard>;

export function generate_agent_card_signature(
  private_key_pem: string,
  protectedHeader: jose.CompactJWSHeaderParameters,
  header?: jose.JWSHeaderParameters
): AgentCardSignatureGenerator {
  return async (agentCard: AgentCard): Promise<AgentCard> => {
    const cardCopy = JSON.parse(JSON.stringify(agentCard));
    delete cardCopy.signatures;
    const canonicalPayload = canonicalizeAgentCard(cardCopy);
    const payloadBytes = new TextEncoder().encode(canonicalPayload);

    const private_key = await jose.importPKCS8(private_key_pem, protectedHeader.alg);
    const jws = await new jose.CompactSign(payloadBytes)
      .setProtectedHeader(protectedHeader)
      .sign(private_key);

    const [encodedHeader, , encodedSignature] = jws.split('.');
    const agentCardSignature: AgentCardSignature = {
      protected: encodedHeader,
      signature: encodedSignature,
      header: header,
    };

    if (!agentCard.signatures) agentCard.signatures = [];
    agentCard.signatures.push(agentCardSignature);

    return agentCard;
  };
}

export type AgentCardSignatureVerifier = (agentCard: AgentCard) => Promise<void>;

export function verify_agent_card_signature(
  retrieve_public_key: (kid: string, jku?: string) => Promise<string>
): AgentCardSignatureVerifier {
  return async (agentCard: AgentCard): Promise<void> => {
    const cardCopy = JSON.parse(JSON.stringify(agentCard));
    delete cardCopy.signatures;
    const canonical_payload = canonicalizeAgentCard(cardCopy);
    const payloadBytes = new TextEncoder().encode(canonical_payload);
    const encodedPayload = jose.base64url.encode(payloadBytes);

    let last_error;
    for (const signatureEntry of agentCard.signatures) {
      try {
        const protected_header = jose.decodeProtectedHeader(signatureEntry);
        if (!protected_header.kid || !protected_header.typ || !protected_header.alg) {
          throw new Error('Missing required header parameters (kid, typ, alg)');
        }
        const public_key_pem = await retrieve_public_key(
          protected_header.kid,
          protected_header.jku
        );
        const key = await jose.importSPKI(public_key_pem, protected_header.alg);
        const jws = `${signatureEntry.protected}.${encodedPayload}.${signatureEntry.signature}`;
        await jose.compactVerify(jws, key);
        return;
      } catch (error) {
        last_error = error;
      }
    }
    throw last_error;
  };
}

function cleanEmpty(d: unknown): unknown {
  if (d === '' || d === null || d === undefined) {
    return null;
  }

  if (Array.isArray(d)) {
    const cleanedList = d.map((v) => cleanEmpty(v)).filter((v) => v !== null);
    return cleanedList.length > 0 ? cleanedList : null;
  }

  if (typeof d === 'object') {
    if (d instanceof Date) return d;
    const cleanedDict: { [key: string]: unknown } = {};
    for (const [key, v] of Object.entries(d)) {
      const cleanedValue = cleanEmpty(v);
      if (cleanedValue !== null) {
        cleanedDict[key] = cleanedValue;
      }
    }
    return Object.keys(cleanedDict).length > 0 ? cleanedDict : null;
  }

  return d;
}

/**
 * JCS Canonicalization (RFC 8785)
 * Sorts keys recursively and serializes to string.
 */
function jcsStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return '[' + value.map((item) => jcsStringify(item)).join(',') + ']';
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  const parts = keys.map((key) => {
    return `${JSON.stringify(key)}:${jcsStringify(record[key])}`;
  });

  return '{' + parts.join(',') + '}';
}

export function canonicalizeAgentCard(agentCard: Omit<AgentCard, 'signatures'>): string {
  const cleaned = cleanEmpty(agentCard);
  if (!cleaned) {
    return '{}';
  }

  return jcsStringify(cleaned);
}
