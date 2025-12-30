import {
  CallOptions,
  credentials,
  ServiceError,
  Metadata,
  ClientUnaryCall,
  ClientReadableStream,
} from '@grpc/grpc-js';
import { TransportProtocolName } from '../../core.js';
import { A2AServiceClient, StreamResponse } from '../../grpc/a2a.js';
import {
  MessageSendParams,
  TaskPushNotificationConfig,
  TaskIdParams,
  ListTaskPushNotificationConfigParams,
  DeleteTaskPushNotificationConfigParams,
  TaskQueryParams,
  Task,
  AgentCard,
  GetTaskPushNotificationConfigParams,
} from '../../types.js';
import { A2AStreamEventData, SendMessageResult } from '../client.js';
import { RequestOptions } from '../multitransport-client.js';
import { Transport, TransportFactory } from './transport.js';
import { ToProto } from '../../grpc/utils/to_proto.js';
import { FromProto } from '../../grpc/utils/from_proto.js';
import {
  A2A_ERROR_CODE,
  AuthenticatedExtendedCardNotConfiguredError,
  ContentTypeNotSupportedError,
  InvalidAgentResponseError,
  PushNotificationNotSupportedError,
  TaskNotFoundError,
  TaskNotCancelableError,
  UnsupportedOperationError,
} from '../../errors.js';

type GrpcUnaryCall<TParams, TResponse> = (
  request: TParams,
  metadata: Metadata,
  options: Partial<CallOptions>,
  callback: (error: ServiceError | null, response: TResponse) => void
) => ClientUnaryCall;

type GrpcStreamCall<TParams> = (
  request: TParams,
  metadata?: Metadata,
  options?: Partial<CallOptions>
) => ClientReadableStream<StreamResponse>;

export interface GrpcTransportOptions {
  endpoint: string;
  gprcCallOptions?: Partial<CallOptions>;
}

export class GrpcTransport implements Transport {
  private readonly gprcCallOptions?: Partial<CallOptions>;
  private readonly endpoint: string;
  private readonly grpcClient: A2AServiceClient;

  constructor(options: GrpcTransportOptions) {
    this.endpoint = options.endpoint;
    this.gprcCallOptions = options.gprcCallOptions;
    this.grpcClient = new A2AServiceClient(this.endpoint, credentials.createInsecure());
  }

  async getExtendedAgentCard(options?: RequestOptions): Promise<AgentCard> {
    const rpcResponse = await this._sendGrpcRequest(
      'getAgentCard',
      undefined,
      options,
      () => {},
      FromProto.agentCard
    );
    return rpcResponse;
  }

  async sendMessage(
    params: MessageSendParams,
    options?: RequestOptions
  ): Promise<SendMessageResult> {
    const rpcResponse = await this._sendGrpcRequest(
      'sendMessage',
      params,
      options,
      ToProto.messageSendParams,
      FromProto.sendMessageResult
    );
    return rpcResponse;
  }

  async *sendMessageStream(
    params: MessageSendParams,
    options?: RequestOptions
  ): AsyncGenerator<A2AStreamEventData, void, undefined> {
    yield* this._sendGrpcStreamingRequest('sendStreamingMessage', params, options);
  }

  async setTaskPushNotificationConfig(
    params: TaskPushNotificationConfig,
    options?: RequestOptions
  ): Promise<TaskPushNotificationConfig> {
    const rpcResponse = await this._sendGrpcRequest(
      'createTaskPushNotificationConfig',
      params,
      options,
      ToProto.taskPushNotificationConfig,
      FromProto.setTaskPushNotificationConfigParams
    );
    return rpcResponse;
  }

  async getTaskPushNotificationConfig(
    params: GetTaskPushNotificationConfigParams,
    options?: RequestOptions
  ): Promise<TaskPushNotificationConfig> {
    const rpcResponse = await this._sendGrpcRequest(
      'getTaskPushNotificationConfig',
      params,
      options,
      ToProto.getTaskPushNotificationConfigRequest,
      FromProto.getTaskPushNoticationConfig
    );
    return rpcResponse;
  }

  async listTaskPushNotificationConfig(
    params: ListTaskPushNotificationConfigParams,
    options?: RequestOptions
  ): Promise<TaskPushNotificationConfig[]> {
    const rpcResponse = await this._sendGrpcRequest(
      'listTaskPushNotificationConfig',
      params,
      options,
      ToProto.listTaskPushNotificationConfigRequest,
      FromProto.listTaskPushNotificationConfig
    );
    return rpcResponse;
  }

  async deleteTaskPushNotificationConfig(
    params: DeleteTaskPushNotificationConfigParams,
    options?: RequestOptions
  ): Promise<void> {
    await this._sendGrpcRequest(
      'deleteTaskPushNotificationConfig',
      params,
      options,
      ToProto.deleteTaskPushNotificationConfigRequest,
      () => {}
    );
  }

  async getTask(params: TaskQueryParams, options?: RequestOptions): Promise<Task> {
    const rpcResponse = await this._sendGrpcRequest(
      'getTask',
      params,
      options,
      ToProto.getTaskRequest,
      FromProto.task
    );
    return rpcResponse;
  }

  async cancelTask(params: TaskIdParams, options?: RequestOptions): Promise<Task> {
    const rpcResponse = await this._sendGrpcRequest(
      'cancelTask',
      params,
      options,
      ToProto.cancelTaskRequest,
      FromProto.task
    );
    return rpcResponse;
  }

  async *resubscribeTask(
    params: TaskIdParams,
    options?: RequestOptions
  ): AsyncGenerator<A2AStreamEventData, void, undefined> {
    yield* this._sendGrpcStreamingRequest('taskSubscription', params, options);
  }

  private async _sendGrpcRequest<TReq, TRes, TParams, TResponse>(
    method: keyof A2AServiceClient,
    params: TParams,
    options: RequestOptions | undefined,
    parser: (req: TParams) => TReq,
    converter: (res: TRes) => TResponse
  ): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const clientMethod = this.grpcClient[method] as GrpcUnaryCall<TReq, TRes>;
      clientMethod(
        parser(params),
        this._buildMetadata(options),
        this.gprcCallOptions ?? {},
        (error, response) => {
          if (error) {
            if (this.isGrpcError(error) && this.isGrpcA2AError(error)) {
              return reject(GrpcTransport.mapToError(error));
            }
            return reject(new Error(`GRPC error for ${String(method)}! Cause: ${error}`));
          }
          resolve(converter(response));
        }
      );
    });
  }

  private async *_sendGrpcStreamingRequest<TParams>(
    method: 'sendStreamingMessage' | 'taskSubscription',
    params: TParams,
    options: RequestOptions | undefined
  ): AsyncGenerator<A2AStreamEventData, void, undefined> {
    const clientMethod = this.grpcClient[method] as GrpcStreamCall<TParams>;
    const streamResponse = clientMethod(
      params,
      this._buildMetadata(options),
      this.gprcCallOptions ?? {}
    );
    try {
      for await (const response of streamResponse) {
        const payload = response.payload;
        switch (payload.$case) {
          case 'msg':
            yield FromProto.message(payload.value);
            break;
          case 'task':
            yield FromProto.task(payload.value);
            break;
          case 'statusUpdate':
            yield FromProto.taskStatusUpdate(payload.value);
            break;
          case 'artifactUpdate':
            yield FromProto.taskArtifactUpdate(payload.value);
            break;
        }
      }
    } catch (error) {
      if (this.isGrpcError(error) && this.isGrpcA2AError(error)) {
        throw GrpcTransport.mapToError(error);
      } else {
        throw new Error(`GRPC error for ${method}! Cause: ${error}`);
      }
    }
  }

  private isGrpcA2AError(error: ServiceError): boolean {
    return error.metadata.get('a2a-error').length > 0;
  }
  private isGrpcError(error: unknown): error is ServiceError {
    return typeof error === 'object' && error !== null && 'code' in error;
  }

  private _buildMetadata(options?: RequestOptions): Metadata {
    const metadata = new Metadata();
    if (options?.serviceParameters) {
      for (const [key, value] of Object.entries(options.serviceParameters)) {
        metadata.set(key, value);
      }
    }
    return metadata;
  }

  private static mapToError(error: ServiceError): Error {
    const a2aErrorCode = Number(error.metadata.get('a2a-error')[0]);
    switch (a2aErrorCode) {
      case A2A_ERROR_CODE.TASK_NOT_FOUND:
        return new TaskNotFoundError(error.message);
      case A2A_ERROR_CODE.TASK_NOT_CANCELABLE:
        return new TaskNotCancelableError(error.message);
      case A2A_ERROR_CODE.PUSH_NOTIFICATION_NOT_SUPPORTED:
        return new PushNotificationNotSupportedError(error.message);
      case A2A_ERROR_CODE.UNSUPPORTED_OPERATION:
        return new UnsupportedOperationError(error.message);
      case A2A_ERROR_CODE.CONTENT_TYPE_NOT_SUPPORTED:
        return new ContentTypeNotSupportedError(error.message);
      case A2A_ERROR_CODE.INVALID_AGENT_RESPONSE:
        return new InvalidAgentResponseError(error.message);
      case A2A_ERROR_CODE.AUTHENTICATED_EXTENDED_CARD_NOT_CONFIGURED:
        return new AuthenticatedExtendedCardNotConfiguredError(error.message);
      default:
        return new Error(
          `GRPC error: ${error.message} Code: ${error.code} Details: ${error.details}`
        );
    }
  }
}

export class GrpcTransportFactoryOptions {
  grpcCallOptions?: Partial<CallOptions>;
}

export class GrpcTransportFactory implements TransportFactory {
  public static readonly name: TransportProtocolName = 'GRPC';

  constructor(private readonly options?: GrpcTransportFactoryOptions) {}

  get protocolName(): string {
    return GrpcTransportFactory.name;
  }

  async create(url: string, _agentCard: AgentCard): Promise<Transport> {
    return new GrpcTransport({
      endpoint: url,
      gprcCallOptions: this.options?.grpcCallOptions,
    });
  }
}
