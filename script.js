/* ============================================================
   HOON — SCRIPT PRINCIPAL
   Menu, thème, chat, leaderboard, animations
============================================================ */

/* -----------------------------
   MENU (3 barres)
----------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuToggle.classList.toggle("open");
});

/* Fermer le menu si on clique à l'extérieur */
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove("open");
        menuToggle.classList.remove("open");
    }
});

/* -----------------------------
   THÈME PERSONNALISÉ
----------------------------- */
const root = document.documentElement;

function applyTheme() {
    const savedColor = localStorage.getItem("mainColor");
    const savedMode = localStorage.getItem("themeMode");

    if (savedColor) root.style.setProperty("--main-color", savedColor);
    if (savedMode === "dark") document.body.classList.add("theme-dark");
}

applyTheme();

/* Mise à jour du thème */
function updateThemeColor(newColor) {
    root.style.setProperty("--main-color", newColor);
    localStorage.setItem("mainColor", newColor);
}

/* Mode sombre */
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("theme-dark");
    localStorage.setItem("themeMode", isDark ? "dark" : "light");
}

/* -----------------------------
   CHAT — BOT SIMPLIFIÉ
----------------------------- */
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

/* Mini "mémoire" locale du bot */
let botMemory = JSON.parse(localStorage.getItem("botMemory") || "{}");

function saveMemory() {
    localStorage.setItem("botMemory", JSON.stringify(botMemory));
}

/* Réponse du bot */
function botReply(msg) {
    msg = msg.toLowerCase().trim();

    if (botMemory[msg]) {
        return botMemory[msg];
    }

    return "Je n’ai pas encore appris cette information. Peux-tu me l’expliquer ?";
}

/* Envoi message */
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    /* Afficher le message utilisateur */
    chatMessages.innerHTML += `<div class="message-user">${text}</div>`;

    /* Réponse du bot */
    const reply = botReply(text);
    chatMessages.innerHTML += `<div class="message-bot">${reply}</div>`;

    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

/* Apprentissage */
document.addEventListener("dblclick", () => {
    const q = prompt("Quelle question le bot doit apprendre ?");
    if (!q) return;

    const r = prompt("Quelle est la bonne réponse ?");
    if (!r) return;

    botMemory[q.toLowerCase()] = r;
    saveMemory();
});

/* -----------------------------
   NOTIFICATIONS
----------------------------- */
const notifBox = document.getElementById("notification-container");

function notify(msg) {
    const el = document.createElement("div");
    el.classList.add("notification");
    el.innerText = msg;
    notifBox.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 3000);
}

/* -----------------------------
   LEADERBOARD LOCAL
----------------------------- */
function addScore(game, score, region) {
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    data.push({
        game,
        score,
        region,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("leaderboard", JSON.stringify(data));
}

function displayLeaderboard() {
    const table = document.getElementById("leaderboard-table");
    if (!table) return;

    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    table.innerHTML = "<tr><th>Jeu</th><th>Score</th><th>Région</th><th>Date</th></tr>";

    data.slice(-20).reverse().forEach((entry) => {
        table.innerHTML += `
            <tr>
                <td>${entry.game}</td>
                <td>${entry.score}</td>
                <td>${entry.region}</td>
                <td>${entry.date}</td>
            </tr>
        `;
    });
}

displayLeaderboard();
