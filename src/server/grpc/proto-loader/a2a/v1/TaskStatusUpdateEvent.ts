// Original file: src/server/grpc/a2a.proto

import type { TaskStatus as _a2a_v1_TaskStatus, TaskStatus__Output as _a2a_v1_TaskStatus__Output } from '../../a2a/v1/TaskStatus';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface TaskStatusUpdateEvent {
  'taskId'?: (string);
  'contextId'?: (string);
  'status'?: (_a2a_v1_TaskStatus | null);
  'final'?: (boolean);
  'metadata'?: (_google_protobuf_Struct | null);
}

export interface TaskStatusUpdateEvent__Output {
  'taskId': (string);
  'contextId': (string);
  'status': (_a2a_v1_TaskStatus__Output | null);
  'final': (boolean);
  'metadata': (_google_protobuf_Struct__Output | null);
}
