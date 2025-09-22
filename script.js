const canvas = document.getElementById('cielo');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const stars = [];
const meteoros = [];

function crearEstrellas(num) {
  for (let i = 0; i < num; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
    });
  }
}

function dibujarEstrellas() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(st => {
    ctx.save();
    ctx.globalAlpha = st.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function crearMeteoro() {
  meteoros.push({
    x: Math.random() * width,
    y: Math.random() * (height * 0.8), // Aparecen en más zonas del cielo
    len: Math.random() * 150 + 100, // Más largos
    speed: Math.random() * 2 + 1, // Más lentos
    angle: Math.PI / 4, // Diagonal
    alpha: 1,
  });
}

function dibujarMeteoros() {
  meteoros.forEach((m, i) => {
    const xEnd = m.x + m.len * Math.cos(m.angle);
    const yEnd = m.y + m.len * Math.sin(m.angle);

    // Dibujar rastro
   const grad = ctx.createLinearGradient(xEnd, yEnd, m.x, m.y);
    grad.addColorStop(0, 'rgba(255,255,255,1)'); // punta brillante
    grad.addColorStop(1, 'rgba(255,255,255,0)'); // cola desvanecida


    ctx.save();
    ctx.globalAlpha = m.alpha;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.restore();

    // Mover meteoro
    m.x += m.speed * Math.cos(m.angle);
    m.y += m.speed * Math.sin(m.angle);
    m.alpha -= 0.003;

    if (m.alpha <= 0) {
      meteoros.splice(i, 1);
    }
  });
}

function animar() {
  dibujarEstrellas();

  if (Math.random() < 0.01) { // Menos frecuentes
    crearMeteoro();
  }

  dibujarMeteoros();

  requestAnimationFrame(animar);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

crearEstrellas(150);
animar();

