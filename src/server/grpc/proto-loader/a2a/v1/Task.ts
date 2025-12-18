// Original file: src/server/grpc/a2a.proto

import type { TaskStatus as _a2a_v1_TaskStatus, TaskStatus__Output as _a2a_v1_TaskStatus__Output } from '../../a2a/v1/TaskStatus';
import type { Artifact as _a2a_v1_Artifact, Artifact__Output as _a2a_v1_Artifact__Output } from '../../a2a/v1/Artifact';
import type { Message as _a2a_v1_Message, Message__Output as _a2a_v1_Message__Output } from '../../a2a/v1/Message';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface Task {
  'id'?: (string);
  'contextId'?: (string);
  'status'?: (_a2a_v1_TaskStatus | null);
  'artifacts'?: (_a2a_v1_Artifact)[];
  'history'?: (_a2a_v1_Message)[];
  'metadata'?: (_google_protobuf_Struct | null);
}

export interface Task__Output {
  'id': (string);
  'contextId': (string);
  'status': (_a2a_v1_TaskStatus__Output | null);
  'artifacts': (_a2a_v1_Artifact__Output)[];
  'history': (_a2a_v1_Message__Output)[];
  'metadata': (_google_protobuf_Struct__Output | null);
}
