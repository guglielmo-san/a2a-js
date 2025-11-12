import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { JsonRpcTransportHandler } from '../../src/server/transports/jsonrpc_transport_handler.js';
import { A2ARequestHandler } from '../../src/server/request_handler/a2a_request_handler.js';
import { JSONRPCErrorResponse } from '../../src/index.js';

describe('JsonRpcTransportHandler', () => {
    let mockRequestHandler: A2ARequestHandler;
    let transportHandler: JsonRpcTransportHandler;

    beforeEach(() => {
        mockRequestHandler = {
            getAgentCard: sinon.stub(),
            getAuthenticatedExtendedAgentCard: sinon.stub(),
            sendMessage: sinon.stub(),
            sendMessageStream: sinon.stub(),
            getTask: sinon.stub(),
            cancelTask: sinon.stub(),
            setTaskPushNotificationConfig: sinon.stub(),
            getTaskPushNotificationConfig: sinon.stub(),
            listTaskPushNotificationConfigs: sinon.stub(),
            deleteTaskPushNotificationConfig: sinon.stub(),
            listTasks: sinon.stub(),
            resubscribe: sinon.stub(),
        };
        transportHandler = new JsonRpcTransportHandler(mockRequestHandler);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Check JSON-RPC request format', () => {
        it('should return a parse error for an invalid JSON string', async () => {
            const invalidJson = '{ "jsonrpc": "2.0", "method": "foo", "id": 1, }'; // trailing comma
            const response = await transportHandler.handle(invalidJson) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32700); // Parse error
        });

        it('should return a parse error for a non-string/non-object request body', async () => {
            const response = await transportHandler.handle(123) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32700); // Parse error
            expect(response.error.message).to.equal('Invalid request body type.');
        });

        it('should return an invalid request error for missing jsonrpc property', async () => {
            const request = { method: 'foo', id: 1 };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.equal(1);
        });

        it('should return an invalid request error for incorrect jsonrpc version', async () => {
            const request = { jsonrpc: '1.0', method: 'foo', id: 1 };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.equal(1);
        });

        it('should return an invalid request error for missing method property', async () => {
            const request = { jsonrpc: '2.0', id: 1 };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.equal(1);
        });

        it('should return an invalid request error for non-string method property', async () => {
            const request = { jsonrpc: '2.0', method: 123, id: 1 };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.equal(1);
        });

        it('should return an invalid request error for invalid id type (object)', async () => {
            const request = { jsonrpc: '2.0', method: 'foo', id: {} };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.deep.equal({});
        });

        it('should return an invalid request error for invalid id type (float)', async () => {
            const request = { jsonrpc: '2.0', method: 'foo', id: 1.23 };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32600); // Invalid Request
            expect(response.error.message).to.equal('Invalid JSON-RPC Request.');
            expect(response.id).to.equal(1.23);
        });

        it('should handle valid request with string id', async () => {
            const request = { jsonrpc: '2.0', method: 'message/send', id: 'abc-123', params: {} };
            const response = await transportHandler.handle(request);
            expect(response).to.have.property('result');
        });

        it('should handle valid request with integer id', async () => {
            const request = { jsonrpc: '2.0', method: 'message/send', id: 456, params: {} };
            const response = await transportHandler.handle(request);
            expect(response).to.have.property('result');
        });

        it('should handle valid request with null id', async () => {
            const request = { jsonrpc: '2.0', method: 'message/send', id: null, params: {} };
            (mockRequestHandler.getAuthenticatedExtendedAgentCard as sinon.SinonStub).resolves({ card: 'data' });
            const response = await transportHandler.handle(request);
            expect(response).to.have.property('result');
        });

        const invalidParamsCases = [
            { name: 'null', params: null },
            { name: 'undefined', params: undefined },
            { name: 'a string', params: 'invalid' },
            { name: 'an array', params: [1, 2, 3] },
            { name: 'an object with an empty string key', params: { '': 'invalid' } },
        ];

        invalidParamsCases.forEach(({ name, params }) => {
            it(`should return an invalid params error if params are ${name}`, async () => {
                const request = { jsonrpc: '2.0', method: 'message/send', id: 1, params };
                const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
                expect(response.error.code).to.equal(-32602); // Invalid Params
                expect(response.error.message).to.equal("Invalid method parameters.");
                expect(response.id).to.equal(1);
            });
        });

        it('should handle valid request with params as dict', async () => {
            const request = { jsonrpc: '2.0', method: 'message/send', id: 456, params: {"this": "is a dict"} };
            const response = await transportHandler.handle(request);
            expect(response).to.have.property('result');
        });
    });

    describe('paramsTasksListAreValid method validation for tasks/list api', () => {
        beforeEach(() => {
            // Stub listTasks to return a successful but empty result for valid calls
            (mockRequestHandler.listTasks as sinon.SinonStub).resolves({ tasks: [], totalSize: 0, pageSize: 0, nextPageToken: '' });
        });

        // Test cases for pageSize
        it('should return an invalid params error for pageSize less than 1', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { pageSize: 0 } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should return an invalid params error for pageSize greater than 100', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { pageSize: 101 } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should allow valid pageSize (1 to 100)', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { pageSize: 50 } };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Test cases for pageToken
        it('should return an invalid params error for invalid base64 pageToken', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { pageToken: 'not-base64!' } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should allow valid base64 pageToken', async () => {
            const validBase64Token = Buffer.from('some-timestamp').toString('base64');
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { pageToken: validBase64Token } };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Test cases for historyLength
        it('should return an invalid params error for negative historyLength', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { historyLength: -1 } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should allow valid non-negative historyLength', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { historyLength: 0 } };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Test cases for lastUpdatedAfter
        it('should return an invalid params error for invalid lastUpdatedAfter (negative)', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { lastUpdatedAfter: -1000 } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should return an invalid params error for invalid lastUpdatedAfter (float)', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { lastUpdatedAfter: 12345.67 } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should return an invalid params error for invalid lastUpdatedAfter (non-number)', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { lastUpdatedAfter: 'not-a-number' } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should allow valid lastUpdatedAfter (positive integer)', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { lastUpdatedAfter: 1678886400000 } }; // March 15, 2023 12:00:00 AM UTC
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Test cases for status
        it('should return an invalid params error for invalid status string', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { status: 'invalid-state' } };
            const response = await transportHandler.handle(request) as JSONRPCErrorResponse;
            expect(response.error.code).to.equal(-32602); // Invalid Params
            expect(response.error.message).to.equal('Invalid method parameters.');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).notCalled).to.be.true;
        });

        it('should allow valid status (e.g., "completed")', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: { status: 'completed' } };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Combined valid case
        it('should allow a valid tasks/list request with multiple valid parameters', async () => {
            const validBase64Token = Buffer.from('another-timestamp').toString('base64');
            const request = {
                jsonrpc: '2.0', method: 'tasks/list', id: 1,
                params: { pageSize: 20, pageToken: validBase64Token, historyLength: 5, lastUpdatedAfter: 1678886400000, status: 'failed' }
            };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });

        // Valid case with no params
        it('should allow a valid tasks/list request with no parameters', async () => {
            const request = { jsonrpc: '2.0', method: 'tasks/list', id: 1, params: {} };
            const response = await transportHandler.handle(request);
            expect(response).to.not.have.property('error');
            expect((mockRequestHandler.listTasks as sinon.SinonStub).calledOnceWith(request.params)).to.be.true;
        });
    });
});
