import * as grpc from '@grpc/grpc-js';
import { AgentCard, AGENT_CARD_PATH } from '../../../index.js';
import {
  InMemoryTaskStore,
  TaskStore,
  AgentExecutor,
  DefaultRequestHandler,
} from '../../../server/index.js';
import { agentCardHandler, jsonRpcHandler, UserBuilder } from '../../../server/express/index.js';
import { SampleAgentExecutor } from './agent_executor.js';
import { A2AServiceService } from '../../../grpc/a2a.js';
import { createGRPCHandler } from '../../../server/grpc/grpc_handler.js';

// --- Server Setup ---

const sampleAgentCard: AgentCard = {
  name: 'Sample Agent',
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses.',
  url: 'http://localhost:41241/',
  provider: {
    organization: 'A2A Samples',
    url: 'https://example.com/a2a-samples', // Added provider URL
  },
  version: '1.0.0', // Incremented version
  protocolVersion: '0.3.0',
  capabilities: {
    streaming: true, // The new framework supports streaming
    pushNotifications: false, // Assuming not implemented for this agent yet
    stateTransitionHistory: true, // Agent uses history
  },
  defaultInputModes: ['text'],
  defaultOutputModes: ['text', 'task-status'], // task-status is a common output mode
  skills: [
    {
      id: 'sample_agent',
      name: 'Sample Agent',
      description: 'Simulate the general flow of a streaming agent.',
      tags: ['sample'],
      examples: ['hi', 'hello world', 'how are you', 'goodbye'],
      inputModes: ['text'], // Explicitly defining for skill
      outputModes: ['text', 'task-status'], // Explicitly defining for skill
    },
  ],
  supportsAuthenticatedExtendedCard: false,
};

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor
  const agentExecutor: AgentExecutor = new SampleAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(sampleAgentCard, taskStore, agentExecutor);

  const server = new grpc.Server();
  server.addService(A2AServiceService, createGRPCHandler(requestHandler));
  server.bindAsync("localhost:8080", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://localhost:8080");
});
}

main().catch(console.error);
