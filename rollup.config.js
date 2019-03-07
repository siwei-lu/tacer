import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    terser(),
  ],
  external: [
    'path',
    'fs',
    'child_process',
    'readline',
    'commander',
  ]
}