// Original file: src/server/grpc/a2a.proto


export interface GetTaskRequest {
  'name'?: (string);
  'historyLength'?: (number);
  'tenant'?: (string);
  '_historyLength'?: "historyLength";
}

export interface GetTaskRequest__Output {
  'name': (string);
  'historyLength'?: (number);
  'tenant': (string);
  '_historyLength'?: "historyLength";
}
