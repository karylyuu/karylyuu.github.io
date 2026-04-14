const el = document.getElementById("char");

let angle = 0;        // 현재 각도
let velocity = 0;     // 각속도
let acceleration = 0; // 각가속도

const gravity = 0.4;
const damping = 0.995;

let dragging = false;

// 마우스 드래그
el.addEventListener("mousedown", () => {
  dragging = true;
  el.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  dragging = false;
  el.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const baseY = rect.bottom; // pivot 기준

  // 마우스 방향으로 각도 계산
  const dx = e.clientX - centerX;
  const dy = e.clientY - baseY;

  angle = Math.atan2(dx, dy); // 🔥 핵심
  velocity = 0;
});

function animate() {
  if (!dragging) {
    // 🔥 진자 물리
    acceleration = -Math.sin(angle) * gravity;

    velocity += acceleration;
    velocity *= damping;

    angle += velocity;
  }

  // 👉 회전 적용
  el.style.transform =
    `translateX(-50%) rotate(${angle}rad)`;

  requestAnimationFrame(animate);
}

// 🔥 처음 흔들림 (yuna 느낌)
velocity = 0.2;

animate();
