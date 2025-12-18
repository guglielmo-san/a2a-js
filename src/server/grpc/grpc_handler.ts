import * as grpc from '@grpc/grpc-js';
import {
  A2AServiceServer,
  AgentCard,
  CancelTaskRequest,
  CreateTaskPushNotificationConfigRequest,
  DeleteTaskPushNotificationConfigRequest,
  GetAgentCardRequest,
  GetTaskPushNotificationConfigRequest,
  GetTaskRequest,
  ListTaskPushNotificationConfigRequest,
  ListTaskPushNotificationConfigResponse,
  SendMessageRequest,
  SendMessageResponse,
  StreamResponse,
  Task,
  TaskPushNotificationConfig,
  TaskSubscriptionRequest,
} from '../../grpc/a2a.js';
import {
  DeleteTaskPushNotificationConfigParams,
  GetTaskPushNotificationConfigParams,
  ListTaskPushNotificationConfigParams,
  MessageSendParams,
  TaskIdParams,
  TaskPushNotificationConfig as TaskPushNotificationConfigInternal,
  TaskQueryParams,
} from '../../types.js';
import { Empty } from '../../grpc/google/protobuf/empty.js';
import { A2ARequestHandler } from '../request_handler/a2a_request_handler.js';
import { FromProto, ToProto } from '../../grpc/utils/proto_type_converter.js';
import { gRpcTransportHandler } from '../transports/grpc/grpc_transport_handler.js';
import { ServerCallContext } from '../context.js';
import { Extensions } from '../../extensions.js';
import { User, UnauthenticatedUser } from '../authentication/user.js';
import { HTTP_EXTENSION_HEADER } from '../../constants.js';
import { A2AError } from '../error.js';

/**
 * Options for configuring the gRPC handler.
 */
export interface gRpcHandlerOptions {
  requestHandler: A2ARequestHandler;
  userBuilder: (
    call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>
  ) => Promise<User | undefined>;
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
        const response = ToProto.messageSendResult(task);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(mapToError(a2aError), null);
      }
    },

    async sendStreamingMessage(
      call: grpc.ServerWritableStream<SendMessageRequest, StreamResponse>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: MessageSendParams = FromProto.messageSendParams(call.request);
        const stream = await grpcTransportHandler.sendMessageStream(params, context);
        for await (const responsePart of stream) {
          const response = ToProto.messageStreamResult(responsePart);
          call.write(response);
        }
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        call.emit('error', a2aError);
      } finally {
        call.end();
      }
    },

    taskSubscription(
      call: grpc.ServerWritableStream<TaskSubscriptionRequest, StreamResponse>
    ): void {
      call.emit('error', A2AError.unsupportedOperation('Streaming not supported.'));
      call.end();
    },

    async deleteTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<DeleteTaskPushNotificationConfigRequest, Empty>,
      callback: grpc.sendUnaryData<Empty>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: DeleteTaskPushNotificationConfigParams =
          FromProto.deleteTaskPushNotificationConfigParams(call.request);
        await grpcTransportHandler.deleteTaskPushNotificationConfig(params, context);
        callback(null, null);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async listTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<
        ListTaskPushNotificationConfigRequest,
        ListTaskPushNotificationConfigResponse
      >,
      callback: grpc.sendUnaryData<ListTaskPushNotificationConfigResponse>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: ListTaskPushNotificationConfigParams =
          FromProto.listTaskPushNotificationConfigParams(call.request);
        const listTaskPushNotificationConfigs =
          await grpcTransportHandler.listTaskPushNotificationConfigs(params, context);
        const response = ToProto.listTaskPushNotificationConfigs(listTaskPushNotificationConfigs);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async createTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<
        CreateTaskPushNotificationConfigRequest,
        TaskPushNotificationConfig
      >,
      callback: grpc.sendUnaryData<TaskPushNotificationConfig>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: TaskPushNotificationConfigInternal =
          FromProto.setTaskPushNotificationConfigParams(call.request);
        const taskPushNotificationConfig = await grpcTransportHandler.setTaskPushNotificationConfig(
          params,
          context
        );
        const response = ToProto.taskPushNotificationConfig(taskPushNotificationConfig);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async getTaskPushNotificationConfig(
      call: grpc.ServerUnaryCall<GetTaskPushNotificationConfigRequest, TaskPushNotificationConfig>,
      callback: grpc.sendUnaryData<TaskPushNotificationConfig>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: GetTaskPushNotificationConfigParams =
          FromProto.getTaskPushNotificationConfigParams(call.request);
        const taskPushNotificationConfig = await grpcTransportHandler.getTaskPushNotificationConfig(
          params,
          context
        );
        const response = ToProto.taskPushNotificationConfig(taskPushNotificationConfig);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async getTask(
      call: grpc.ServerUnaryCall<GetTaskRequest, Task>,
      callback: grpc.sendUnaryData<Task>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: TaskQueryParams = FromProto.taskQueryParams(call.request);
        const task = await grpcTransportHandler.getTask(params, context);
        const response = ToProto.task(task);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async cancelTask(
      call: grpc.ServerUnaryCall<CancelTaskRequest, Task>,
      callback: grpc.sendUnaryData<Task>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const params: TaskIdParams = FromProto.taskIdParams(call.request);
        const task = await grpcTransportHandler.cancelTask(params, context);
        const response = ToProto.task(task);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
    async getAgentCard(
      call: grpc.ServerUnaryCall<GetAgentCardRequest, AgentCard>,
      callback: grpc.sendUnaryData<AgentCard>
    ): Promise<void> {
      try {
        const context = await buildContext(call, options.userBuilder);
        const agentCard = await grpcTransportHandler.getAuthenticatedExtendedAgentCard(context);
        const response = ToProto.agentCard(agentCard);
        callback(null, response);
      } catch (error) {
        const a2aError =
          error instanceof A2AError
            ? error
            : A2AError.internalError(
                error instanceof Error ? error.message : 'Internal server error'
              );
        callback(a2aError, null);
      }
    },
  };
}

const mapToError = (error: A2AError): Partial<grpc.ServerErrorResponse> => {
  switch (error.code) {
    case -32001:
      return {
        code: grpc.status.NOT_FOUND,
        details: error.message,
      };
    case -32002:
    case -32007:
    case -32008:
      return {
        code: grpc.status.FAILED_PRECONDITION,
        details: error.message,
      };
    case -32003:
    case -32004:
    case -32009:
      return {
        code: grpc.status.UNIMPLEMENTED,
        details: error.message,
      };
    case -32005:
      return {
        code: grpc.status.INVALID_ARGUMENT,
        details: error.message,
      };
    case -32006:
      return {
        code: grpc.status.INTERNAL,
        details: error.message,
      };
  }
};

const buildContext = async (
  call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>,
  userBuilder: (
    call: grpc.ServerUnaryCall<unknown, unknown> | grpc.ServerWritableStream<unknown, unknown>
  ) => Promise<User | undefined>
): Promise<ServerCallContext> => {
  const user = await userBuilder(call);
  const extensionHeader = call.metadata.get(HTTP_EXTENSION_HEADER.toLowerCase());
  const extensionString = Array.isArray(extensionHeader)
    ? extensionHeader.join('')
    : extensionHeader;

  return new ServerCallContext(
    Extensions.parseServiceParameter(extensionString),
    user ?? new UnauthenticatedUser()
  );
};
