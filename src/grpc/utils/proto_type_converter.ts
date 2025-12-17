/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from '../../types.js';
import {
    AgentCard,
    AgentCardSignature,
    AgentCapabilities,
    AgentExtension,
    AgentInterface,
    AgentProvider,
    APIKeySecurityScheme,
    Artifact,
    AuthenticationInfo,
    AuthorizationCodeOAuthFlow,
    CancelTaskRequest,
    ClientCredentialsOAuthFlow,
    DataPart as ProtoDataPart,
    FilePart as ProtoFilePart,
    GetTaskPushNotificationConfigRequest,
    GetTaskRequest,
    HTTPAuthSecurityScheme,
    ImplicitOAuthFlow,
    Message,
    MutualTlsSecurityScheme,
    OAuth2SecurityScheme,
    OAuthFlows,
    OpenIdConnectSecurityScheme,
    Part,
    PasswordOAuthFlow,
    PushNotificationConfig,
    Role,
    Security,
    SecurityScheme,
    SendMessageConfiguration,
    SendMessageRequest,
    SendMessageResponse,
    StreamResponse,
    StringList,
    SubscribeToTaskRequest,
    Task,
    TaskArtifactUpdateEvent,
    TaskPushNotificationConfig,
    TaskState,
    TaskStatus,
    TaskStatusUpdateEvent,
} from '../a2a.js';
/**
 * Converts proto types to internal types.
 */
export class FromProto {

    static message(message: Message): types.Message {
        return {
            kind: 'message',
            messageId: message.messageId,
            parts: message.parts.map(p => this.parts(p)),
            contextId: message.contextId ?? undefined,
            taskId: message.taskId ?? undefined,
            role: message.role === Role.ROLE_AGENT ? "agent" : "user",
            metadata: message.metadata,
            extensions: message.extensions.length > 0 ? message.extensions : undefined,
        };
    }

    static configuration(configuration: SendMessageConfiguration): types.MessageSendConfiguration {
        return {
            blocking: configuration.blocking,
            acceptedOutputModes: configuration.acceptedOutputModes,
            pushNotificationConfig: configuration.pushNotificationConfig
                ? this.pushNotificationConfig(configuration.pushNotificationConfig)
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
                : undefined
        };
    }

    static authenticationInfo(authInfo: AuthenticationInfo): types.PushNotificationAuthenticationInfo {
        return {
            schemes: authInfo.schemes,
            credentials: authInfo.credentials,
        };
    }

    static parts(part: Part): types.Part {

    if (part.part?.$case === "text") {
        return {
            kind: "text",
            text: part.part.value,
            metadata: { ...part.metadata },
        } as types.TextPart;
    }

    if (part.part?.$case === "file") {
        const filePart = part.part.value;
        if (filePart.file?.$case === "fileWithUri") {
            return {
                kind: "file",
                file: {
                    uri: filePart.file.value,
                },
                metadata: { ...part.metadata },
            } as types.FilePart;
        } else if (filePart.file?.$case === "fileWithBytes") {
            return {
                kind: "file",
                file: {
                    bytes: filePart.file.value.toString(),
                },
                metadata: { ...part.metadata },
            } as types.FilePart;
        }
        throw new Error("Invalid file part type");
    }

    if (part.part?.$case === "data") {
        return {
            kind: "data",
            data: part.part.value.data,
            metadata: { ...part.metadata },
        } as types.DataPart;
    }

    throw new Error("Invalid part type");
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

    static messageSendResult(params: types.Message | types.Task): SendMessageResponse {
        if (params.kind === "message") {
            return {
                payload: {
                    $case: 'msg',
                    value: this.message(params),
                },
            };
        } else if (params.kind === "task") {
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
            parts: message.parts.map(p => this.parts(p)),
            contextId: message.contextId ?? '',
            taskId: message.taskId ?? '',
            role: message.role === 'agent' ? Role.ROLE_AGENT : Role.ROLE_USER,
            metadata: message.metadata,
            extensions: message.extensions ? message.extensions : [],
            referenceTaskIds: message.referenceTaskIds ? message.referenceTaskIds : [],
        };
    }

    static task(task: types.Task): Task {
        return {
            id: task.id,
            contextId: task.contextId,
            status: this.taskStatus(task.status),
            artifacts: task.artifacts.map(a => this.artifact(a)),
            history: task.history.map(m => this.message(m)),
            metadata: task.metadata,
        };
    }

    static taskStatus(status: types.TaskStatus): TaskStatus {
        return {
            state: this.taskState(status.state),
            message: status.message ? this.message(status.message) : undefined,
            timestamp: status.timestamp ? new Date(status.timestamp) : undefined,
        };
    }

    static artifact(artifact: types.Artifact): Artifact {
        return {
            artifactId: artifact.artifactId,
            name: artifact.name ?? '',
            description: artifact.description ?? '',
            parts: artifact.parts.map(p => this.parts(p)),
            metadata: artifact.metadata,
            extensions: artifact.extensions ? artifact.extensions : [],
        };
    }

    static taskState(state: types.TaskState): TaskState {
        switch (state) {
            case "submitted":
                return TaskState.TASK_STATE_SUBMITTED;
            case "working":
                return TaskState.TASK_STATE_WORKING;
            case "input-required":
                return TaskState.TASK_STATE_INPUT_REQUIRED;
            case "rejected":
                return TaskState.TASK_STATE_REJECTED;
            case "auth-required":
                return TaskState.TASK_STATE_AUTH_REQUIRED;
            case "completed":
                return TaskState.TASK_STATE_COMPLETED;
            case "failed":
                return TaskState.TASK_STATE_FAILED;
            case "canceled":
                return TaskState.TASK_STATE_CANCELLED;
            case "unknown":
                return TaskState.TASK_STATE_UNSPECIFIED;
            default:
                return TaskState.UNRECOGNIZED;
        }
    }

    static parts(part: types.Part): Part {

        if (part.kind === "text") {
            return {
                part: { $case: "text", value: part.text },
                metadata: { ...part.metadata },
            } as Part;
        }

        if (part.kind === "file") {
            let filePart: ProtoFilePart;
            if ('uri' in part.file) {
                filePart = { file: { $case: "fileWithUri", value: part.file.uri }, mediaType: undefined, name: part.file.name ?? '' };
            } else if ('bytes' in part.file) {
                filePart = { file: { $case: "fileWithBytes", value: Buffer.from(part.file.bytes) }, mediaType: undefined, name: part.file.name ?? '' };
            } else {
                throw new Error("Invalid file part");
            }
            return {
                part: { $case: "file", value: filePart },
                metadata: { ...part.metadata },
            } as Part;
        }

        if (part.kind === "data") {
            return {
                part: { $case: "data", value: { data: part.data } },
                metadata: { ...part.metadata },
            } as Part;
        }

        throw new Error("Invalid part type");
    }
}