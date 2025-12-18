// Original file: src/server/grpc/a2a.proto

import type { APIKeySecurityScheme as _a2a_v1_APIKeySecurityScheme, APIKeySecurityScheme__Output as _a2a_v1_APIKeySecurityScheme__Output } from '../../a2a/v1/APIKeySecurityScheme';
import type { HTTPAuthSecurityScheme as _a2a_v1_HTTPAuthSecurityScheme, HTTPAuthSecurityScheme__Output as _a2a_v1_HTTPAuthSecurityScheme__Output } from '../../a2a/v1/HTTPAuthSecurityScheme';
import type { OAuth2SecurityScheme as _a2a_v1_OAuth2SecurityScheme, OAuth2SecurityScheme__Output as _a2a_v1_OAuth2SecurityScheme__Output } from '../../a2a/v1/OAuth2SecurityScheme';
import type { OpenIdConnectSecurityScheme as _a2a_v1_OpenIdConnectSecurityScheme, OpenIdConnectSecurityScheme__Output as _a2a_v1_OpenIdConnectSecurityScheme__Output } from '../../a2a/v1/OpenIdConnectSecurityScheme';
import type { MutualTlsSecurityScheme as _a2a_v1_MutualTlsSecurityScheme, MutualTlsSecurityScheme__Output as _a2a_v1_MutualTlsSecurityScheme__Output } from '../../a2a/v1/MutualTlsSecurityScheme';

export interface SecurityScheme {
  'apiKeySecurityScheme'?: (_a2a_v1_APIKeySecurityScheme | null);
  'httpAuthSecurityScheme'?: (_a2a_v1_HTTPAuthSecurityScheme | null);
  'oauth2SecurityScheme'?: (_a2a_v1_OAuth2SecurityScheme | null);
  'openIdConnectSecurityScheme'?: (_a2a_v1_OpenIdConnectSecurityScheme | null);
  'mtlsSecurityScheme'?: (_a2a_v1_MutualTlsSecurityScheme | null);
  'scheme'?: "apiKeySecurityScheme"|"httpAuthSecurityScheme"|"oauth2SecurityScheme"|"openIdConnectSecurityScheme"|"mtlsSecurityScheme";
}

export interface SecurityScheme__Output {
  'apiKeySecurityScheme'?: (_a2a_v1_APIKeySecurityScheme__Output | null);
  'httpAuthSecurityScheme'?: (_a2a_v1_HTTPAuthSecurityScheme__Output | null);
  'oauth2SecurityScheme'?: (_a2a_v1_OAuth2SecurityScheme__Output | null);
  'openIdConnectSecurityScheme'?: (_a2a_v1_OpenIdConnectSecurityScheme__Output | null);
  'mtlsSecurityScheme'?: (_a2a_v1_MutualTlsSecurityScheme__Output | null);
  'scheme'?: "apiKeySecurityScheme"|"httpAuthSecurityScheme"|"oauth2SecurityScheme"|"openIdConnectSecurityScheme"|"mtlsSecurityScheme";
}
