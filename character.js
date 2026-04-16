const wrapper = document.getElementById("char-wrapper");
const char = document.getElementById("char");

let angle = 0;
let velocity = 0;
let targetAngle = 0;

let dragging = false;

// ===== 파라미터 =====
const stiffness = 0.06;
const damping = 0.88;
const maxAngle = Math.PI / 4;

// idle
let time = 0;

// ===== 드래그 =====
char.addEventListener("mousedown", () => {
  dragging = true;
});

window.addEventListener("mouseup", () => {
  dragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = wrapper.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = e.clientX - px;
  const dy = e.clientY - py;

  let raw = Math.atan2(dx, dy);

  // clamp
  targetAngle = Math.max(-maxAngle, Math.min(maxAngle, raw));
});

// ===== 애니메이션 =====
function animate() {

  // 1. 스프링 물리
  const force = (targetAngle - angle) * stiffness;
  velocity += force;
  velocity *= damping;
  angle += velocity;

  // 2. idle 흔들림 (유나 핵심)
  time += 0.016;

  const idleSwing = Math.sin(time * 1.5) * 0.01;
  const idleBounce = Math.sin(time * 2.2) * 2; // px

  // 3. 적용
  wrapper.style.transform = `
    rotate(${angle + idleSwing}rad)
    translateY(${idleBounce}px)
  `;

  requestAnimationFrame(animate);
}

animate();
