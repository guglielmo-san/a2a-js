import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 66fb28e (authentication agent WIP)
=======
>>>>>>> 1fe5fc0 (wip authentication sample)
import { Message } from '../../index.js';
=======
import { Task, TaskStatusUpdateEvent, Message } from '../../index.js';
>>>>>>> 5d6508c (authentication agent WIP)
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Message } from '../../index.js';
>>>>>>> 460009d (wip authentication sample)
=======
import { Task, TaskStatusUpdateEvent, Message } from '../../index.js';
>>>>>>> 2d7da54 (authentication agent WIP)
=======
import { Message } from '../../index.js';
>>>>>>> 9427f36 (wip authentication sample)
=======
>>>>>>> 66fb28e (authentication agent WIP)
=======
=======
import { Message } from '../../index.js';
>>>>>>> 460009d (wip authentication sample)
>>>>>>> 1fe5fc0 (wip authentication sample)
import { AgentExecutor, RequestContext, ExecutionEventBus } from '../../server/index.js';
import { CustomUser } from './user_builder.js';

/**
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 66fb28e (authentication agent WIP)
=======
>>>>>>> 1fe5fc0 (wip authentication sample)
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
=======
 * SampleAgentExecutor implements the agent's core logic.
<<<<<<< HEAD
<<<<<<< HEAD
=======
 * AuthenticationAgentExecutor implements the agent's core logic to support basic authentication operations.
>>>>>>> 460009d (wip authentication sample)
 */
export class AuthenticationAgentExecutor implements AgentExecutor {
  public cancelTask = async (_taskId: string, _eventBus: ExecutionEventBus): Promise<void> => {};

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
<<<<<<< HEAD
=======
 * SampleAgentExecutor implements the agent's core logic.
=======
 * AuthenticationAgentExecutor implements the agent's core logic to support basic authentication operations.
>>>>>>> 9427f36 (wip authentication sample)
 */
export class AuthenticationAgentExecutor implements AgentExecutor {
  public cancelTask = async (_taskId: string, _eventBus: ExecutionEventBus): Promise<void> => {};

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
<<<<<<< HEAD
>>>>>>> 2d7da54 (authentication agent WIP)
=======
=======
=======
 * AuthenticationAgentExecutor implements the agent's core logic to support basic authentication operations.
>>>>>>> 460009d (wip authentication sample)
>>>>>>> 1fe5fc0 (wip authentication sample)
 */
export class AuthenticationAgentExecutor implements AgentExecutor {
  public cancelTask = async (_taskId: string, _eventBus: ExecutionEventBus): Promise<void> => {};

  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
<<<<<<< HEAD
>>>>>>> 66fb28e (authentication agent WIP)
=======
<<<<<<< HEAD
>>>>>>> 1fe5fc0 (wip authentication sample)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5d6508c (authentication agent WIP)
=======
<<<<<<< HEAD
=======
>>>>>>> 9427f36 (wip authentication sample)
=======
>>>>>>> 1fe5fc0 (wip authentication sample)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 2d7da54 (authentication agent WIP)
=======
>>>>>>> 9427f36 (wip authentication sample)
=======
>>>>>>> 5d6508c (authentication agent WIP)
>>>>>>> 66fb28e (authentication agent WIP)
=======
>>>>>>> 460009d (wip authentication sample)
>>>>>>> 1fe5fc0 (wip authentication sample)
  }
}
