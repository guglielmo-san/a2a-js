// Original file: src/server/grpc/a2a.proto

import type { PushNotificationConfig as _a2a_v1_PushNotificationConfig, PushNotificationConfig__Output as _a2a_v1_PushNotificationConfig__Output } from '../../a2a/v1/PushNotificationConfig';

export interface TaskPushNotificationConfig {
  'name'?: (string);
  'pushNotificationConfig'?: (_a2a_v1_PushNotificationConfig | null);
}

export interface TaskPushNotificationConfig__Output {
  'name': (string);
  'pushNotificationConfig': (_a2a_v1_PushNotificationConfig__Output | null);
}
