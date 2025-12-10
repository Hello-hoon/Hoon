// -------------------- THEME --------------------
const toggle = document.getElementById('theme-toggle');

// Appliquer thème enregistré
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    toggle.textContent = '🌙';
  }
}

// Charger le thème au démarrage
const saved = localStorage.getItem('hoon-theme') || 'light';
applyTheme(saved);

// Bouton changement de thème
toggle.addEventListener('click', () => {
  const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('hoon-theme', newTheme);
});

// -------------------- ANIMATION SCROLL --------------------
const sections = document.querySelectorAll('section');

function showSections() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
}

window.addEventListener('scroll', showSections);
window.addEventListener('resize', showSections);
document.addEventListener('DOMContentLoaded', showSections);
