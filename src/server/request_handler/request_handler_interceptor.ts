import {
  Message,
  AgentCard,
  Task,
  MessageSendParams,
  TaskQueryParams,
  TaskIdParams,
  TaskPushNotificationConfig,
  DeleteTaskPushNotificationConfigParams,
  GetTaskPushNotificationConfigParams,
  ListTaskPushNotificationConfigParams,
} from '../../types.js';
import { AgentExecutor } from '../agent_execution/agent_executor.js';
import { A2AError } from '../error.js';
import {
  ExecutionEventBusManager,
  DefaultExecutionEventBusManager,
} from '../events/execution_event_bus_manager.js';
import { TaskStore } from '../store.js';
import { A2ARequestHandler, A2AStreamEventData } from './a2a_request_handler.js';
import { PushNotificationStore } from '../push_notification/push_notification_store.js';
import { PushNotificationSender } from '../push_notification/push_notification_sender.js';
import { ServerCallContext } from '../context.js';
import {
  AfterArgs,
  BeforeArgs,
  HandlerInterceptor,
  HandlerCallInput,
  HandlerCallResult,
} from '../interceptors.js';
import { DefaultRequestHandler } from './default_request_handler.js';

export class RequestHandlerInterceptor implements A2ARequestHandler {
  private readonly requestHandler: A2ARequestHandler;
  private readonly agentCard: AgentCard;
  private readonly handlerInterceptors?: HandlerInterceptor[];

  constructor(
    agentCard: AgentCard,
    taskStore: TaskStore,
    agentExecutor: AgentExecutor,
    eventBusManager: ExecutionEventBusManager = new DefaultExecutionEventBusManager(),
    pushNotificationStore?: PushNotificationStore,
    pushNotificationSender?: PushNotificationSender,
    extendedAgentCardProvider?: AgentCard | ExtendedAgentCardProvider,
    handlerInterceptors?: HandlerInterceptor[]
  ) {
    this.agentCard = agentCard;
    this.handlerInterceptors = handlerInterceptors;
    this.requestHandler = new DefaultRequestHandler(
      agentCard,
      taskStore,
      agentExecutor,
      eventBusManager,
      pushNotificationStore,
      pushNotificationSender,
      extendedAgentCardProvider
    );
  }

  async getAgentCard(): Promise<AgentCard> {
    return this.executeWithInterceptors(
      { method: 'getAgentCard' },
      undefined,
      this.requestHandler.getAgentCard.bind(this.requestHandler)
    );
  }

  async getAuthenticatedExtendedAgentCard(context?: ServerCallContext): Promise<AgentCard> {
    return this.executeWithInterceptors(
      { method: 'getAuthenticatedExtendedAgentCard' },
      context,
      this.requestHandler.getAuthenticatedExtendedAgentCard.bind(this.requestHandler)
    );
  }

  async sendMessage(
    params: MessageSendParams,
    context?: ServerCallContext
  ): Promise<Message | Task> {
    return this.executeWithInterceptors(
      { method: 'sendMessage', value: params },
      context,
      this.requestHandler.sendMessage.bind(this.requestHandler)
    );
  }

  async *sendMessageStream(
    params: MessageSendParams,
    context?: ServerCallContext
  ): AsyncGenerator<A2AStreamEventData, void, undefined> {
    const beforeArgs: BeforeArgs<'sendMessageStream'> = {
      input: {
        method: 'sendMessageStream',
        value: params,
      },
      agentCard: this.agentCard,
      context,
    };
    const beforeResult = await this.interceptBefore(beforeArgs);
    if (beforeResult) {
      const afterArgs: AfterArgs<'sendMessageStream'> = {
        result: {
          method: 'sendMessageStream',
          value: beforeResult.earlyReturn.value,
        },
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      await this.interceptAfter(afterArgs, beforeResult.executed);
      yield afterArgs.result.value;
      return;
    }
    if (!this.agentCard.capabilities.streaming) {
      const result = await this.requestHandler.sendMessage(
        beforeArgs.input.value,
        beforeArgs.context
      );
      const afterArgs: AfterArgs<'sendMessageStream'> = {
        result: {
          method: 'sendMessageStream',
          value: result,
        },
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      await this.interceptAfter(afterArgs);
      yield afterArgs.result.value;
      return;
    }

    for await (const result of this.requestHandler.sendMessageStream(
      beforeArgs.input.value,
      beforeArgs.context
    )) {
      const afterArgs: AfterArgs<'sendMessageStream'> = {
        result: {
          method: 'sendMessageStream',
          value: result,
        },
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      const afterResult = await this.interceptAfter(afterArgs);
      yield afterArgs.result.value;
      if (afterResult?.earlyReturn) {
        return;
      }
    }
  }

  async getTask(params: TaskQueryParams, context?: ServerCallContext): Promise<Task> {
    return this.executeWithInterceptors(
      { method: 'getTask', value: params },
      context,
      this.requestHandler.getTask.bind(this.requestHandler)
    );
  }

  async cancelTask(params: TaskIdParams, context?: ServerCallContext): Promise<Task> {
    return this.executeWithInterceptors(
      { method: 'cancelTask', value: params },
      context,
      this.requestHandler.cancelTask.bind(this.requestHandler)
    );
  }

  async setTaskPushNotificationConfig(
    params: TaskPushNotificationConfig,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig> {
    return this.executeWithInterceptors(
      { method: 'setTaskPushNotificationConfig', value: params },
      context,
      this.requestHandler.setTaskPushNotificationConfig.bind(this.requestHandler)
    );
  }

  async getTaskPushNotificationConfig(
    params: TaskIdParams | GetTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig> {
    return this.executeWithInterceptors(
      { method: 'getTaskPushNotificationConfig', value: params },
      context,
      this.requestHandler.getTaskPushNotificationConfig.bind(this.requestHandler)
    );
  }

  async listTaskPushNotificationConfigs(
    params: ListTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig[]> {
    return this.executeWithInterceptors(
      { method: 'listTaskPushNotificationConfigs', value: params },
      context,
      this.requestHandler.listTaskPushNotificationConfigs.bind(this.requestHandler)
    );
  }

  async deleteTaskPushNotificationConfig(
    params: DeleteTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<void> {
    return this.executeWithInterceptors(
      { method: 'deleteTaskPushNotificationConfig', value: params },
      context,
      this.requestHandler.deleteTaskPushNotificationConfig.bind(this.requestHandler)
    );
  }

  async *resubscribe(
    params: TaskIdParams,
    context?: ServerCallContext
  ): AsyncGenerator<A2AStreamEventData, void, undefined> {
    const beforeArgs: BeforeArgs<'resubscribe'> = {
      input: {
        method: 'resubscribe',
        value: params,
      },
      agentCard: this.agentCard,
      context,
    };
    const beforeResult = await this.interceptBefore(beforeArgs);
    if (beforeResult) {
      const afterArgs: AfterArgs<'resubscribe'> = {
        result: {
          method: 'resubscribe',
          value: beforeResult.earlyReturn.value,
        },
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      await this.interceptAfter(afterArgs, beforeResult.executed);
      yield afterArgs.result.value;
      return;
    }

    for await (const result of this.requestHandler.resubscribe(beforeArgs.input.value, context)) {
      const afterArgs: AfterArgs<'resubscribe'> = {
        result: {
          method: 'resubscribe',
          value: result,
        },
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      const afterResult = await this.interceptAfter(afterArgs);
      yield afterArgs.result.value;
      if (afterResult?.earlyReturn) {
        return;
      }
    }
  }

  private async executeWithInterceptors<K extends keyof A2ARequestHandler>(
    input: HandlerCallInput<K>,
    context: ServerCallContext | undefined,
    transportCall: (
      params: HandlerCallInput<K>['value'],
      context?: ServerCallContext
    ) => Promise<HandlerCallResult<K>['value']>
  ): Promise<HandlerCallResult<K>['value']> {
    const beforeArgs: BeforeArgs<K> = {
      input: input,
      agentCard: this.agentCard,
      context,
    };
    const beforeResult = await this.interceptBefore(beforeArgs);

    if (beforeResult) {
      const afterArgs: AfterArgs<K> = {
        result: {
          method: input.method,
          value: beforeResult.earlyReturn.value,
        } as HandlerCallResult<K>,
        agentCard: this.agentCard,
        context: beforeArgs.context,
      };
      await this.interceptAfter(afterArgs, beforeResult.executed);
      return afterArgs.result.value;
    }

    const result = await transportCall(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<K> = {
      result: { method: input.method, value: result } as HandlerCallResult<K>,
      agentCard: this.agentCard,
      context: beforeArgs.context,
    };
    await this.interceptAfter(afterArgs);

    return afterArgs.result.value;
  }

  private async interceptBefore<K extends keyof A2ARequestHandler>(
    args: BeforeArgs<K>
  ): Promise<{ earlyReturn: HandlerCallResult<K>; executed: HandlerInterceptor[] } | undefined> {
    const executedInterceptors: HandlerInterceptor[] = [];
    for (const interceptor of this.handlerInterceptors || []) {
      executedInterceptors.push(interceptor);
      const earlyReturn = await interceptor.before(args);
      if (earlyReturn) {
        if (earlyReturn.value.method !== args.input.method) {
          throw A2AError.internalError(
            `Interceptor returned result for method '${earlyReturn.value.method}' but expected '${args.input.method}'.`
          );
        }
        return {
          earlyReturn: earlyReturn.value as HandlerCallResult<K>,
          executed: executedInterceptors,
        };
      }
    }
  }

  private async interceptAfter<K extends keyof A2ARequestHandler>(
    args: AfterArgs<K>,
    interceptors?: HandlerInterceptor[]
  ): Promise<{ earlyReturn: boolean } | undefined> {
    const reversedInterceptors = [...(interceptors || this.handlerInterceptors || [])].reverse();
    for (const interceptor of reversedInterceptors) {
      const earlyReturn = await interceptor.after(args);
      if (earlyReturn && earlyReturn.value) {
        return { earlyReturn: earlyReturn.value };
      }
    }
  }
}

export type ExtendedAgentCardProvider = (context?: ServerCallContext) => Promise<AgentCard>;
