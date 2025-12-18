// Original file: node_modules/google-proto-files/google/api/client.proto

export const ClientLibraryOrganization = {
  CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED: 'CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED',
  CLOUD: 'CLOUD',
  ADS: 'ADS',
  PHOTOS: 'PHOTOS',
  STREET_VIEW: 'STREET_VIEW',
  SHOPPING: 'SHOPPING',
  GEO: 'GEO',
  GENERATIVE_AI: 'GENERATIVE_AI',
} as const;

export type ClientLibraryOrganization =
  | 'CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED'
  | 0
  | 'CLOUD'
  | 1
  | 'ADS'
  | 2
  | 'PHOTOS'
  | 3
  | 'STREET_VIEW'
  | 4
  | 'SHOPPING'
  | 5
  | 'GEO'
  | 6
  | 'GENERATIVE_AI'
  | 7

export type ClientLibraryOrganization__Output = typeof ClientLibraryOrganization[keyof typeof ClientLibraryOrganization]
