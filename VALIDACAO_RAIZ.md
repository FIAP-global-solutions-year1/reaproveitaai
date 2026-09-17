# Validação da migração do React para a raiz — Sprint 6

Data: 17/09/2026.

## Estrutura e configurações

- Builds antigos e `react/node_modules/` removidos antes da migração.
- Código-fonte, assets, manifests, lockfile, configurações do Vite e ESLint, entrada HTML, `.gitignore` e registros históricos movidos com `git mv` para a raiz.
- Git reconheceu as migrações do código e assets com 100% de identidade; a lógica React e o CSS foram preservados.
- README do projeto atualizado para execução na raiz; o README de exemplo do Vite foi removido.
- Workflow atualizado para instalar, validar e compilar na raiz, usar `package-lock.json` para o cache e publicar `dist/`.
- `vercel.json`: `$schema` com URL simples, `installCommand: npm install`, `buildCommand: npm run build`, `outputDirectory: dist` e rewrite da SPA para `/index.html`.
- Os campos utilizados do Vercel foram validados com o Ajv existente e as regras do schema oficial. A validação isolou os campos configurados para evitar seções experimentais não utilizadas incompatíveis com o validador.
- `.gitignore` cobre `node_modules/`, `dist/`, `.env`, `.vscode/` e `.idea/`, incluindo `extensions.json`.

## Verificações executadas na raiz

- `npm install`: sucesso; 135 pacotes instalados a partir das dependências existentes, zero vulnerabilidades reportadas. Manifest e lockfile permanecem correspondentes; nenhuma nova dependência foi adicionada.
- `npm run dev -- --strictPort`: Vite iniciado em `http://localhost:5173/`, usando a porta padrão sem troca automática.
- Entrada HTML, módulo principal e App respondem com HTTP 200 no servidor local.
- Todas as imagens de `public/img/` respondem com HTTP 200 e conteúdo idêntico ao arquivo local, incluindo o QR Code.
- `npm run build`: sucesso, Vite 8.2.2, 27 módulos; nova pasta `dist/` na raiz.
- Entrada e assets compilados conferidos; imagens de `dist/img/` idênticas às originais.
- `npm run lint -- --max-warnings 0`: zero erros e zero avisos.
- `git check-ignore --no-index`: os cinco caminhos solicitados estão ignorados.
- Nenhum arquivo permanece rastreado sob `react/`; os registros anteriores mantêm os caminhos históricos utilizados à época.
- Nenhum push ou deploy remoto foi executado.

## Pendência local do Windows

A pasta antiga `react/` está vazia e não faz parte do Git, mas o Windows impede sua exclusão por estar em uso. As tentativas de remoção após encerrar o preview anterior também foram bloqueadas. É necessário liberar os processos que usam essa pasta como diretório atual para concluir sua remoção física; novos clones do repositório já não terão esse diretório.
