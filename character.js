const root = document.getElementById("char-root");
const char = document.getElementById("char");

let angle = 0;
let velocity = 0;

let dragging = false;
let lastX = 0;

// 물리 파라미터
const stiffness = 0.06;   // 복귀 힘
const damping = 0.92;     // 감쇠
const dragPower = 0.002;  // 드래그 영향력
const maxAngle = Math.PI / 4;

let time = 0;

// ===== 드래그 시작 =====
char.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;

  // 잡을 때 살짝 튕김 제거 (UX 개선)
  velocity *= 0.5;

  e.preventDefault();
});

// ===== 드래그 종료 =====
window.addEventListener("mouseup", () => {
  dragging = false;
});

// ===== 드래그 이동 =====
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const dx = e.clientX - lastX;
  lastX = e.clientX;

  // ❗ 핵심: 각도가 아니라 "힘"을 준다
  velocity += dx * dragPower;
});

// ===== 애니메이션 =====
function animate() {

  // ✔ 항상 원래 각도(0)로 돌아가려는 힘
  const springForce = -angle * stiffness;

  velocity += springForce;

  // 감쇠
  velocity *= damping;

  angle += velocity;

  // 각도 제한
  angle = Math.max(-maxAngle, Math.min(maxAngle, angle));

  // ===== idle motion =====
  time += 0.016;

  const idleSwing = Math.sin(time * 1.2) * 0.01;
  const idleBounce = Math.sin(time * 2.0) * 2;

  // 최종 적용
  root.style.transform = `
    translateX(-50%)
    rotate(${angle + idleSwing}rad)
    translateY(${idleBounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
