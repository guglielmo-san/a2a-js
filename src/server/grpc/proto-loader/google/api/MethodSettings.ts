// Original file: node_modules/google-proto-files/google/api/client.proto

import type { Duration as _google_protobuf_Duration, Duration__Output as _google_protobuf_Duration__Output } from '../../google/protobuf/Duration';

export interface _google_api_MethodSettings_LongRunning {
  'initialPollDelay'?: (_google_protobuf_Duration | null);
  'pollDelayMultiplier'?: (number | string);
  'maxPollDelay'?: (_google_protobuf_Duration | null);
  'totalPollTimeout'?: (_google_protobuf_Duration | null);
}

export interface _google_api_MethodSettings_LongRunning__Output {
  'initialPollDelay': (_google_protobuf_Duration__Output | null);
  'pollDelayMultiplier': (number);
  'maxPollDelay': (_google_protobuf_Duration__Output | null);
  'totalPollTimeout': (_google_protobuf_Duration__Output | null);
}

export interface MethodSettings {
  'selector'?: (string);
  'longRunning'?: (_google_api_MethodSettings_LongRunning | null);
  'autoPopulatedFields'?: (string)[];
}

export interface MethodSettings__Output {
  'selector': (string);
  'longRunning': (_google_api_MethodSettings_LongRunning__Output | null);
  'autoPopulatedFields': (string)[];
}
