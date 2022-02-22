import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  minify: true,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true,
  format: ['esm', 'cjs'],
});
