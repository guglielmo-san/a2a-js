// Original file: src/server/grpc/a2a.proto

export const Role = {
  ROLE_UNSPECIFIED: 'ROLE_UNSPECIFIED',
  ROLE_USER: 'ROLE_USER',
  ROLE_AGENT: 'ROLE_AGENT',
} as const;

export type Role =
  | 'ROLE_UNSPECIFIED'
  | 0
  | 'ROLE_USER'
  | 1
  | 'ROLE_AGENT'
  | 2

export type Role__Output = typeof Role[keyof typeof Role]
