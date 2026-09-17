# Validação do carrinho dinâmico e QR Code — Sprint 6

Data: 17/09/2026.

## Implementação

- `App.jsx` mantém `itensCarrinho` com `useState([])` e controla adição, alteração de quantidade e remoção por props.
- Reservas repetidas incrementam a quantidade do mesmo produto, identificado pelo `id`.
- O contador do Header é a soma das quantidades; preços do catálogo são convertidos para números, incluindo zero para produtos gratuitos.
- `Carrinho.jsx` renderiza os itens recebidos, mantém quantidade mínima de 1 e exibe "Seu carrinho está vazio." quando não há itens. Subtotal, entrega e total ficam zerados no carrinho vazio.
- `Produtos.jsx` envia o produto selecionado ao App no handler de reserva e usa `src="img/qrcode-voucher.png"`, relativo à base `./` configurada no Vite. O asset está em `public/img/` e é copiado para o build.
- Nenhuma biblioteca foi instalada. A implementação usa React, props e JavaScript nativo; o CSS existente foi preservado.

## Verificações executadas

Na pasta `react/`, com as dependências existentes:

- `npm run build`: sucesso, Vite 8.2.2, 27 módulos.
- `npm run lint -- --max-warnings 0`: zero erros e zero avisos.
- `git diff --check`: sem erros de whitespace.

## Interatividade no navegador

A versão compilada foi servida com `npm run preview -- --host 127.0.0.1 --port 4175 --strictPort`. O Edge instalado foi executado em modo headless com perfil temporário próprio. Um script temporário usou somente APIs nativas do Node.js e o protocolo de depuração do navegador para acionar os controles renderizados e verificar o DOM, sem instalar dependências.

Resultados:

- Carrinho inicial vazio, sem itens fictícios, contador sem quantidades e total de R$ 0,00.
- Todos os 16 cards reservados individualmente, com nome, quantidade e preço correspondentes no carrinho. Os dois produtos gratuitos tiveram preço zero; o subtotal conjunto foi R$ 112,36 e o total com entrega foi R$ 117,36.
- QR Code carregado em todas as reservas. A primeira reserva confirmou imagem completa de 1024 × 1024 pixels, elemento visível de aproximadamente 171 × 171 pixels e URL local `/img/qrcode-voucher.png`.
- Cronômetro regressivo continuou funcionando após abrir o modal.
- Nova reserva do primeiro produto: 16 linhas mantidas, quantidade de 1 para 2 e Header com 17 unidades.
- Botão `+`: quantidade de 2 para 3 e Header com 18 unidades.
- Botão `-`: quantidade retornou a 1 e permaneceu em 1 após novo decremento; Header retornou a 16 unidades.
- Navegação pelo contato preservou os itens e as quantidades ao retornar ao carrinho.
- Em viewport solicitado de 390 × 844, largura útil e largura de rolagem foram iguais a 375 pixels, sem overflow horizontal.
- Remoção dos 16 itens zerou contador e totais e mostrou a mensagem de carrinho vazio. Os itens removidos não reapareceram ao navegar para Produtos e retornar.
- Zero exceções JavaScript capturadas durante a execução.

O estado permanece enquanto o App está montado; recarregar a página inicia um novo carrinho vazio, conforme o uso de `useState` solicitado.
