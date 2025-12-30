import {
  GrpcTransport,
  GrpcTransportFactory,
} from '../../../src/client/transports/grpc_transport.js';
import { A2AServiceClient } from '../../../src/grpc/a2a.js';
import { ToProto } from '../../../src/grpc/utils/to_proto.js';
import { FromProto } from '../../../src/grpc/utils/from_proto.js';
import { describe, it, beforeEach, afterEach, expect, vi, type Mock } from 'vitest';
import { ServiceError, Metadata } from '@grpc/grpc-js';
import {
  A2A_ERROR_CODE,
  TaskNotFoundError,
  TaskNotCancelableError,
  PushNotificationNotSupportedError,
} from '../../../src/errors.js';
import {
  createMessageParams,
  createMockAgentCard,
  createMockMessage,
  createMockTask,
} from '../util.js';
import { TaskPushNotificationConfig } from '../../../src/types.js';

vi.mock('../../../src/grpc/utils/from_proto.js');
vi.mock('../../../src/grpc/utils/to_proto.js');

// 1. Use vi.hoisted to ensure these mocks exist before the mock factory runs
const { mockGrpcMethods } = vi.hoisted(() => {
  return {
    mockGrpcMethods: {
      getAgentCard: vi.fn(),
      sendMessage: vi.fn(),
      sendStreamingMessage: vi.fn(),
      createTaskPushNotificationConfig: vi.fn(),
      getTaskPushNotificationConfig: vi.fn(),
      listTaskPushNotificationConfig: vi.fn(),
      deleteTaskPushNotificationConfig: vi.fn(),
      getTask: vi.fn(),
      cancelTask: vi.fn(),
      taskSubscription: vi.fn(),
    },
  };
});

// 2. Mock the gRPC Service Client using the hoisted object
vi.mock('../../../src/grpc/a2a.js', () => {
  return {
    A2AServiceClient: vi.fn().mockImplementation(() => mockGrpcMethods),
  };
});

const createGrpcError = (code: number, message: string, a2aCode?: number): ServiceError => {
  const metadata = new Metadata();
  if (a2aCode !== undefined) {
    metadata.add('a2a-error', a2aCode.toString());
  }
  return {
    name: 'ServiceError',
    message,
    code,
    details: message,
    metadata,
  };
};

describe('GrpcTransport', () => {
  let transport: GrpcTransport;
  const endpoint = 'localhost:50051';

  beforeEach(() => {
    vi.clearAllMocks();
    transport = new GrpcTransport({ endpoint });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize the A2AServiceClient with the correct endpoint', () => {
      // Ensure the constructor was called
      expect(A2AServiceClient).toHaveBeenCalledWith(endpoint, expect.anything());
    });
  });

  describe('sendMessage', () => {
    it('should send message successfully', async () => {
      const params = createMessageParams();
      const mockResponse = createMockMessage();

      // Setup unary call mock
      (mockGrpcMethods.sendMessage as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(null, mockResponse); // Success callback
        return { cancel: vi.fn() };
      });

      const result = await transport.sendMessage(params);

      expect(result).to.deep.equal(mockResponse);
      expect(ToProto.messageSendParams).toHaveBeenCalledWith(params);
      expect(mockGrpcMethods.sendMessage).toHaveBeenCalledTimes(1);
      expect(FromProto.sendMessageResult).toHaveBeenCalledWith(mockResponse);
    });

    it('should pass service parameters in metadata', async () => {
      const params = createMessageParams();
      const options = { serviceParameters: { 'x-trace-id': '123' } };

      (mockGrpcMethods.sendMessage as Mock).mockImplementation((req, meta: Metadata, opts, callback) => {
        expect(meta.get('x-trace-id')).to.deep.equal(['123']);
        callback(null, createMockMessage());
        return { cancel: vi.fn() };
      });

      await transport.sendMessage(params, options);
    });

    it('should throw TaskNotFoundError on mapped gRPC error', async () => {
      const params = createMessageParams();
      const error = createGrpcError(
        5, // NOT_FOUND
        'Task not found',
        A2A_ERROR_CODE.TASK_NOT_FOUND
      );

      (mockGrpcMethods.sendMessage as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(error, null);
        return { cancel: vi.fn() };
      });

      await expect(transport.sendMessage(params)).rejects.toThrow(TaskNotFoundError);
    });
  });

  describe('sendMessageStream', () => {
    it('should yield streaming events successfully', async () => {
      const params = createMessageParams();
      const mockMsg = createMockMessage();

      const streamData = [
        { payload: { $case: 'msg', value: mockMsg } },
        { payload: { $case: 'task', value: { id: 't1' } } },
      ];
      
      const mockStream = {
        [Symbol.asyncIterator]: async function* () {
          for (const item of streamData) yield item;
        },
        cancel: vi.fn(),
      };

      (mockGrpcMethods.sendStreamingMessage as Mock).mockReturnValue(mockStream);

      const iterator = transport.sendMessageStream(params);
      
      const first = await iterator.next();
      expect(first.value).to.deep.equal(mockMsg);

      const second = await iterator.next();
      expect(second.value).to.deep.equal({ id: 't1' });

      const third = await iterator.next();
      expect(third.done).to.be.true;
    });
  });

  describe('getTask', () => {
    it('should get task successfully', async () => {
      const taskId = 'task-123';
      const mockTask = createMockTask(taskId);

      (mockGrpcMethods.getTask as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(null, mockTask);
        return { cancel: vi.fn() };
      });

      const result = await transport.getTask({ id: taskId });
      expect(result).to.deep.equal(mockTask);
    });
  });

  describe('cancelTask', () => {
    it('should cancel task successfully', async () => {
      const taskId = 'task-123';
      const mockTask = createMockTask(taskId, 'canceled');

      (mockGrpcMethods.cancelTask as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(null, mockTask);
        return { cancel: vi.fn() };
      });

      const result = await transport.cancelTask({ id: taskId });
      expect(result).to.deep.equal(mockTask);
    });

    it('should throw TaskNotCancelableError on specific A2A code', async () => {
      const error = createGrpcError(
        9, // FAILED_PRECONDITION
        'Cannot cancel',
        A2A_ERROR_CODE.TASK_NOT_CANCELABLE
      );

      (mockGrpcMethods.cancelTask as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(error, null);
        return { cancel: vi.fn() };
      });

      await expect(transport.cancelTask({ id: 'task-123' })).rejects.toThrow(
        TaskNotCancelableError
      );
    });
  });

  describe('getExtendedAgentCard', () => {
    it('should get agent card successfully', async () => {
      const mockCard = {
        name: 'Test Agent',
        url: endpoint,
      };

      (mockGrpcMethods.getAgentCard as Mock).mockImplementation((req, meta, opts, callback) => {
        callback(null, mockCard);
        return { cancel: vi.fn() };
      });

      const result = await transport.getExtendedAgentCard();
      expect(result).to.deep.equal(mockCard);
    });
  });

  describe('Push Notification Config', () => {
    const taskId = 'task-123';
    const configId = 'config-456';
    const mockConfig: TaskPushNotificationConfig = {
      taskId,
      pushNotificationConfig: {
        id: configId,
        url: 'https://notify.example.com/webhook',
      },
    };

    describe('setTaskPushNotificationConfig', () => {
      it('should set config successfully', async () => {
        (mockGrpcMethods.createTaskPushNotificationConfig as Mock).mockImplementation((req, meta, opts, callback) => {
          callback(null, mockConfig);
          return { cancel: vi.fn() };
        });

        const result = await transport.setTaskPushNotificationConfig(mockConfig);
        expect(result).to.deep.equal(mockConfig);
      });
    });

    describe('getTaskPushNotificationConfig', () => {
      it('should get config successfully', async () => {
        (mockGrpcMethods.getTaskPushNotificationConfig as Mock).mockImplementation((req, meta, opts, callback) => {
          callback(null, mockConfig);
          return { cancel: vi.fn() };
        });

        const result = await transport.getTaskPushNotificationConfig({
          id: taskId,
          pushNotificationConfigId: configId,
        });

        expect(result).to.deep.equal(mockConfig);
      });
    });

    describe('listTaskPushNotificationConfig', () => {
      it('should list configs successfully', async () => {
        const mockList = [mockConfig];

        (mockGrpcMethods.listTaskPushNotificationConfig as Mock).mockImplementation((req, meta, opts, callback) => {
          callback(null, mockList);
          return { cancel: vi.fn() };
        });

        const result = await transport.listTaskPushNotificationConfig({ id: taskId });

        expect(result).to.deep.equal(mockList);
      });
    });

    describe('deleteTaskPushNotificationConfig', () => {
      it('should delete config successfully', async () => {
        (mockGrpcMethods.deleteTaskPushNotificationConfig as Mock).mockImplementation((req, meta, opts, callback) => {
          callback(null, {}); 
          return { cancel: vi.fn() };
        });

        await transport.deleteTaskPushNotificationConfig({
          id: taskId,
          pushNotificationConfigId: configId,
        });

        expect(mockGrpcMethods.deleteTaskPushNotificationConfig).toHaveBeenCalled();
      });
    });
  });
});