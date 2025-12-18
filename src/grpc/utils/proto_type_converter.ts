import * as types from '../../types.js';
import {
  AgentCard,
  AgentCardSignature,
  AgentCapabilities,
  AgentExtension,
  AgentInterface,
  AgentProvider,
  Artifact,
  AuthenticationInfo,
  CancelTaskRequest,
  FilePart as ProtoFilePart,
  GetTaskPushNotificationConfigRequest,
  GetTaskRequest,
  Message,
  OAuthFlows,
  Part,
  PushNotificationConfig,
  Role,
  Security,
  SecurityScheme,
  SendMessageConfiguration,
  SendMessageRequest,
  SendMessageResponse,
  StreamResponse,
  Task,
  TaskArtifactUpdateEvent,
  TaskPushNotificationConfig,
  TaskState,
  TaskStatus,
  TaskStatusUpdateEvent,
  DeleteTaskPushNotificationConfigRequest,
  ListTaskPushNotificationConfigRequest,
  ListTaskPushNotificationConfigResponse,
  AgentSkill,
  CreateTaskPushNotificationConfigRequest,
} from '../a2a.js';

const TASK_ID_REGEX = /tasks\/([^/]+)/;
const CONFIG_ID_REGEX = /pushNotificationConfigs\/([^/]*)/;

/**
 * Converts proto types to internal types.
 */
export class FromProto {
  private static _getTaskIdFromName(name: string): string {
    const match = name.match(TASK_ID_REGEX);
    if (!match) {
      throw new Error(`Invalid or missing task ID in name: "${name}"`);
    }
    return match[1];
  }

  private static _getPushNotificationConfigIdFromName(name: string): string {
    const match = name.match(CONFIG_ID_REGEX);
    if (!match || match.length < 2) {
      throw new Error(`Invalid or missing config ID in name: "${name}"`);
    }
    return match[1];
  }

  static taskQueryParams(request: GetTaskRequest): types.TaskQueryParams {
    return {
      id: this._getTaskIdFromName(request.name),
      historyLength: request.historyLength,
    };
  }

  static taskIdParams(request: CancelTaskRequest): types.TaskIdParams {
    return {
      id: this._getTaskIdFromName(request.name),
    };
  }

  static getTaskPushNotificationConfigParams(
    request: GetTaskPushNotificationConfigRequest
  ): types.GetTaskPushNotificationConfigParams {
    return {
      id: this._getTaskIdFromName(request.name),
      pushNotificationConfigId: this._getPushNotificationConfigIdFromName(request.name),
    };
  }

  static listTaskPushNotificationConfigParams(
    request: ListTaskPushNotificationConfigRequest
  ): types.ListTaskPushNotificationConfigParams {
    return {
      id: this._getTaskIdFromName(request.parent),
    };
  }

  static setTaskPushNotificationConfigParams(
    request: CreateTaskPushNotificationConfigRequest
  ): types.TaskPushNotificationConfig {
    return {
      taskId: this._getTaskIdFromName(request.parent),
      pushNotificationConfig: this.pushNotificationConfig(request.config.pushNotificationConfig),
    };
  }

  static deleteTaskPushNotificationConfigParams(
    request: DeleteTaskPushNotificationConfigRequest
  ): types.DeleteTaskPushNotificationConfigParams {
    const name = request.name;
    return {
      id: this._getTaskIdFromName(name),
      pushNotificationConfigId: this._getPushNotificationConfigIdFromName(name),
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
      throw new Error('Invalid file part type');
    }

    if (part.part?.$case === 'data') {
      return {
        kind: 'data',
        data: part.part.value.data,
      };
    }

    throw new Error('Invalid part type');
  }

  static messageSendParams(request: SendMessageRequest): types.MessageSendParams {
    return {
      message: this.message(request.request),
      configuration: request.configuration ? this.configuration(request.configuration) : undefined,
      metadata: request.metadata,
    };
  }
}

export class ToProto {
  static agentCard(agentCard: types.AgentCard): AgentCard {
    return {
      protocolVersion: agentCard.protocolVersion,
      name: agentCard.name,
      description: agentCard.description,
      url: agentCard.url,
      preferredTransport: agentCard.preferredTransport ?? '',
      additionalInterfaces: agentCard.additionalInterfaces.map((i) => this.agentInterface(i)),
      provider: this.agentProvider(agentCard.provider),
      version: agentCard.version,
      documentationUrl: agentCard.documentationUrl ?? '',
      capabilities: this.agentCapabilities(agentCard.capabilities),
      securitySchemes: Object.fromEntries(
        Object.entries(agentCard.securitySchemes).map(([key, value]) => [
          key,
          this.securityScheme(value),
        ])
      ),
      security: agentCard.security.map((s) => this.security(s)),
      defaultInputModes: agentCard.defaultInputModes,
      defaultOutputModes: agentCard.defaultOutputModes,
      skills: agentCard.skills.map((s) => this.agentSkill(s)),
      supportsAuthenticatedExtendedCard: agentCard.supportsAuthenticatedExtendedCard ?? false,
      signatures: agentCard.signatures.map((s) => this.signatures(s)),
    };
  }

  static signatures(signatures: types.AgentCardSignature): AgentCardSignature {
    return {
      protected: signatures.protected,
      signature: signatures.signature,
      header: signatures.header,
    };
  }

  static agentSkill(skill: types.AgentSkill): AgentSkill {
    return {
      id: skill.id,
      name: skill.name,
      description: skill.description ?? '',
      tags: skill.tags ?? [],
      examples: skill.examples ?? [],
      inputModes: skill.inputModes ?? [],
      outputModes: skill.outputModes ?? [],
      security: skill.security.map((s) => this.security(s)),
    };
  }

  static security(security: { [k: string]: string[] }): Security {
    return {
      schemes: Object.fromEntries(
        Object.entries(security).map(([key, value]) => {
          return [key, { list: value }];
        })
      ),
    };
  }

  static securityScheme(scheme: types.SecurityScheme): SecurityScheme {
    switch (scheme.type) {
      case 'apiKey':
        return {
          scheme: {
            $case: 'apiKeySecurityScheme',
            value: {
              name: scheme.name,
              location: scheme.in,
              description: scheme.description ?? '',
            },
          },
        };
      case 'http':
        return {
          scheme: {
            $case: 'httpAuthSecurityScheme',
            value: {
              description: scheme.description ?? '',
              scheme: scheme.scheme,
              bearerFormat: scheme.bearerFormat ?? '',
            },
          },
        };
      case 'mutualTLS':
        return {
          scheme: {
            $case: 'mtlsSecurityScheme',
            value: {
              description: scheme.description ?? '',
            },
          },
        };
      case 'oauth2':
        return {
          scheme: {
            $case: 'oauth2SecurityScheme',
            value: {
              description: scheme.description ?? '',
              flows: this.oauthFlows(scheme.flows),
              oauth2MetadataUrl: scheme.oauth2MetadataUrl ?? '',
            },
          },
        };
      case 'openIdConnect':
        return {
          scheme: {
            $case: 'openIdConnectSecurityScheme',
            value: {
              description: scheme.description ?? '',
              openIdConnectUrl: scheme.openIdConnectUrl,
            },
          },
        };
      default:
        return undefined;
    }
  }

  static oauthFlows(flows: types.OAuthFlows): OAuthFlows {
    if (flows.implicit) {
      return {
        flow: {
          $case: 'implicit',
          value: {
            authorizationUrl: flows.implicit.authorizationUrl,
            scopes: flows.implicit.scopes,
            refreshUrl: flows.implicit.refreshUrl,
          },
        },
      };
    } else if (flows.password) {
      return {
        flow: {
          $case: 'password',
          value: {
            tokenUrl: flows.password.tokenUrl,
            scopes: flows.password.scopes,
            refreshUrl: flows.password.refreshUrl,
          },
        },
      };
    } else if (flows.clientCredentials) {
      return {
        flow: {
          $case: 'clientCredentials',
          value: {
            tokenUrl: flows.clientCredentials.tokenUrl,
            scopes: flows.clientCredentials.scopes,
            refreshUrl: flows.clientCredentials.refreshUrl,
          },
        },
      };
    } else if (flows.authorizationCode) {
      return {
        flow: {
          $case: 'authorizationCode',
          value: {
            authorizationUrl: flows.authorizationCode.authorizationUrl,
            tokenUrl: flows.authorizationCode.tokenUrl,
            scopes: flows.authorizationCode.scopes,
            refreshUrl: flows.authorizationCode.refreshUrl,
          },
        },
      };
    } else {
      return undefined;
    }
  }

  static agentInterface(agentInterface: types.AgentInterface): AgentInterface {
    return {
      transport: agentInterface.transport,
      url: agentInterface.url,
    };
  }

  static agentProvider(agentProvider: types.AgentProvider): AgentProvider {
    return {
      url: agentProvider.url,
      organization: agentProvider.organization,
    };
  }

  static agentCapabilities(capabilities: types.AgentCapabilities): AgentCapabilities {
    return {
      streaming: capabilities.streaming ?? false,
      pushNotifications: capabilities.pushNotifications ?? false,
      extensions: capabilities.extensions.map((e) => this.extension(e)),
    };
  }

  static extension(extension: types.AgentExtension): AgentExtension {
    return {
      uri: extension.uri,
      description: extension.description ?? '',
      required: extension.required ?? false,
      params: extension.params,
    };
  }

  static listTaskPushNotificationConfigs(
    config: types.TaskPushNotificationConfig[]
  ): ListTaskPushNotificationConfigResponse {
    return {
      configs: config.map((c) => this.taskPushNotificationConfig(c)),
      nextPageToken: '',
    };
  }

  static taskPushNotificationConfig(
    config: types.TaskPushNotificationConfig
  ): TaskPushNotificationConfig {
    return {
      name: `tasks/${config.taskId}/pushNotificationConfigs/${config.pushNotificationConfig.id || ''}`,
      pushNotificationConfig: this.pushNotificationConfig(config.pushNotificationConfig),
    };
  }

  static pushNotificationConfig(config: types.PushNotificationConfig): PushNotificationConfig {
    return {
      id: config.id ?? '',
      url: config.url,
      token: config.token ?? '',
      authentication: config.authentication
        ? this.authenticationInfo(config.authentication)
        : undefined,
    };
  }

  static authenticationInfo(
    authInfo: types.PushNotificationAuthenticationInfo
  ): AuthenticationInfo {
    return {
      schemes: authInfo.schemes,
      credentials: authInfo.credentials ?? '',
    };
  }

  static messageStreamResult(
    event: types.Message | types.Task | types.TaskStatusUpdateEvent | types.TaskArtifactUpdateEvent
  ): StreamResponse {
    if (event.kind === 'message') {
      return {
        payload: {
          $case: 'msg',
          value: this.message(event),
        },
      };
    } else if (event.kind === 'task') {
      return {
        payload: {
          $case: 'task',
          value: this.task(event),
        },
      };
    } else if (event.kind === 'status-update') {
      return {
        payload: {
          $case: 'statusUpdate',
          value: this.taskStatusUpdate(event),
        },
      };
    } else if (event.kind === 'artifact-update') {
      return {
        payload: {
          $case: 'artifactUpdate',
          value: this.taskArtifactUpdate(event),
        },
      };
    } else {
      throw new Error('Invalid event type');
    }
  }

  static taskStatusUpdate(event: types.TaskStatusUpdateEvent): TaskStatusUpdateEvent {
    return {
      taskId: event.taskId,
      status: this.taskStatus(event.status),
      contextId: event.contextId,
      metadata: event.metadata,
      final: event.final,
    };
  }

  static taskArtifactUpdate(event: types.TaskArtifactUpdateEvent): TaskArtifactUpdateEvent {
    return {
      taskId: event.taskId,
      artifact: this.artifact(event.artifact),
      contextId: event.contextId,
      metadata: event.metadata,
      append: event.append ?? false,
      lastChunk: event.lastChunk ?? false,
    };
  }

  static messageSendResult(params: types.Message | types.Task): SendMessageResponse {
    if (params.kind === 'message') {
      return {
        payload: {
          $case: 'msg',
          value: this.message(params),
        },
      };
    } else if (params.kind === 'task') {
      return {
        payload: {
          $case: 'task',
          value: this.task(params),
        },
      };
    }
  }

  static message(message: types.Message): Message {
    return {
      messageId: message.messageId,
      content: message.parts.map((p) => this.parts(p)),
      contextId: message.contextId ?? '',
      taskId: message.taskId ?? '',
      role: message.role === 'agent' ? Role.ROLE_AGENT : Role.ROLE_USER,
      metadata: message.metadata,
      extensions: message.extensions ? message.extensions : [],
    };
  }

  static task(task: types.Task): Task {
    return {
      id: task.id,
      contextId: task.contextId,
      status: this.taskStatus(task.status),
      artifacts: task.artifacts.map((a) => this.artifact(a)),
      history: task.history.map((m) => this.message(m)),
      metadata: task.metadata,
    };
  }

  static taskStatus(status: types.TaskStatus): TaskStatus {
    return {
      state: this.taskState(status.state),
      update: status.message ? this.message(status.message) : undefined,
      timestamp: status.timestamp ? new Date(status.timestamp) : undefined,
    };
  }

  static artifact(artifact: types.Artifact): Artifact {
    return {
      artifactId: artifact.artifactId,
      name: artifact.name ?? '',
      description: artifact.description ?? '',
      parts: artifact.parts.map((p) => this.parts(p)),
      metadata: artifact.metadata,
      extensions: artifact.extensions ? artifact.extensions : [],
    };
  }

  static taskState(state: types.TaskState): TaskState {
    switch (state) {
      case 'submitted':
        return TaskState.TASK_STATE_SUBMITTED;
      case 'working':
        return TaskState.TASK_STATE_WORKING;
      case 'input-required':
        return TaskState.TASK_STATE_INPUT_REQUIRED;
      case 'rejected':
        return TaskState.TASK_STATE_REJECTED;
      case 'auth-required':
        return TaskState.TASK_STATE_AUTH_REQUIRED;
      case 'completed':
        return TaskState.TASK_STATE_COMPLETED;
      case 'failed':
        return TaskState.TASK_STATE_FAILED;
      case 'canceled':
        return TaskState.TASK_STATE_CANCELLED;
      case 'unknown':
        return TaskState.TASK_STATE_UNSPECIFIED;
      default:
        return TaskState.UNRECOGNIZED;
    }
  }

  static parts(part: types.Part): Part {
    if (part.kind === 'text') {
      return {
        part: { $case: 'text', value: part.text },
      };
    }

    if (part.kind === 'file') {
      let filePart: ProtoFilePart;
      if ('uri' in part.file) {
        filePart = {
          file: { $case: 'fileWithUri', value: part.file.uri },
          mimeType: part.file.mimeType ?? '',
        };
      } else if ('bytes' in part.file) {
        filePart = {
          file: { $case: 'fileWithBytes', value: Buffer.from(part.file.bytes, 'base64') },
          mimeType: part.file.mimeType ?? '',
        };
      } else {
        throw new Error('Invalid file part');
      }
      return {
        part: { $case: 'file', value: filePart },
      };
    }

    if (part.kind === 'data') {
      return {
        part: { $case: 'data', value: { data: part.data } },
      };
    }

    throw new Error('Invalid part type');
  }
}
