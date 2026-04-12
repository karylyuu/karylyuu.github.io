const el = document.getElementById("char");

let x = window.innerWidth * 0.8;
let y = window.innerHeight * 0.6;

let vx = 0;
let vy = 0;

let dragging = false;
let offsetX = 0;
let offsetY = 0;

const gravity = 0.5;
const friction = 0.98;
const bounce = 0.7;

el.addEventListener("mousedown", (e) => {
  dragging = true;
  el.style.cursor = "grabbing";

  offsetX = e.clientX - x;
  offsetY = e.clientY - y;

  vx = vy = 0;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  vx = newX - x;
  vy = newY - y;

  x = newX;
  y = newY;
});

document.addEventListener("mouseup", () => {
  dragging = false;
  el.style.cursor = "grab";
});

function animate() {
  if (!dragging) {
    // 중력 적용
    vy += gravity;

    // 이동
    x += vx;
    y += vy;

    // 마찰
    vx *= friction;
    vy *= friction;

    // 벽 충돌
    if (x < 0) {
      x = 0;
      vx *= -bounce;
    }
    if (x > window.innerWidth - el.offsetWidth) {
      x = window.innerWidth - el.offsetWidth;
      vx *= -bounce;
    }

    // 바닥 충돌
    if (y > window.innerHeight - el.offsetHeight) {
      y = window.innerHeight - el.offsetHeight;
      vy *= -bounce;

      // 바닥에서 살짝 튕기는 효과 강화
      if (Math.abs(vy) < 1) vy = -10;
    }

    // 천장
    if (y < 0) {
      y = 0;
      vy *= -bounce;
    }
  }

  // 👉 기울기 (속도 기반)
  const rotation = vx * 0.5;

  el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

  requestAnimationFrame(animate);
}

animate();
