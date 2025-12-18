// Original file: src/server/grpc/a2a.proto

import type { OAuthFlows as _a2a_v1_OAuthFlows, OAuthFlows__Output as _a2a_v1_OAuthFlows__Output } from '../../a2a/v1/OAuthFlows';

export interface OAuth2SecurityScheme {
  'description'?: (string);
  'flows'?: (_a2a_v1_OAuthFlows | null);
  'oauth2MetadataUrl'?: (string);
}

export interface OAuth2SecurityScheme__Output {
  'description': (string);
  'flows': (_a2a_v1_OAuthFlows__Output | null);
  'oauth2MetadataUrl': (string);
}
