import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const reactDir = resolve(here, 'node_modules')

export default defineConfig({
  plugins: [react()],
  base: './',
  root: '..',
  appType: 'mpa',
  cacheDir: resolve(reactDir, '.vite'),
  publicDir: resolve(here, 'public'),
  resolve: {
    alias: {
      react: resolve(reactDir, 'react'),
      'react-dom': resolve(reactDir, 'react-dom'),
      'react/jsx-runtime': resolve(reactDir, 'react', 'jsx-runtime.js'),
      'react/jsx-dev-runtime': resolve(reactDir, 'react', 'jsx-dev-runtime.js'),
    },
  },
  optimizeDeps: {
    include: [],
  },
  build: {
    rollupOptions: {
      input: {
        main: 'carrinho.html',
      },
    },
  },
})

