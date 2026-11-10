const sidebar = document.getElementById("app-aside__menu");
const collapseButton = document.getElementById("app-header__btn");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const overlay = document.getElementById("sidebar-overlay");

function setMobileMenu(open) {
    sidebar.classList.toggle("mobile-open", open);
    overlay.classList.toggle("active", open);
    mobileMenuButton.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
}

mobileMenuButton.addEventListener("click", () => {
    setMobileMenu(!sidebar.classList.contains("mobile-open"));
});
overlay.addEventListener("click", () => setMobileMenu(false));

collapseButton.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        setMobileMenu(!sidebar.classList.contains("mobile-open"));
        return;
    }
    const collapsed = sidebar.classList.toggle("collapsed");
    collapseButton.setAttribute("aria-expanded", String(!collapsed));
    collapseButton.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
});

window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 768px)").matches) setMobileMenu(false);
});

const viewport = document.querySelector(".carousel-viewport");
const cardsTrack = document.querySelector(".harvest-cards");
const prevButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");
let currentIndex = 0;

function getVisibleCount() {
    if (!viewport || !cardsTrack) return 1;
    const card = cardsTrack.querySelector(".harvest-card");
    if (!card) return 1;
    const gap = parseFloat(getComputedStyle(cardsTrack).columnGap) || 0;
    return Math.max(1, Math.floor((viewport.clientWidth + gap) / (card.getBoundingClientRect().width + gap)));
}

function updateCarousel() {
    if (!cardsTrack) return;
    const cards = [...cardsTrack.querySelectorAll(".harvest-card")];
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    currentIndex = Math.min(currentIndex, maxIndex);
    const firstCard = cards[0];
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(cardsTrack).columnGap) || 0;
    const distance = (firstCard.getBoundingClientRect().width + gap) * currentIndex;
    cardsTrack.style.transform = `translateX(-${distance}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
    prevButton.style.opacity = prevButton.disabled ? ".45" : "1";
    nextButton.style.opacity = nextButton.disabled ? ".45" : "1";
}

prevButton.addEventListener("click", () => { currentIndex = Math.max(0, currentIndex - 1); updateCarousel(); });
nextButton.addEventListener("click", () => { currentIndex += 1; updateCarousel(); });
window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);

document.getElementById("new-harvest-button").addEventListener("click", () => {
    alert("Ação demonstrativa: aqui seria aberto o cadastro de uma nova safra.");
});
document.querySelector(".profile-settings").addEventListener("click", () => {
    alert("Ação demonstrativa: aqui seriam abertas as configurações do perfil.");
});
document.querySelector(".logout-button").addEventListener("click", () => {
    alert("Ação demonstrativa: aqui seria realizado o encerramento da sessão.");
});
