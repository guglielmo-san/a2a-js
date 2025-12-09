import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { RequestHandlerInterceptor } from '../../src/server/request_handler/request_handler_interceptor.js';
import {
  AgentCard,
  DeleteTaskPushNotificationConfigParams,
  GetTaskPushNotificationConfigParams,
  ListTaskPushNotificationConfigParams,
  Message,
  MessageSendParams,
  Task,
  TaskIdParams,
  TaskPushNotificationConfig,
  TaskQueryParams,
  TaskStatusUpdateEvent,
} from '../../src/types.js';
import { AgentExecutor } from '../../src/server/agent_execution/agent_executor.js';
import { TaskStore } from '../../src/server/store.js';
import { ExecutionEventBusManager } from '../../src/server/events/execution_event_bus_manager.js';
import {
  A2ARequestHandler,
  A2AStreamEventData,
} from '../../src/server/request_handler/a2a_request_handler.js';
import { HandlerInterceptor } from '../../src/server/interceptors.js';

describe('RequestHandlerInterceptor', () => {
  let defaultRequestHandler: sinon.SinonStubbedInstance<A2ARequestHandler>;
  let interceptor: RequestHandlerInterceptor;
  let agentCard: AgentCard;
  let taskStore: TaskStore;
  let agentExecutor: AgentExecutor;

  beforeEach(() => {
    agentCard = {
      protocolVersion: '0.3.0',
      name: 'Test Agent',
      description: 'Test Description',
      url: 'http://test-agent.com',
      version: '1.0.0',
      capabilities: {
        streaming: true,
        pushNotifications: true,
      },
      defaultInputModes: [],
      defaultOutputModes: [],
      skills: [],
    };
    taskStore = {} as any;
    agentExecutor = {} as any;

    defaultRequestHandler = {
      getAgentCard: sinon.stub(),
      getAuthenticatedExtendedAgentCard: sinon.stub(),
      sendMessage: sinon.stub(),
      sendMessageStream: sinon.stub(),
      setTaskPushNotificationConfig: sinon.stub(),
      getTaskPushNotificationConfig: sinon.stub(),
      listTaskPushNotificationConfigs: sinon.stub(),
      deleteTaskPushNotificationConfig: sinon.stub(),
      getTask: sinon.stub(),
      cancelTask: sinon.stub(),
      resubscribe: sinon.stub(),
    };

    interceptor = new RequestHandlerInterceptor(agentCard, taskStore, agentExecutor);
    (interceptor as any).requestHandler = defaultRequestHandler;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call requestHandler.getAgentCard', async () => {
    defaultRequestHandler.getAgentCard.resolves(agentCard);
    const returnedAgentCard = await interceptor.getAgentCard();
    expect(defaultRequestHandler.getAgentCard.calledOnce).to.be.true;
    expect(returnedAgentCard).to.deep.equal(agentCard);
  });

  it('should call requestHandler.getAuthenticatedExtendedAgentCard', async () => {
    const extendedCard: AgentCard = {
      ...agentCard,
      capabilities: { ...agentCard.capabilities, streaming: false },
    };
    defaultRequestHandler.getAuthenticatedExtendedAgentCard.resolves(extendedCard);
    const result = await interceptor.getAuthenticatedExtendedAgentCard();
    expect(defaultRequestHandler.getAuthenticatedExtendedAgentCard.calledOnce).to.be.true;
    expect(result).to.deep.equal(extendedCard);
  });

  it('should call requestHandler.sendMessage', async () => {
    const params: MessageSendParams = {
      message: {
        contextId: '123',
        kind: 'message',
        messageId: 'msg1',
        role: 'user',
        parts: [{ kind: 'text', text: 'hello' }],
      },
    };
    const response: Message = {
      kind: 'message',
      messageId: 'abc',
      role: 'agent',
      parts: [{ kind: 'text', text: 'response' }],
    };
    defaultRequestHandler.sendMessage.resolves(response);

    const result = await interceptor.sendMessage(params);

    expect(defaultRequestHandler.sendMessage.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(response);
  });

  it('should call requestHandler.sendMessageStream', async () => {
    const params: MessageSendParams = {
      message: { kind: 'message', messageId: '1', role: 'user', parts: [] },
    };
    const events: A2AStreamEventData[] = [
      {
        kind: 'status-update',
        taskId: '123',
        contextId: 'ctx1',
        final: false,
        status: { state: 'working' },
      },
      {
        kind: 'status-update',
        taskId: '123',
        contextId: 'ctx1',
        final: false,
        status: { state: 'completed' },
      },
    ];
    async function* stream() {
      yield* events;
    }
    defaultRequestHandler.sendMessageStream.returns(stream());

    const result = await interceptor.sendMessageStream(params);

    const got = [];
    for await (const event of result) {
      got.push(event);
    }
    expect(defaultRequestHandler.sendMessageStream.calledOnceWith(params)).to.be.true;
    expect(got).to.deep.equal(events);
  });

  it('should call requestHandler.setTaskPushNotificationConfig', async () => {
    const params: TaskPushNotificationConfig = {
      taskId: '123',
      pushNotificationConfig: { url: 'http://example.com' },
    };
    defaultRequestHandler.setTaskPushNotificationConfig.resolves(params);

    const result = await interceptor.setTaskPushNotificationConfig(params);

    expect(defaultRequestHandler.setTaskPushNotificationConfig.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(params);
  });

  it('should call requestHandler.getTaskPushNotificationConfig', async () => {
    const params: GetTaskPushNotificationConfigParams = {
      id: '123',
      pushNotificationConfigId: 'abc',
    };
    const config: TaskPushNotificationConfig = {
      taskId: '123',
      pushNotificationConfig: { url: 'http://example.com' },
    };
    defaultRequestHandler.getTaskPushNotificationConfig.resolves(config);

    const result = await interceptor.getTaskPushNotificationConfig(params);

    expect(defaultRequestHandler.getTaskPushNotificationConfig.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(config);
  });

  it('should call requestHandler.listTaskPushNotificationConfigs', async () => {
    const params: ListTaskPushNotificationConfigParams = { id: '123' };
    const configs: TaskPushNotificationConfig[] = [
      { taskId: '123', pushNotificationConfig: { url: 'http://example.com' } },
    ];
    defaultRequestHandler.listTaskPushNotificationConfigs.resolves(configs);

    const result = await interceptor.listTaskPushNotificationConfigs(params);

    expect(defaultRequestHandler.listTaskPushNotificationConfigs.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(configs);
  });

  it('should call requestHandler.deleteTaskPushNotificationConfig', async () => {
    const params: DeleteTaskPushNotificationConfigParams = {
      id: '123',
      pushNotificationConfigId: 'abc',
    };
    defaultRequestHandler.deleteTaskPushNotificationConfig.resolves();

    await interceptor.deleteTaskPushNotificationConfig(params);

    expect(defaultRequestHandler.deleteTaskPushNotificationConfig.calledOnceWith(params)).to.be
      .true;
  });

  it('should call requestHandler.getTask', async () => {
    const params: TaskQueryParams = { id: '123' };
    const task: Task = { id: '123', kind: 'task', contextId: 'ctx1', status: { state: 'working' } };

    defaultRequestHandler.getTask.resolves(task);

    const result = await interceptor.getTask(params);

    expect(defaultRequestHandler.getTask.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(task);
  });

  it('should call requestHandler.cancelTask', async () => {
    const params: TaskIdParams = { id: '123' };
    const task: Task = {
      id: '123',
      kind: 'task',
      contextId: 'ctx1',
      status: { state: 'canceled' },
    };
    defaultRequestHandler.cancelTask.resolves(task);

    const result = await interceptor.cancelTask(params);

    expect(defaultRequestHandler.cancelTask.calledOnceWith(params)).to.be.true;
    expect(result).to.deep.equal(task);
  });

  it('should call requestHandler.resubscribe', async () => {
    const params: TaskIdParams = { id: '123' };
    const events: TaskStatusUpdateEvent[] = [
      {
        kind: 'status-update',
        taskId: '123',
        contextId: 'ctx1',
        final: false,
        status: { state: 'working' },
      },
      {
        kind: 'status-update',
        taskId: '123',
        contextId: 'ctx1',
        final: true,
        status: { state: 'completed' },
      },
    ];
    async function* stream() {
      yield* events;
    }
    defaultRequestHandler.resubscribe.returns(stream());

    const result = await interceptor.resubscribe(params);
    const got = [];
    for await (const event of result) {
      got.push(event);
    }
    expect(defaultRequestHandler.resubscribe.calledOnceWith(params)).to.be.true;
    expect(got).to.deep.equal(events);
  });

  describe('Interceptors', () => {
    it('should modify request', async () => {
      const interceptors = [
        {
          before: async (args: any) => {
            if (args.input.method === 'getTask') {
              args.input.value = { ...args.input.value, metadata: { foo: 'bar' } };
            }
          },
          after: async () => {},
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const params: TaskQueryParams = { id: '123' };
      const task: Task = {
        id: '123',
        kind: 'task',
        contextId: 'ctx1',
        status: { state: 'working' },
      };
      defaultRequestHandler.getTask.resolves(task);

      const result = await interceptor.getTask(params);

      expect(
        defaultRequestHandler.getTask.calledOnceWith({
          id: '123',
          metadata: { foo: 'bar' },
        } as TaskQueryParams)
      ).to.be.true;
      expect(result).to.equal(task);
    });

    it('should modify response', async () => {
      const interceptors = [
        {
          before: async () => {},
          after: async (args: any) => {
            if (args.result.method === 'getTask') {
              args.result.value = { ...args.result.value, metadata: { foo: 'bar' } };
            }
          },
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const params: TaskQueryParams = { id: '123' };
      const task: Task = {
        id: '123',
        kind: 'task',
        contextId: 'ctx1',
        status: { state: 'working' },
      };
      defaultRequestHandler.getTask.resolves(task);

      const result = await interceptor.getTask(params);

      expect(defaultRequestHandler.getTask.calledOnceWith(params)).to.be.true;
      expect(result).to.deep.equal({ ...task, metadata: { foo: 'bar' } });
    });

    it('should return early from before', async () => {
      const task: Task = {
        id: '123',
        kind: 'task',
        contextId: 'ctx1',
        status: { state: 'working' },
      };
      const interceptors = [
        {
          before: async (args: any) => {
            args.earlyReturn = {
              method: 'getTask',
              value: task,
            };
          },
          after: async () => {},
        },
        {
          before: async (args: any) => {
            if (args.input.method === 'getTask') {
              args.input.value = { ...args.input.value, metadata: { foo: 'bar' } };
            }
          },
          after: async () => {},
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const params: TaskQueryParams = { id: '123' };
      defaultRequestHandler.getTask.resolves(task);

      const result = await interceptor.getTask(params);

      expect(defaultRequestHandler.getTask.notCalled).to.be.true;
      expect(result).to.equal(task);
    });

    it('should return early from after', async () => {
      const task: Task = {
        id: '123',
        kind: 'task',
        contextId: 'ctx1',
        status: { state: 'working' },
      };
      const interceptors = [
        {
          before: async () => {},
          after: async (args: any) => {
            args.earlyReturn = true;
          },
        },
        {
          before: async () => {},
          after: async (args: any) => {
            if (args.result.method === 'getTask') {
              args.result.value = { ...args.result.value, metadata: { foo: 'bar' } };
            }
          },
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const params: TaskQueryParams = { id: '123' };
      defaultRequestHandler.getTask.resolves(task);

      const result = await interceptor.getTask(params);

      expect(defaultRequestHandler.getTask.calledOnceWith(params)).to.be.true;
      expect(result).to.equal(task);
    });

    it('should run after for interceptors executed in before for early return', async () => {
      const task: Task = {
        id: '123',
        kind: 'task',
        contextId: 'ctx1',
        status: { state: 'working' },
      };
      let firstAfterCalled = false;
      let secondAfterCalled = false;
      let thirdAfterCalled = false;
      const interceptors = [
        {
          before: async () => {},
          after: async () => {
            firstAfterCalled = true;
          },
        },
        {
          before: async (args: any) => {
            if (args.input.method === 'getTask') {
              args.earlyReturn = {
                method: 'getTask',
                value: task,
              };
            }
          },
          after: async () => {
            secondAfterCalled = true;
          },
        },
        {
          before: async () => {},
          after: async () => {
            thirdAfterCalled = true;
          },
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const params: TaskQueryParams = { id: '123' };
      defaultRequestHandler.getTask.resolves(task);

      const result = await interceptor.getTask(params);

      expect(defaultRequestHandler.getTask.notCalled).to.be.true;
      expect(firstAfterCalled).to.be.true;
      expect(secondAfterCalled).to.be.true;
      expect(thirdAfterCalled).to.be.false;
      expect(result).to.equal(task);
    });

    it('should intercept each iterator item', async () => {
      const params: MessageSendParams = {
        message: { kind: 'message', messageId: '1', role: 'user', parts: [] },
      };
      const events: A2AStreamEventData[] = [
        {
          kind: 'status-update',
          taskId: '123',
          contextId: 'ctx1',
          final: false,
          status: { state: 'working' },
        },
        {
          kind: 'status-update',
          taskId: '123',
          contextId: 'ctx1',
          final: false,
          status: { state: 'completed' },
        },
      ];
      async function* stream() {
        yield* events;
      }
      defaultRequestHandler.sendMessageStream.returns(stream());
      const interceptors = [
        {
          before: async () => {},
          after: async (args: any) => {
            if (args.result.method === 'sendMessageStream') {
              args.result.value = {
                ...args.result.value,
                metadata: { foo: 'bar' },
              };
            }
          },
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        agentCard,
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const result = await interceptor.sendMessageStream(params);

      const got = [];
      for await (const event of result) {
        got.push(event);
      }
      expect(defaultRequestHandler.sendMessageStream.calledOnceWith(params)).to.be.true;
      expect(got).to.deep.equal(events.map((event) => ({ ...event, metadata: { foo: 'bar' } })));
    });

    it('should intercept after non-streaming sendMessage for sendMessageStream', async () => {
      const params: MessageSendParams = {
        message: { kind: 'message', messageId: '1', role: 'user', parts: [] },
      };
      const message: Message = {
        kind: 'message',
        messageId: '2',
        role: 'agent',
        parts: [],
      };
      defaultRequestHandler.sendMessage.resolves(message);
      const interceptors = [
        {
          before: async () => {},
          after: async (args: any) => {
            if (args.result.method === 'sendMessageStream') {
              args.result.value = { ...args.result.value, metadata: { foo: 'bar' } };
            }
          },
        },
      ];
      interceptor = new RequestHandlerInterceptor(
        { ...agentCard, capabilities: { streaming: false } },
        taskStore,
        agentExecutor,
        undefined,
        undefined,
        undefined,
        undefined,
        interceptors as HandlerInterceptor[]
      );
      (interceptor as any).requestHandler = defaultRequestHandler;

      const result = await interceptor.sendMessageStream(params);

      const got = [];
      for await (const event of result) {
        got.push(event);
      }
      expect(got).to.deep.equal([{ ...message, metadata: { foo: 'bar' } }]);
    });

    const iteratorsTests = [
      {
        name: 'sendMessageStream',
        stubGetter: (h: any) => h.sendMessageStream,
        caller: async (i: RequestHandlerInterceptor) =>
          await i.sendMessageStream({
            message: { kind: 'message', messageId: '1', role: 'user', parts: [] },
          }),
      },
      {
        name: 'resubscribe',
        stubGetter: (h: any) => h.resubscribe,
        caller: async (i: RequestHandlerInterceptor) => await i.resubscribe({ id: '123' }),
      },
    ];

    iteratorsTests.forEach((test) => {
      describe(test.name, () => {
        it('should return early from iterator (before)', async () => {
          const events: A2AStreamEventData[] = [
            {
              kind: 'status-update',
              taskId: '123',
              contextId: 'ctx1',
              final: false,
              status: { state: 'working' },
            },
            {
              kind: 'status-update',
              taskId: '123',
              contextId: 'ctx1',
              final: false,
              status: { state: 'completed' },
            },
          ];
          async function* stream() {
            yield* events;
          }
          const stub = test.stubGetter(defaultRequestHandler);
          stub.returns(stream());

          let firstAfterCalled = false;
          let secondAfterCalled = false;
          let thirdAfterCalled = false;
          const interceptors = [
            {
              before: async () => {},
              after: async () => {
                firstAfterCalled = true;
              },
            },
            {
              before: async (args: any) => {
                if (args.input.method === test.name) {
                  args.earlyReturn = {
                    method: args.input.method,
                    value: events[0],
                  };
                }
              },
              after: async () => {
                secondAfterCalled = true;
              },
            },
            {
              before: async () => {},
              after: async () => {
                thirdAfterCalled = true;
              },
            },
          ];
          interceptor = new RequestHandlerInterceptor(
            agentCard,
            taskStore,
            agentExecutor,
            undefined,
            undefined,
            undefined,
            undefined,
            interceptors as HandlerInterceptor[]
          );
          (interceptor as any).requestHandler = defaultRequestHandler;

          const result = await test.caller(interceptor);

          const got = [];
          for await (const event of result) {
            got.push(event);
          }
          expect(stub.notCalled).to.be.true;
          expect(got).to.deep.equal([events[0]]);
          expect(firstAfterCalled).to.be.true;
          expect(secondAfterCalled).to.be.true;
          expect(thirdAfterCalled).to.be.false;
        });

        it('should return early from iterator (after)', async () => {
          const events: A2AStreamEventData[] = [
            {
              kind: 'status-update',
              taskId: '123',
              contextId: 'ctx1',
              final: false,
              status: { state: 'working' },
            },
            {
              kind: 'status-update',
              taskId: '123',
              contextId: 'ctx1',
              final: false,
              status: { state: 'completed' },
            },
          ];
          async function* stream() {
            yield* events;
          }
          const stub = test.stubGetter(defaultRequestHandler);
          stub.returns(stream());
          const interceptors = [
            {
              before: async () => {},
              after: async (args: any) => {
                if (args.result.method === test.name) {
                  const event = args.result.value as A2AStreamEventData;
                  if (event.kind === 'status-update' && event.status.state === 'working') {
                    args.earlyReturn = true;
                  }
                }
              },
            },
          ];
          interceptor = new RequestHandlerInterceptor(
            agentCard,
            taskStore,
            agentExecutor,
            undefined,
            undefined,
            undefined,
            undefined,
            interceptors as HandlerInterceptor[]
          );
          (interceptor as any).requestHandler = defaultRequestHandler;

          const result = await test.caller(interceptor);

          const got = [];
          for await (const event of result) {
            got.push(event);
          }
          expect(stub.calledOnce).to.be.true;
          expect(got).to.deep.equal([events[0]]);
        });
      });
    });
  });
});
