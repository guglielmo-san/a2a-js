<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import express from 'express';
=======
import express, { RequestHandler } from 'express';
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
import express from 'express';
>>>>>>> 460009d (wip authentication sample)
=======
import express, { RequestHandler } from 'express';
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
=======
import express from 'express';
>>>>>>> 9427f36 (wip authentication sample)

import { AgentCard } from '../../index.js';
import {
  InMemoryTaskStore,
  TaskStore,
  AgentExecutor,
  DefaultRequestHandler,
} from '../../server/index.js';
import { A2AExpressApp } from '../../server/express/index.js';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 66fb28e (authentication agent WIP)
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
=======
import { SampleAgentExecutor } from './agent_executor.js';
>>>>>>> 5d6508c (authentication agent WIP)
<<<<<<< HEAD
=======
import { AuthenticationAgentExecutor } from './agent_executor.js';
>>>>>>> 460009d (wip authentication sample)
import { authenticationHandler } from './authentication_middleware.js';
import { userBuilder } from './user_builder.js';
=======
import { authenticationHandler } from './authentication_middleware.js';
import { userBuilder } from './user_builder.js';

>>>>>>> 66fb28e (authentication agent WIP)

// --- Server Setup ---
<<<<<<< HEAD

const extensionAgentCard: AgentCard = {
  name: 'Sample Agent with timestamp extensions',
=======
const authenticationAgentCard: AgentCard = {
  name: 'Sample Agent with authentication support',
>>>>>>> 460009d (wip authentication sample)
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with extensions integration.',
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
import { SampleAgentExecutor } from '../agents/sample-agent/agent_executor.js';
=======
import { SampleAgentExecutor } from './agent_executor.js';
>>>>>>> 2d7da54 (authentication agent WIP)
=======
import { AuthenticationAgentExecutor } from './agent_executor.js';
>>>>>>> 9427f36 (wip authentication sample)
import { authenticationHandler } from './authentication_middleware.js';
import { userBuilder } from './user_builder.js';

// --- Server Setup ---
<<<<<<< HEAD

const extensionAgentCard: AgentCard = {
  name: 'Sample Agent with timestamp extensions',
=======
const authenticationAgentCard: AgentCard = {
  name: 'Sample Agent with authentication support',
>>>>>>> 9427f36 (wip authentication sample)
  description:
    'A sample agent to test the stream functionality and simulate the flow of tasks statuses, with extensions integration.',
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
  // Adjust the base URL and port as needed. /a2a is the default base in A2AExpressApp
  url: 'http://localhost:41241/',
  provider: {
    organization: 'A2A Samples',
    url: 'https://example.com/a2a-samples',
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  version: '1.0.0',
>>>>>>> 460009d (wip authentication sample)
  protocolVersion: '0.3.0',
  capabilities: {
    stateTransitionHistory: true,
  },
  defaultInputModes: ['text'],
  defaultOutputModes: ['text', 'task-status'],
  skills: [
    {
      id: 'sample_agent',
<<<<<<< HEAD
=======
  version: '1.0.0', // Incremented version
=======
  version: '1.0.0',
>>>>>>> 9427f36 (wip authentication sample)
  protocolVersion: '0.3.0',
  capabilities: {
    stateTransitionHistory: true,
  },
  defaultInputModes: ['text'],
  defaultOutputModes: ['text', 'task-status'],
  skills: [
    {
      id: 'sample_agent',
<<<<<<< HEAD
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
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
<<<<<<< HEAD
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
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
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
=======
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
>>>>>>> 9427f36 (wip authentication sample)
};

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 9427f36 (wip authentication sample)
  const agentExecutor: AgentExecutor = new AuthenticationAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    authenticationAgentCard,
=======
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
  const agentExecutor: AgentExecutor = new SampleAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    extensionAgentCard,
<<<<<<< HEAD
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
    taskStore,
    agentExecutor
  );

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 9427f36 (wip authentication sample)
  // 4. Create and setup A2AExpressApp, passing the custom UserBuilder and the AuthenticationMiddleware to the routes.
  const appBuilder = new A2AExpressApp(requestHandler, userBuilder);
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationHandler]);

  // 5. Start the server
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // 5. Create and setup A2AExpressApp
  const appBuilder = new A2AExpressApp(requestHandler, userBuilder);
<<<<<<< HEAD
=======
  // 5. Create and setup A2AExpressApp
<<<<<<< HEAD
  const appBuilder = new A2AExpressApp(requestHandler);
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
=======
  const appBuilder = new A2AExpressApp(requestHandler, userBuilder);
>>>>>>> 2d7da54 (authentication agent WIP)
=======
>>>>>>> 66fb28e (authentication agent WIP)
  const authenticationMiddleware: RequestHandler = authenticationHandler;
  const expressApp = appBuilder.setupRoutes(express(), '', [authenticationMiddleware]);

  // 6. Start the server
<<<<<<< HEAD
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
=======
>>>>>>> 9427f36 (wip authentication sample)
  const PORT = process.env.PORT || 41241;
  expressApp.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(
<<<<<<< HEAD
<<<<<<< HEAD
      `[AuthenticationSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[AuthenticationSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[AuthenticationSampleAgent] Press Ctrl+C to stop the server');
=======
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
      `[ExtensionsSampleAgent] Server using new framework started on http://localhost:${PORT}`
    );
    console.log(
      `[ExtensionsSampleAgent] Agent Card: http://localhost:${PORT}/.well-known/agent-card.json`
    );
    console.log('[ExtensionsSampleAgent] Press Ctrl+C to stop the server');
<<<<<<< HEAD
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
  });
}

main().catch(console.error);
