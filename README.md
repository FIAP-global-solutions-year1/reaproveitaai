# Reaproveita Aí — Fase 6

Projeto acadêmico FIAP ON, Engenharia de Software, Sprint 6. A aplicação é uma SPA em React com Vite, com estado via hooks e props e estilos em CSS nativo.

## Estrutura oficial

```text
reaproveitaai/
├── react/                    # Código-fonte e configuração da SPA
│   ├── src/components/       # Componentes React
│   ├── src/css/              # Estilos das telas
│   ├── public/img/           # Assets públicos, incluindo o QR Code
│   ├── index.html            # Entrada do Vite
│   └── dist/                 # Build gerado, ignorado pelo Git
├── .github/workflows/        # Validação e deploy no GitHub Pages
├── vercel.json               # Deploy do build de react/
├── README.md
└── GuiaGithub.md
```

Os arquivos HTML e os diretórios estáticos das Fases 4 e 5 foram removidos da raiz. A entrada oficial do site é `react/index.html`; o build é gerado exclusivamente em `react/dist/`.

## Execução local

Use Node.js 24 e npm. Na raiz do repositório:

```sh
cd react
npm ci
npm run dev
```

`npm ci` instala apenas as dependências declaradas no lockfile existente.

Para validar e visualizar a versão compilada, dentro de `react/`:

```sh
npm run lint -- --max-warnings 0
npm run build
npm run preview
```

## Deploy

Na Vercel, mantenha o Root Directory na raiz do repositório. O `vercel.json` executa a instalação e o build dentro de `react/`, publica `react/dist/` e direciona as rotas da SPA para `index.html`.

O workflow de GitHub Pages também instala, valida e compila em `react/`, enviando diretamente `react/dist/` como artefato. Ele não copia nem utiliza arquivos legados da raiz.

## Registros de validação

- [Layout e responsividade](react/VALIDACAO_LAYOUT.md)
- [Carrinho dinâmico e QR Code](react/VALIDACAO_CARRINHO.md)
- [Limpeza da estrutura e configuração de deploy](react/VALIDACAO_ESTRUTURA.md)

O fluxo de versionamento do grupo está documentado em [GuiaGithub.md](GuiaGithub.md).
