// ----- Menu lateral (mobile) -----
const btnMenu = document.getElementById('app-header__btn');
const asideMenu = document.getElementById('app-aside__menu');

btnMenu.addEventListener('click', () => {
    asideMenu.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    const isMenuOpen = asideMenu.classList.contains('open');
    const isClickOutsideMenu = !asideMenu.contains(event.target);
    const isClickOutsideBtn = !btnMenu.contains(event.target);

    if (isMenuOpen && isClickOutsideMenu && isClickOutsideBtn) {
        asideMenu.classList.remove('open');
    }
});

// ----- Trocar de tela -----
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(function (t) {
        t.classList.add("escondida");
    });
    document.getElementById(id).classList.remove("escondida");
}

document.querySelectorAll("[data-destino]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        mostrarTela(botao.dataset.destino);
    });
});

// ----- Upload do scanner -----
const dropzone = document.getElementById("dropzone");
const inputArquivo = document.getElementById("arquivo");
const nomeArquivo = document.getElementById("nome-arquivo");

document.getElementById("btn-arquivo").addEventListener("click", function () {
    inputArquivo.click();
});

inputArquivo.addEventListener("change", function () {
    receberArquivo(inputArquivo.files[0]);
});

dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropzone.classList.add("arrastando");
});

dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("arrastando");
});

dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("arrastando");
    receberArquivo(e.dataTransfer.files[0]);
});

function receberArquivo(arquivo) {
    if (!arquivo) return;

    const tiposOk = ["image/jpeg", "image/png", "application/pdf"];
    if (!tiposOk.includes(arquivo.type)) {
        nomeArquivo.textContent = "Formato não aceito. Use JPG, PNG ou PDF.";
        return;
    }
    if (arquivo.size > 10 * 1024 * 1024) {
        nomeArquivo.textContent = "Arquivo maior que 10 MB.";
        return;
    }
    nomeArquivo.textContent = "Arquivo selecionado: " + arquivo.name;
}
