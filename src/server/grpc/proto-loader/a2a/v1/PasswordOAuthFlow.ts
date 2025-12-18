// Original file: src/server/grpc/a2a.proto


export interface PasswordOAuthFlow {
  'tokenUrl'?: (string);
  'refreshUrl'?: (string);
  'scopes'?: ({[key: string]: string});
}

export interface PasswordOAuthFlow__Output {
  'tokenUrl': (string);
  'refreshUrl': (string);
  'scopes': ({[key: string]: string});
}
