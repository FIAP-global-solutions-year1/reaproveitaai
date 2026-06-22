// =========================
// CARRINHO - Lógica do Contador
// =========================

var contador = 0;
var carrinho = document.querySelector('.carrinho');

carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (0)';

// =========================
// MODAL DE RESERVA - Elementos do DOM
// =========================

var modalReserva = document.querySelector('#modal-reserva');
var btnFecharModal = document.querySelector('#btn-fechar-modal');
var cronometroElemento = document.querySelector('#modal-cronometro');

// Variável para armazenar o ID do setInterval (necessário para o clearInterval)
var cronometroInterval = null;

// Tempo total da reserva em segundos (2 horas = 7200 segundos)
var TEMPO_RESERVA_SEGUNDOS = 7200;

// =========================
// FUNÇÃO: Formatar segundos para HH:MM:SS
// =========================

function formatarTempo(totalSegundos) {
    var horas = Math.floor(totalSegundos / 3600);
    var minutos = Math.floor((totalSegundos % 3600) / 60);
    var segundos = totalSegundos % 60;

    // Adiciona zero à esquerda se necessário (ex: 05 em vez de 5)
    var horasStr = horas < 10 ? '0' + horas : '' + horas;
    var minutosStr = minutos < 10 ? '0' + minutos : '' + minutos;
    var segundosStr = segundos < 10 ? '0' + segundos : '' + segundos;

    return horasStr + ':' + minutosStr + ':' + segundosStr;
}

// =========================
// FUNÇÃO: Iniciar Cronômetro Regressivo
// =========================

function iniciarCronometro() {
    // Variável local que controla o tempo restante
    var tempoRestante = TEMPO_RESERVA_SEGUNDOS;

    // Exibe o tempo inicial formatado na tela
    cronometroElemento.textContent = formatarTempo(tempoRestante);

    // setInterval executa a função a cada 1000ms (1 segundo)
    cronometroInterval = setInterval(function () {
        tempoRestante--;

        // Atualiza o texto do cronômetro na tela
        cronometroElemento.textContent = formatarTempo(tempoRestante);

        // Quando o tempo chegar a zero, para o cronômetro
        if (tempoRestante <= 0) {
            clearInterval(cronometroInterval);
            cronometroInterval = null;
            cronometroElemento.textContent = '00:00:00';
            alert('O tempo da sua reserva expirou!');
            fecharModal();
        }
    }, 1000);
}

// =========================
// FUNÇÃO: Abrir o Modal de Reserva
// =========================

function abrirModal() {
    // Exibe o modal alterando o display
    modalReserva.style.display = 'flex';

    // Inicia o cronômetro regressivo
    iniciarCronometro();
}

// =========================
// FUNÇÃO: Fechar o Modal de Reserva
// =========================

function fecharModal() {
    // Esconde o modal
    modalReserva.style.display = 'none';

    // Para o cronômetro usando clearInterval para evitar vazamento de memória
    if (cronometroInterval !== null) {
        clearInterval(cronometroInterval);
        cronometroInterval = null;
    }

    // Reseta o texto do cronômetro para o valor inicial
    cronometroElemento.textContent = formatarTempo(TEMPO_RESERVA_SEGUNDOS);
}

// =========================
// EVENTOS: Captura todos os botões "Reservar"
// =========================

var botoesReservar = document.querySelectorAll('.btn-reservar');

for (var i = 0; i < botoesReservar.length; i++) {
    botoesReservar[i].addEventListener('click', function () {
        // Incrementa o carrinho
        contador++;
        carrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> &nbsp; Carrinho (' + contador + ')';

        // Abre o modal de reserva
        abrirModal();
    });
}

// =========================
// EVENTO: Botão Fechar (X) do Modal
// =========================

btnFecharModal.addEventListener('click', function () {
    fecharModal();
});

// =========================
// EVENTO: Fechar modal clicando no fundo escurecido (overlay)
// =========================

modalReserva.addEventListener('click', function (evento) {
    // Só fecha se o clique foi diretamente no overlay (fundo), não no conteúdo
    if (evento.target === modalReserva) {
        fecharModal();
    }
});