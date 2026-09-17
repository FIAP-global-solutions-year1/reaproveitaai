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

Em viewport de 390 × 844, carrinho e contato mantiveram o footer após o conteúdo e o carrinho manteve o título acima do grid. Na validação inicial foi identificado overflow no menu global. Essa limitação foi resolvida na correção de responsividade registrada abaixo.

## Escopo

Espaçamento superior restrito ao login, footer no fluxo normal com Flexbox e carrinho com fluxo vertical e botões de quantidade com estilo compartilhado. Nenhuma dependência foi instalada; a lógica e o estado do React foram preservados. O container #app-root já possuía a configuração Flexbox necessária.

## Correção de responsividade do menu global

Validação complementar em 17/09/2026, com as dependências já instaladas:

- `npm run build`: sucesso, Vite 8.2.2, 27 módulos.
- `npm run lint -- --max-warnings 0`: zero erros e zero avisos.
- `git diff --check`: sem erros.
- `App.jsx`, `Header.jsx`, hooks e handlers não foram alterados. A única alteração JavaScript foi a importação de App.css em main.jsx.

O Edge headless verificou login, produtos, carrinho e contato nas larguras de 360, 375, 390, 480, 600, 640, 767, 768 e 1440 pixels, com altura de 844 pixels. Em todas, scrollWidth foi igual a clientWidth e os elementos renderizados ficaram dentro da largura útil, sem conteúdo recortado horizontalmente.

Nas telas com Header, os botões Produtos, Fale Conosco, Notificações e Carrinho ficaram visíveis e receberam o teste de clique no centro do controle, sem outro elemento sobreposto. A navegação real entre produtos, carrinho e contato também funcionou.

Em 360 pixels, a caixa de notificações aberta permaneceu dentro da tela e abaixo da navegação; todos os controles do Header continuaram acessíveis. A reserva foi aberta e fechada, e o modal coube na largura disponível. Enquanto o modal está aberto, sua sobreposição bloqueia o Header conforme o comportamento original.

As correções usam CSS puro, Flexbox e media queries básicas: menu com quebra de linha, logo proporcional, margens fixas removidas e limites globais de largura. Os formulários de login, filtros e cards do catálogo também receberam larguras adaptáveis. Os estilos de exemplo não utilizados de App.css foram substituídos pelas regras globais da aplicação.
