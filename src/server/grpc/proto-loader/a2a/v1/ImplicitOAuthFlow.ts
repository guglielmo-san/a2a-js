// Original file: src/server/grpc/a2a.proto


export interface ImplicitOAuthFlow {
  'authorizationUrl'?: (string);
  'refreshUrl'?: (string);
  'scopes'?: ({[key: string]: string});
}

export interface ImplicitOAuthFlow__Output {
  'authorizationUrl': (string);
  'refreshUrl': (string);
  'scopes': ({[key: string]: string});
}
