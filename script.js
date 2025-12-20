/* =========================
   MENU 3 BARRES
========================= */
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  menu.classList.toggle("open");
});

/* =========================
   CLICKER
========================= */
const clickBtn = document.getElementById("click-btn");
const clickCountText = document.getElementById("click-count");

// Récupération du score sauvegardé
let clicks = localStorage.getItem("hoon_clicks");
clicks = clicks ? parseInt(clicks) : 0;
clickCountText.textContent = clicks;

// Son du clic
const clickSound = new Audio("clic.mp3.wav"); // optionnel

clickBtn.addEventListener("click", () => {
  clicks++;
  clickCountText.textContent = clicks;
  localStorage.setItem("hoon_clicks", clicks);

  // Animation
  clickBtn.classList.add("active");
  setTimeout(() => clickBtn.classList.remove("active"), 100);

  // Son (si présent)
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
});

/* =========================
   MENU ACTIONS (PLACEHOLDER)
========================= */
document.querySelectorAll("#menu li").forEach(item => {
  item.addEventListener("click", () => {
    alert("Fonction bientôt disponible.");
    menu.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});
