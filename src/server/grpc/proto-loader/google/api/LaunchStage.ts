// Original file: node_modules/google-proto-files/google/api/launch_stage.proto

export const LaunchStage = {
  LAUNCH_STAGE_UNSPECIFIED: 'LAUNCH_STAGE_UNSPECIFIED',
  UNIMPLEMENTED: 'UNIMPLEMENTED',
  PRELAUNCH: 'PRELAUNCH',
  EARLY_ACCESS: 'EARLY_ACCESS',
  ALPHA: 'ALPHA',
  BETA: 'BETA',
  GA: 'GA',
  DEPRECATED: 'DEPRECATED',
} as const;

export type LaunchStage =
  | 'LAUNCH_STAGE_UNSPECIFIED'
  | 0
  | 'UNIMPLEMENTED'
  | 6
  | 'PRELAUNCH'
  | 7
  | 'EARLY_ACCESS'
  | 1
  | 'ALPHA'
  | 2
  | 'BETA'
  | 3
  | 'GA'
  | 4
  | 'DEPRECATED'
  | 5

export type LaunchStage__Output = typeof LaunchStage[keyof typeof LaunchStage]
