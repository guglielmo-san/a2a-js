// Original file: node_modules/google-proto-files/google/api/client.proto

import type { LaunchStage as _google_api_LaunchStage, LaunchStage__Output as _google_api_LaunchStage__Output } from '../../google/api/LaunchStage';
import type { JavaSettings as _google_api_JavaSettings, JavaSettings__Output as _google_api_JavaSettings__Output } from '../../google/api/JavaSettings';
import type { CppSettings as _google_api_CppSettings, CppSettings__Output as _google_api_CppSettings__Output } from '../../google/api/CppSettings';
import type { PhpSettings as _google_api_PhpSettings, PhpSettings__Output as _google_api_PhpSettings__Output } from '../../google/api/PhpSettings';
import type { PythonSettings as _google_api_PythonSettings, PythonSettings__Output as _google_api_PythonSettings__Output } from '../../google/api/PythonSettings';
import type { NodeSettings as _google_api_NodeSettings, NodeSettings__Output as _google_api_NodeSettings__Output } from '../../google/api/NodeSettings';
import type { DotnetSettings as _google_api_DotnetSettings, DotnetSettings__Output as _google_api_DotnetSettings__Output } from '../../google/api/DotnetSettings';
import type { RubySettings as _google_api_RubySettings, RubySettings__Output as _google_api_RubySettings__Output } from '../../google/api/RubySettings';
import type { GoSettings as _google_api_GoSettings, GoSettings__Output as _google_api_GoSettings__Output } from '../../google/api/GoSettings';

export interface ClientLibrarySettings {
  'version'?: (string);
  'launchStage'?: (_google_api_LaunchStage);
  'restNumericEnums'?: (boolean);
  'javaSettings'?: (_google_api_JavaSettings | null);
  'cppSettings'?: (_google_api_CppSettings | null);
  'phpSettings'?: (_google_api_PhpSettings | null);
  'pythonSettings'?: (_google_api_PythonSettings | null);
  'nodeSettings'?: (_google_api_NodeSettings | null);
  'dotnetSettings'?: (_google_api_DotnetSettings | null);
  'rubySettings'?: (_google_api_RubySettings | null);
  'goSettings'?: (_google_api_GoSettings | null);
}

export interface ClientLibrarySettings__Output {
  'version': (string);
  'launchStage': (_google_api_LaunchStage__Output);
  'restNumericEnums': (boolean);
  'javaSettings': (_google_api_JavaSettings__Output | null);
  'cppSettings': (_google_api_CppSettings__Output | null);
  'phpSettings': (_google_api_PhpSettings__Output | null);
  'pythonSettings': (_google_api_PythonSettings__Output | null);
  'nodeSettings': (_google_api_NodeSettings__Output | null);
  'dotnetSettings': (_google_api_DotnetSettings__Output | null);
  'rubySettings': (_google_api_RubySettings__Output | null);
  'goSettings': (_google_api_GoSettings__Output | null);
}
