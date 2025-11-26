import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

import { Task, TaskStatusUpdateEvent, Message } from '../../index.js';
import { AgentExecutor, RequestContext, ExecutionEventBus } from '../../server/index.js';
import { CustomUser } from './user_builder.js';

/**
 * SampleAgentExecutor implements the agent's core logic.
 */
export class SampleAgentExecutor implements AgentExecutor {
  public cancelTask = async (_taskId: string, _eventBus: ExecutionEventBus): Promise<void> => {};

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
      let finalText;
      if (requestContext.context?.user?.isAuthenticated()) {
        const customUser = requestContext.context.user as CustomUser;
        finalText = `The request is coming from the authenticated user ${customUser.userName()}, with email ${customUser.email()} and role ${customUser.role()}.`
      } else {
        finalText = `The request is not coming from an autheticated user.`
      }
      const finalMessage: Message = {
        kind: 'message',
        messageId: uuidv4(),
        role: 'agent',
        parts: [{kind: 'text', text: finalText}]
        
      };
      eventBus.publish(finalMessage);
  }
}
