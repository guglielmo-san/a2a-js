import * as grpc from '@grpc/grpc-js';
import { A2AServiceServer, A2AServiceService, AgentCard, CancelTaskRequest, DeleteTaskPushNotificationConfigRequest, GetExtendedAgentCardRequest, GetTaskPushNotificationConfigRequest, GetTaskRequest, ListTaskPushNotificationConfigRequest, ListTaskPushNotificationConfigResponse, ListTasksRequest, ListTasksResponse, Message, SendMessageRequest, SendMessageResponse, SetTaskPushNotificationConfigRequest, StreamResponse, SubscribeToTaskRequest, Task, TaskPushNotificationConfig } from '../../grpc/a2a.js';
import { Task as A2ATask, MessageSendParams} from '../../types.js';
import { Empty } from '../../grpc/google/protobuf/empty.js';
import { A2ARequestHandler } from '../request_handler/a2a_request_handler.js';
import { FromProto } from '../../grpc/utils/proto_type_converter.js';
import { UserBuilder } from '../express/common.js';
import { gRpcTransportHandler } from '../transports/grpc/grpc_transport_handler.js';
import { ServerCallContext } from '../context.js';
import { Extensions } from '../../extensions.js';
import { User, UnauthenticatedUser } from '../authentication/user.js';

/**
 * Options for configuring the gRPC handler.
 */
export interface gRpcHandlerOptions {
  requestHandler: A2ARequestHandler;
  userBuilder: (call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>) => Promise<User | undefined>;
}

/**
 * Creates a gRPC transport handler.
 * This handler implements the A2A gRPC service definition and acts as an
 * adapter between the gRPC transport layer and the core A2A request handler.
 *
 * @param requestHandler - The core A2A request handler for business logic.
 * @returns An object that implements the A2AServiceServer interface.
 */
export function grpcHandler(options: gRpcHandlerOptions): A2AServiceServer {
    const grpcTransportHandler = new gRpcTransportHandler(options.requestHandler);

  return {
    async sendMessage(
      call: grpc.ServerUnaryCall<SendMessageRequest, SendMessageResponse>,
      callback: grpc.sendUnaryData<SendMessageResponse>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: MessageSendParams = FromProto.messageSendParams(call.request);
        const task = await grpcTransportHandler.sendMessage(params, context);
        const response = ToProto.sendMessageResponse(task);
        callback(null, response);
      } catch (error) {
        callback({
          code: grpc.status.INTERNAL,
          message: error instanceof Error ? error.message : 'Internal Server Error',
        });
      }
    },

    sendStreamingMessage(call: grpc.ServerWritableStream<SendMessageRequest, StreamResponse>): void {
      throw new Error('Method not implemented.');
    },
    subscribeToTask(call: grpc.ServerWritableStream<SubscribeToTaskRequest, StreamResponse>): void {
      throw new Error('Method not implemented.');
    },
    deleteTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<DeleteTaskPushNotificationConfigRequest, Empty>,
      callback: grpc.sendUnaryData<Empty>
    ): void {
      throw new Error('Method not implemented.');
    },
    getAgentCard(call: grpc.ServerUnaryCall<Empty, Empty>, callback: grpc.sendUnaryData<Empty>): void {
      throw new Error('Method not implemented.');
    },
    listTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<
        ListTaskPushNotificationConfigRequest,
        ListTaskPushNotificationConfigResponse
      >,
      callback: grpc.sendUnaryData<ListTaskPushNotificationConfigResponse>
    ): void {
      throw new Error('Method not implemented.');
    },
    listTasks(
      call: grpc.ServerUnaryCall<ListTasksRequest, ListTasksResponse>,
      callback: grpc.sendUnaryData<ListTasksResponse>
    ): void {
      throw new Error('Method not implemented.');
    },
    getTask(call: grpc.ServerUnaryCall<GetTaskRequest, Task>, callback: grpc.sendUnaryData<Task>): void {
      throw new Error('Method not implemented.');
    },
    cancelTask(call: grpc.ServerUnaryCall<CancelTaskRequest, Task>, callback: grpc.sendUnaryData<Task>): void {
      throw new Error('Method not implemented.');
    },
    setTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<SetTaskPushNotificationConfigRequest, TaskPushNotificationConfig>,
      callback: grpc.sendUnaryData<TaskPushNotificationConfig>
    ): void {
      throw new Error('Method not implemented.');
    },
    getTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<GetTaskPushNotificationConfigRequest, TaskPushNotificationConfig>,
      callback: grpc.sendUnaryData<TaskPushNotificationConfig>
    ): void {
      throw new Error('Method not implemented.');
    },
    getExtendedAgentCard(
      call: grpc.ServerUnaryCall<GetExtendedAgentCardRequest, AgentCard>,
      callback: grpc.sendUnaryData<AgentCard>
    ): void {
      throw new Error('Method not implemented.');
    },
  };
}

const buildContext = async (
    call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>,
    userBuilder: (call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>) => Promise<User | undefined>
  ): Promise<ServerCallContext> => {
    const user = await userBuilder(call);
    const extensionHeader = call.metadata.get('x-a2a-extensions');
    const extensionString = Array.isArray(extensionHeader) ? extensionHeader.join('') : extensionHeader;

    return new ServerCallContext(
      Extensions.parseServiceParameter(extensionString),
      user ?? new UnauthenticatedUser()
    );
  }