// Original file: node_modules/google-proto-files/google/api/client.proto

import type { ClientLibraryDestination as _google_api_ClientLibraryDestination, ClientLibraryDestination__Output as _google_api_ClientLibraryDestination__Output } from '../../google/api/ClientLibraryDestination';
import type { SelectiveGapicGeneration as _google_api_SelectiveGapicGeneration, SelectiveGapicGeneration__Output as _google_api_SelectiveGapicGeneration__Output } from '../../google/api/SelectiveGapicGeneration';

export interface CommonLanguageSettings {
  'referenceDocsUri'?: (string);
  'destinations'?: (_google_api_ClientLibraryDestination)[];
  'selectiveGapicGeneration'?: (_google_api_SelectiveGapicGeneration | null);
}

export interface CommonLanguageSettings__Output {
  'referenceDocsUri': (string);
  'destinations': (_google_api_ClientLibraryDestination__Output)[];
  'selectiveGapicGeneration': (_google_api_SelectiveGapicGeneration__Output | null);
}
