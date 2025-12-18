// Original file: src/server/grpc/a2a.proto

import type { Part as _a2a_v1_Part, Part__Output as _a2a_v1_Part__Output } from '../../a2a/v1/Part';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface Artifact {
  'artifactId'?: (string);
  'name'?: (string);
  'description'?: (string);
  'parts'?: (_a2a_v1_Part)[];
  'metadata'?: (_google_protobuf_Struct | null);
  'extensions'?: (string)[];
}

export interface Artifact__Output {
  'artifactId': (string);
  'name': (string);
  'description': (string);
  'parts': (_a2a_v1_Part__Output)[];
  'metadata': (_google_protobuf_Struct__Output | null);
  'extensions': (string)[];
}
