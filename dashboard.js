/* Sidebar */

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuButton = document.getElementById('mobileMenuButton');

if (sidebar !== null && sidebarToggle !== null) {
    sidebarToggle.addEventListener('click', function () {
        const collapsed = sidebar.classList.toggle('collapsed');
        sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
        sidebarToggle.setAttribute(
            'aria-label',
            collapsed ? 'Expandir menu' : 'Recolher menu'
        );
    });
}

function openMobileMenu() {
    if (sidebar === null || overlay === null || mobileMenuButton === null) return;

    sidebar.classList.add('mobile-open');
    overlay.classList.add('active');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    if (sidebar === null || overlay === null || mobileMenuButton === null) return;

    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
}

if (mobileMenuButton !== null) {
    mobileMenuButton.addEventListener('click', openMobileMenu);
}

if (overlay !== null) {
    overlay.addEventListener('click', closeMobileMenu);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeMobileMenu();
        if (mobileMenuButton !== null) mobileMenuButton.focus();
    }
});


/* Cores do Germina (Ajustadas para a paleta requisitada) */

const CORES = {
    verdeEscuro: '#21593b',
    verdeClaro: '#91b619',
    azulClaro: '#8eafde',
    laranjaEscuro: '#cd5b24',
    pretoTitulo: '#000000'
};

if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = CORES.pretoTitulo;
}


/* Dados das seções */

const DADOS_SECOES = {

    financeiro: {
        miniCards: [
            { rotulo: 'Contas a Pagar',   valor: 'R$ 2.300' },
            { rotulo: 'Contas a Receber', valor: 'R$ 8.900' },
            { rotulo: 'Fluxo de Caixa',   valor: 'R$ 6.600' },
            { rotulo: 'Capital de Giro',  valor: 'R$ 20.000' }
        ],
        grafico1: {
            titulo: 'Fluxo de Caixa Mensal (R$)',
            tipo: 'bar',
            cor: CORES.verdeClaro,
            meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            valores: [3200, 4100, 2800, 5600, 4900, 6600]
        },
        grafico2: {
            titulo: 'Contas a Pagar x Receber (R$)',
            tipo: 'line',
            cor: CORES.azulClaro,
            meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            valores: [1800, 2400, 2100, 3000, 2600, 2300]
        },
        relatorio: {
            titulo: 'Relatório Financeiro',
            texto:
                'O fluxo de caixa apresentou crescimento consistente ao longo do semestre, ' +
                'saindo de R$ 3.200 em Janeiro para R$ 6.600 em Junho — uma alta de aproximadamente 106%. ' +
                'O pico ocorreu em Abril (R$ 5.600), seguido de leve recuo em Maio e recuperação em Junho.\n\n' +
                'As contas a pagar mantiveram-se estáveis, oscilando entre R$ 1.800 e R$ 3.000, com média ' +
                'mensal de R$ 2.367. O saldo entre receber e pagar permanece positivo em todos os meses, ' +
                'indicando boa saúde do capital de giro.\n\n' +
                'Recomenda-se manter a política atual de controle de despesas e reforçar a reserva de ' +
                'capital de giro para absorver eventuais sazonalidades do próximo semestre.'
        }
    },

    producao: {
        miniCards: [
            { rotulo: 'Rendimento por Lote', valor: '38 sc/ha' },
            { rotulo: 'Produtividade Média', valor: '42 sc/ha' },
            { rotulo: 'Perda Pós-Colheita',  valor: '3,2%' },
            { rotulo: 'Custo por Hectare',   valor: 'R$ 2.450' }
        ],
        grafico1: {
            titulo: 'Rendimento por Lote (sc/ha)',
            tipo: 'bar',
            cor: CORES.verdeEscuro,
            meses: ['Lote 1', 'Lote 2', 'Lote 3', 'Lote 4', 'Lote 5', 'Lote 6'],
            valores: [36, 40, 38, 42, 39, 41]
        },
        grafico2: {
            titulo: 'Produtividade Mensal (sc/ha)',
            tipo: 'line',
            cor: CORES.laranjaEscuro,
            meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            valores: [30, 34, 38, 40, 41, 42]
        },
        relatorio: {
            titulo: 'Relatório de Produção',
            texto:
                'Os lotes apresentaram rendimento médio de 39,3 sc/ha, com destaque para o Lote 4 ' +
                '(42 sc/ha) e o Lote 6 (41 sc/ha). O Lote 1 teve o menor desempenho (36 sc/ha), ' +
                'possivelmente por questões de solo ou manejo.\n\n' +
                'A produtividade mensal cresceu de forma contínua, saindo de 30 sc/ha em Janeiro para ' +
                '42 sc/ha em Junho — um ganho de 40% no período, refletindo a melhoria das práticas ' +
                'agrícolas adotadas.\n\n' +
                'A perda pós-colheita de 3,2% está dentro do aceitável, mas há espaço para redução. ' +
                'Recomenda-se revisar a logística de armazenamento e transporte para minimizar perdas ' +
                'e manter o custo por hectare sob controle.'
        }
    },

    estoque: {
        miniCards: [
            { rotulo: 'Giro de Estoque',      valor: '4,8x/ano' },
            { rotulo: 'Cobertura de Estoque', valor: '62 dias' },
            { rotulo: 'Custo de Retenção',    valor: 'R$ 8.200' },
            { rotulo: 'Curva ABC',            valor: 'A:78% B:15% C:7%' }
        ],
        grafico1: {
            titulo: 'Giro de Estoque Mensal (x)',
            tipo: 'bar',
            cor: CORES.verdeClaro,
            meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            valores: [3.8, 4.1, 4.3, 4.5, 4.6, 4.8]
        },
        grafico2: {
            titulo: 'Custo de Retenção (R$)',
            tipo: 'line',
            cor: CORES.azulClaro,
            meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            valores: [9200, 8800, 8600, 8400, 8300, 8200]
        },
        relatorio: {
            titulo: 'Relatório de Estoque',
            texto:
                'O giro de estoque cresceu de 3,8x em Janeiro para 4,8x em Junho, indicando melhora ' +
                'na rotatividade dos produtos e redução de capital parado.\n\n' +
                'O custo de retenção caiu de R$ 9.200 para R$ 8.200 no mesmo período — uma redução ' +
                'de 10,9%, refletindo a otimização do espaço e da gestão de armazenagem.\n\n' +
                'A Curva ABC mostra concentração de 78% do valor em itens classe A, o que exige ' +
                'atenção redonda na gestão desses itens. Recomenda-se revisar os níveis de cobertura ' +
                'de estoque (62 dias) para evitar excesso de capital imobilizado.'
        }
    }
};


/* Estado vazio */

const ESTADO_VAZIO = {
    miniCards: [
        { rotulo: '—', valor: '—' },
        { rotulo: '—', valor: '—' },
        { rotulo: '—', valor: '—' },
        { rotulo: '—', valor: '—' }
    ],
    grafico1: {
        titulo: '—',
        tipo: 'bar',
        cor: CORES.verdeClaro,
        meses: [],
        valores: []
    },
    grafico2: {
        titulo: '—',
        tipo: 'line',
        cor: CORES.azulClaro,
        meses: [],
        valores: []
    },
    relatorio: {
        titulo: '-',
        texto: 'Selecione uma seção acima para visualizar o relatório.'
    }
};


/* Instâncias dos Gráficos */

let grafico1 = null;
let grafico2 = null;

// Cria gráfico
function criarGrafico(idCanvas, dados) {
    const canvas = document.getElementById(idCanvas);
    if (canvas === null) {
        return null;
    }

    return new Chart(canvas.getContext('2d'), {
        type: dados.tipo,
        data: {
            labels: dados.meses,
            datasets: [{
                label: dados.titulo,
                data: dados.valores,
                backgroundColor: dados.cor,
                borderColor: dados.cor,
                borderWidth: 2,
                borderRadius: 8,
                tension: 0.35,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Atualiza gráfico existente
function atualizarGrafico(graficoAtual, idCanvas, dados) {
    if (graficoAtual === null) {
        return criarGrafico(idCanvas, dados);
    }

    if (graficoAtual.config.type !== dados.tipo) {
        graficoAtual.destroy();
        return criarGrafico(idCanvas, dados);
    }

    graficoAtual.data.labels = dados.meses;
    graficoAtual.data.datasets[0].data = dados.valores;
    graficoAtual.data.datasets[0].backgroundColor = dados.cor;
    graficoAtual.data.datasets[0].borderColor = dados.cor;
    graficoAtual.data.datasets[0].label = dados.titulo;
    graficoAtual.update();

    return graficoAtual;
}


/* Desenhar Conteúdos na Tela */

function desenharMiniCards(listaMiniCards) {
    for (let i = 0; i < listaMiniCards.length; i++) {
        const card = document.getElementById('mini-' + (i + 1));
        if (card === null) {
            continue;
        }

        const rotulo = card.querySelector('.mini-card__label');
        const valor = card.querySelector('.mini-card__value');

        if (rotulo) rotulo.textContent = listaMiniCards[i].rotulo;
        if (valor) valor.textContent = listaMiniCards[i].valor;
    }
}

function desenharTitulos(titulo1, titulo2) {
    const t1 = document.getElementById('chart-1-title');
    const t2 = document.getElementById('chart-2-title');
    if (t1) t1.textContent = titulo1;
    if (t2) t2.textContent = titulo2;
}

function desenharSuperCard(relatorio) {
    const t = document.getElementById('super-card-title');
    const txt = document.getElementById('super-card-text');
    if (t) t.textContent = relatorio.titulo;
    if (txt) txt.textContent = relatorio.texto;
}

function desenharSecao(nomeDaSecao) {
    let dados;

    if (nomeDaSecao !== null && DADOS_SECOES[nomeDaSecao] !== undefined) {
        dados = DADOS_SECOES[nomeDaSecao];
    } else {
        dados = ESTADO_VAZIO;
    }

    desenharMiniCards(dados.miniCards);
    desenharTitulos(dados.grafico1.titulo, dados.grafico2.titulo);
    desenharSuperCard(dados.relatorio);

    grafico1 = atualizarGrafico(grafico1, 'chart-1', dados.grafico1);
    grafico2 = atualizarGrafico(grafico2, 'chart-2', dados.grafico2);
}


/* Seleção e Alternância de Seções */

let secaoAtiva = null;

function ativarSecao(nomeDaSecao) {
    if (secaoAtiva === nomeDaSecao) {
        secaoAtiva = null;
    } else {
        secaoAtiva = nomeDaSecao;
    }

    const botoes = document.querySelectorAll('.app-header__list button');
    for (let i = 0; i < botoes.length; i++) {
        const botao = botoes[i];
        const ehOAtivo = (botao.dataset.section === secaoAtiva);

        if (ehOAtivo === true) {
            botao.classList.add('is-active');
        } else {
            botao.classList.remove('is-active');
        }

        botao.setAttribute('aria-pressed', ehOAtivo);
    }

    desenharSecao(secaoAtiva);
}


/* Event Listeners de Inicialização */

const botaoDownload = document.getElementById('btn-download');
if (botaoDownload !== null) {
    botaoDownload.addEventListener('click', function () {
        window.print();
    });
}

const botoesTopbar = document.querySelectorAll('.app-header__list button');
for (let i = 0; i < botoesTopbar.length; i++) {
    botoesTopbar[i].addEventListener('click', function () {
        ativarSecao(this.dataset.section);
    });
}

// Inicializa no estado padrão
desenharSecao(null);
