// Original file: src/server/grpc/a2a.proto


export interface FilePart {
  'fileWithUri'?: (string);
  'fileWithBytes'?: (Buffer | Uint8Array | string);
  'mediaType'?: (string);
  'name'?: (string);
  'file'?: "fileWithUri"|"fileWithBytes";
}

export interface FilePart__Output {
  'fileWithUri'?: (string);
  'fileWithBytes'?: (Buffer);
  'mediaType': (string);
  'name': (string);
  'file'?: "fileWithUri"|"fileWithBytes";
}
