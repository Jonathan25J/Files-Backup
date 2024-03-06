import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: 'src/main/index.js',
        },
      }
    },
    plugins: [externalizeDepsPlugin(), commonjs(), nodeResolve({ jsnext: true}), copy({
      targets: [
        { src: 'src/renderer/assets/images/*', dest: 'out/assets/images' }
      ]
    })],
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          pages: 'src/renderer/pages/index.html'
        }
      }
    }
  }
})