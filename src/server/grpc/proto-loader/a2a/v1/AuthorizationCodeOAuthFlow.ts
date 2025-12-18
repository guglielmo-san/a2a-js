// Original file: src/server/grpc/a2a.proto


export interface AuthorizationCodeOAuthFlow {
  'authorizationUrl'?: (string);
  'tokenUrl'?: (string);
  'refreshUrl'?: (string);
  'scopes'?: ({[key: string]: string});
}

export interface AuthorizationCodeOAuthFlow__Output {
  'authorizationUrl': (string);
  'tokenUrl': (string);
  'refreshUrl': (string);
  'scopes': ({[key: string]: string});
}
