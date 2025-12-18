// Original file: src/server/grpc/a2a.proto

import type { TaskState as _a2a_v1_TaskState, TaskState__Output as _a2a_v1_TaskState__Output } from '../../a2a/v1/TaskState';
import type { Long } from '@grpc/proto-loader';

export interface ListTasksRequest {
  'contextId'?: (string);
  'status'?: (_a2a_v1_TaskState);
  'pageSize'?: (number);
  'pageToken'?: (string);
  'historyLength'?: (number);
  'lastUpdatedAfter'?: (number | string | Long);
  'includeArtifacts'?: (boolean);
  'tenant'?: (string);
  '_pageSize'?: "pageSize";
  '_historyLength'?: "historyLength";
  '_includeArtifacts'?: "includeArtifacts";
}

export interface ListTasksRequest__Output {
  'contextId': (string);
  'status': (_a2a_v1_TaskState__Output);
  'pageSize'?: (number);
  'pageToken': (string);
  'historyLength'?: (number);
  'lastUpdatedAfter': (string);
  'includeArtifacts'?: (boolean);
  'tenant': (string);
  '_pageSize'?: "pageSize";
  '_historyLength'?: "historyLength";
  '_includeArtifacts'?: "includeArtifacts";
}
