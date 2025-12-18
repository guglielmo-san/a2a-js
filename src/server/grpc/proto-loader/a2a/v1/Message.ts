// Original file: src/server/grpc/a2a.proto

import type { Role as _a2a_v1_Role, Role__Output as _a2a_v1_Role__Output } from '../../a2a/v1/Role';
import type { Part as _a2a_v1_Part, Part__Output as _a2a_v1_Part__Output } from '../../a2a/v1/Part';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface Message {
  'messageId'?: (string);
  'contextId'?: (string);
  'taskId'?: (string);
  'role'?: (_a2a_v1_Role);
  'parts'?: (_a2a_v1_Part)[];
  'metadata'?: (_google_protobuf_Struct | null);
  'extensions'?: (string)[];
  'referenceTaskIds'?: (string)[];
}

export interface Message__Output {
  'messageId': (string);
  'contextId': (string);
  'taskId': (string);
  'role': (_a2a_v1_Role__Output);
  'parts': (_a2a_v1_Part__Output)[];
  'metadata': (_google_protobuf_Struct__Output | null);
  'extensions': (string)[];
  'referenceTaskIds': (string)[];
}
