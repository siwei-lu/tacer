import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-flow"
      ],
      plugins: [
        "@babel/plugin-transform-runtime"
      ]
    }),
    terser(),
  ]
}