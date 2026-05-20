const formContato = document.getElementById('formContato');
formContato.addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    alert(`Mensagem enviada com sucesso, ${nome}! Nossa equipe retornará em breve.`);
    formContato.reset();
});
