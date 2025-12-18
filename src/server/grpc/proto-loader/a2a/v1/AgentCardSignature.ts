// Original file: src/server/grpc/a2a.proto

import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface AgentCardSignature {
  'protected'?: (string);
  'signature'?: (string);
  'header'?: (_google_protobuf_Struct | null);
}

export interface AgentCardSignature__Output {
  'protected': (string);
  'signature': (string);
  'header': (_google_protobuf_Struct__Output | null);
}
