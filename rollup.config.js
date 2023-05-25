import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import packageJson from './package.json' assert { type: 'json' }
import path from 'path'
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      // css({}),
      postcss({
        // minimize: true,
        // extensions: ['.css'],
        // extract: true,
        // output: 'dist/style.css',
        plugins: [autoprefixer()],
        sourceMap: true,
        extract: true,
        minimize: true,
      }),
      // postcss({
      //   plugins: [autoprefixer()],
      //   sourceMap: true,
      //   extract: true,
      //   minimize: true,
      // }),
      // plugins: [autoprefixer()],
      // modules: true,
      // sourceMap: true,
      // extract: true,
      // minimize: true,
      // }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'src/index.css',
    output: [
      {
        file: packageJson.css,
        format: 'iife',
        sourcemap: 'inline',
        name: 'MyBundle',
      },
    ],
    plugins: [
      postcss({
        // extensions: ['.css'],
        // output: 'dist/style.css',
        plugins: [autoprefixer()],
        modules: true,
        sourceMap: true,
        extract: true,
        minimize: true,
      }),
    ],
  },
]
