import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// https://vite.dev/config/
// 'root: ..' faz com que o Vite sirva o projeto a partir do diretório raiz
// (onde está o carrinho.html que carrega este React).
// 'appType: mpa' garante que os arquivos HTML do site estático (index.html,
// produtos.html, faleconosco.html) sejam servidos como estão, sem tentar
// transformá-los em uma SPA React. Apenas carrinho.html é tratado como
// entrada React.
//
// O 'node_modules' está em ./react/node_modules (junto com este config).
// Como o root foi alterado para '..', precisamos redirecionar:
//   - o cache do Vite para ./react/node_modules/.vite
//   - o publicDir para ./react/public
//   - o alias de 'react', 'react-dom' e 'react/jsx-runtime' para os caminhos
//   físicos corretos, já que o Vite procura por padrão em <root>/node_modules
const here = dirname(fileURLToPath(import.meta.url))
const reactDir = resolve(here, 'node_modules')

export default defineConfig({
  plugins: [react()],
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
