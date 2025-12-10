/* ========================
   COULEUR & ANIMATION
======================== */
const colorPicker = document.getElementById("color-picker");
const hoonText = document.getElementById("hoon-text");

colorPicker.addEventListener("input", () => {
  const color = colorPicker.value;
  document.documentElement.style.setProperty("--accent", color);

  hoonText.style.color = color;

  // animation texte HOON
  hoonText.classList.remove("hoon-animate");
  void hoonText.offsetWidth;
  hoonText.classList.add("hoon-animate");
});

/* ========================
   MINI-JEU CLICKER
======================== */
let points = 0;
let level = 1;

clickBtn.onclick = () => {
  points++;
  pointsDisplay.textContent = points;
  level = Math.floor(points / 10) + 1;
  levelDisplay.textContent = level;

  if(points === 10) addBadge("Débutant");
  if(points === 50) addBadge("Pro");
  if(points === 100) addBadge("Maître");
};

function addBadge(name){
  const b = document.createElement("span");
  b.textContent = name;
  badgeList.appendChild(b);
}

/* ========================
   TARGET GAME
======================== */
const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
let tgPoints = 0;

function moveTarget(){
  const maxX = gameArea.clientWidth - target.clientWidth;
  const maxY = gameArea.clientHeight - target.clientHeight;

  target.style.left = Math.random()*maxX + "px";
  target.style.top = Math.random()*maxY + "px";
}
target.onclick = () => {
  tgPoints++;
  document.getElementById("target-points").textContent = tgPoints;
  moveTarget();
};
moveTarget();

/* ========================
   HORLOGE
======================== */
function clockUpdate(){
  const now = new Date();
  hours.textContent = String(now.getHours()).padStart(2, "0");
  minutes.textContent = String(now.getMinutes()).padStart(2, "0");
  seconds.textContent = String(now.getSeconds()).padStart(2, "0");
  date.textContent = now.toLocaleDateString();
}
setInterval(clockUpdate, 1000);
clockUpdate();

/* ========================
   CHAT SIMPLE
======================== */
chatInput.addEventListener("keydown", e => {
  if(e.key === "Enter" && chatInput.value.trim() !== ""){
    let msg = chatInput.value.trim();
    chatMessages.innerHTML += `<p><strong>Vous :</strong> ${msg}</p>`;
    chatInput.value = "";

    chatMessages.innerHTML += `<p><strong>HoonBot :</strong> Merci !</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

/* ========================
   REVEAL SCROLL
======================== */
function reveal(){
  document.querySelectorAll(".reveal").forEach(el => {
    let top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 150){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);

/* ========================
   HAMBURGER MENU
======================== */
const hamburger = document.getElementById("hamburger");
const menuDropdown = document.getElementById("menuDropdown");

hamburger.onclick = () => {
  hamburger.classList.toggle("active");
  menuDropdown.style.display =
    menuDropdown.style.display === "block" ? "none" : "block";
};

document.addEventListener("click", (e) => {
  if(!hamburger.contains(e.target) && !menuDropdown.contains(e.target)){
    menuDropdown.style.display = "none";
    hamburger.classList.remove("active");
  }
});
