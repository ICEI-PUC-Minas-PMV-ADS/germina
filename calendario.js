//Menu mobile (sidebar)

// Pegando os elementos do HTML
var btnMenu   = document.getElementById('app-header__btn');
var asideMenu = document.getElementById('app-aside__menu');
var overlay   = document.getElementById('app-overlay');

// Função que abre ou fecha o menu
function toggleMenu(abrir) {
    if (abrir) {
        asideMenu.classList.add('open');
        overlay.classList.add('open');
        btnMenu.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    } else {
        asideMenu.classList.remove('open');
        overlay.classList.remove('open');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Quando clicar no botão hambúrguer
btnMenu.addEventListener('click', function () {
    var estaAberto = asideMenu.classList.contains('open');
    toggleMenu(!estaAberto);
});

// Quando clicar no overlay (fundo escuro)
overlay.addEventListener('click', function () {
    toggleMenu(false);
});

// Quando clicar em qualquer link do menu, fecha (só no mobile)
var linksMenu = document.querySelectorAll('.app-aside__link, .app-aside__logout');
for (var i = 0; i < linksMenu.length; i++) {
    linksMenu[i].addEventListener('click', function () {
        if (window.innerWidth <= 900) {
            toggleMenu(false);
        }
    });
}

// Quando apertar ESC, fecha o menu
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && asideMenu.classList.contains('open')) {
        toggleMenu(false);
        btnMenu.focus();
    }
});

// Se a tela ficar grande, fecha o menu
window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && asideMenu.classList.contains('open')) {
        toggleMenu(false);
    }
});


// Variáveis do calendário 

var hoje = new Date();

// Guarda o que o calendário está mostrando agora
var anoAtual = hoje.getFullYear();
var mesAtual = hoje.getMonth();  // 0 = Janeiro, 11 = Dezembro

// Se está mostrando a lua ou o clima
var mostrarLua = false;
var mostrarClima = false;

// Nomes dos meses
var MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Pegando elementos do HTML
var gradeDias      = document.getElementById('gradeDias');
var tituloMes      = document.getElementById('tituloMes');
var btnMesAnterior = document.getElementById('mesAnterior');
var btnMesProximo  = document.getElementById('mesProximo');
var calendarioEl   = document.getElementById('calendario');
var btnsLua        = document.querySelectorAll('.btn-lua');
var btnsClima      = document.querySelectorAll('.btn-clima');


// Fases da lua

function getFaseLua(data) {
    // Data de referência: lua nova em 06/01/2000 às 18:14
    var dataBase = new Date(2000, 0, 6, 18, 14, 0);
    var CICLO = 29.530588853; // duração do ciclo lunar em dias

    // Quantos dias se passaram desde a data base
    var diferenca = (data - dataBase) / 86400000; // 86400000 = 1 dia em milissegundos

    // Idade da lua (0 a 29.5)
    var idade = diferenca % CICLO;
    if (idade < 0) {
        idade = idade + CICLO;
    }

    // Devolve o emoji conforme a idade
    if (idade < 1.85 || idade >= 27.68) {
        return '🌑';
    }
    if (idade < 14.77) {
        return '🌓';
    }
    if (idade < 16.61) {
        return '🌕';
    }
    return '🌙';
}


// Simulação de clima

var CLIMAS = ['☀️', '🌤️', '⛅', '☁️', '🌦️', '🌧️', '⛈️', '🌫️'];

function getClimaSimulado(data) {
    // Cria um número único para cada dia
    var semente = data.getFullYear() * 10000
                + (data.getMonth() + 1) * 100
                + data.getDate();

    // Mistura o número para ficar "aleatório" mas sempre igual no mesmo dia
    var x = semente;
    x = (x ^ (x >>> 16)) * 0x45d9f3b;
    x = (x ^ (x >>> 16)) * 0x45d9f3b;
    x = (x ^ (x >>> 16)) >>> 0;

    // Escolhe um clima da lista
    var indice = x % CLIMAS.length;
    return CLIMAS[indice];
}


// Montagem do calendário 

function renderizarCalendario() {

    // Atualiza o título conforme mês
    tituloMes.textContent = MESES[mesAtual] + ' ' + anoAtual;

    // Liga/desliga as cores de lua e clima
    if (mostrarLua) {
        calendarioEl.classList.add('calendario--lua');
    } else {
        calendarioEl.classList.remove('calendario--lua');
    }

    if (mostrarClima) {
        calendarioEl.classList.add('calendario--clima');
    } else {
        calendarioEl.classList.remove('calendario--clima');
    }

    // Limpa a grade antes de montar de novo
    gradeDias.innerHTML = '';

    // Descobrindo informações do mês
    var primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay(); // 0=Dom, 6=Sáb
    var ultimoDia         = new Date(anoAtual, mesAtual + 1, 0).getDate(); // último dia do mês
    var ultimoDiaAnterior = new Date(anoAtual, mesAtual, 0).getDate();    // último dia do mês passado

    // Verifica se é o mês de hoje
    var ehMesAtual = (anoAtual === hoje.getFullYear() && mesAtual === hoje.getMonth());

    // Dias do mês anterior (cinza, desabilitados)
    for (var i = primeiroDiaSemana - 1; i >= 0; i--) {
        var diaAnterior = ultimoDiaAnterior - i;
        gradeDias.innerHTML += '<button class="calendario__dia calendario__dia--fora" disabled>' + diaAnterior + '</button>';
    }

    // Dias do mês atual
    for (var d = 1; d <= ultimoDia; d++) {

        var dataObj = new Date(anoAtual, mesAtual, d);
        var ehHoje = (ehMesAtual && d === hoje.getDate());

        // Começa o HTML do dia com o número
        var html = '<span>' + d + '</span>';

        // Se a lua estiver ativa, adiciona o emoji
        if (mostrarLua) {
            var emojiLua = getFaseLua(dataObj);
            html += '<span class="calendario__emoji" title="Fase da Lua">' + emojiLua + '</span>';
        }

        // Se o clima estiver ativo, adiciona o emoji
        if (mostrarClima) {
            var emojiClima = getClimaSimulado(dataObj);
            html += '<span class="calendario__emoji" title="Clima (simulado)">' + emojiClima + '</span>';
        }

        // Classe especial se for hoje
        var classeHoje = '';
        if (ehHoje) {
            classeHoje = ' calendario__dia--hoje';
        }

        // Monta a chave da data
        var chave = anoAtual + '-' +
                    String(mesAtual + 1).padStart(2, '0') + '-' +
                    String(d).padStart(2, '0');

        // Adiciona o botão do dia na grade
        gradeDias.innerHTML += '<button class="calendario__dia' + classeHoje + '" data-data="' + chave + '">' + html + '</button>';
    }

    // Dias do próximo mês (cinza, desabilitados) 
    var total = primeiroDiaSemana + ultimoDia;
    var restante = (7 - (total % 7)) % 7;

    for (var j = 1; j <= restante; j++) {
        gradeDias.innerHTML += '<button class="calendario__dia calendario__dia--fora" disabled>' + j + '</button>';
    }
}


// Botões de navegação

btnMesAnterior.addEventListener('click', function () {
    mesAtual = mesAtual - 1;

    // Se passou de Janeiro, volta para Dezembro do ano anterior
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual = anoAtual - 1;
    }

    renderizarCalendario();
});

btnMesProximo.addEventListener('click', function () {
    mesAtual = mesAtual + 1;

    // Se passou de Dezembro, vai para Janeiro do próximo ano
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual = anoAtual + 1;
    }

    renderizarCalendario();
});


// Botões de fases da lua e clima

for (var k = 0; k < btnsLua.length; k++) {
    btnsLua[k].addEventListener('click', function () {
        mostrarLua = !mostrarLua;

        // Atualiza todos os botões de lua
        for (var m = 0; m < btnsLua.length; m++) {
            btnsLua[m].dataset.ativo = mostrarLua;
        }

        renderizarCalendario();
    });
}

for (var n = 0; n < btnsClima.length; n++) {
    btnsClima[n].addEventListener('click', function () {
        mostrarClima = !mostrarClima;

        // Atualiza todos os botões de clima
        for (var p = 0; p < btnsClima.length; p++) {
            btnsClima[p].dataset.ativo = mostrarClima;
        }

        renderizarCalendario();
    });
}


// Inicia o calendário

renderizarCalendario();