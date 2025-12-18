// Original file: node_modules/google-proto-files/google/api/client.proto

export const ClientLibraryDestination = {
  CLIENT_LIBRARY_DESTINATION_UNSPECIFIED: 'CLIENT_LIBRARY_DESTINATION_UNSPECIFIED',
  GITHUB: 'GITHUB',
  PACKAGE_MANAGER: 'PACKAGE_MANAGER',
} as const;

export type ClientLibraryDestination =
  | 'CLIENT_LIBRARY_DESTINATION_UNSPECIFIED'
  | 0
  | 'GITHUB'
  | 10
  | 'PACKAGE_MANAGER'
  | 20

export type ClientLibraryDestination__Output = typeof ClientLibraryDestination[keyof typeof ClientLibraryDestination]
