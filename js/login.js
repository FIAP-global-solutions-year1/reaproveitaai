document.addEventListener("DOMContentLoaded", () => {
    // seletor de tipo de acesso
    const btnEntrar = document.getElementById('btn-entrar');
    const btnCadastro = document.getElementById('btn-cadastro');
    const textoEntrar = btnEntrar.querySelector('p');
    const textoCadastro = btnCadastro.querySelector('p');
    const campoLogin = document.getElementById('campo-login');
    const campoCadastro = document.getElementById('campo-cadastro');

    btnEntrar.addEventListener('click', () => {
        textoEntrar.classList.add('selecionado');
        textoCadastro.classList.remove('selecionado');
        campoLogin.classList.remove('desativado');
        campoCadastro.classList.add('desativado');
    });
    btnCadastro.addEventListener('click', () => {
        textoCadastro.classList.add('selecionado');
        textoEntrar.classList.remove('selecionado');
        campoCadastro.classList.remove('desativado');
        campoLogin.classList.add('desativado');
    });

    // seletor de tipo de usuário
    const gatilhoSeletor = document.getElementById('btn-tipo-usuario');
    const opcoesSeletor = document.querySelector('.opcoes-seletor');
    const textoSeletor = document.querySelector('.texto-seletor');
    const itensOpcoes = document.querySelectorAll('.opcao-customizada');
    const sectionCpf = document.getElementById('section-cadastro-cpf');
    const sectionCnpj = document.getElementById('section-cadastro-cnpj');
    const inputCpf = document.getElementById('section-cadastro-cpf1');
    const inputCnpj = document.getElementById('section-cadastro-cnpj1');

    inputCpf.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    inputCnpj.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9.\-\/]/g, '');
    });

    gatilhoSeletor.addEventListener('click', () => {
        opcoesSeletor.classList.toggle('ativo');
    });

    document.addEventListener('click', (evento) => {
        if (!gatilhoSeletor.contains(evento.target) && !opcoesSeletor.contains(evento.target)) {
            opcoesSeletor.classList.remove('ativo');
        }
    });

    itensOpcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            textoSeletor.textContent = opcao.textContent;
            opcoesSeletor.classList.remove('ativo');
            const valorSelecionado = opcao.getAttribute('data-value');
            if (valorSelecionado === 'usuario1') { 
                sectionCpf.classList.add('active');
                sectionCpf.classList.remove('desativado');
                sectionCnpj.classList.remove('active');
                sectionCnpj.classList.add('desativado');            
                inputCpf.required = true;
                inputCnpj.required = false;
            } 
            else { 
                sectionCnpj.classList.add('active');
                sectionCnpj.classList.remove('desativado');
                sectionCpf.classList.remove('active');
                sectionCpf.classList.add('desativado');
                inputCnpj.required = true;
                inputCpf.required = false;
            }
        });
    });
});

const campoCadastro = document.getElementById('campo-cadastro');
campoCadastro.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Conta criada com sucesso! Bem-vindo ao ReaproveitaAi. Redirecionando para a área de produtos...");
    window.location.href = "produtos.html";
});