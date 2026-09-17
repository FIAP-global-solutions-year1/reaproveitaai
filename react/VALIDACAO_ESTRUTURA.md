# Validação da estrutura oficial — Sprint 6

Data: 17/09/2026.

## Limpeza da raiz

- Removidos pelo Git os diretórios legados `css/`, `img/` e `dist/`: 11 arquivos rastreados.
- `js/`, `index.html`, `produtos.html`, `faleconosco.html` e `carrinho.html` já estavam ausentes na raiz. Os comandos de remoção usaram `--ignore-unmatch` para esses caminhos, sem alterar `react/index.html` nem `react/dist/`.
- Antes da remoção, os quatro assets de `img/` foram comparados por SHA-256 com `react/public/img/`: todos idênticos.
- A raiz contém somente `react/`, `vercel.json`, `README.md`, `GuiaGithub.md` e `.github/workflows/`, além do diretório interno `.git`.
- Nenhuma dependência foi instalada nesta tarefa. O código da SPA e seus estilos foram preservados.

## Deploy

- `vercel.json`: instalação com `cd react && npm ci`, build com `cd react && npm run build`, saída `react/dist` e rewrite da SPA para `/index.html`.
- As propriedades utilizadas foram validadas com o Ajv já presente nas dependências e as regras obtidas do [schema oficial da Vercel](https://openapi.vercel.sh/vercel.json). A validação isolou os campos configurados porque seções experimentais não utilizadas do schema misturam versões de JSON Schema incompatíveis com o validador existente.
- O projeto da Vercel deve usar a raiz do repositório como Root Directory, conforme o README.
- O workflow do GitHub Pages publica diretamente `react/dist`, usa `react/package-lock.json` para o cache, executa `npm ci`, lint e build dentro de `react/` e usa Node.js 24, compatível com o requisito do Vite instalado.
- Removida a etapa que montava `public_site` copiando arquivos legados da raiz.
- Nenhum push ou deploy remoto foi executado. O workflow foi revisado localmente; a execução no GitHub permanece a cargo do serviço após o envio dos commits.

## Verificações executadas

- `npm run build`, dentro de `react/`: sucesso, Vite 8.2.2, 27 módulos.
- `npm run lint -- --max-warnings 0`: zero erros e zero avisos.
- `git diff --check` e `git diff --cached --check`: sem erros de whitespace.
- Conferência automatizada da lista de arquivos da raiz e da ausência de todos os caminhos legados.
- Confirmada a presença de `react/index.html` e `react/dist/index.html`.
- Todos os assets de `react/public/img/` foram comparados com os gerados em `react/dist/img/`: conteúdo idêntico, incluindo o QR Code.
- Conferidos os caminhos, os comandos e a ausência de referências legadas no workflow.
