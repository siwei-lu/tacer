import typescript from 'rollup-plugin-typescript2'
import autoExternal from 'rollup-plugin-auto-external'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    autoExternal(),
    typescript(),
    terser(),
  ],
}