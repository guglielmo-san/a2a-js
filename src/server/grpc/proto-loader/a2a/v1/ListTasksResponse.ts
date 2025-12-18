// Original file: src/server/grpc/a2a.proto

import type { Task as _a2a_v1_Task, Task__Output as _a2a_v1_Task__Output } from '../../a2a/v1/Task';

export interface ListTasksResponse {
  'tasks'?: (_a2a_v1_Task)[];
  'nextPageToken'?: (string);
  'pageSize'?: (number);
  'totalSize'?: (number);
}

export interface ListTasksResponse__Output {
  'tasks': (_a2a_v1_Task__Output)[];
  'nextPageToken': (string);
  'pageSize': (number);
  'totalSize': (number);
}
