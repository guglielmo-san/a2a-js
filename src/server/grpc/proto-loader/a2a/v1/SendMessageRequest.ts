// Original file: src/server/grpc/a2a.proto

import type { Message as _a2a_v1_Message, Message__Output as _a2a_v1_Message__Output } from '../../a2a/v1/Message';
import type { SendMessageConfiguration as _a2a_v1_SendMessageConfiguration, SendMessageConfiguration__Output as _a2a_v1_SendMessageConfiguration__Output } from '../../a2a/v1/SendMessageConfiguration';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface SendMessageRequest {
  'request'?: (_a2a_v1_Message | null);
  'configuration'?: (_a2a_v1_SendMessageConfiguration | null);
  'metadata'?: (_google_protobuf_Struct | null);
  'tenant'?: (string);
}

export interface SendMessageRequest__Output {
  'request': (_a2a_v1_Message__Output | null);
  'configuration': (_a2a_v1_SendMessageConfiguration__Output | null);
  'metadata': (_google_protobuf_Struct__Output | null);
  'tenant': (string);
}
