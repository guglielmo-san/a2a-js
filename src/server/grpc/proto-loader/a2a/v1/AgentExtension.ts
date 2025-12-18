// Original file: src/server/grpc/a2a.proto

import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface AgentExtension {
  'uri'?: (string);
  'description'?: (string);
  'required'?: (boolean);
  'params'?: (_google_protobuf_Struct | null);
}

export interface AgentExtension__Output {
  'uri': (string);
  'description': (string);
  'required': (boolean);
  'params': (_google_protobuf_Struct__Output | null);
}
