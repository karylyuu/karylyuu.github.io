const root = document.getElementById("char-root");
const char = document.getElementById("char");

// ===== 상태값 =====
let angle = 0;
let velocity = 0;
let targetAngle = 0;

let dragging = false;

// ===== 파라미터 =====
const stiffness = 0.08;   // 스프링 힘
const damping = 0.90;     // 감쇠
const maxAngle = Math.PI / 4;

// idle
let time = 0;
let idleStrength = 1;

// ===== 드래그 시작 =====
char.addEventListener("mousedown", (e) => {
  dragging = true;
  idleStrength = 0; // 드래그 중 idle 제거
});

// ===== 드래그 종료 =====
window.addEventListener("mouseup", () => {
  dragging = false;
  idleStrength = 1;
});

// ===== 드래그 이동 =====
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = root.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = e.clientX - px;
  const dy = e.clientY - py;

  // 🔥 핵심: atan2 기반 각도
  let raw = Math.atan2(dx, dy);

  // 제한
  targetAngle = Math.max(-maxAngle, Math.min(maxAngle, raw));
});

// ===== 애니메이션 =====
function animate() {

  // 1. 스프링 물리
  const force = (targetAngle - angle) * stiffness;
  velocity += force;
  velocity *= damping;
  angle += velocity;

  // 2. idle (유나 느낌)
  time += 0.016;

  const idleSwing = Math.sin(time * 1.5) * 0.01 * idleStrength;
  const idleBounce = Math.sin(time * 2.2) * 2 * idleStrength;

  // 3. 적용
  charRoot.style.transform = `
    rotate(${angle + idleSwing}rad)
    translateY(${idleBounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
