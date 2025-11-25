<<<<<<< HEAD
import express from 'express';
=======
import express, { RequestHandler } from 'express';
>>>>>>> 5954614 (implementation of authentication sample wip)

import { AgentCard } from '../../index.js';
import {
  InMemoryTaskStore,
  TaskStore,
  AgentExecutor,
  DefaultRequestHandler,
} from '../../server/index.js';
import { A2AExpressApp } from '../../server/express/index.js';
<<<<<<< HEAD
import { AuthenticationAgentExecutor } from './agent_executor.js';
import { authenticationHandler } from './authentication_middleware.js';
import { userBuilder } from './user_builder.js';

// --- Server Setup ---
const authenticationAgentCard: AgentCard = {
  name: 'Sample Agent with authentication support',
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with support for authentication.',
=======
import { SampleAgentExecutor } from '../agents/sample-agent/agent_executor.js';
import { authenticationHandler } from './authentication_middleware.js';


// --- Server Setup ---

const extensionAgentCard: AgentCard = {
  name: 'Sample Agent with timestamp extensions',
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with extensions integration.',
>>>>>>> 5954614 (implementation of authentication sample wip)
  // Adjust the base URL and port as needed. /a2a is the default base in A2AExpressApp
  url: 'http://localhost:41241/',
  provider: {
    organization: 'A2A Samples',
    url: 'https://example.com/a2a-samples',
  },
<<<<<<< HEAD
  version: '1.0.0',
  protocolVersion: '0.3.0',
  capabilities: {
    stateTransitionHistory: true,
  },
  defaultInputModes: ['text'],
  defaultOutputModes: ['text', 'task-status'],
  skills: [
    {
      id: 'sample_agent',
      name: 'Sample Agent with authentication',
      description: 'Evaluate the user authentication, returning its details.',
      tags: ['sample', 'authentication'],
      examples: ['who am i?'],
      inputModes: ['text'],
      outputModes: ['text', 'task-status'],
    },
  ],
  supportsAuthenticatedExtendedCard: false,
  security: [{ Bearer: [] }],
  securitySchemes: { Bearer: { type: 'http', scheme: 'bearer' } },
=======
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
>>>>>>> 5954614 (implementation of authentication sample wip)
};

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor
<<<<<<< HEAD
  const agentExecutor: AgentExecutor = new AuthenticationAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    authenticationAgentCard,
=======
  const agentExecutor: AgentExecutor = new SampleAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    extensionAgentCard,
>>>>>>> 5954614 (implementation of authentication sample wip)
    taskStore,
    agentExecutor
  );

<<<<<<< HEAD
  // 4. Create and setup A2AExpressApp, passing the custom UserBuilder and the AuthenticationMiddleware to the routes.
  const appBuilder = new A2AExpressApp(requestHandler, userBuilder);
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationHandler]);

  // 5. Start the server
=======
  // 5. Create and setup A2AExpressApp
  const appBuilder = new A2AExpressApp(requestHandler);
  const authenticationMiddleware: RequestHandler = authenticationHandler;
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationMiddleware]);

  // 6. Start the server
>>>>>>> 5954614 (implementation of authentication sample wip)
  const PORT = process.env.PORT || 41241;
  expressApp.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(
<<<<<<< HEAD
      `[AuthenticationSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[AuthenticationSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[AuthenticationSampleAgent] Press Ctrl+C to stop the server');
=======
      `[ExtensionsSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[ExtensionsSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[ExtensionsSampleAgent] Press Ctrl+C to stop the server');
>>>>>>> 5954614 (implementation of authentication sample wip)
  });
}

main().catch(console.error);
