import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'main.js',
  output: {
    file: 'package/lib/aux4-mdb.mjs',
    format: 'es',
    banner: '#!/usr/bin/env node',
    inlineDynamicImports: true
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      browser: false,
      exportConditions: ['node']
    }),
    commonjs(),
    json()
  ],
  external: [
    'fs',
    'fs/promises',
    'path',
    'crypto',
    'util',
    'stream',
    'url',
    'events',
    'buffer',
    'process',
    'os',
    'zlib'
  ]
};
