import express from 'express';

import { AgentCard } from '../../index.js';
import {
  InMemoryTaskStore,
  TaskStore,
  AgentExecutor,
  DefaultRequestHandler,
} from '../../server/index.js';
import { A2AExpressApp } from '../../server/express/index.js';
import { AuthenticationAgentExecutor } from './agent_executor.js';
import { authenticationHandler } from './authentication_middleware.js';
import { userBuilder } from './user_builder.js';

// --- Server Setup ---
const authenticationAgentCard: AgentCard = {
  name: 'Sample Agent with authentication support',
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with support for authentication.',
  // Adjust the base URL and port as needed. /a2a is the default base in A2AExpressApp
  url: 'http://localhost:41241/',
  provider: {
    organization: 'A2A Samples',
    url: 'https://example.com/a2a-samples',
  },
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
};

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor
  const agentExecutor: AgentExecutor = new AuthenticationAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    authenticationAgentCard,
    taskStore,
    agentExecutor
  );

  // 4. Create and setup A2AExpressApp, passing the custom UserBuilder and the AuthenticationMiddleware to the routes.
  const appBuilder = new A2AExpressApp(requestHandler, userBuilder);
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationHandler]);

  // 5. Start the server
  const PORT = process.env.PORT || 41241;
  expressApp.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      `[AuthenticationSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[AuthenticationSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[AuthenticationSampleAgent] Press Ctrl+C to stop the server');
  });
}

main().catch(console.error);
