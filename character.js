const wrapper = document.getElementById("char-wrapper");
const char = document.getElementById("char");

// ===== 상태 =====
let angle = 0;
let velocity = 0;
let angularVelocity = 0;

let dragging = false;
let lastX = 0;
let lastTime = 0;

// ===== 파라미터 =====
const damping = 0.96;
const gravity = 0.002;
const maxAngle = Math.PI / 3;

// idle
let time = 0;

// ===== 드래그 시작 =====
char.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;
  lastTime = performance.now();
});

// ===== 드래그 중 =====
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const now = performance.now();
  const dt = now - lastTime;

  const dx = e.clientX - lastX;

  lastX = e.clientX;
  lastTime = now;

  // 🔥 핵심: 속도를 직접 계산
  angularVelocity = dx / dt * 0.05;
});

// ===== 드래그 끝 =====
window.addEventListener("mouseup", () => {
  dragging = false;
});

// ===== 애니메이션 =====
function animate() {

  if (!dragging) {
    // 중력 복원
    angularVelocity += -angle * gravity;

    // 감쇠
    angularVelocity *= damping;

    // 각도 적용
    angle += angularVelocity;
  } else {
    angle += angularVelocity;
  }

  // 각도 제한
  angle = Math.max(-maxAngle, Math.min(maxAngle, angle));

  // ===== idle =====
  time += 0.016;
  const idle = Math.sin(time * 2) * 0.01;
  const bounce = Math.sin(time * 3) * 2;

  wrapper.style.transform = `
    rotate(${angle + idle}rad)
    translateY(${bounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
