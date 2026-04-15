const el = document.getElementById("char");

let angle = 0;
let velocity = 0;
let acceleration = 0;

let dragging = false;
let lastX = 0;

const gravity = 0.02;
const damping = 0.98;

// 🔥 초기 미세 움직임 (유나 느낌)
velocity = 0.1;

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

  angle += dx * 0.01;
  velocity = dx * 0.02;
});

// 드래그 끝
window.addEventListener("mouseup", () => {
  dragging = false;
});

// 애니메이션
function animate() {
  if (!dragging) {
    acceleration = -Math.sin(angle) * gravity;
    velocity += acceleration;
    velocity *= damping;
    angle += velocity;

    // 🔥 일정 시간 지나면 멈춤 (유나 느낌)
    if (Math.abs(velocity) < 0.001) {
      velocity = 0;
    }
  }

  el.style.transform = `translateX(-50%) rotate(${angle}rad)`;

  requestAnimationFrame(animate);
}

animate();
