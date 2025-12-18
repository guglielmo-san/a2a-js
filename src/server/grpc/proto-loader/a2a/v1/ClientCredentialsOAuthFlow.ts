// Original file: src/server/grpc/a2a.proto


export interface ClientCredentialsOAuthFlow {
  'tokenUrl'?: (string);
  'refreshUrl'?: (string);
  'scopes'?: ({[key: string]: string});
}

export interface ClientCredentialsOAuthFlow__Output {
  'tokenUrl': (string);
  'refreshUrl': (string);
  'scopes': ({[key: string]: string});
}
