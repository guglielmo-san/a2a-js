import { A2AError } from '../../error.js';
import { A2ARequestHandler } from '../../request_handler/a2a_request_handler.js';
import { ServerCallContext } from '../../context.js';
import {
  Message,
  Task,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  MessageSendParams,
  TaskPushNotificationConfig,
  TaskQueryParams,
  TaskIdParams,
  Part,
  AgentCard,
  FileWithBytes,
  FileWithUri,
} from '../../../types.js';

export class gRpcTransportHandler {
    private requestHandler: A2ARequestHandler;

    constructor(requestHandler: A2ARequestHandler) {
        this.requestHandler = requestHandler;
    }

      /**
       * Gets the agent card (for capability checks).
       */
      async getAgentCard(): Promise<AgentCard> {
        return this.requestHandler.getAgentCard();
      }
    
      /**
       * Gets the authenticated extended agent card.
       */
      async getAuthenticatedExtendedAgentCard(): Promise<AgentCard> {
        return this.requestHandler.getAuthenticatedExtendedAgentCard();
      }
    
      /**
       * Sends a message to the agent.
       * Accepts both snake_case and camelCase input, returns camelCase.
       */
      async sendMessage(
        params: MessageSendParams,
        context: ServerCallContext
      ): Promise<Message | Task> {
        return this.requestHandler.sendMessage(params, context);
      }
    
      /**
       * Sends a message with streaming response.
       * Accepts both snake_case and camelCase input, returns camelCase stream.
       * @throws {A2AError} UnsupportedOperation if streaming not supported
       */
      async sendMessageStream(
        params: MessageSendParams,
        context: ServerCallContext
      ): Promise<
        AsyncGenerator<
          Message | Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent,
          void,
          undefined
        >
      > {
        return this.requestHandler.sendMessageStream(params, context);
      }
    
      /**
       * Gets a task by ID.
       * Validates historyLength parameter if provided.
       */
      async getTask(
        taskId: string,
        context: ServerCallContext,
        historyLength?: unknown
      ): Promise<Task> {
        const params: TaskQueryParams = { id: taskId };
        return this.requestHandler.getTask(params, context);
      }
    
      /**
       * Cancels a task.
       */
      async cancelTask(taskId: string, context: ServerCallContext): Promise<Task> {
        const params: TaskIdParams = { id: taskId };
        return this.requestHandler.cancelTask(params, context);
      }
    
      /**
       * Resubscribes to task updates.
       * Returns camelCase stream of task updates.
       * @throws {A2AError} UnsupportedOperation if streaming not supported
       */
      async resubscribe(
        taskId: string,
        context: ServerCallContext
      ): Promise<
        AsyncGenerator<Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent, void, undefined>
      > {
        const params: TaskIdParams = { id: taskId };
        return this.requestHandler.resubscribe(params, context);
      }
    
      /**
       * Sets a push notification configuration.
       * Accepts both snake_case and camelCase input, returns camelCase.
       * @throws {A2AError} PushNotificationNotSupported if push notifications not supported
       */
      async setTaskPushNotificationConfig(
        config: TaskPushNotificationConfig,
        context: ServerCallContext
      ): Promise<TaskPushNotificationConfig> {
        return this.requestHandler.setTaskPushNotificationConfig(config, context);
      }
    
      /**
       * Lists all push notification configurations for a task.
       */
      async listTaskPushNotificationConfigs(
        taskId: string,
        context: ServerCallContext
      ): Promise<TaskPushNotificationConfig[]> {
        return this.requestHandler.listTaskPushNotificationConfigs({ id: taskId }, context);
      }
    
      /**
       * Gets a specific push notification configuration.
       */
      async getTaskPushNotificationConfig(
        taskId: string,
        configId: string,
        context: ServerCallContext
      ): Promise<TaskPushNotificationConfig> {
        return this.requestHandler.getTaskPushNotificationConfig(
          { id: taskId, pushNotificationConfigId: configId },
          context
        );
      }
    
      /**
       * Deletes a push notification configuration.
       */
      async deleteTaskPushNotificationConfig(
        taskId: string,
        configId: string,
        context: ServerCallContext
      ): Promise<void> {
        await this.requestHandler.deleteTaskPushNotificationConfig(
          { id: taskId, pushNotificationConfigId: configId },
          context
        );
      }
}