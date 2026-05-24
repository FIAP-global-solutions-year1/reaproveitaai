let contador = 0;
let carrinho = document.querySelector('.carrinho');
let botoes = document.querySelectorAll('.botoes-card button');

carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (0)';

for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function() {
        alert("Item adicionado com sucesso!");
        contador++;
        carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (' + contador + ')';
    });
}