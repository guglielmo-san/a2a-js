import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

import {
  Message,
  AgentCard,
  Task,
  MessageSendParams,
  TaskState,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  TaskQueryParams,
  TaskIdParams,
  TaskPushNotificationConfig,
  DeleteTaskPushNotificationConfigParams,
  GetTaskPushNotificationConfigParams,
  ListTaskPushNotificationConfigParams,
} from '../../types.js';
import { AgentExecutor } from '../agent_execution/agent_executor.js';
import { RequestContext } from '../agent_execution/request_context.js';
import { A2AError } from '../error.js';
import {
  ExecutionEventBusManager,
  DefaultExecutionEventBusManager,
} from '../events/execution_event_bus_manager.js';
import { AgentExecutionEvent } from '../events/execution_event_bus.js';
import { ExecutionEventQueue } from '../events/execution_event_queue.js';
import { ResultManager } from '../result_manager.js';
import { TaskStore } from '../store.js';
import { A2ARequestHandler } from './a2a_request_handler.js';
import {
  InMemoryPushNotificationStore,
  PushNotificationStore,
} from '../push_notification/push_notification_store.js';
import { PushNotificationSender } from '../push_notification/push_notification_sender.js';
import { DefaultPushNotificationSender } from '../push_notification/default_push_notification_sender.js';
import { ServerCallContext } from '../context.js';
import { AfterArgs, BeforeArgs, EarlyReturnBefore, HandlerInterceptor, ServerCallResult } from '../interceptors.js';
import { DefaultRequestHandler } from './default_request_handler.js';

const terminalStates: TaskState[] = ['completed', 'failed', 'canceled', 'rejected'];

export class RequestHandlerInterceptor implements A2ARequestHandler {
  private readonly requestHandler: A2ARequestHandler
  private readonly agentCard: AgentCard;
  private readonly handlerInterceptors?: HandlerInterceptor[]

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
    )
  }

  async getAgentCard(): Promise<AgentCard> {
    const beforeArgs: BeforeArgs<'getAgentCard'> = {
      input: {
        method: 'getAgentCard',
      },
      context: undefined,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.getAgentCard();

    const afterArgs: AfterArgs<'getAgentCard'> = {
      result: {
        method: 'getAgentCard',
        value: result,
      },
      context: undefined,
    }
    this.interceptAfter(afterArgs);
    return result;
  }

  async getAuthenticatedExtendedAgentCard(context?: ServerCallContext): Promise<AgentCard> {
    const beforeArgs: BeforeArgs<'getAuthenticatedExtendedAgentCard'> = {
      input: {
        method: 'getAuthenticatedExtendedAgentCard',
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.getAuthenticatedExtendedAgentCard(context);

    const afterArgs: AfterArgs<'getAuthenticatedExtendedAgentCard'> = {
      result: {
        method: 'getAuthenticatedExtendedAgentCard',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return result;
  }

  async sendMessage(
    params: MessageSendParams,
    context?: ServerCallContext
  ): Promise<Message | Task> {
    const beforeArgs: BeforeArgs<'sendMessage'> = {
      input: {
        method: 'sendMessage',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.sendMessage(beforeArgs.input.value, context);

    const afterArgs: AfterArgs<'sendMessage'> = {
      result: {
        method: 'sendMessage',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return result;
  }

  async *sendMessageStream(
    params: MessageSendParams,
    context?: ServerCallContext
  ): AsyncGenerator<
    Message | Task | TaskStatusUpdateEvent | TaskArtifactUpdateEvent,
    void,
    undefined
  > {
    const beforeArgs: BeforeArgs<'sendMessageStream'> = {
      input: {
        method: 'sendMessageStream',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      yield earlyReturn.value;
      return;
    }
    if(this.agentCard.capabilities.streaming) {
      const result = await this.requestHandler.sendMessage(beforeArgs.input.value, context);
      const afterArgs: AfterArgs<'sendMessageStream'> = {
        result: {
          method: 'sendMessageStream',
          value: result,
        },
        context,
      }
      this.interceptAfter(afterArgs);
      yield afterArgs.result.value;
      return;
    }

    for await (const  result of this.requestHandler.sendMessageStream(beforeArgs.input.value, context)) {
      const afterArgs: AfterArgs<'sendMessageStream'> = {
      result: {
        method: 'sendMessageStream',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    yield afterArgs.result.value;
    }
  }

  async getTask(params: TaskQueryParams, context?: ServerCallContext): Promise<Task> {
    const beforeArgs: BeforeArgs<'getTask'> = {
      input: {
        method: 'getTask',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.getTask(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'getTask'> = {
      result: {
        method: 'getTask',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
  }

  async cancelTask(params: TaskIdParams, context?: ServerCallContext): Promise<Task> {
    const beforeArgs: BeforeArgs<'cancelTask'> = {
      input: {
        method: 'cancelTask',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.getTask(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'cancelTask'> = {
      result: {
        method: 'cancelTask',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
  }

  async setTaskPushNotificationConfig(
    params: TaskPushNotificationConfig,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig> {

        const beforeArgs: BeforeArgs<'setTaskPushNotificationConfig'> = {
      input: {
        method: 'setTaskPushNotificationConfig',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.setTaskPushNotificationConfig(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'setTaskPushNotificationConfig'> = {
      result: {
        method: 'setTaskPushNotificationConfig',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
    
  }

  async getTaskPushNotificationConfig(
    params: TaskIdParams | GetTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig> {

            const beforeArgs: BeforeArgs<'getTaskPushNotificationConfig'> = {
      input: {
        method: 'getTaskPushNotificationConfig',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.getTaskPushNotificationConfig(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'getTaskPushNotificationConfig'> = {
      result: {
        method: 'getTaskPushNotificationConfig',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
    
  }

  async listTaskPushNotificationConfigs(
    params: ListTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<TaskPushNotificationConfig[]> {
                const beforeArgs: BeforeArgs<'listTaskPushNotificationConfigs'> = {
      input: {
        method: 'listTaskPushNotificationConfigs',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.listTaskPushNotificationConfigs(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'listTaskPushNotificationConfigs'> = {
      result: {
        method: 'listTaskPushNotificationConfigs',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
  }

  async deleteTaskPushNotificationConfig(
    params: DeleteTaskPushNotificationConfigParams,
    context?: ServerCallContext
  ): Promise<void> {

                   const beforeArgs: BeforeArgs<'deleteTaskPushNotificationConfig'> = {
      input: {
        method: 'deleteTaskPushNotificationConfig',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      return earlyReturn.value;
    }
    const result = await this.requestHandler.deleteTaskPushNotificationConfig(beforeArgs.input.value, beforeArgs.context);

    const afterArgs: AfterArgs<'deleteTaskPushNotificationConfig'> = {
      result: {
        method: 'deleteTaskPushNotificationConfig',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    return afterArgs.result.value;
    
  }

  async *resubscribe(
    params: TaskIdParams,
    context?: ServerCallContext
  ): AsyncGenerator<
    Message
    | Task // Initial task state
    | TaskStatusUpdateEvent
    | TaskArtifactUpdateEvent,
    void,
    undefined
  > {

     const beforeArgs: BeforeArgs<'resubscribe'> = {
      input: {
        method: 'resubscribe',
        value: params,
      },
      context,
    }
    const earlyReturn = await this.interceptBefore(beforeArgs);
    if (earlyReturn) {
      yield earlyReturn.value;
      return;
    }

    for await (const  result of this.requestHandler.resubscribe(beforeArgs.input.value, context)) {
      const afterArgs: AfterArgs<'sendMessageStream'> = {
      result: {
        method: 'sendMessageStream',
        value: result,
      },
      context,
    }
    this.interceptAfter(afterArgs);
    yield afterArgs.result.value;
    }
    
  }


  private async interceptBefore<K extends keyof A2ARequestHandler>(
    args: BeforeArgs<K>): Promise<ServerCallResult<K> | undefined> {
    const executedInterceptors: HandlerInterceptor[] = [];
    let beforeResult: EarlyReturnBefore;
    for (const interceptor of this.handlerInterceptors || []) {
      executedInterceptors.push(interceptor);
      beforeResult = await interceptor.before(args);
      if (beforeResult?.earlyReturn) {
        break;
      }
    }
    if (beforeResult?.earlyReturn) {
      if (beforeResult.earlyReturn.method !== args.input.method) {
        throw A2AError.internalError(
          `Interceptor returned result for method '${beforeResult.earlyReturn.method}' but expected '${args.input.method}'.`
        );
      }
      this.interceptAfter({result: beforeResult.earlyReturn, context: args.context}, executedInterceptors)
      return beforeResult.earlyReturn as ServerCallResult<K>;
    }
  }

  private async interceptAfter<K extends keyof A2ARequestHandler>(args: AfterArgs<K>, interceptors?: HandlerInterceptor[]): Promise<void> {
    for (const interceptor of interceptors || this.handlerInterceptors || []) {
      const earlyReturn = await interceptor.after(args);
      if (earlyReturn.earlyReturn) {
        return;
      }
    }
  }
}

export type ExtendedAgentCardProvider = (context?: ServerCallContext) => Promise<AgentCard>;
