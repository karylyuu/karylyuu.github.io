const root = document.getElementById("char-root");
const char = document.getElementById("char");

let angle = 0;
let velocity = 0;
let targetAngle = 0;

let dragging = false;

const stiffness = 0.08;
const damping = 0.90;
const maxAngle = Math.PI / 4;

let time = 0;

// ===== 드래그 시작 =====
char.addEventListener("mousedown", (e) => {
  dragging = true;
  e.preventDefault();
});

// ===== 드래그 종료 =====
window.addEventListener("mouseup", () => {
  dragging = false;
});

// ===== 드래그 이동 =====
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = root.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = e.clientX - px;
  const dy = e.clientY - py;

  let raw = Math.atan2(dx, dy);

  targetAngle = Math.max(-maxAngle, Math.min(maxAngle, raw));
});

// ===== 애니메이션 =====
function animate() {

  const force = (targetAngle - angle) * stiffness;
  velocity += force;
  velocity *= damping;
  angle += velocity;

  time += 0.016;

  const idleSwing = Math.sin(time * 1.5) * 0.01;
  const idleBounce = Math.sin(time * 2.2) * 2;

  root.style.transform = `
    translateX(-50%)
    rotate(${angle + idleSwing}rad)
    translateY(${idleBounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
