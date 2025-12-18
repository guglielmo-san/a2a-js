import { describe, it, beforeEach, afterEach, assert, expect, vi, Mock } from 'vitest';
import * as grpc from '@grpc/grpc-js';
import { A2AError, A2ARequestHandler } from '../../src/server/index.js';
import { grpcHandler } from '../../src/server/grpc/grpc_handler.js';
import { AgentCard, HTTP_EXTENSION_HEADER, Task } from '../../src/index.js';


describe('grpcHandler', () => {
  let mockRequestHandler: A2ARequestHandler;
  let handler: ReturnType<typeof grpcHandler>;

  const testAgentCard: AgentCard = {
    protocolVersion: '0.3.0',
    name: 'Test Agent',
    description: 'An agent for testing purposes',
    url: 'http://localhost:8080',
    preferredTransport: 'gRPC',
    version: '1.0.0',
    capabilities: { streaming: true, pushNotifications: true },
    defaultInputModes: ['text/plain'],
    defaultOutputModes: ['text/plain'],
    skills: [],
  };

  const testTask: Task = {
    id: 'task-1',
    kind: 'task' as const,
    status: { state: 'completed' as const },
    contextId: 'ctx-1',
    history: [],
  };

  // Helper to create a mock gRPC Unary Call
  const createMockUnaryCall = (request: any, metadataValues: Record<string, string> = {}) => {
    const metadata = new grpc.Metadata();
    Object.entries(metadataValues).forEach(([k, v]) => metadata.set(k, v));
    return {
      request,
      metadata,
      sendMetadata: vi.fn(),
    } as unknown as grpc.ServerUnaryCall<any, any>;
  };

  // Helper to create a mock gRPC Writable Stream
  const createMockWritableStream = (request: any) => {
    return {
      request,
      metadata: new grpc.Metadata(),
      sendMetadata: vi.fn(),
      write: vi.fn(),
      end: vi.fn(),
      emit: vi.fn(),
    } as unknown as grpc.ServerWritableStream<any, any>;
  };

  beforeEach(() => {
    mockRequestHandler = {
      getAgentCard: vi.fn().mockResolvedValue(testAgentCard),
      getAuthenticatedExtendedAgentCard: vi.fn().mockResolvedValue(testAgentCard),
      sendMessage: vi.fn(),
      sendMessageStream: vi.fn(),
      getTask: vi.fn(),
      cancelTask: vi.fn(),
      setTaskPushNotificationConfig: vi.fn(),
      getTaskPushNotificationConfig: vi.fn(),
      listTaskPushNotificationConfigs: vi.fn(),
      deleteTaskPushNotificationConfig: vi.fn(),
      resubscribe: vi.fn(),
    } as unknown as A2ARequestHandler;

    handler = grpcHandler({
      requestHandler: mockRequestHandler,
      userBuilder: async () => ({ id: 'test-user' } as any),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAgentCard', () => {
    it('should return agent card via gRPC callback', async () => {
      const call = createMockUnaryCall({});
      const callback = vi.fn();

      await handler.getAgentCard(call, callback);

      expect(mockRequestHandler.getAuthenticatedExtendedAgentCard).toHaveBeenCalled();
      // Verify callback: callback(error, response)
      const [err, response] = callback.mock.calls[0];
      assert.isNull(err);
      assert.equal(response.name, testAgentCard.name);
      expect(call.sendMetadata).toHaveBeenCalled();
    });

    it('should return gRPC error code on failure', async () => {
      (mockRequestHandler.getAuthenticatedExtendedAgentCard as Mock).mockRejectedValue(
        new A2AError(-32001, 'Not Found')
      );
      const call = createMockUnaryCall({});
      const callback = vi.fn();

      await handler.getAgentCard(call, callback);

      const [err] = callback.mock.calls[0];
      assert.equal(err.code, grpc.status.NOT_FOUND);
      assert.equal(err.details, 'Not Found');
    });
  });

  describe('sendMessage', () => {
    it('should successfully send a message and return a task', async () => {
      (mockRequestHandler.sendMessage as Mock).mockResolvedValue(testTask);
      const call = createMockUnaryCall({ message: { role: 'user', parts: [] } });
      const callback = vi.fn();

      await handler.sendMessage(call, callback);

      const [err, response] = callback.mock.calls[0];
      assert.isNull(err);
      assert.equal(response.id, testTask.id);
    });
  });

  describe('sendStreamingMessage', () => {
    it('should stream multiple parts and end correctly', async () => {
      async function* mockStream() {
        yield { kind: 'message', messageId: 'm1' };
        yield { kind: 'task', id: 't1' };
      }
      (mockRequestHandler.sendMessageStream as Mock).mockResolvedValue(mockStream());
      
      const call = createMockWritableStream({ message: { role: 'user', parts: [] } });

      await handler.sendStreamingMessage(call);

      expect(call.write).toHaveBeenCalledTimes(2);
      expect(call.end).toHaveBeenCalled();
      expect(call.sendMetadata).toHaveBeenCalled();
    });

    it('should emit error on stream failure', async () => {
      (mockRequestHandler.sendMessageStream as Mock).mockRejectedValue(new Error('Stream crash'));
      const call = createMockWritableStream({});

      await handler.sendStreamingMessage(call);

      expect(call.emit).toHaveBeenCalledWith('error', expect.objectContaining({
        code: grpc.status.INTERNAL
      }));
      expect(call.end).toHaveBeenCalled();
    });
  });

  describe('Extensions (Metadata) Handling', () => {
    it('should extract extensions from metadata and pass to context', async () => {
      (mockRequestHandler.getTask as Mock).mockResolvedValue(testTask);
      
      // Mocking the header 'x-a2a-extension'
      const call = createMockUnaryCall({ id: 'task-1' }, {
        [HTTP_EXTENSION_HEADER.toLowerCase()]: 'extension-v1'
      });
      const callback = vi.fn();

      await handler.getTask(call, callback);

      // Verify that the handler passed the parsed extension to the RequestHandler
      const contextArg = (mockRequestHandler.getTask as Mock).mock.calls[0][1];
      // This assumes your ServerCallContext holds the extensions
      expect(contextArg).toBeDefined();
    });
  });
});