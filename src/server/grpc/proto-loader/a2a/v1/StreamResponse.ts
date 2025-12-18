// Original file: src/server/grpc/a2a.proto

import type { Task as _a2a_v1_Task, Task__Output as _a2a_v1_Task__Output } from '../../a2a/v1/Task';
import type { Message as _a2a_v1_Message, Message__Output as _a2a_v1_Message__Output } from '../../a2a/v1/Message';
import type { TaskStatusUpdateEvent as _a2a_v1_TaskStatusUpdateEvent, TaskStatusUpdateEvent__Output as _a2a_v1_TaskStatusUpdateEvent__Output } from '../../a2a/v1/TaskStatusUpdateEvent';
import type { TaskArtifactUpdateEvent as _a2a_v1_TaskArtifactUpdateEvent, TaskArtifactUpdateEvent__Output as _a2a_v1_TaskArtifactUpdateEvent__Output } from '../../a2a/v1/TaskArtifactUpdateEvent';

export interface StreamResponse {
  'task'?: (_a2a_v1_Task | null);
  'msg'?: (_a2a_v1_Message | null);
  'statusUpdate'?: (_a2a_v1_TaskStatusUpdateEvent | null);
  'artifactUpdate'?: (_a2a_v1_TaskArtifactUpdateEvent | null);
  'payload'?: "task"|"msg"|"statusUpdate"|"artifactUpdate";
}

export interface StreamResponse__Output {
  'task'?: (_a2a_v1_Task__Output | null);
  'msg'?: (_a2a_v1_Message__Output | null);
  'statusUpdate'?: (_a2a_v1_TaskStatusUpdateEvent__Output | null);
  'artifactUpdate'?: (_a2a_v1_TaskArtifactUpdateEvent__Output | null);
  'payload'?: "task"|"msg"|"statusUpdate"|"artifactUpdate";
}
