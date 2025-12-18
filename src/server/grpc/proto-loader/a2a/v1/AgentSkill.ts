// Original file: src/server/grpc/a2a.proto

import type { Security as _a2a_v1_Security, Security__Output as _a2a_v1_Security__Output } from '../../a2a/v1/Security';

export interface AgentSkill {
  'id'?: (string);
  'name'?: (string);
  'description'?: (string);
  'tags'?: (string)[];
  'examples'?: (string)[];
  'inputModes'?: (string)[];
  'outputModes'?: (string)[];
  'security'?: (_a2a_v1_Security)[];
}

export interface AgentSkill__Output {
  'id': (string);
  'name': (string);
  'description': (string);
  'tags': (string)[];
  'examples': (string)[];
  'inputModes': (string)[];
  'outputModes': (string)[];
  'security': (_a2a_v1_Security__Output)[];
}
