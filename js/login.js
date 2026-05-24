const btnEntrar = document.getElementById('btn-entrar');
const btnCadastro = document.getElementById('btn-cadastro');
const textoEntrar = document.querySelector('#btn-entrar p');
const textoCadastro = document.querySelector('#btn-cadastro p');
const campoLogin = document.getElementById('campo-login');
const campoCadastro = document.getElementById('campo-cadastro');
// click no entrar
btnEntrar.addEventListener('click', function() {
    textoEntrar.classList.add('selecionado');
    textoCadastro.classList.remove('selecionado');
    campoLogin.classList.remove('desativado');
    campoCadastro.classList.add('desativado');
});
// click no cadastro
btnCadastro.addEventListener('click', function() {
    textoCadastro.classList.add('selecionado');
    textoEntrar.classList.remove('selecionado');
    campoCadastro.classList.remove('desativado');
    campoLogin.classList.add('desativado');
});

const gatilhoSeletor = document.getElementById('btn-tipo-usuario');
const opcoesSeletor = document.querySelector('.opcoes-seletor');
const textoSeletor = document.querySelector('.texto-seletor');

gatilhoSeletor.addEventListener('click', function() {
    opcoesSeletor.classList.toggle('ativo');
});

// seleção de tipo de user
const opcaoConsumidor = document.querySelector('[data-value="usuario1"]');
const opcaoLojista = document.querySelector('[data-value="usuario2"]');
const opcaoOng = document.querySelector('[data-value="usuario3"]');
const sectionCpf = document.getElementById('section-cadastro-cpf');
const sectionCnpj = document.getElementById('section-cadastro-cnpj');
const inputCpf = document.getElementById('section-cadastro-cpf1');
const inputCnpj = document.getElementById('section-cadastro-cnpj1');

opcaoConsumidor.addEventListener('click', function() {
    textoSeletor.textContent = "Consumidor";
    opcoesSeletor.classList.remove('ativo');
    sectionCpf.classList.remove('desativado');
    sectionCnpj.classList.add('desativado');
    inputCpf.required = true;
    inputCnpj.required = false;
});
opcaoLojista.addEventListener('click', function() {
    textoSeletor.textContent = "Lojista";
    opcoesSeletor.classList.remove('ativo');
    sectionCnpj.classList.remove('desativado');
    sectionCpf.classList.add('desativado');
    inputCnpj.required = true;
    inputCpf.required = false;
});
opcaoOng.addEventListener('click', function() {
    textoSeletor.textContent = "ONG";
    opcoesSeletor.classList.remove('ativo');
    sectionCnpj.classList.remove('desativado');
    sectionCpf.classList.add('desativado');
    inputCnpj.required = true;
    inputCpf.required = false;
});