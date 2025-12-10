// -------------------- THEME --------------------
const toggle = document.getElementById('theme-toggle');
const colorPicker = document.getElementById('color-picker');

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

// -------------------- COULEUR PRIMAIRE --------------------
const savedColor = localStorage.getItem('hoon-color') || '#6A0DAD';
document.documentElement.style.setProperty('--accent', savedColor);
colorPicker.value = savedColor;

colorPicker.addEventListener('input', () => {
  const color = colorPicker.value;
  document.documentElement.style.setProperty('--accent', color);
  localStorage.setItem('hoon-color', color);
});

// -------------------- SCROLL ANIMATION --------------------
const sections = document.querySelectorAll('.reveal');

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

// -------------------- MINI-JEU CLICKER --------------------
let points = parseInt(localStorage.getItem('hoon-points')) || 0;
let level = parseInt(localStorage.getItem('hoon-level')) || 1;
const btn = document.getElementById('clickBtn');
const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');

// BADGES
const badgeList = document.getElementById('badge-list');
const badges = [
  {name: "Débutant", points: 5},
  {name: "Intermédiaire", points: 20},
  {name: "Expert", points: 50},
  {name: "Maître Hoon", points: 100}
];

let unlockedBadges = JSON.parse(localStorage.getItem('hoon-badges')) || [];

function updateLevel() {
  level = Math.floor(Math.sqrt(points / 10)) + 1;
  levelDisplay.textContent = level;
}

function updatePoints() {
  pointsDisplay.textContent = points;
  localStorage.setItem('hoon-points', points);
  localStorage.setItem('hoon-level', level);
}

function updateBadges() {
  unlockedBadges = [];
  badges.forEach(b => {
    if(points >= b.points) unlockedBadges.push(b.name);
  });
  localStorage.setItem('hoon-badges', JSON.stringify(unlockedBadges));
  badgeList.innerHTML = "";
  unlockedBadges.forEach(name => {
    const div = document.createElement('div');
    div.className = "badge";
    div.textContent = name;
    badgeList.appendChild(div);
  });
}

btn.addEventListener('click', () => {
  points += 1;
  updateLevel();
  updatePoints();
  updateBadges();
});

updateLevel();
updatePoints();
updateBadges();

// -------------------- JEU CIBLE --------------------
const gameArea = document.getElementById('game-area');
const target = document.getElementById('target');
const targetPointsDisplay = document.getElementById('target-points');

let targetPoints = parseInt(localStorage.getItem('hoon-target-points')) || 0;

function moveTarget() {
  const maxX = gameArea.clientWidth - target.offsetWidth;
  const maxY = gameArea.clientHeight - target.offsetHeight;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  target.style.left = x + "px";
  target.style.top = y + "px";
}

target.addEventListener('click', () => {
  targetPoints += 1;
  targetPointsDisplay.textContent = targetPoints;
  localStorage.setItem('hoon-target-points', targetPoints);
  moveTarget();
});

targetPointsDisplay.textContent = targetPoints;
moveTarget();

// -------------------- HORLOGE --------------------
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');

  document.getElementById('hours').textContent = h;
  document.getElementById('minutes').textContent = m;
  document.getElementById('seconds').textContent = s;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('fr-FR', options);
}

setInterval(updateClock, 1000);
updateClock();

// -------------------- CHATBOT --------------------
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function addMessage(text, isUser=false) {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.marginBottom = "5px";
  div.style.textAlign = isUser ? "right" : "left";
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter' && chatInput.value.trim() !== '') {
    const userMsg = chatInput.value.trim();
    addMessage(userMsg, true);
    chatInput.value = '';

    let reply = "Désolé, je n'ai pas compris 😅";
    const msg = userMsg.toLowerCase();
    if(msg.includes('bonjour')) reply = "Salut ! 😃";
    else if(msg.includes('point')) reply = `Tu as ${points} points !`;
    else if(msg.includes('niveau')) reply = `Ton niveau est ${level} !`;
    else if(msg.includes('badge')) reply = `Badges : ${unlockedBadges.join(', ')}`;

    setTimeout(() => addMessage(reply), 500);
  }
});
