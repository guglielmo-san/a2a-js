// Original file: src/server/grpc/a2a.proto

import type { TaskState as _a2a_v1_TaskState, TaskState__Output as _a2a_v1_TaskState__Output } from '../../a2a/v1/TaskState';
import type { Message as _a2a_v1_Message, Message__Output as _a2a_v1_Message__Output } from '../../a2a/v1/Message';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../google/protobuf/Timestamp';

export interface TaskStatus {
  'state'?: (_a2a_v1_TaskState);
  'message'?: (_a2a_v1_Message | null);
  'timestamp'?: (_google_protobuf_Timestamp | null);
}

export interface TaskStatus__Output {
  'state': (_a2a_v1_TaskState__Output);
  'message': (_a2a_v1_Message__Output | null);
  'timestamp': (_google_protobuf_Timestamp__Output | null);
}
