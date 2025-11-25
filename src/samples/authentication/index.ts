import express, { RequestHandler } from 'express';

import { AgentCard } from '../../index.js';
import {
  InMemoryTaskStore,
  TaskStore,
  AgentExecutor,
  DefaultRequestHandler,
} from '../../server/index.js';
import { A2AExpressApp } from '../../server/express/index.js';
import { SampleAgentExecutor } from '../agents/sample-agent/agent_executor.js';
import { authenticationHandler } from './authentication_middleware.js';


// --- Server Setup ---

const extensionAgentCard: AgentCard = {
  name: 'Sample Agent with timestamp extensions',
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with extensions integration.',
  // Adjust the base URL and port as needed. /a2a is the default base in A2AExpressApp
  url: 'http://localhost:41241/',
  provider: {
    organization: 'A2A Samples',
    url: 'https://example.com/a2a-samples',
  },
  version: '1.0.0', // Incremented version
  protocolVersion: '0.3.0',
  capabilities: {
    streaming: true,
    pushNotifications: false,
    stateTransitionHistory: true, // Agent uses history
  },
  defaultInputModes: ['text'],
  defaultOutputModes: ['text', 'task-status'], // task-status is a common output mode
  skills: [
    {
      id: 'sample_agent',
      name: 'Sample Agent with extensions',
      description: 'Simulate the general flow of a streaming agent with extensions integration.',
      tags: ['sample'],
      examples: ['hi', 'hello world', 'how are you', 'goodbye'],
      inputModes: ['text'], // Explicitly defining for skill
      outputModes: ['text', 'task-status'], // Explicitly defining for skill
    },
  ],
  supportsAuthenticatedExtendedCard: false,
  security: [{'Bearer': []}],
  securitySchemes: { 'Bearer': { type: 'http', scheme: 'bearer' } }
};

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor
  const agentExecutor: AgentExecutor = new SampleAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    extensionAgentCard,
    taskStore,
    agentExecutor
  );

  // 5. Create and setup A2AExpressApp
  const appBuilder = new A2AExpressApp(requestHandler);
  const authenticationMiddleware: RequestHandler = authenticationHandler;
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationMiddleware]);

  // 6. Start the server
  const PORT = process.env.PORT || 41241;
  expressApp.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      `[ExtensionsSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[ExtensionsSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[ExtensionsSampleAgent] Press Ctrl+C to stop the server');
  });
}

main().catch(console.error);
