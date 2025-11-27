// src/samples/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['cli.ts', 'extension/index.ts', 'agents/**/index.ts'],
  outDir: 'dist/samples',
  format: ['esm'],
});
