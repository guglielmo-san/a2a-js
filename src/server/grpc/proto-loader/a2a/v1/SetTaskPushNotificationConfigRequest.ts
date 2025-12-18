// Original file: src/server/grpc/a2a.proto

import type { TaskPushNotificationConfig as _a2a_v1_TaskPushNotificationConfig, TaskPushNotificationConfig__Output as _a2a_v1_TaskPushNotificationConfig__Output } from '../../a2a/v1/TaskPushNotificationConfig';

export interface SetTaskPushNotificationConfigRequest {
  'parent'?: (string);
  'configId'?: (string);
  'config'?: (_a2a_v1_TaskPushNotificationConfig | null);
  'tenant'?: (string);
}

export interface SetTaskPushNotificationConfigRequest__Output {
  'parent': (string);
  'configId': (string);
  'config': (_a2a_v1_TaskPushNotificationConfig__Output | null);
  'tenant': (string);
}
