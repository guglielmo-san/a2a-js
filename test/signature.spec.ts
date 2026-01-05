import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import * as jose from 'jose';
import {
  create_agent_card_signature,
  verify_agent_card_signature,
  canonicalizeAgentCard,
} from '../src/signature.js';
import { AgentCard } from '../src/types.js';

let mockAgentCard: AgentCard;
let privateKeyPem: string;
let publicKeyPem: string;
const ALG = 'ES256';

describe('Agent Card Signature', () => {

  beforeAll(async () => {
    const { privateKey, publicKey } = await jose.generateKeyPair(ALG, { extractable: true });
    privateKeyPem = await jose.exportPKCS8(privateKey);
    publicKeyPem = await jose.exportSPKI(publicKey);
  });

  beforeEach(() => {
    mockAgentCard = {
        protocolVersion: '0.3.0',
        name: 'Test Agent',
        description: 'An agent for testing purposes',
        url: 'http://localhost:8080',
        preferredTransport: 'JSONRPC',
        version: '1.0.0',
        capabilities: {
            streaming: true,
            pushNotifications: true,
        },
        defaultInputModes: ['text/plain'],
        defaultOutputModes: ['text/plain'],
        skills: [],
    };
  });

  describe('canonicalizeAgentCard', () => {
    it('should remove empty values and sort keys recursively (JCS)', () => {
      const input = {
            name: "Example Agent",
            description: "",
            capabilities: {
                streaming: false,
                pushNotifications: false,
                extensions: [] as string[]
            },
            skill: [] as string[]
}

      const expected = `{"capabilities":{"pushNotifications":false,"streaming":false},"name":"Example Agent"}`      
      const result = canonicalizeAgentCard(input);
      expect(result).toBe(expected);
    });

    it('should return "{}" if the object is completely empty after cleaning', () => {
      const input = {
            name: "",
            description: "",
            capabilities: {
                extensions: [] as string[]
            },
            skill: [] as string[]
}
      const result = canonicalizeAgentCard(input);
      expect(result).toBe("{}");
    });
  });

  describe('create_agent_card_signature', () => {
    it('should add a signature to the agent card', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { 
        alg: ALG, 
        kid: 'test-key-1',
        typ: 'JOSE' 
      });

      const signedCard = await signer(mockAgentCard);

      expect(signedCard.signatures).toBeDefined();
      expect(signedCard.signatures).toHaveLength(1);
      
      const sig = signedCard.signatures![0];
      expect(sig.protected).toBeDefined();
      expect(sig.signature).toBeDefined();
      
      const decodedHeader = jose.decodeProtectedHeader(sig);
      expect(decodedHeader.kid).toBe('test-key-1');
      expect(decodedHeader.alg).toBe(ALG);
    });

    it('should append signatures if one already exists', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'key-1', typ: 'JWT' });

      await signer(mockAgentCard);
      await signer(mockAgentCard);
      expect(mockAgentCard.signatures).toHaveLength(2);
    });
  });

  describe('verify_agent_card_signature', () => {
    
    const mockRetrieveKey = vi.fn();

    beforeAll(() => {
      mockRetrieveKey.mockImplementation(async (kid: string) => {
        if (kid === 'test-key-1') return publicKeyPem;
        throw new Error('Key not found');
      });
    });

    it('should successfully verify a valid signature', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'test-key-1', typ: 'JWT' });
      await signer(mockAgentCard);

      const verifier = verify_agent_card_signature(mockRetrieveKey);
      await expect(verifier(mockAgentCard)).resolves.not.toThrow();

      expect(mockRetrieveKey).toHaveBeenCalledWith('test-key-1', undefined);
    });

    it('should fail if the payload has been tampered with', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'test-key-1', typ: 'JWT' });
      await signer(mockAgentCard);

      mockAgentCard.name = "Modified Agent Name";
      const verifier = verify_agent_card_signature(mockRetrieveKey);
      await expect(verifier(mockAgentCard)).rejects.toThrow(); 
    });

    it('should fail if the signature is invalid/malformed', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'test-key-1', typ: 'JWT' });
      await signer(mockAgentCard);

      mockAgentCard.signatures![0].signature = "invalid_signature_string";
      const verifier = verify_agent_card_signature(mockRetrieveKey);
      await expect(verifier(mockAgentCard)).rejects.toThrow();
    });

    it('should fail if the key ID (kid) is unknown', async () => {
      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'unknown-key', typ: 'JWT' });
      await signer(mockAgentCard);

      const verifier = verify_agent_card_signature(mockRetrieveKey);
      await expect(verifier(mockAgentCard)).rejects.toThrow('Key not found');
    });

    it('should pass if at least one signature is valid (Multi-sig support)', async () => {
      mockAgentCard.signatures = [];
      mockAgentCard.signatures.push({
        protected: 'invalid value',
        signature: 'invalid value',
      });

      const signer = create_agent_card_signature(privateKeyPem, { alg: ALG, kid: 'test-key-1', typ: 'JWT' });
      await signer(mockAgentCard);

      const verifier = verify_agent_card_signature(mockRetrieveKey);
      await expect(verifier(mockAgentCard)).resolves.not.toThrow();
    });
  });
});