import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  splitting: true,
  sourcemap: true,
  clean: false,
  dts: true,
  format: ['esm', 'cjs'],
});
