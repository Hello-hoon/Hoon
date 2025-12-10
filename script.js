/* ===============================
   COULEUR ET THÈME
================================= */
const themeToggle = document.getElementById('theme-toggle');
const colorPicker = document.getElementById('color-picker');
const hoonText = document.getElementById('hoon-text');

themeToggle.addEventListener('click', () => {
  if(document.body.style.backgroundColor === 'black'){
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
    document.documentElement.style.setProperty('--background','#fff');
    document.documentElement.style.setProperty('--text-color','#000');
  } else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.documentElement.style.setProperty('--background','black');
    document.documentElement.style.setProperty('--text-color','white');
  }
});

colorPicker.addEventListener('input', () => {
  const color = colorPicker.value;
  document.documentElement.style.setProperty('--accent', color);
  hoonText.style.color = color;
  localStorage.setItem('hoon-color', color);
});

/* ===============================
   REVEAL SCROLL
================================= */
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for(let i = 0; i < reveals.length; i++){
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    if(elementTop < windowHeight - elementVisible){
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);

/* ===============================
   MINI-JEU CLICKER
================================= */
let points = 0;
let level = 1;
const clickBtn = document.getElementById('clickBtn');
const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');
const badgeList = document.getElementById('badge-list');

clickBtn.addEventListener('click', () => {
  points++;
  pointsDisplay.textContent = points;
  level = Math.floor(points / 10) + 1;
  levelDisplay.textContent = level;

  if(points === 10) addBadge("Débutant");
  else if(points === 50) addBadge("Pro");
  else if(points === 100) addBadge("Maître");
});

function addBadge(name){
  const span = document.createElement('span');
  span.textContent = name;
  badgeList.appendChild(span);
}

/* ===============================
   JEU DE CIBLE
================================= */
let targetPoints = 0;
const target = document.getElementById('target');
const targetPointsDisplay = document.getElementById('target-points');

function moveTarget(){
  const gameArea = document.getElementById('game-area');
  const maxX = gameArea.clientWidth - target.clientWidth;
  const maxY = gameArea.clientHeight - target.clientHeight;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  target.style.left = x + 'px';
  target.style.top = y + 'px';
}

target.addEventListener('click', () => {
  targetPoints++;
  targetPointsDisplay.textContent = targetPoints;
  moveTarget();
});
moveTarget();

/* ===============================
   HORLOGE ET DATE
================================= */
function updateClock(){
  const now = new Date();
  document.getElementById('hours').textContent = String(now.getHours()).padStart(2,'0');
  document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2,'0');
  document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('date').textContent = now.toLocaleDateString();
}
setInterval(updateClock, 1000);
updateClock();

/* ===============================
   CHAT SIMPLE
================================= */
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatInput.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    const msg = chatInput.value.trim();
    if(msg !== ''){
      const p = document.createElement('p');
      p.textContent = "Vous : " + msg;
      chatMessages.appendChild(p);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      const botP = document.createElement('p');
      botP.textContent = "HoonBot : Merci pour ton message !";
      chatMessages.appendChild(botP);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
});

/* ===============================
   HAMBURGER MENU
================================= */
const hamburger = document.getElementById('hamburger');
const menuDropdown = document.getElementById('menuDropdown');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if(menuDropdown.style.display === 'block'){
    menuDropdown.style.display = 'none';
  } else {
    menuDropdown.style.display = 'block';
  }
});

// Fermer menu si clic en dehors
document.addEventListener('click', function(event){
  if(!hamburger.contains(event.target) && !menuDropdown.contains(event.target)){
    menuDropdown.style.display = 'none';
    hamburger.classList.remove('active');
  }
});
