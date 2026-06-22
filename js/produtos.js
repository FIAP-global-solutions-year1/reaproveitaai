let contador = 0;
let carrinho = document.querySelector('.carrinho');

carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (0)';

document.addEventListener('click', function(evento) {
    if (evento.target.tagName === 'BUTTON') {
        alert("Item adicionado com sucesso!");
        contador++;
        carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (' + contador + ')';
    }
});

const ofertas = [
  { nome: "Pães Frescos", preco: "Grátis" },
  { nome: "SOPA", preco: "Grátis" },
  { nome: "Cenoura", preco: "R$ 1,99" }
];

const listaNotificacao = document.getElementById("lista-notificacao");

listaNotificacao.innerHTML = ofertas
  .map(item => `<li>${item.nome} - ${item.preco}</li>`)
  .join("");

const btnNotificacao = document.getElementById("btn-notificacao");
const caixaNotificacao = document.getElementById("caixa-notificacao");

btnNotificacao.addEventListener("click", function () {
  caixaNotificacao.classList.toggle("escondido");
});