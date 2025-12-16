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
            contextId: message.contextId || null,
            taskId: message.taskId || null,
            role: message.role === Role.ROLE_AGENT ? "agent" : "user",
            metadata: message.metadata,
            extensions: message.extensions.length > 0 ? message.extensions : null,
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
        if (!request.request) {
            throw new Error("SendMessageRequest is missing 'request' field.");
        }
        return {
            configuration: request.configuration,
            message: this.message(request.request),
            metadata: request.metadata,
        };
    }
}