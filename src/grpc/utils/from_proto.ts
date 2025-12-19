import { A2AError } from '../../server/error.js';
import {
  CancelTaskRequest,
  GetTaskPushNotificationConfigRequest,
  ListTaskPushNotificationConfigRequest,
  GetTaskRequest,
  CreateTaskPushNotificationConfigRequest,
  DeleteTaskPushNotificationConfigRequest,
  Message,
  Role,
  SendMessageConfiguration,
  PushNotificationConfig,
  AuthenticationInfo,
  SendMessageRequest,
  Part,
} from '../a2a.js';
import * as types from '../../types.js';
import { extractTaskId, extractPushNotificationConfigId } from './id_decoding.js';

/**
 * Converts proto types to internal types.
 */
export class FromProto {
  static taskQueryParams(request: GetTaskRequest): types.TaskQueryParams {
    return {
      id: extractTaskId(request.name),
      historyLength: request.historyLength,
    };
  }

  static taskIdParams(request: CancelTaskRequest): types.TaskIdParams {
    return {
      id: extractTaskId(request.name),
    };
  }

  static getTaskPushNotificationConfigParams(
    request: GetTaskPushNotificationConfigRequest
  ): types.GetTaskPushNotificationConfigParams {
    return {
      id: extractTaskId(request.name),
      pushNotificationConfigId: extractPushNotificationConfigId(request.name),
    };
  }

  static listTaskPushNotificationConfigParams(
    request: ListTaskPushNotificationConfigRequest
  ): types.ListTaskPushNotificationConfigParams {
    return {
      id: extractTaskId(request.parent),
    };
  }

  static setTaskPushNotificationConfigParams(
    request: CreateTaskPushNotificationConfigRequest
  ): types.TaskPushNotificationConfig {
    return {
      taskId: extractTaskId(request.parent),
      pushNotificationConfig: this.pushNotificationConfig(request.config.pushNotificationConfig),
    };
  }

  static deleteTaskPushNotificationConfigParams(
    request: DeleteTaskPushNotificationConfigRequest
  ): types.DeleteTaskPushNotificationConfigParams {
    const name = request.name;
    return {
      id: extractTaskId(name),
      pushNotificationConfigId: extractPushNotificationConfigId(name),
    };
  }

  static message(message: Message): types.Message {
    return {
      kind: 'message',
      messageId: message.messageId,
      parts: message.content.map((p) => this.parts(p)),
      contextId: message.contextId,
      taskId: message.taskId,
      role: message.role === Role.ROLE_AGENT ? 'agent' : 'user',
      metadata: message.metadata,
      extensions: message.extensions.length > 0 ? message.extensions : undefined,
    };
  }

  static configuration(configuration: SendMessageConfiguration): types.MessageSendConfiguration {
    return {
      blocking: configuration.blocking,
      acceptedOutputModes: configuration.acceptedOutputModes,
      pushNotificationConfig: configuration.pushNotification
        ? this.pushNotificationConfig(configuration.pushNotification)
        : undefined,
    };
  }

  static pushNotificationConfig(config: PushNotificationConfig): types.PushNotificationConfig {
    return {
      id: config.id,
      url: config.url,
      token: config.token,
      authentication: config.authentication
        ? this.authenticationInfo(config.authentication)
        : undefined,
    };
  }

  static authenticationInfo(
    authInfo: AuthenticationInfo
  ): types.PushNotificationAuthenticationInfo {
    return {
      schemes: authInfo.schemes,
      credentials: authInfo.credentials,
    };
  }

  static parts(part: Part): types.Part {
    if (part.part?.$case === 'text') {
      return {
        kind: 'text',
        text: part.part.value,
      };
    }

    if (part.part?.$case === 'file') {
      const filePart = part.part.value;
      if (filePart.file?.$case === 'fileWithUri') {
        return {
          kind: 'file',
          file: {
            uri: filePart.file.value,
          },
        };
      } else if (filePart.file?.$case === 'fileWithBytes') {
        return {
          kind: 'file',
          file: {
            bytes: filePart.file.value.toString('base64'),
          },
        };
      }
      throw A2AError.invalidParams('Invalid file part type');
    }

    if (part.part?.$case === 'data') {
      return {
        kind: 'data',
        data: part.part.value.data,
      };
    }
    throw A2AError.invalidParams('Invalid part type');
  }

  static messageSendParams(request: SendMessageRequest): types.MessageSendParams {
    return {
      message: this.message(request.request),
      configuration: request.configuration ? this.configuration(request.configuration) : undefined,
      metadata: request.metadata,
    };
  }
}
