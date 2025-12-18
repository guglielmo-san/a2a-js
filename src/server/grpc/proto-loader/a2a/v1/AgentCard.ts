// Original file: src/server/grpc/a2a.proto

import type { AgentProvider as _a2a_v1_AgentProvider, AgentProvider__Output as _a2a_v1_AgentProvider__Output } from '../../a2a/v1/AgentProvider';
import type { AgentCapabilities as _a2a_v1_AgentCapabilities, AgentCapabilities__Output as _a2a_v1_AgentCapabilities__Output } from '../../a2a/v1/AgentCapabilities';
import type { SecurityScheme as _a2a_v1_SecurityScheme, SecurityScheme__Output as _a2a_v1_SecurityScheme__Output } from '../../a2a/v1/SecurityScheme';
import type { Security as _a2a_v1_Security, Security__Output as _a2a_v1_Security__Output } from '../../a2a/v1/Security';
import type { AgentSkill as _a2a_v1_AgentSkill, AgentSkill__Output as _a2a_v1_AgentSkill__Output } from '../../a2a/v1/AgentSkill';
import type { AgentInterface as _a2a_v1_AgentInterface, AgentInterface__Output as _a2a_v1_AgentInterface__Output } from '../../a2a/v1/AgentInterface';
import type { AgentCardSignature as _a2a_v1_AgentCardSignature, AgentCardSignature__Output as _a2a_v1_AgentCardSignature__Output } from '../../a2a/v1/AgentCardSignature';

export interface AgentCard {
  'name'?: (string);
  'description'?: (string);
  'url'?: (string);
  'provider'?: (_a2a_v1_AgentProvider | null);
  'version'?: (string);
  'documentationUrl'?: (string);
  'capabilities'?: (_a2a_v1_AgentCapabilities | null);
  'securitySchemes'?: ({[key: string]: _a2a_v1_SecurityScheme});
  'security'?: (_a2a_v1_Security)[];
  'defaultInputModes'?: (string)[];
  'defaultOutputModes'?: (string)[];
  'skills'?: (_a2a_v1_AgentSkill)[];
  'supportsExtendedAgentCard'?: (boolean);
  'preferredTransport'?: (string);
  'additionalInterfaces'?: (_a2a_v1_AgentInterface)[];
  'protocolVersion'?: (string);
  'signatures'?: (_a2a_v1_AgentCardSignature)[];
  'iconUrl'?: (string);
  'supportedInterfaces'?: (_a2a_v1_AgentInterface)[];
  '_protocolVersion'?: "protocolVersion";
  '_url'?: "url";
  '_preferredTransport'?: "preferredTransport";
  '_documentationUrl'?: "documentationUrl";
  '_supportsExtendedAgentCard'?: "supportsExtendedAgentCard";
  '_iconUrl'?: "iconUrl";
}

export interface AgentCard__Output {
  'name': (string);
  'description': (string);
  'url'?: (string);
  'provider': (_a2a_v1_AgentProvider__Output | null);
  'version': (string);
  'documentationUrl'?: (string);
  'capabilities': (_a2a_v1_AgentCapabilities__Output | null);
  'securitySchemes': ({[key: string]: _a2a_v1_SecurityScheme__Output});
  'security': (_a2a_v1_Security__Output)[];
  'defaultInputModes': (string)[];
  'defaultOutputModes': (string)[];
  'skills': (_a2a_v1_AgentSkill__Output)[];
  'supportsExtendedAgentCard'?: (boolean);
  'preferredTransport'?: (string);
  'additionalInterfaces': (_a2a_v1_AgentInterface__Output)[];
  'protocolVersion'?: (string);
  'signatures': (_a2a_v1_AgentCardSignature__Output)[];
  'iconUrl'?: (string);
  'supportedInterfaces': (_a2a_v1_AgentInterface__Output)[];
  '_protocolVersion'?: "protocolVersion";
  '_url'?: "url";
  '_preferredTransport'?: "preferredTransport";
  '_documentationUrl'?: "documentationUrl";
  '_supportsExtendedAgentCard'?: "supportsExtendedAgentCard";
  '_iconUrl'?: "iconUrl";
}
