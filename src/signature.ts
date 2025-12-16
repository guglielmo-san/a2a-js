import { AgentCard, AgentCardSignature } from "./types.js";
import * as jwt from 'jsonwebtoken';

export type ProtectedHeader = {
    alg: string;
    kid: string;
    typ: 'JOSE' | string & {};
    jku?: string;
};

export function defineAgentCardSignature(
    protectedHeader: ProtectedHeader, 
    privateKey: string, 
): (agentCard: Partial<Omit<AgentCard, 'signatures'>>) => AgentCardSignature {

    return (agentCard: Partial<Omit<AgentCard, 'signatures'>>): AgentCardSignature => {

        const signature = jwt.sign(JSON.stringify(agentCard), privateKey, {
            algorithm: protectedHeader.alg,
            header: protectedHeader,
        });

        const [protectedB64, _, signatureB64] = signature.split('.');

        return {
            protected: protectedB64,
            signature: signatureB64,
        };
    }
}