import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { A2AServiceClient as _a2a_v1_A2AServiceClient, A2AServiceDefinition as _a2a_v1_A2AServiceDefinition } from './a2a/v1/A2AService';
import type { APIKeySecurityScheme as _a2a_v1_APIKeySecurityScheme, APIKeySecurityScheme__Output as _a2a_v1_APIKeySecurityScheme__Output } from './a2a/v1/APIKeySecurityScheme';
import type { AgentCapabilities as _a2a_v1_AgentCapabilities, AgentCapabilities__Output as _a2a_v1_AgentCapabilities__Output } from './a2a/v1/AgentCapabilities';
import type { AgentCard as _a2a_v1_AgentCard, AgentCard__Output as _a2a_v1_AgentCard__Output } from './a2a/v1/AgentCard';
import type { AgentCardSignature as _a2a_v1_AgentCardSignature, AgentCardSignature__Output as _a2a_v1_AgentCardSignature__Output } from './a2a/v1/AgentCardSignature';
import type { AgentExtension as _a2a_v1_AgentExtension, AgentExtension__Output as _a2a_v1_AgentExtension__Output } from './a2a/v1/AgentExtension';
import type { AgentInterface as _a2a_v1_AgentInterface, AgentInterface__Output as _a2a_v1_AgentInterface__Output } from './a2a/v1/AgentInterface';
import type { AgentProvider as _a2a_v1_AgentProvider, AgentProvider__Output as _a2a_v1_AgentProvider__Output } from './a2a/v1/AgentProvider';
import type { AgentSkill as _a2a_v1_AgentSkill, AgentSkill__Output as _a2a_v1_AgentSkill__Output } from './a2a/v1/AgentSkill';
import type { Artifact as _a2a_v1_Artifact, Artifact__Output as _a2a_v1_Artifact__Output } from './a2a/v1/Artifact';
import type { AuthenticationInfo as _a2a_v1_AuthenticationInfo, AuthenticationInfo__Output as _a2a_v1_AuthenticationInfo__Output } from './a2a/v1/AuthenticationInfo';
import type { AuthorizationCodeOAuthFlow as _a2a_v1_AuthorizationCodeOAuthFlow, AuthorizationCodeOAuthFlow__Output as _a2a_v1_AuthorizationCodeOAuthFlow__Output } from './a2a/v1/AuthorizationCodeOAuthFlow';
import type { CancelTaskRequest as _a2a_v1_CancelTaskRequest, CancelTaskRequest__Output as _a2a_v1_CancelTaskRequest__Output } from './a2a/v1/CancelTaskRequest';
import type { ClientCredentialsOAuthFlow as _a2a_v1_ClientCredentialsOAuthFlow, ClientCredentialsOAuthFlow__Output as _a2a_v1_ClientCredentialsOAuthFlow__Output } from './a2a/v1/ClientCredentialsOAuthFlow';
import type { DataPart as _a2a_v1_DataPart, DataPart__Output as _a2a_v1_DataPart__Output } from './a2a/v1/DataPart';
import type { DeleteTaskPushNotificationConfigRequest as _a2a_v1_DeleteTaskPushNotificationConfigRequest, DeleteTaskPushNotificationConfigRequest__Output as _a2a_v1_DeleteTaskPushNotificationConfigRequest__Output } from './a2a/v1/DeleteTaskPushNotificationConfigRequest';
import type { FilePart as _a2a_v1_FilePart, FilePart__Output as _a2a_v1_FilePart__Output } from './a2a/v1/FilePart';
import type { GetExtendedAgentCardRequest as _a2a_v1_GetExtendedAgentCardRequest, GetExtendedAgentCardRequest__Output as _a2a_v1_GetExtendedAgentCardRequest__Output } from './a2a/v1/GetExtendedAgentCardRequest';
import type { GetTaskPushNotificationConfigRequest as _a2a_v1_GetTaskPushNotificationConfigRequest, GetTaskPushNotificationConfigRequest__Output as _a2a_v1_GetTaskPushNotificationConfigRequest__Output } from './a2a/v1/GetTaskPushNotificationConfigRequest';
import type { GetTaskRequest as _a2a_v1_GetTaskRequest, GetTaskRequest__Output as _a2a_v1_GetTaskRequest__Output } from './a2a/v1/GetTaskRequest';
import type { HTTPAuthSecurityScheme as _a2a_v1_HTTPAuthSecurityScheme, HTTPAuthSecurityScheme__Output as _a2a_v1_HTTPAuthSecurityScheme__Output } from './a2a/v1/HTTPAuthSecurityScheme';
import type { ImplicitOAuthFlow as _a2a_v1_ImplicitOAuthFlow, ImplicitOAuthFlow__Output as _a2a_v1_ImplicitOAuthFlow__Output } from './a2a/v1/ImplicitOAuthFlow';
import type { ListTaskPushNotificationConfigRequest as _a2a_v1_ListTaskPushNotificationConfigRequest, ListTaskPushNotificationConfigRequest__Output as _a2a_v1_ListTaskPushNotificationConfigRequest__Output } from './a2a/v1/ListTaskPushNotificationConfigRequest';
import type { ListTaskPushNotificationConfigResponse as _a2a_v1_ListTaskPushNotificationConfigResponse, ListTaskPushNotificationConfigResponse__Output as _a2a_v1_ListTaskPushNotificationConfigResponse__Output } from './a2a/v1/ListTaskPushNotificationConfigResponse';
import type { ListTasksRequest as _a2a_v1_ListTasksRequest, ListTasksRequest__Output as _a2a_v1_ListTasksRequest__Output } from './a2a/v1/ListTasksRequest';
import type { ListTasksResponse as _a2a_v1_ListTasksResponse, ListTasksResponse__Output as _a2a_v1_ListTasksResponse__Output } from './a2a/v1/ListTasksResponse';
import type { Message as _a2a_v1_Message, Message__Output as _a2a_v1_Message__Output } from './a2a/v1/Message';
import type { MutualTlsSecurityScheme as _a2a_v1_MutualTlsSecurityScheme, MutualTlsSecurityScheme__Output as _a2a_v1_MutualTlsSecurityScheme__Output } from './a2a/v1/MutualTlsSecurityScheme';
import type { OAuth2SecurityScheme as _a2a_v1_OAuth2SecurityScheme, OAuth2SecurityScheme__Output as _a2a_v1_OAuth2SecurityScheme__Output } from './a2a/v1/OAuth2SecurityScheme';
import type { OAuthFlows as _a2a_v1_OAuthFlows, OAuthFlows__Output as _a2a_v1_OAuthFlows__Output } from './a2a/v1/OAuthFlows';
import type { OpenIdConnectSecurityScheme as _a2a_v1_OpenIdConnectSecurityScheme, OpenIdConnectSecurityScheme__Output as _a2a_v1_OpenIdConnectSecurityScheme__Output } from './a2a/v1/OpenIdConnectSecurityScheme';
import type { Part as _a2a_v1_Part, Part__Output as _a2a_v1_Part__Output } from './a2a/v1/Part';
import type { PasswordOAuthFlow as _a2a_v1_PasswordOAuthFlow, PasswordOAuthFlow__Output as _a2a_v1_PasswordOAuthFlow__Output } from './a2a/v1/PasswordOAuthFlow';
import type { PushNotificationConfig as _a2a_v1_PushNotificationConfig, PushNotificationConfig__Output as _a2a_v1_PushNotificationConfig__Output } from './a2a/v1/PushNotificationConfig';
import type { Security as _a2a_v1_Security, Security__Output as _a2a_v1_Security__Output } from './a2a/v1/Security';
import type { SecurityScheme as _a2a_v1_SecurityScheme, SecurityScheme__Output as _a2a_v1_SecurityScheme__Output } from './a2a/v1/SecurityScheme';
import type { SendMessageConfiguration as _a2a_v1_SendMessageConfiguration, SendMessageConfiguration__Output as _a2a_v1_SendMessageConfiguration__Output } from './a2a/v1/SendMessageConfiguration';
import type { SendMessageRequest as _a2a_v1_SendMessageRequest, SendMessageRequest__Output as _a2a_v1_SendMessageRequest__Output } from './a2a/v1/SendMessageRequest';
import type { SendMessageResponse as _a2a_v1_SendMessageResponse, SendMessageResponse__Output as _a2a_v1_SendMessageResponse__Output } from './a2a/v1/SendMessageResponse';
import type { SetTaskPushNotificationConfigRequest as _a2a_v1_SetTaskPushNotificationConfigRequest, SetTaskPushNotificationConfigRequest__Output as _a2a_v1_SetTaskPushNotificationConfigRequest__Output } from './a2a/v1/SetTaskPushNotificationConfigRequest';
import type { StreamResponse as _a2a_v1_StreamResponse, StreamResponse__Output as _a2a_v1_StreamResponse__Output } from './a2a/v1/StreamResponse';
import type { StringList as _a2a_v1_StringList, StringList__Output as _a2a_v1_StringList__Output } from './a2a/v1/StringList';
import type { SubscribeToTaskRequest as _a2a_v1_SubscribeToTaskRequest, SubscribeToTaskRequest__Output as _a2a_v1_SubscribeToTaskRequest__Output } from './a2a/v1/SubscribeToTaskRequest';
import type { Task as _a2a_v1_Task, Task__Output as _a2a_v1_Task__Output } from './a2a/v1/Task';
import type { TaskArtifactUpdateEvent as _a2a_v1_TaskArtifactUpdateEvent, TaskArtifactUpdateEvent__Output as _a2a_v1_TaskArtifactUpdateEvent__Output } from './a2a/v1/TaskArtifactUpdateEvent';
import type { TaskPushNotificationConfig as _a2a_v1_TaskPushNotificationConfig, TaskPushNotificationConfig__Output as _a2a_v1_TaskPushNotificationConfig__Output } from './a2a/v1/TaskPushNotificationConfig';
import type { TaskStatus as _a2a_v1_TaskStatus, TaskStatus__Output as _a2a_v1_TaskStatus__Output } from './a2a/v1/TaskStatus';
import type { TaskStatusUpdateEvent as _a2a_v1_TaskStatusUpdateEvent, TaskStatusUpdateEvent__Output as _a2a_v1_TaskStatusUpdateEvent__Output } from './a2a/v1/TaskStatusUpdateEvent';
import type { ClientLibrarySettings as _google_api_ClientLibrarySettings, ClientLibrarySettings__Output as _google_api_ClientLibrarySettings__Output } from './google/api/ClientLibrarySettings';
import type { CommonLanguageSettings as _google_api_CommonLanguageSettings, CommonLanguageSettings__Output as _google_api_CommonLanguageSettings__Output } from './google/api/CommonLanguageSettings';
import type { CppSettings as _google_api_CppSettings, CppSettings__Output as _google_api_CppSettings__Output } from './google/api/CppSettings';
import type { CustomHttpPattern as _google_api_CustomHttpPattern, CustomHttpPattern__Output as _google_api_CustomHttpPattern__Output } from './google/api/CustomHttpPattern';
import type { DotnetSettings as _google_api_DotnetSettings, DotnetSettings__Output as _google_api_DotnetSettings__Output } from './google/api/DotnetSettings';
import type { GoSettings as _google_api_GoSettings, GoSettings__Output as _google_api_GoSettings__Output } from './google/api/GoSettings';
import type { Http as _google_api_Http, Http__Output as _google_api_Http__Output } from './google/api/Http';
import type { HttpRule as _google_api_HttpRule, HttpRule__Output as _google_api_HttpRule__Output } from './google/api/HttpRule';
import type { JavaSettings as _google_api_JavaSettings, JavaSettings__Output as _google_api_JavaSettings__Output } from './google/api/JavaSettings';
import type { MethodSettings as _google_api_MethodSettings, MethodSettings__Output as _google_api_MethodSettings__Output } from './google/api/MethodSettings';
import type { NodeSettings as _google_api_NodeSettings, NodeSettings__Output as _google_api_NodeSettings__Output } from './google/api/NodeSettings';
import type { PhpSettings as _google_api_PhpSettings, PhpSettings__Output as _google_api_PhpSettings__Output } from './google/api/PhpSettings';
import type { Publishing as _google_api_Publishing, Publishing__Output as _google_api_Publishing__Output } from './google/api/Publishing';
import type { PythonSettings as _google_api_PythonSettings, PythonSettings__Output as _google_api_PythonSettings__Output } from './google/api/PythonSettings';
import type { RubySettings as _google_api_RubySettings, RubySettings__Output as _google_api_RubySettings__Output } from './google/api/RubySettings';
import type { SelectiveGapicGeneration as _google_api_SelectiveGapicGeneration, SelectiveGapicGeneration__Output as _google_api_SelectiveGapicGeneration__Output } from './google/api/SelectiveGapicGeneration';
import type { DescriptorProto as _google_protobuf_DescriptorProto, DescriptorProto__Output as _google_protobuf_DescriptorProto__Output } from './google/protobuf/DescriptorProto';
import type { Duration as _google_protobuf_Duration, Duration__Output as _google_protobuf_Duration__Output } from './google/protobuf/Duration';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from './google/protobuf/Empty';
import type { EnumDescriptorProto as _google_protobuf_EnumDescriptorProto, EnumDescriptorProto__Output as _google_protobuf_EnumDescriptorProto__Output } from './google/protobuf/EnumDescriptorProto';
import type { EnumOptions as _google_protobuf_EnumOptions, EnumOptions__Output as _google_protobuf_EnumOptions__Output } from './google/protobuf/EnumOptions';
import type { EnumValueDescriptorProto as _google_protobuf_EnumValueDescriptorProto, EnumValueDescriptorProto__Output as _google_protobuf_EnumValueDescriptorProto__Output } from './google/protobuf/EnumValueDescriptorProto';
import type { EnumValueOptions as _google_protobuf_EnumValueOptions, EnumValueOptions__Output as _google_protobuf_EnumValueOptions__Output } from './google/protobuf/EnumValueOptions';
import type { ExtensionRangeOptions as _google_protobuf_ExtensionRangeOptions, ExtensionRangeOptions__Output as _google_protobuf_ExtensionRangeOptions__Output } from './google/protobuf/ExtensionRangeOptions';
import type { FeatureSet as _google_protobuf_FeatureSet, FeatureSet__Output as _google_protobuf_FeatureSet__Output } from './google/protobuf/FeatureSet';
import type { FeatureSetDefaults as _google_protobuf_FeatureSetDefaults, FeatureSetDefaults__Output as _google_protobuf_FeatureSetDefaults__Output } from './google/protobuf/FeatureSetDefaults';
import type { FieldDescriptorProto as _google_protobuf_FieldDescriptorProto, FieldDescriptorProto__Output as _google_protobuf_FieldDescriptorProto__Output } from './google/protobuf/FieldDescriptorProto';
import type { FieldOptions as _google_protobuf_FieldOptions, FieldOptions__Output as _google_protobuf_FieldOptions__Output } from './google/protobuf/FieldOptions';
import type { FileDescriptorProto as _google_protobuf_FileDescriptorProto, FileDescriptorProto__Output as _google_protobuf_FileDescriptorProto__Output } from './google/protobuf/FileDescriptorProto';
import type { FileDescriptorSet as _google_protobuf_FileDescriptorSet, FileDescriptorSet__Output as _google_protobuf_FileDescriptorSet__Output } from './google/protobuf/FileDescriptorSet';
import type { FileOptions as _google_protobuf_FileOptions, FileOptions__Output as _google_protobuf_FileOptions__Output } from './google/protobuf/FileOptions';
import type { GeneratedCodeInfo as _google_protobuf_GeneratedCodeInfo, GeneratedCodeInfo__Output as _google_protobuf_GeneratedCodeInfo__Output } from './google/protobuf/GeneratedCodeInfo';
import type { ListValue as _google_protobuf_ListValue, ListValue__Output as _google_protobuf_ListValue__Output } from './google/protobuf/ListValue';
import type { MessageOptions as _google_protobuf_MessageOptions, MessageOptions__Output as _google_protobuf_MessageOptions__Output } from './google/protobuf/MessageOptions';
import type { MethodDescriptorProto as _google_protobuf_MethodDescriptorProto, MethodDescriptorProto__Output as _google_protobuf_MethodDescriptorProto__Output } from './google/protobuf/MethodDescriptorProto';
import type { MethodOptions as _google_protobuf_MethodOptions, MethodOptions__Output as _google_protobuf_MethodOptions__Output } from './google/protobuf/MethodOptions';
import type { OneofDescriptorProto as _google_protobuf_OneofDescriptorProto, OneofDescriptorProto__Output as _google_protobuf_OneofDescriptorProto__Output } from './google/protobuf/OneofDescriptorProto';
import type { OneofOptions as _google_protobuf_OneofOptions, OneofOptions__Output as _google_protobuf_OneofOptions__Output } from './google/protobuf/OneofOptions';
import type { ServiceDescriptorProto as _google_protobuf_ServiceDescriptorProto, ServiceDescriptorProto__Output as _google_protobuf_ServiceDescriptorProto__Output } from './google/protobuf/ServiceDescriptorProto';
import type { ServiceOptions as _google_protobuf_ServiceOptions, ServiceOptions__Output as _google_protobuf_ServiceOptions__Output } from './google/protobuf/ServiceOptions';
import type { SourceCodeInfo as _google_protobuf_SourceCodeInfo, SourceCodeInfo__Output as _google_protobuf_SourceCodeInfo__Output } from './google/protobuf/SourceCodeInfo';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from './google/protobuf/Struct';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from './google/protobuf/Timestamp';
import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from './google/protobuf/UninterpretedOption';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from './google/protobuf/Value';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  a2a: {
    v1: {
      A2AService: SubtypeConstructor<typeof grpc.Client, _a2a_v1_A2AServiceClient> & { service: _a2a_v1_A2AServiceDefinition }
      APIKeySecurityScheme: MessageTypeDefinition<_a2a_v1_APIKeySecurityScheme, _a2a_v1_APIKeySecurityScheme__Output>
      AgentCapabilities: MessageTypeDefinition<_a2a_v1_AgentCapabilities, _a2a_v1_AgentCapabilities__Output>
      AgentCard: MessageTypeDefinition<_a2a_v1_AgentCard, _a2a_v1_AgentCard__Output>
      AgentCardSignature: MessageTypeDefinition<_a2a_v1_AgentCardSignature, _a2a_v1_AgentCardSignature__Output>
      AgentExtension: MessageTypeDefinition<_a2a_v1_AgentExtension, _a2a_v1_AgentExtension__Output>
      AgentInterface: MessageTypeDefinition<_a2a_v1_AgentInterface, _a2a_v1_AgentInterface__Output>
      AgentProvider: MessageTypeDefinition<_a2a_v1_AgentProvider, _a2a_v1_AgentProvider__Output>
      AgentSkill: MessageTypeDefinition<_a2a_v1_AgentSkill, _a2a_v1_AgentSkill__Output>
      Artifact: MessageTypeDefinition<_a2a_v1_Artifact, _a2a_v1_Artifact__Output>
      AuthenticationInfo: MessageTypeDefinition<_a2a_v1_AuthenticationInfo, _a2a_v1_AuthenticationInfo__Output>
      AuthorizationCodeOAuthFlow: MessageTypeDefinition<_a2a_v1_AuthorizationCodeOAuthFlow, _a2a_v1_AuthorizationCodeOAuthFlow__Output>
      CancelTaskRequest: MessageTypeDefinition<_a2a_v1_CancelTaskRequest, _a2a_v1_CancelTaskRequest__Output>
      ClientCredentialsOAuthFlow: MessageTypeDefinition<_a2a_v1_ClientCredentialsOAuthFlow, _a2a_v1_ClientCredentialsOAuthFlow__Output>
      DataPart: MessageTypeDefinition<_a2a_v1_DataPart, _a2a_v1_DataPart__Output>
      DeleteTaskPushNotificationConfigRequest: MessageTypeDefinition<_a2a_v1_DeleteTaskPushNotificationConfigRequest, _a2a_v1_DeleteTaskPushNotificationConfigRequest__Output>
      FilePart: MessageTypeDefinition<_a2a_v1_FilePart, _a2a_v1_FilePart__Output>
      GetExtendedAgentCardRequest: MessageTypeDefinition<_a2a_v1_GetExtendedAgentCardRequest, _a2a_v1_GetExtendedAgentCardRequest__Output>
      GetTaskPushNotificationConfigRequest: MessageTypeDefinition<_a2a_v1_GetTaskPushNotificationConfigRequest, _a2a_v1_GetTaskPushNotificationConfigRequest__Output>
      GetTaskRequest: MessageTypeDefinition<_a2a_v1_GetTaskRequest, _a2a_v1_GetTaskRequest__Output>
      HTTPAuthSecurityScheme: MessageTypeDefinition<_a2a_v1_HTTPAuthSecurityScheme, _a2a_v1_HTTPAuthSecurityScheme__Output>
      ImplicitOAuthFlow: MessageTypeDefinition<_a2a_v1_ImplicitOAuthFlow, _a2a_v1_ImplicitOAuthFlow__Output>
      ListTaskPushNotificationConfigRequest: MessageTypeDefinition<_a2a_v1_ListTaskPushNotificationConfigRequest, _a2a_v1_ListTaskPushNotificationConfigRequest__Output>
      ListTaskPushNotificationConfigResponse: MessageTypeDefinition<_a2a_v1_ListTaskPushNotificationConfigResponse, _a2a_v1_ListTaskPushNotificationConfigResponse__Output>
      ListTasksRequest: MessageTypeDefinition<_a2a_v1_ListTasksRequest, _a2a_v1_ListTasksRequest__Output>
      ListTasksResponse: MessageTypeDefinition<_a2a_v1_ListTasksResponse, _a2a_v1_ListTasksResponse__Output>
      Message: MessageTypeDefinition<_a2a_v1_Message, _a2a_v1_Message__Output>
      MutualTlsSecurityScheme: MessageTypeDefinition<_a2a_v1_MutualTlsSecurityScheme, _a2a_v1_MutualTlsSecurityScheme__Output>
      OAuth2SecurityScheme: MessageTypeDefinition<_a2a_v1_OAuth2SecurityScheme, _a2a_v1_OAuth2SecurityScheme__Output>
      OAuthFlows: MessageTypeDefinition<_a2a_v1_OAuthFlows, _a2a_v1_OAuthFlows__Output>
      OpenIdConnectSecurityScheme: MessageTypeDefinition<_a2a_v1_OpenIdConnectSecurityScheme, _a2a_v1_OpenIdConnectSecurityScheme__Output>
      Part: MessageTypeDefinition<_a2a_v1_Part, _a2a_v1_Part__Output>
      PasswordOAuthFlow: MessageTypeDefinition<_a2a_v1_PasswordOAuthFlow, _a2a_v1_PasswordOAuthFlow__Output>
      PushNotificationConfig: MessageTypeDefinition<_a2a_v1_PushNotificationConfig, _a2a_v1_PushNotificationConfig__Output>
      Role: EnumTypeDefinition
      Security: MessageTypeDefinition<_a2a_v1_Security, _a2a_v1_Security__Output>
      SecurityScheme: MessageTypeDefinition<_a2a_v1_SecurityScheme, _a2a_v1_SecurityScheme__Output>
      SendMessageConfiguration: MessageTypeDefinition<_a2a_v1_SendMessageConfiguration, _a2a_v1_SendMessageConfiguration__Output>
      SendMessageRequest: MessageTypeDefinition<_a2a_v1_SendMessageRequest, _a2a_v1_SendMessageRequest__Output>
      SendMessageResponse: MessageTypeDefinition<_a2a_v1_SendMessageResponse, _a2a_v1_SendMessageResponse__Output>
      SetTaskPushNotificationConfigRequest: MessageTypeDefinition<_a2a_v1_SetTaskPushNotificationConfigRequest, _a2a_v1_SetTaskPushNotificationConfigRequest__Output>
      StreamResponse: MessageTypeDefinition<_a2a_v1_StreamResponse, _a2a_v1_StreamResponse__Output>
      StringList: MessageTypeDefinition<_a2a_v1_StringList, _a2a_v1_StringList__Output>
      SubscribeToTaskRequest: MessageTypeDefinition<_a2a_v1_SubscribeToTaskRequest, _a2a_v1_SubscribeToTaskRequest__Output>
      Task: MessageTypeDefinition<_a2a_v1_Task, _a2a_v1_Task__Output>
      TaskArtifactUpdateEvent: MessageTypeDefinition<_a2a_v1_TaskArtifactUpdateEvent, _a2a_v1_TaskArtifactUpdateEvent__Output>
      TaskPushNotificationConfig: MessageTypeDefinition<_a2a_v1_TaskPushNotificationConfig, _a2a_v1_TaskPushNotificationConfig__Output>
      TaskState: EnumTypeDefinition
      TaskStatus: MessageTypeDefinition<_a2a_v1_TaskStatus, _a2a_v1_TaskStatus__Output>
      TaskStatusUpdateEvent: MessageTypeDefinition<_a2a_v1_TaskStatusUpdateEvent, _a2a_v1_TaskStatusUpdateEvent__Output>
    }
  }
  google: {
    api: {
      ClientLibraryDestination: EnumTypeDefinition
      ClientLibraryOrganization: EnumTypeDefinition
      ClientLibrarySettings: MessageTypeDefinition<_google_api_ClientLibrarySettings, _google_api_ClientLibrarySettings__Output>
      CommonLanguageSettings: MessageTypeDefinition<_google_api_CommonLanguageSettings, _google_api_CommonLanguageSettings__Output>
      CppSettings: MessageTypeDefinition<_google_api_CppSettings, _google_api_CppSettings__Output>
      CustomHttpPattern: MessageTypeDefinition<_google_api_CustomHttpPattern, _google_api_CustomHttpPattern__Output>
      DotnetSettings: MessageTypeDefinition<_google_api_DotnetSettings, _google_api_DotnetSettings__Output>
      FieldBehavior: EnumTypeDefinition
      GoSettings: MessageTypeDefinition<_google_api_GoSettings, _google_api_GoSettings__Output>
      Http: MessageTypeDefinition<_google_api_Http, _google_api_Http__Output>
      HttpRule: MessageTypeDefinition<_google_api_HttpRule, _google_api_HttpRule__Output>
      JavaSettings: MessageTypeDefinition<_google_api_JavaSettings, _google_api_JavaSettings__Output>
      LaunchStage: EnumTypeDefinition
      MethodSettings: MessageTypeDefinition<_google_api_MethodSettings, _google_api_MethodSettings__Output>
      NodeSettings: MessageTypeDefinition<_google_api_NodeSettings, _google_api_NodeSettings__Output>
      PhpSettings: MessageTypeDefinition<_google_api_PhpSettings, _google_api_PhpSettings__Output>
      Publishing: MessageTypeDefinition<_google_api_Publishing, _google_api_Publishing__Output>
      PythonSettings: MessageTypeDefinition<_google_api_PythonSettings, _google_api_PythonSettings__Output>
      RubySettings: MessageTypeDefinition<_google_api_RubySettings, _google_api_RubySettings__Output>
      SelectiveGapicGeneration: MessageTypeDefinition<_google_api_SelectiveGapicGeneration, _google_api_SelectiveGapicGeneration__Output>
    }
    protobuf: {
      DescriptorProto: MessageTypeDefinition<_google_protobuf_DescriptorProto, _google_protobuf_DescriptorProto__Output>
      Duration: MessageTypeDefinition<_google_protobuf_Duration, _google_protobuf_Duration__Output>
      Edition: EnumTypeDefinition
      Empty: MessageTypeDefinition<_google_protobuf_Empty, _google_protobuf_Empty__Output>
      EnumDescriptorProto: MessageTypeDefinition<_google_protobuf_EnumDescriptorProto, _google_protobuf_EnumDescriptorProto__Output>
      EnumOptions: MessageTypeDefinition<_google_protobuf_EnumOptions, _google_protobuf_EnumOptions__Output>
      EnumValueDescriptorProto: MessageTypeDefinition<_google_protobuf_EnumValueDescriptorProto, _google_protobuf_EnumValueDescriptorProto__Output>
      EnumValueOptions: MessageTypeDefinition<_google_protobuf_EnumValueOptions, _google_protobuf_EnumValueOptions__Output>
      ExtensionRangeOptions: MessageTypeDefinition<_google_protobuf_ExtensionRangeOptions, _google_protobuf_ExtensionRangeOptions__Output>
      FeatureSet: MessageTypeDefinition<_google_protobuf_FeatureSet, _google_protobuf_FeatureSet__Output>
      FeatureSetDefaults: MessageTypeDefinition<_google_protobuf_FeatureSetDefaults, _google_protobuf_FeatureSetDefaults__Output>
      FieldDescriptorProto: MessageTypeDefinition<_google_protobuf_FieldDescriptorProto, _google_protobuf_FieldDescriptorProto__Output>
      FieldOptions: MessageTypeDefinition<_google_protobuf_FieldOptions, _google_protobuf_FieldOptions__Output>
      FileDescriptorProto: MessageTypeDefinition<_google_protobuf_FileDescriptorProto, _google_protobuf_FileDescriptorProto__Output>
      FileDescriptorSet: MessageTypeDefinition<_google_protobuf_FileDescriptorSet, _google_protobuf_FileDescriptorSet__Output>
      FileOptions: MessageTypeDefinition<_google_protobuf_FileOptions, _google_protobuf_FileOptions__Output>
      GeneratedCodeInfo: MessageTypeDefinition<_google_protobuf_GeneratedCodeInfo, _google_protobuf_GeneratedCodeInfo__Output>
      ListValue: MessageTypeDefinition<_google_protobuf_ListValue, _google_protobuf_ListValue__Output>
      MessageOptions: MessageTypeDefinition<_google_protobuf_MessageOptions, _google_protobuf_MessageOptions__Output>
      MethodDescriptorProto: MessageTypeDefinition<_google_protobuf_MethodDescriptorProto, _google_protobuf_MethodDescriptorProto__Output>
      MethodOptions: MessageTypeDefinition<_google_protobuf_MethodOptions, _google_protobuf_MethodOptions__Output>
      NullValue: EnumTypeDefinition
      OneofDescriptorProto: MessageTypeDefinition<_google_protobuf_OneofDescriptorProto, _google_protobuf_OneofDescriptorProto__Output>
      OneofOptions: MessageTypeDefinition<_google_protobuf_OneofOptions, _google_protobuf_OneofOptions__Output>
      ServiceDescriptorProto: MessageTypeDefinition<_google_protobuf_ServiceDescriptorProto, _google_protobuf_ServiceDescriptorProto__Output>
      ServiceOptions: MessageTypeDefinition<_google_protobuf_ServiceOptions, _google_protobuf_ServiceOptions__Output>
      SourceCodeInfo: MessageTypeDefinition<_google_protobuf_SourceCodeInfo, _google_protobuf_SourceCodeInfo__Output>
      Struct: MessageTypeDefinition<_google_protobuf_Struct, _google_protobuf_Struct__Output>
      SymbolVisibility: EnumTypeDefinition
      Timestamp: MessageTypeDefinition<_google_protobuf_Timestamp, _google_protobuf_Timestamp__Output>
      UninterpretedOption: MessageTypeDefinition<_google_protobuf_UninterpretedOption, _google_protobuf_UninterpretedOption__Output>
      Value: MessageTypeDefinition<_google_protobuf_Value, _google_protobuf_Value__Output>
    }
  }
}

