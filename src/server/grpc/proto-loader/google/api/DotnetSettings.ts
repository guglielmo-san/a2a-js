// Original file: node_modules/google-proto-files/google/api/client.proto

import type { CommonLanguageSettings as _google_api_CommonLanguageSettings, CommonLanguageSettings__Output as _google_api_CommonLanguageSettings__Output } from '../../google/api/CommonLanguageSettings';

export interface DotnetSettings {
  'common'?: (_google_api_CommonLanguageSettings | null);
  'renamedServices'?: ({[key: string]: string});
  'renamedResources'?: ({[key: string]: string});
  'ignoredResources'?: (string)[];
  'forcedNamespaceAliases'?: (string)[];
  'handwrittenSignatures'?: (string)[];
}

export interface DotnetSettings__Output {
  'common': (_google_api_CommonLanguageSettings__Output | null);
  'renamedServices': ({[key: string]: string});
  'renamedResources': ({[key: string]: string});
  'ignoredResources': (string)[];
  'forcedNamespaceAliases': (string)[];
  'handwrittenSignatures': (string)[];
}
