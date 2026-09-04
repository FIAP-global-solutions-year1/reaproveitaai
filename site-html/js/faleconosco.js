const formContato = document.getElementById('formContato');
const mensagem = document.getElementById('mensagem');
const contador = document.getElementById('contador');
const erroMensagem = document.getElementById('erroMensagem');

mensagem.addEventListener("input", function () {
    contador.textContent = mensagem.value.length;

    if (mensagem.value.length > 500) {
        erroMensagem.style.display = "block";
    } else {
        erroMensagem.style.display = "none";
    }
});

formContato.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const partes = nome.trim().split(" ").filter(p => p !== "");

    if (partes.length < 2) {
        alert("Por favor, insira seu nome e sobrenome.");
        return;
    }

    if (partes[0].length < 2 || partes[1].length < 2) {
        alert("Tanto o nome quanto o sobrenome devem ter no mínimo duas letras.");
        return;
    }

    if (mensagem.value.length > 500) {
        erroMensagem.style.display = "block";
        return;
    }

    alert(`Mensagem enviada com sucesso, ${nome}! Nossa equipe retornará o contato em breve.`);

    formContato.reset();
    contador.textContent = "0";
    erroMensagem.style.display = "none";
});