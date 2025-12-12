import * as grpc from '@grpc/grpc-js';
import { A2AServiceServer, A2AServiceService, AgentCard, CancelTaskRequest, DeleteTaskPushNotificationConfigRequest, GetExtendedAgentCardRequest, GetTaskPushNotificationConfigRequest, GetTaskRequest, ListTaskPushNotificationConfigRequest, ListTaskPushNotificationConfigResponse, ListTasksRequest, ListTasksResponse, Message, SendMessageRequest, SendMessageResponse, SetTaskPushNotificationConfigRequest, StreamResponse, SubscribeToTaskRequest, Task, TaskPushNotificationConfig } from './a2a.js';
import { Task as A2ATask, MessageSendParams} from '../../../types.js';
import { Empty } from './google/protobuf/empty.js';
import { A2ARequestHandler } from '../../request_handler/a2a_request_handler.js';

export class gRPCTransportHandler implements A2AServiceServer {
    private requestHandler: A2ARequestHandler;

    constructor(requestHandler: A2ARequestHandler){
        this.requestHandler = requestHandler;
    }

    sendMessage(call: grpc.ServerUnaryCall<SendMessageRequest, SendMessageResponse>, callback: grpc.sendUnaryData<SendMessageResponse>): void {
        const request: SendMessageRequest = call.request;

        console.log("Received message:", request);

        const params: MessageSendParams = {
            message: {...request.request, kind: 'message'},
            configuration: request.configuration,
            metadata: request.metadata
        }
        const response = this.requestHandler.sendMessage(request);

        // 3. Create the response object
        const response: SendMessageResponse = {
        'task': Task.fromJSON(task)
        };

        // 4. Send the response back (null = no error)
        callback(null, response);
        }

    sendStreamingMessage(call: grpc.ServerWritableStream<SendMessageRequest, StreamResponse>): void {
        throw new Error("Method not implemented.");
    }
    subscribeToTask(call: grpc.ServerWritableStream<SubscribeToTaskRequest, StreamResponse>): void {
        throw new Error("Method not implemented.");
    }
    deleteTaskPushNotificationConfig(call: grpc.ServerUnaryCall<DeleteTaskPushNotificationConfigRequest, Empty>, callback: grpc.sendUnaryData<Empty>): void {
        throw new Error("Method not implemented.");
    }
    getAgentCard(call: grpc.ServerUnaryCall<Empty, Empty>, callback: grpc.sendUnaryData<Empty>): void {
        throw new Error("Method not implemented.");
    }
    listTaskPushNotificationConfig(call: grpc.ServerUnaryCall<ListTaskPushNotificationConfigRequest, ListTaskPushNotificationConfigResponse>, callback: grpc.sendUnaryData<ListTaskPushNotificationConfigResponse>): void {
        throw new Error("Method not implemented.");
    }
    listTasks(call: grpc.ServerUnaryCall<ListTasksRequest, ListTasksResponse>, callback: grpc.sendUnaryData<ListTasksResponse>): void {
        throw new Error("Method not implemented.");
    }
    getTask(call: grpc.ServerUnaryCall<GetTaskRequest, Task>, callback: grpc.sendUnaryData<Task>): void {
        throw new Error("Method not implemented.");
    }
    cancelTask(call: grpc.ServerUnaryCall<CancelTaskRequest, Task>, callback: grpc.sendUnaryData<Task>): void {
        throw new Error("Method not implemented.");
    }
    setTaskPushNotificationConfig(call: grpc.ServerUnaryCall<SetTaskPushNotificationConfigRequest, TaskPushNotificationConfig>, callback: grpc.sendUnaryData<TaskPushNotificationConfig>): void {
        throw new Error("Method not implemented.");
    }
    getTaskPushNotificationConfig(call: grpc.ServerUnaryCall<GetTaskPushNotificationConfigRequest, TaskPushNotificationConfig>, callback: grpc.sendUnaryData<TaskPushNotificationConfig>): void {
        throw new Error("Method not implemented.");
    }
    getExtendedAgentCard(call: grpc.ServerUnaryCall<GetExtendedAgentCardRequest, AgentCard>, callback: grpc.sendUnaryData<AgentCard>): void {
        throw new Error("Method not implemented.");
    }

    [name: string]: grpc.UntypedHandleCall;
}
export const a2aServerImplementation = {
  
  sendMessage: (
    call: grpc.ServerUnaryCall<SendMessageRequest, SendMessageResponse>, 
    callback: grpc.sendUnaryData<SendMessageResponse>
  ) => {
    // 1. Access the data sent by the client
    const request = call.request;
    console.log("Received message:", request);


    const task: A2ATask = {
        kind: 'task',
        id: '123',
        contextId: '456',
        status: {
            state: 'completed'
        },   
    }
    // 3. Create the response object
    const response: SendMessageResponse = {
      'task': Task.fromJSON(task)
    };

    // 4. Send the response back (null = no error)
    callback(null, response);
  }

};

const transportHandler = new gRPCTransportHandler();
const server = new grpc.Server();
server.addService(A2AServiceService, transportHandler);