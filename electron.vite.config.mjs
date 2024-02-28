import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: path.join(path.resolve(), 'src/main/index.js'),
          // ipcHandler: path.join(path.resolve(), 'src/main/ipc/ipcHandler.js')
        },
      }
    },
    plugins: [externalizeDepsPlugin(), commonjs(), nodeResolve({ jsnext: true})],
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          pages: path.join(path.resolve(), 'src/renderer/pages/index.html')
        }
      }
    }
  }
})