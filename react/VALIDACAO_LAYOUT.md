# Validação do layout da SPA — Sprint 6

Data: 17/09/2026.

## Verificações de código

Executadas na pasta `react/`, com as dependências já existentes:

- `npm run build`: concluído com sucesso (Vite 8.2.2, 26 módulos).
- `npm run lint -- --max-warnings 0`: concluído sem erros e sem avisos.
- `git diff --check`: concluído sem erros de whitespace.

Para resolver dois erros preexistentes de lint, foram omitidos apenas os nomes não utilizados da desestruturação de props do Header e do retorno de useState do contato. Os hooks, valores iniciais, setters, handlers e regras de navegação foram preservados.

## Verificação no navegador

SPA executada no Vite local e verificada com Microsoft Edge em modo headless, usando Node.js e o protocolo de depuração do navegador, sem instalar bibliotecas. As verificações mediram elementos renderizados e acionaram os controles reais da página.

Em viewport de 1440 × 1000:

- Login: body sem margem superior; footer estático entre y=943 e y=1000.
- Produtos: header em y=0; footer estático entre y=4692 e y=4749, após o catálogo, sem sobreposição.
- Carrinho: header em y=0; conteúdo começa em y=64; breadcrumb/título entre y=119 e y=186; grid começa em y=221; footer entre y=943 e y=1000.
- Botões de quantidade do primeiro produto: incremento de 1 para 2 e decremento de 2 para 1.
- Contato: header em y=0; footer entre y=943 e y=1000.

Em viewport de 390 × 844, carrinho e contato mantiveram o footer após o conteúdo e o carrinho manteve o título acima do grid. Há uma limitação preexistente no menu global: seus elementos excedem a largura da viewport e provocam rolagem horizontal. A responsividade desse menu não foi ampliada nesta correção.

## Escopo

Espaçamento superior restrito ao login, footer no fluxo normal com Flexbox e carrinho com fluxo vertical e botões de quantidade com estilo compartilhado. Nenhuma dependência foi instalada; a lógica e o estado do React foram preservados. O container #app-root já possuía a configuração Flexbox necessária.
