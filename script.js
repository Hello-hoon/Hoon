
// -------------------- THEME --------------------
const toggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    toggle.textContent = '🌙';
  }
}

const savedTheme = localStorage.getItem('hoon-theme') || 'light';
applyTheme(savedTheme);

toggle.addEventListener('click', () => {
  const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('hoon-theme', newTheme);
});

// -------------------- SCROLL ANIMATION --------------------
const sections = document.querySelectorAll('section');

function revealSections() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
window.addEventListener('resize', revealSections);
