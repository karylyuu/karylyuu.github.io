const el = document.getElementById("char");

let angle = 0;
let velocity = 0;
let acceleration = 0;

let dragging = false;
let lastX = 0;

const gravity = 0.015;
const damping = 0.995;

// 드래그 시작
el.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;
});

// 드래그 중
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  let dx = e.clientX - lastX;
  lastX = e.clientX;

  // 드래그로 각도 변화
  angle += dx * 0.01;

  // 관성 추가 (핵심)
  velocity = dx * 0.02;
});

// 드래그 끝
window.addEventListener("mouseup", () => {
  dragging = false;
});

// 애니메이션 루프
function animate() {
  if (!dragging) {
    // 진자 물리
    acceleration = -Math.sin(angle) * gravity;
    velocity += acceleration;
    velocity *= damping;
    angle += velocity;
  }

  // 🔥 핵심: rotate만 사용
  el.style.transform = `rotate(${angle}rad)`;

  requestAnimationFrame(animate);
}

animate();
