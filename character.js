const pivot = document.getElementById("pivot");
const char = document.getElementById("char");

let angle = 0;
let velocity = 0;

let dragging = false;
let lastX = 0;
let lastY = 0;

// ===== 물리 파라미터 =====
const stiffness = 0.05;
const damping = 0.93;
const dragPower = 0.0025;
const liftPower = 0.0015;
const maxAngle = Math.PI / 3;

let time = 0;
let idleStrength = 1;

// ===== 드래그 시작 =====
char.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;

  velocity *= 0.4; // 튐 방지
  idleStrength = 0; // idle 잠시 제거

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
  const dy = e.clientY - lastY;

  lastX = e.clientX;
  lastY = e.clientY;

  // ✔ 좌우 = 회전 힘
  velocity += dx * dragPower;

  // ✔ 위아래 = 추가 흔들림 (리프트 느낌)
  velocity += dy * liftPower;
});

// ===== 애니메이션 =====
function animate() {

  // ✔ 스프링 복귀
  const springForce = -angle * stiffness;
  velocity += springForce;

  // ✔ 감쇠
  velocity *= damping;

  angle += velocity;

  // ✔ 각도 제한
  angle = Math.max(-maxAngle, Math.min(maxAngle, angle));

  // ===== 고급 idle =====
  time += 0.016;

  // idle은 서서히 다시 켜짐
  if (!dragging) {
    idleStrength += 0.02;
    if (idleStrength > 1) idleStrength = 1;
  }

  const idleSwing =
    Math.sin(time * 1.2) * 0.015 * idleStrength;

  const idleMicro =
    Math.sin(time * 3.7) * 0.005 * idleStrength;

  const idleBounce =
    Math.sin(time * 2.1) * 2 * idleStrength;

  // ===== 최종 적용 =====
  pivot.style.transform = `
    translateX(-50%)
    rotate(${angle + idleSwing + idleMicro}rad)
    translateY(${idleBounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
