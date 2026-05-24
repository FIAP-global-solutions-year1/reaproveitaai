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