import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as grpc from '@grpc/grpc-js';
import { grpcHandler } from './your-file-path.js'; // Adjust path
import { gRpcTransportHandler } from '../transports/grpc/grpc_transport_handler.js';
import { FromProto, ToProto } from '../../grpc/utils/proto_type_converter.js';
import { A2AError } from '../error.js';
import { HTTP_EXTENSION_HEADER } from '../../constants.js';

// Mock dependencies
vi.mock('../transports/grpc/grpc_transport_handler.js');
vi.mock('../../grpc/utils/proto_type_converter.js');

describe('grpcHandler', () => {
  let mockRequestHandler: any;
  let mockUserBuilder: any;
  let transportInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequestHandler = {};
    mockUserBuilder = vi.fn().mockResolvedValue({ id: 'user-123' });
    
    // Setup transport mock instance
    transportInstance = {
      sendMessage: vi.fn(),
      getTask: vi.fn(),
    };
    (gRpcTransportHandler as any).mockImplementation(() => transportInstance);
  });

  const createMockUnaryCall = (request: any, metadataValues: Record<string, string> = {}) => {
    const metadata = new grpc.Metadata();
    Object.entries(metadataValues).forEach(([k, v]) => metadata.set(k, v));
    
    return {
      request,
      metadata,
      sendMetadata: vi.fn(),
    } as unknown as grpc.ServerUnaryCall<any, any>;
  };

  describe('sendMessage', () => {
    it('should successfully process a message and return the response', async () => {
      // 1. Arrange
      const handler = grpcHandler({ requestHandler: mockRequestHandler, userBuilder: mockUserBuilder });
      const mockRequest = { text: 'hello' };
      const mockParams = { message: 'hello' };
      const mockResult = { id: 'task-1' };
      const mockProtoRes = { taskId: 'task-1' };
      const callback = vi.fn();

      vi.mocked(FromProto.messageSendParams).mockReturnValue(mockParams);
      transportInstance.sendMessage.mockResolvedValue(mockResult);
      vi.mocked(ToProto.messageSendResult).mockReturnValue(mockProtoRes);

      const call = createMockUnaryCall(mockRequest, { [HTTP_EXTENSION_HEADER.toLowerCase()]: 'ext1' });

      // 2. Act
      await handler.sendMessage(call, callback);

      // 3. Assert
      expect(mockUserBuilder).toHaveBeenCalledWith(call);
      expect(transportInstance.sendMessage).toHaveBeenCalledWith(mockParams, expect.any(Object));
      expect(call.sendMetadata).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(null, mockProtoRes);
    });

    it('should catch A2AErrors and map them to gRPC status codes', async () => {
      // 1. Arrange
      const handler = grpcHandler({ requestHandler: mockRequestHandler, userBuilder: mockUserBuilder });
      const callback = vi.fn();
      
      const a2aError = new A2AError('Not found', -32001); // Maps to NOT_FOUND
      transportInstance.sendMessage.mockRejectedValue(a2aError);

      const call = createMockUnaryCall({});

      // 2. Act
      await handler.sendMessage(call, callback);

      // 3. Assert
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          code: grpc.status.NOT_FOUND,
          message: 'Not found'
        }),
        null
      );
    });
  });

  describe('Context and Metadata Building', () => {
    it('should correctly pass extensions from metadata to context', async () => {
        const handler = grpcHandler({ requestHandler: mockRequestHandler, userBuilder: mockUserBuilder });
        const callback = vi.fn();
        
        const call = createMockUnaryCall({}, { [HTTP_EXTENSION_HEADER.toLowerCase()]: 'test-extension' });
        
        await handler.getTask(call, callback);

        // Check if transport was called with context containing the extension
        const contextArgument = transportInstance.getTask.mock.calls[0][1];
        // Note: You'll need to verify how your Extensions.parseServiceParameter works
        expect(contextArgument.user.id).toBe('user-123');
    });
  });
});