// Original file: src/server/grpc/a2a.proto

import type { PushNotificationConfig as _a2a_v1_PushNotificationConfig, PushNotificationConfig__Output as _a2a_v1_PushNotificationConfig__Output } from '../../a2a/v1/PushNotificationConfig';

export interface SendMessageConfiguration {
  'acceptedOutputModes'?: (string)[];
  'pushNotificationConfig'?: (_a2a_v1_PushNotificationConfig | null);
  'historyLength'?: (number);
  'blocking'?: (boolean);
  '_historyLength'?: "historyLength";
}

export interface SendMessageConfiguration__Output {
  'acceptedOutputModes': (string)[];
  'pushNotificationConfig': (_a2a_v1_PushNotificationConfig__Output | null);
  'historyLength'?: (number);
  'blocking': (boolean);
  '_historyLength'?: "historyLength";
}
