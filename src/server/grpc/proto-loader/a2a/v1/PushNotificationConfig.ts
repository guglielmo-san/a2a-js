// Original file: src/server/grpc/a2a.proto

import type { AuthenticationInfo as _a2a_v1_AuthenticationInfo, AuthenticationInfo__Output as _a2a_v1_AuthenticationInfo__Output } from '../../a2a/v1/AuthenticationInfo';

export interface PushNotificationConfig {
  'id'?: (string);
  'url'?: (string);
  'token'?: (string);
  'authentication'?: (_a2a_v1_AuthenticationInfo | null);
}

export interface PushNotificationConfig__Output {
  'id': (string);
  'url': (string);
  'token': (string);
  'authentication': (_a2a_v1_AuthenticationInfo__Output | null);
}
