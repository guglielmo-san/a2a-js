// Original file: node_modules/google-proto-files/google/api/client.proto

import type { MethodSettings as _google_api_MethodSettings, MethodSettings__Output as _google_api_MethodSettings__Output } from '../../google/api/MethodSettings';
import type { ClientLibraryOrganization as _google_api_ClientLibraryOrganization, ClientLibraryOrganization__Output as _google_api_ClientLibraryOrganization__Output } from '../../google/api/ClientLibraryOrganization';
import type { ClientLibrarySettings as _google_api_ClientLibrarySettings, ClientLibrarySettings__Output as _google_api_ClientLibrarySettings__Output } from '../../google/api/ClientLibrarySettings';

export interface Publishing {
  'methodSettings'?: (_google_api_MethodSettings)[];
  'newIssueUri'?: (string);
  'documentationUri'?: (string);
  'apiShortName'?: (string);
  'githubLabel'?: (string);
  'codeownerGithubTeams'?: (string)[];
  'docTagPrefix'?: (string);
  'organization'?: (_google_api_ClientLibraryOrganization);
  'librarySettings'?: (_google_api_ClientLibrarySettings)[];
  'protoReferenceDocumentationUri'?: (string);
  'restReferenceDocumentationUri'?: (string);
}

export interface Publishing__Output {
  'methodSettings': (_google_api_MethodSettings__Output)[];
  'newIssueUri': (string);
  'documentationUri': (string);
  'apiShortName': (string);
  'githubLabel': (string);
  'codeownerGithubTeams': (string)[];
  'docTagPrefix': (string);
  'organization': (_google_api_ClientLibraryOrganization__Output);
  'librarySettings': (_google_api_ClientLibrarySettings__Output)[];
  'protoReferenceDocumentationUri': (string);
  'restReferenceDocumentationUri': (string);
}
