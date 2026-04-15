const wrapper = document.getElementById("char-wrapper");
const char = document.getElementById("char");

let angle = 0;
let velocity = 0;

let dragging = false;

const gravity = 0.02;
const damping = 0.97;

// 드래그 시작
char.addEventListener("mousedown", (e) => {
  dragging = true;
});

// 드래그 중
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = wrapper.getBoundingClientRect();

  const pivotX = rect.left + rect.width / 2;
  const pivotY = rect.bottom;

  const dx = e.clientX - pivotX;
  const dy = e.clientY - pivotY;

  // 🔥 각도 계산 (핵심)
  angle = Math.atan2(dx, dy);

  // 🔥 속도 생성 (핵심)
  velocity = dx * 0.002;
});

// 드래그 끝
window.addEventListener("mouseup", () => {
  dragging = false;
});

// 애니메이션
function animate() {
  if (!dragging) {
    velocity += -Math.sin(angle) * gravity;
    velocity *= damping;
    angle += velocity;
  }

  wrapper.style.transform = `rotate(${angle}rad)`;

  requestAnimationFrame(animate);
}

animate();
