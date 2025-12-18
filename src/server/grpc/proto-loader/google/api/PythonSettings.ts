// Original file: node_modules/google-proto-files/google/api/client.proto

import type { CommonLanguageSettings as _google_api_CommonLanguageSettings, CommonLanguageSettings__Output as _google_api_CommonLanguageSettings__Output } from '../../google/api/CommonLanguageSettings';

export interface _google_api_PythonSettings_ExperimentalFeatures {
  'restAsyncIoEnabled'?: (boolean);
  'protobufPythonicTypesEnabled'?: (boolean);
  'unversionedPackageDisabled'?: (boolean);
}

export interface _google_api_PythonSettings_ExperimentalFeatures__Output {
  'restAsyncIoEnabled': (boolean);
  'protobufPythonicTypesEnabled': (boolean);
  'unversionedPackageDisabled': (boolean);
}

export interface PythonSettings {
  'common'?: (_google_api_CommonLanguageSettings | null);
  'experimentalFeatures'?: (_google_api_PythonSettings_ExperimentalFeatures | null);
}

export interface PythonSettings__Output {
  'common': (_google_api_CommonLanguageSettings__Output | null);
  'experimentalFeatures': (_google_api_PythonSettings_ExperimentalFeatures__Output | null);
}
