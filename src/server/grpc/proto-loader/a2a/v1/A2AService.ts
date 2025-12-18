// Original file: src/server/grpc/a2a.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AgentCard as _a2a_v1_AgentCard, AgentCard__Output as _a2a_v1_AgentCard__Output } from '../../a2a/v1/AgentCard';
import type { CancelTaskRequest as _a2a_v1_CancelTaskRequest, CancelTaskRequest__Output as _a2a_v1_CancelTaskRequest__Output } from '../../a2a/v1/CancelTaskRequest';
import type { DeleteTaskPushNotificationConfigRequest as _a2a_v1_DeleteTaskPushNotificationConfigRequest, DeleteTaskPushNotificationConfigRequest__Output as _a2a_v1_DeleteTaskPushNotificationConfigRequest__Output } from '../../a2a/v1/DeleteTaskPushNotificationConfigRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../google/protobuf/Empty';
import type { GetExtendedAgentCardRequest as _a2a_v1_GetExtendedAgentCardRequest, GetExtendedAgentCardRequest__Output as _a2a_v1_GetExtendedAgentCardRequest__Output } from '../../a2a/v1/GetExtendedAgentCardRequest';
import type { GetTaskPushNotificationConfigRequest as _a2a_v1_GetTaskPushNotificationConfigRequest, GetTaskPushNotificationConfigRequest__Output as _a2a_v1_GetTaskPushNotificationConfigRequest__Output } from '../../a2a/v1/GetTaskPushNotificationConfigRequest';
import type { GetTaskRequest as _a2a_v1_GetTaskRequest, GetTaskRequest__Output as _a2a_v1_GetTaskRequest__Output } from '../../a2a/v1/GetTaskRequest';
import type { ListTaskPushNotificationConfigRequest as _a2a_v1_ListTaskPushNotificationConfigRequest, ListTaskPushNotificationConfigRequest__Output as _a2a_v1_ListTaskPushNotificationConfigRequest__Output } from '../../a2a/v1/ListTaskPushNotificationConfigRequest';
import type { ListTaskPushNotificationConfigResponse as _a2a_v1_ListTaskPushNotificationConfigResponse, ListTaskPushNotificationConfigResponse__Output as _a2a_v1_ListTaskPushNotificationConfigResponse__Output } from '../../a2a/v1/ListTaskPushNotificationConfigResponse';
import type { ListTasksRequest as _a2a_v1_ListTasksRequest, ListTasksRequest__Output as _a2a_v1_ListTasksRequest__Output } from '../../a2a/v1/ListTasksRequest';
import type { ListTasksResponse as _a2a_v1_ListTasksResponse, ListTasksResponse__Output as _a2a_v1_ListTasksResponse__Output } from '../../a2a/v1/ListTasksResponse';
import type { SendMessageRequest as _a2a_v1_SendMessageRequest, SendMessageRequest__Output as _a2a_v1_SendMessageRequest__Output } from '../../a2a/v1/SendMessageRequest';
import type { SendMessageResponse as _a2a_v1_SendMessageResponse, SendMessageResponse__Output as _a2a_v1_SendMessageResponse__Output } from '../../a2a/v1/SendMessageResponse';
import type { SetTaskPushNotificationConfigRequest as _a2a_v1_SetTaskPushNotificationConfigRequest, SetTaskPushNotificationConfigRequest__Output as _a2a_v1_SetTaskPushNotificationConfigRequest__Output } from '../../a2a/v1/SetTaskPushNotificationConfigRequest';
import type { StreamResponse as _a2a_v1_StreamResponse, StreamResponse__Output as _a2a_v1_StreamResponse__Output } from '../../a2a/v1/StreamResponse';
import type { SubscribeToTaskRequest as _a2a_v1_SubscribeToTaskRequest, SubscribeToTaskRequest__Output as _a2a_v1_SubscribeToTaskRequest__Output } from '../../a2a/v1/SubscribeToTaskRequest';
import type { Task as _a2a_v1_Task, Task__Output as _a2a_v1_Task__Output } from '../../a2a/v1/Task';
import type { TaskPushNotificationConfig as _a2a_v1_TaskPushNotificationConfig, TaskPushNotificationConfig__Output as _a2a_v1_TaskPushNotificationConfig__Output } from '../../a2a/v1/TaskPushNotificationConfig';

export interface A2AServiceClient extends grpc.Client {
  CancelTask(argument: _a2a_v1_CancelTaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  CancelTask(argument: _a2a_v1_CancelTaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  CancelTask(argument: _a2a_v1_CancelTaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  CancelTask(argument: _a2a_v1_CancelTaskRequest, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  cancelTask(argument: _a2a_v1_CancelTaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  cancelTask(argument: _a2a_v1_CancelTaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  cancelTask(argument: _a2a_v1_CancelTaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  cancelTask(argument: _a2a_v1_CancelTaskRequest, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  
  DeleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteTaskPushNotificationConfig(argument: _a2a_v1_DeleteTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  GetExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  GetExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  GetExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  GetExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  getExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  getExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  getExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  getExtendedAgentCard(argument: _a2a_v1_GetExtendedAgentCardRequest, callback: grpc.requestCallback<_a2a_v1_AgentCard__Output>): grpc.ClientUnaryCall;
  
  GetTask(argument: _a2a_v1_GetTaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  GetTask(argument: _a2a_v1_GetTaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  GetTask(argument: _a2a_v1_GetTaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  GetTask(argument: _a2a_v1_GetTaskRequest, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  getTask(argument: _a2a_v1_GetTaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  getTask(argument: _a2a_v1_GetTaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  getTask(argument: _a2a_v1_GetTaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  getTask(argument: _a2a_v1_GetTaskRequest, callback: grpc.requestCallback<_a2a_v1_Task__Output>): grpc.ClientUnaryCall;
  
  GetTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  GetTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  GetTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  GetTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  getTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  getTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  getTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  getTaskPushNotificationConfig(argument: _a2a_v1_GetTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  
  ListTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  ListTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  ListTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  ListTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  listTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  listTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  listTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  listTaskPushNotificationConfig(argument: _a2a_v1_ListTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_ListTaskPushNotificationConfigResponse__Output>): grpc.ClientUnaryCall;
  
  ListTasks(argument: _a2a_v1_ListTasksRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  ListTasks(argument: _a2a_v1_ListTasksRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  ListTasks(argument: _a2a_v1_ListTasksRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  ListTasks(argument: _a2a_v1_ListTasksRequest, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  listTasks(argument: _a2a_v1_ListTasksRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  listTasks(argument: _a2a_v1_ListTasksRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  listTasks(argument: _a2a_v1_ListTasksRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  listTasks(argument: _a2a_v1_ListTasksRequest, callback: grpc.requestCallback<_a2a_v1_ListTasksResponse__Output>): grpc.ClientUnaryCall;
  
  SendMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _a2a_v1_SendMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _a2a_v1_SendMessageRequest, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _a2a_v1_SendMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _a2a_v1_SendMessageRequest, callback: grpc.requestCallback<_a2a_v1_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  
  SendStreamingMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  SendStreamingMessage(argument: _a2a_v1_SendMessageRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  sendStreamingMessage(argument: _a2a_v1_SendMessageRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  sendStreamingMessage(argument: _a2a_v1_SendMessageRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  
  SetTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  SetTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  SetTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  SetTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  setTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  setTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  setTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  setTaskPushNotificationConfig(argument: _a2a_v1_SetTaskPushNotificationConfigRequest, callback: grpc.requestCallback<_a2a_v1_TaskPushNotificationConfig__Output>): grpc.ClientUnaryCall;
  
  SubscribeToTask(argument: _a2a_v1_SubscribeToTaskRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  SubscribeToTask(argument: _a2a_v1_SubscribeToTaskRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  subscribeToTask(argument: _a2a_v1_SubscribeToTaskRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  subscribeToTask(argument: _a2a_v1_SubscribeToTaskRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_a2a_v1_StreamResponse__Output>;
  
}

export interface A2AServiceHandlers extends grpc.UntypedServiceImplementation {
  CancelTask: grpc.handleUnaryCall<_a2a_v1_CancelTaskRequest__Output, _a2a_v1_Task>;
  
  DeleteTaskPushNotificationConfig: grpc.handleUnaryCall<_a2a_v1_DeleteTaskPushNotificationConfigRequest__Output, _google_protobuf_Empty>;
  
  GetExtendedAgentCard: grpc.handleUnaryCall<_a2a_v1_GetExtendedAgentCardRequest__Output, _a2a_v1_AgentCard>;
  
  GetTask: grpc.handleUnaryCall<_a2a_v1_GetTaskRequest__Output, _a2a_v1_Task>;
  
  GetTaskPushNotificationConfig: grpc.handleUnaryCall<_a2a_v1_GetTaskPushNotificationConfigRequest__Output, _a2a_v1_TaskPushNotificationConfig>;
  
  ListTaskPushNotificationConfig: grpc.handleUnaryCall<_a2a_v1_ListTaskPushNotificationConfigRequest__Output, _a2a_v1_ListTaskPushNotificationConfigResponse>;
  
  ListTasks: grpc.handleUnaryCall<_a2a_v1_ListTasksRequest__Output, _a2a_v1_ListTasksResponse>;
  
  SendMessage: grpc.handleUnaryCall<_a2a_v1_SendMessageRequest__Output, _a2a_v1_SendMessageResponse>;
  
  SendStreamingMessage: grpc.handleServerStreamingCall<_a2a_v1_SendMessageRequest__Output, _a2a_v1_StreamResponse>;
  
  SetTaskPushNotificationConfig: grpc.handleUnaryCall<_a2a_v1_SetTaskPushNotificationConfigRequest__Output, _a2a_v1_TaskPushNotificationConfig>;
  
  SubscribeToTask: grpc.handleServerStreamingCall<_a2a_v1_SubscribeToTaskRequest__Output, _a2a_v1_StreamResponse>;
  
}

export interface A2AServiceDefinition extends grpc.ServiceDefinition {
  CancelTask: MethodDefinition<_a2a_v1_CancelTaskRequest, _a2a_v1_Task, _a2a_v1_CancelTaskRequest__Output, _a2a_v1_Task__Output>
  DeleteTaskPushNotificationConfig: MethodDefinition<_a2a_v1_DeleteTaskPushNotificationConfigRequest, _google_protobuf_Empty, _a2a_v1_DeleteTaskPushNotificationConfigRequest__Output, _google_protobuf_Empty__Output>
  GetExtendedAgentCard: MethodDefinition<_a2a_v1_GetExtendedAgentCardRequest, _a2a_v1_AgentCard, _a2a_v1_GetExtendedAgentCardRequest__Output, _a2a_v1_AgentCard__Output>
  GetTask: MethodDefinition<_a2a_v1_GetTaskRequest, _a2a_v1_Task, _a2a_v1_GetTaskRequest__Output, _a2a_v1_Task__Output>
  GetTaskPushNotificationConfig: MethodDefinition<_a2a_v1_GetTaskPushNotificationConfigRequest, _a2a_v1_TaskPushNotificationConfig, _a2a_v1_GetTaskPushNotificationConfigRequest__Output, _a2a_v1_TaskPushNotificationConfig__Output>
  ListTaskPushNotificationConfig: MethodDefinition<_a2a_v1_ListTaskPushNotificationConfigRequest, _a2a_v1_ListTaskPushNotificationConfigResponse, _a2a_v1_ListTaskPushNotificationConfigRequest__Output, _a2a_v1_ListTaskPushNotificationConfigResponse__Output>
  ListTasks: MethodDefinition<_a2a_v1_ListTasksRequest, _a2a_v1_ListTasksResponse, _a2a_v1_ListTasksRequest__Output, _a2a_v1_ListTasksResponse__Output>
  SendMessage: MethodDefinition<_a2a_v1_SendMessageRequest, _a2a_v1_SendMessageResponse, _a2a_v1_SendMessageRequest__Output, _a2a_v1_SendMessageResponse__Output>
  SendStreamingMessage: MethodDefinition<_a2a_v1_SendMessageRequest, _a2a_v1_StreamResponse, _a2a_v1_SendMessageRequest__Output, _a2a_v1_StreamResponse__Output>
  SetTaskPushNotificationConfig: MethodDefinition<_a2a_v1_SetTaskPushNotificationConfigRequest, _a2a_v1_TaskPushNotificationConfig, _a2a_v1_SetTaskPushNotificationConfigRequest__Output, _a2a_v1_TaskPushNotificationConfig__Output>
  SubscribeToTask: MethodDefinition<_a2a_v1_SubscribeToTaskRequest, _a2a_v1_StreamResponse, _a2a_v1_SubscribeToTaskRequest__Output, _a2a_v1_StreamResponse__Output>
}
