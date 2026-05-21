/* ================================================================
   ARQUIVO: js/script.js
   PROJETO: ReaproveitaAí — Tela 2 (Feed / Home)
   ALUNO  : Pedro Zigi & Arthur
   CURSO  : Engenharia de Software

   O QUE ESSE ARQUIVO FAZ:
   1. Guarda a lista de produtos (dados simulados, sem back-end)
   2. Renderiza os cards na tela — RF 2.1
   3. Controla os filtros da barra — RF 2.2
   4. Controla a busca por texto
   5. Exibe o toast de confirmação ao reservar — RF 2.1.5
   ================================================================ */


/* ----------------------------------------------------------------
   DADOS SIMULADOS DOS PRODUTOS
   Em um projeto real, esses dados viriam de uma API/back-end.
   Por enquanto, usamos um array de objetos JavaScript.

   Cada objeto tem:
   - emoji     : ícone que representa o alimento (substitui foto)
   - nome      : nome do estabelecimento           → RF 2.1.2
   - descricao : descrição curta do produto
   - distancia : distância até o usuário           → RF 2.1.3
   - preco     : valor ou "Gratuito"               → RF 2.1.4
   - gratuito  : true = doação | false = pago
   - tipo      : 'proximidade' ou 'doacoes' (usado no filtro)
   ---------------------------------------------------------------- */
const listaDeProdutos = [
  {
    emoji:     '🍞',
    nome:      'Padaria São João',
    descricao: 'Pão artesanal do dia',
    distancia: '0,4 km',
    preco:     'R$ 3,50',
    gratuito:  false,
    tipo:      'proximidade'
  },
  {
    emoji:     '🥗',
    nome:      'Horta Viva',
    descricao: 'Cesta de vegetais frescos',
    distancia: '0,8 km',
    preco:     'Gratuito',
    gratuito:  true,
    tipo:      'doacoes'
  },
  {
    emoji:     '🍕',
    nome:      'Pizzaria Central',
    descricao: 'Fatias do almoço',
    distancia: '1,1 km',
    preco:     'R$ 5,00',
    gratuito:  false,
    tipo:      'proximidade'
  },
  {
    emoji:     '🍎',
    nome:      'Feirinha Orgânica',
    descricao: 'Frutas da temporada',
    distancia: '1,5 km',
    preco:     'R$ 2,00',
    gratuito:  false,
    tipo:      'proximidade'
  },
  {
    emoji:     '🥩',
    nome:      'Açougue do Bairro',
    descricao: 'Cortes especiais',
    distancia: '2,0 km',
    preco:     'R$ 12,00',
    gratuito:  false,
    tipo:      'proximidade'
  },
  {
    emoji:     '🍜',
    nome:      'ONG Prato Cheio',
    descricao: 'Refeição completa',
    distancia: '2,3 km',
    preco:     'Gratuito',
    gratuito:  true,
    tipo:      'doacoes'
  },
  {
    emoji:     '🧃',
    nome:      'Mercado Verde',
    descricao: 'Sucos naturais',
    distancia: '2,7 km',
    preco:     'R$ 4,00',
    gratuito:  false,
    tipo:      'proximidade'
  },
  {
    emoji:     '🥖',
    nome:      'Casa de Pão',
    descricao: 'Baguetes e pães integrais',
    distancia: '3,1 km',
    preco:     'Gratuito',
    gratuito:  true,
    tipo:      'doacoes'
  },
];


/* ----------------------------------------------------------------
   FUNÇÃO: renderizarFeed()
   Responsável por montar e exibir os cards na tela.
   Chamada uma vez quando a página carrega.
   ---------------------------------------------------------------- */
function renderizarFeed() {

  /* Pega os elementos do HTML que vamos manipular */
  const elementoFeed  = document.getElementById('feed');
  const elementoVazio = document.getElementById('estadoVazio');

  /* Limpa os cards anteriores antes de desenhar os novos */
  elementoFeed.innerHTML = '';

  /* ── PASSO 1: Mostrar estado vazio se não houver produtos ── */
  if (listaDeProdutos.length === 0) {
    elementoFeed.style.display  = 'none';
    elementoVazio.style.display = 'block';
    return; // para de executar aqui
  }

  /* Garante que o feed aparece e o estado vazio some */
  elementoFeed.style.display  = 'grid';
  elementoVazio.style.display = 'none';

  /* ── PASSO 2: Criar e inserir um card para cada produto ── */
  listaDeProdutos.forEach(function(produto) {

    /* Cria a div do card */
    const card = document.createElement('div');
    card.className = 'card';

    /*
      Define qual badge usar:
      - Gratuito → badge verde
      - Pago     → badge laranja/amarelo
    */
    const classeBadge  = produto.gratuito ? 'badge-gratuito' : 'badge-pago';
    const textoBadge   = produto.gratuito ? '🎁 Gratuito'    : produto.preco;

    /*
      Define o botão:
      - Gratuito → "Solicitar doação" com estilo diferente
      - Pago     → "Reservar" com estilo padrão
    */
    const classeBtn  = produto.gratuito ? 'btn-reservar gratuito' : 'btn-reservar';
    const textoBtn   = produto.gratuito ? 'Solicitar doação'      : 'Reservar';

    /*
      Monta o HTML interno do card usando template literal (crase ``)
      Cada parte do card corresponde a um Requisito Funcional:
    */
    card.innerHTML = `
      <!-- RF 2.1.1 — Imagem ilustrativa do alimento -->
      <div class="card-imagem">${produto.emoji}</div>

      <div class="card-corpo">

        <!-- RF 2.1.4 — Preço ou indicativo de "Gratuito" -->
        <span class="badge ${classeBadge}">${textoBadge}</span>

        <!-- RF 2.1.2 — Nome do estabelecimento -->
        <div class="card-nome">${produto.nome}</div>

        <!-- RF 2.1.3 — Distância aproximada -->
        <div class="card-distancia">📍 a ${produto.distancia}</div>

        <!-- RF 2.1.5 — Botão simulado de "Reservar" -->
        <button class="${classeBtn}" onclick="aoClicarReservar(event, '${produto.nome}', ${produto.gratuito})">
          ${textoBtn}
        </button>

      </div>
    `;

    /* Adiciona o card criado dentro da grade (#feed) */
    elementoFeed.appendChild(card);
  });
}


/* ----------------------------------------------------------------
   FUNÇÃO: aoClicarReservar(evento, nomeEstabelecimento, ehGratuito)
   Chamada quando o usuário clica em "Reservar" ou "Solicitar doação"
   RF 2.1.5 — Botão simulado de "Reservar"

   Parâmetros:
   - evento              : o evento de clique (para não propagar)
   - nomeEstabelecimento : nome do local onde o produto está
   - ehGratuito          : true se for doação, false se for pago
   ---------------------------------------------------------------- */
function aoClicarReservar(evento, nomeEstabelecimento, ehGratuito) {

  /*
    stopPropagation() impede que o clique no botão
    "propague" para o card pai (evita comportamentos indesejados)
  */
  evento.stopPropagation();

  /* Monta a mensagem conforme o tipo de produto */
  let mensagem;
  if (ehGratuito) {
    mensagem = '🤝 Solicitação enviada para ' + nomeEstabelecimento + '!';
  } else {
    mensagem = '✅ Reservado em ' + nomeEstabelecimento + '!';
  }

  /* Exibe o toast com a mensagem */
  exibirToast(mensagem);
}


/* ----------------------------------------------------------------
   FUNÇÃO: exibirToast(mensagem)
   Mostra uma notificação flutuante na parte inferior da tela
   e a esconde automaticamente após 2,8 segundos.

   Parâmetro:
   - mensagem : texto que aparece na notificação
   ---------------------------------------------------------------- */
function exibirToast(mensagem) {
  const elementoToast = document.getElementById('toast');

  /* Define o texto e torna o toast visível */
  elementoToast.textContent = mensagem;
  elementoToast.classList.add('visivel');

  /*
    setTimeout executa a função após 2800 milissegundos (2,8 s).
    Remove a classe 'visivel', fazendo o toast desaparecer com animação.
  */
  setTimeout(function() {
    elementoToast.classList.remove('visivel');
  }, 2800);
}


/* ----------------------------------------------------------------
   INICIALIZAÇÃO
   Quando a página carrega, renderiza o feed com todos os produtos.
   ---------------------------------------------------------------- */
renderizarFeed();
