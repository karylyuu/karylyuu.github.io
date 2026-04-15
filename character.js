const wrapper = document.getElementById("char-wrapper");
const char = document.getElementById("char");

// 상태
let angle = 0;
let velocity = 0;
let targetAngle = 0;

let dragging = false;

// 파라미터 (튜닝 핵심)
const stiffness = 0.08;   // 스프링 힘
const damping = 0.85;     // 감쇠
const mass = 1;

// 드래그 시작
char.addEventListener("mousedown", () => {
  dragging = true;
});

// 드래그 중 → 목표 각도 설정
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = wrapper.getBoundingClientRect();

  const pivotX = rect.left + rect.width / 2;
  const pivotY = rect.bottom;

  const dx = e.clientX - pivotX;
  const dy = e.clientY - pivotY;

  // 🔥 핵심: 목표 각도
  targetAngle = Math.atan2(dx, dy);
});

// 드래그 끝
window.addEventListener("mouseup", () => {
  dragging = false;
});

// 애니메이션
function animate() {

  // 🔥 스프링 물리 (핵심)
  const force = (targetAngle - angle) * stiffness;

  velocity += force / mass;
  velocity *= damping;

  angle += velocity;

  wrapper.style.transform = `rotate(${angle}rad)`;

  requestAnimationFrame(animate);
}

animate();
