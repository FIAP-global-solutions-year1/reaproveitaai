const formContato = document.getElementById('formContato');
formContato.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Mensagem enviada com sucesso! Nossa equipe retornará em breve.");
    formContato.reset();
});
