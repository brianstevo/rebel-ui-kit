import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import packageJson from './package.json' assert { type: 'json' }
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'

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
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        minimize: true,
        // sourceMap: true,
        // modules: true,
      }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      copy({
        targets: [{ src: 'dist/esm/index.css', dest: 'dist', rename: 'styles.css' }],
        verbose: true,
        hook: 'buildStart',
      }),
      del({
        targets: ['dist/cjs/index.css', 'dist/esm/index.css'],
        verbose: true,
        hook: 'buildEnd',
      }),
      dts(),
    ],
    external: [/\.(css|less|scss)$/],
    watch: false,
  },
]
