const formContato = document.getElementById('formContato');
formContato.addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const partes = nome.trim().split(" ").filter(p => p !== "");
    if (partes.length < 2) {
        alert("Por favor, insira seu nome e sobrenome.");
        return;
    }
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    alert(`Mensagem enviada com sucesso, ${nome}! Nossa equipe retornará o contato em breve.`);
    formContato.reset();
});
