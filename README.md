# Reaproveita Aí — Fase 6

Projeto acadêmico FIAP ON, Engenharia de Software, Sprint 6. A aplicação é uma SPA em React com Vite, com estado via hooks e props e estilos em CSS nativo.

## Estrutura oficial

```text
reaproveitaai/
├── src/components/           # Componentes React
├── src/css/                  # Estilos das telas
├── public/img/               # Assets públicos, incluindo o QR Code
├── .github/workflows/        # Validação e deploy no GitHub Pages
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html                # Entrada oficial do Vite
├── vercel.json
├── README.md
├── GuiaGithub.md
└── dist/                     # Build gerado, ignorado pelo Git
```

O projeto React e suas configurações ficam diretamente na raiz, sem a pasta intermediária `react/`. Os arquivos HTML e diretórios estáticos das Fases 4 e 5 foram removidos; `index.html` é a entrada atual da SPA.

## Execução local

Use Node.js 24 e npm. Execute na raiz do repositório:

```sh
npm install
npm run dev
```

O Vite usa a porta padrão 5173. A instalação utiliza as dependências já declaradas no projeto.

Para validar e visualizar a versão compilada, também na raiz:

```sh
npm run lint -- --max-warnings 0
npm run build
npm run preview
```

O build é gerado em `dist/`. Módulos, builds, arquivos `.env` e configurações locais dos editores são ignorados pelo Git.

## Deploy

Na Vercel, mantenha o Root Directory na raiz do repositório. O `vercel.json` executa `npm install` e `npm run build` sem prefixos de pasta, publica `dist/` e direciona as rotas da SPA para `/index.html`.

O workflow de GitHub Pages usa `package-lock.json` para o cache, executa `npm ci`, lint e build na raiz e envia diretamente `dist/` como artefato.

## Registros de validação

- [Layout e responsividade](VALIDACAO_LAYOUT.md)
- [Carrinho dinâmico e QR Code](VALIDACAO_CARRINHO.md)
- [Limpeza anterior da estrutura](VALIDACAO_ESTRUTURA.md)
- [Migração do React para a raiz](VALIDACAO_RAIZ.md)

Os registros anteriores preservam os caminhos utilizados à época. O fluxo de versionamento do grupo está documentado em [GuiaGithub.md](GuiaGithub.md).
