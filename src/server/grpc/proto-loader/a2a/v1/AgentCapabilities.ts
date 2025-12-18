// Original file: src/server/grpc/a2a.proto

import type { AgentExtension as _a2a_v1_AgentExtension, AgentExtension__Output as _a2a_v1_AgentExtension__Output } from '../../a2a/v1/AgentExtension';

export interface AgentCapabilities {
  'streaming'?: (boolean);
  'pushNotifications'?: (boolean);
  'extensions'?: (_a2a_v1_AgentExtension)[];
  'stateTransitionHistory'?: (boolean);
  '_streaming'?: "streaming";
  '_pushNotifications'?: "pushNotifications";
  '_stateTransitionHistory'?: "stateTransitionHistory";
}

export interface AgentCapabilities__Output {
  'streaming'?: (boolean);
  'pushNotifications'?: (boolean);
  'extensions': (_a2a_v1_AgentExtension__Output)[];
  'stateTransitionHistory'?: (boolean);
  '_streaming'?: "streaming";
  '_pushNotifications'?: "pushNotifications";
  '_stateTransitionHistory'?: "stateTransitionHistory";
}
