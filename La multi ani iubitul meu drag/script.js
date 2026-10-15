// ====== SETARI (modifica aici mesajul) ======
const MESAJ =
  "Pui, ești cea mai frumoasă parte din zilele mele. " +
  "Mulțumesc că ești lângă mine și că mă faci să zâmbesc în fiecare zi. " +
  "Te iubesc enorm! 💖"+
  ""
  ;

const EMOJI_INIMI = ["💖", "💗", "💕", "💘", "❤️", "💞"];

// ====== STILURI (adaugate din JS, ca sa mearga si fara CSS extra) ======
const stil = document.createElement("style");
stil.textContent = `
  body { overflow-x: hidden; }
  .inima-cazatoare {
    position: fixed;
    top: -40px;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    animation: cade linear forwards;
  }
  @keyframes cade {
    to { transform: translateY(110vh) rotate(360deg); opacity: 0.6; }
  }
  .particula {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    animation: explodeaza 1s ease-out forwards;
  }
  @keyframes explodeaza {
    to { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
  }
  #buton-surpriza {
    display: block;
    margin: 20px auto;
    padding: 14px 28px;
    font-size: 18px;
    border: none;
    border-radius: 30px;
    background: #ff4d8d;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 77, 141, 0.5);
    transition: transform 0.2s;
    position: relative;
    z-index: 2;
  }
  #buton-surpriza:hover { transform: scale(1.08); }
  #mesaj-surpriza {
    max-width: 600px;
    margin: 20px auto;
    padding: 0 16px;
    text-align: center;
    font-size: 22px;
    line-height: 1.5;
    min-height: 60px;
    position: relative;
    z-index: 2;
  }
  img { cursor: pointer; max-width: 100%; position: relative; z-index: 2; }
`;
document.head.appendChild(stil);

// ====== INIMIOARE CARE CAD ======
function creeazaInima() {
  const inima = document.createElement("div");
  inima.className = "inima-cazatoare";
  inima.textContent = EMOJI_INIMI[Math.floor(Math.random() * EMOJI_INIMI.length)];
  inima.style.left = Math.random() * 100 + "vw";
  inima.style.fontSize = 16 + Math.random() * 28 + "px";
  inima.style.animationDuration = 4 + Math.random() * 5 + "s";
  document.body.appendChild(inima);
  setTimeout(() => inima.remove(), 9500);
}
setInterval(creeazaInima, 400);

// ====== EXPLOZIE DE CONFETTI / INIMI ======
function explozie(x, y, numar = 30) {
  const simboluri = [...EMOJI_INIMI, "✨", "🎉", "🌸"];
  for (let i = 0; i < numar; i++) {
    const p = document.createElement("div");
    p.className = "particula";
    p.textContent = simboluri[Math.floor(Math.random() * simboluri.length)];
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.fontSize = 14 + Math.random() * 18 + "px";
    const unghi = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    p.style.setProperty("--dx", Math.cos(unghi) * dist + "px");
    p.style.setProperty("--dy", Math.sin(unghi) * dist + "px");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

// Explozie la click oriunde pe pagina
document.addEventListener("click", (e) => explozie(e.clientX, e.clientY, 18));

// ====== BUTON SURPRIZA + MESAJ CARE SE SCRIE SINGUR ======
const buton = document.createElement("button");
buton.id = "buton-surpriza";
buton.textContent = "Apasă aici, am o surpriză pentru tine 💝";

const mesajDiv = document.createElement("div");
mesajDiv.id = "mesaj-surpriza";

document.body.appendChild(buton);
document.body.appendChild(mesajDiv);

let seScrie = false;
buton.addEventListener("click", (e) => {
  e.stopPropagation();
  if (seScrie) return;
  seScrie = true;
  mesajDiv.textContent = "";
  explozie(e.clientX, e.clientY, 60);

  let i = 0;
  const cronometru = setInterval(() => {
    mesajDiv.textContent += MESAJ[i];
    i++;
    if (i >= MESAJ.length) {
      clearInterval(cronometru);
      seScrie = false;
      buton.textContent = "Încă o dată 💞";
    }
  }, 60);
});
