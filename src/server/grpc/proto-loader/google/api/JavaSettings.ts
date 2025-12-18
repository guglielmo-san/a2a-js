// Original file: node_modules/google-proto-files/google/api/client.proto

import type { CommonLanguageSettings as _google_api_CommonLanguageSettings, CommonLanguageSettings__Output as _google_api_CommonLanguageSettings__Output } from '../../google/api/CommonLanguageSettings';

export interface JavaSettings {
  'libraryPackage'?: (string);
  'serviceClassNames'?: ({[key: string]: string});
  'common'?: (_google_api_CommonLanguageSettings | null);
}

export interface JavaSettings__Output {
  'libraryPackage': (string);
  'serviceClassNames': ({[key: string]: string});
  'common': (_google_api_CommonLanguageSettings__Output | null);
}
