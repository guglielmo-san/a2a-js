// Original file: src/server/grpc/a2a.proto

import type { TaskPushNotificationConfig as _a2a_v1_TaskPushNotificationConfig, TaskPushNotificationConfig__Output as _a2a_v1_TaskPushNotificationConfig__Output } from '../../a2a/v1/TaskPushNotificationConfig';

export interface ListTaskPushNotificationConfigResponse {
  'configs'?: (_a2a_v1_TaskPushNotificationConfig)[];
  'nextPageToken'?: (string);
}

export interface ListTaskPushNotificationConfigResponse__Output {
  'configs': (_a2a_v1_TaskPushNotificationConfig__Output)[];
  'nextPageToken': (string);
}
