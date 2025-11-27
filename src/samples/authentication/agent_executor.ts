import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

import { Message } from '../../index.js';
import { AgentExecutor, RequestContext, ExecutionEventBus } from '../../server/index.js';
import { CustomUser } from './user_builder.js';

/**
 * AuthenticationAgentExecutor implements the agent's core logic to support basic authentication operations.
 */
export class AuthenticationAgentExecutor implements AgentExecutor {
  public cancelTask = async (_taskId: string, _eventBus: ExecutionEventBus): Promise<void> => {};

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
    let finalText;
    if (
      requestContext.context?.user?.isAuthenticated() &&
      requestContext.context.user instanceof CustomUser
    ) {
      const customUser = requestContext.context.user;
      finalText = `The request is coming from the authenticated user ${customUser.userName()}, with email ${customUser.email()} and role ${customUser.role()}.`;
    } else {
      finalText = `The request is not coming from an autheticated user.`;
    }
    const finalMessage: Message = {
      kind: 'message',
      messageId: uuidv4(),
      role: 'agent',
      parts: [{ kind: 'text', text: finalText }],
    };
    eventBus.publish(finalMessage);
  }
}
