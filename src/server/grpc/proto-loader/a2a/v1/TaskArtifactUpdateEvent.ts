// Original file: src/server/grpc/a2a.proto

import type { Artifact as _a2a_v1_Artifact, Artifact__Output as _a2a_v1_Artifact__Output } from '../../a2a/v1/Artifact';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../google/protobuf/Struct';

export interface TaskArtifactUpdateEvent {
  'taskId'?: (string);
  'contextId'?: (string);
  'artifact'?: (_a2a_v1_Artifact | null);
  'append'?: (boolean);
  'lastChunk'?: (boolean);
  'metadata'?: (_google_protobuf_Struct | null);
}

export interface TaskArtifactUpdateEvent__Output {
  'taskId': (string);
  'contextId': (string);
  'artifact': (_a2a_v1_Artifact__Output | null);
  'append': (boolean);
  'lastChunk': (boolean);
  'metadata': (_google_protobuf_Struct__Output | null);
}
