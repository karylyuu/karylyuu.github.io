window.addEventListener("load", () => {
  const el = document.getElementById("char");

  if (!el) {
    console.error("char not found");
    return;
  }

  // ✅ [변경 1] 시작 위치 수정 (항상 화면 안)
  let x = window.innerWidth - 150;
  let y = window.innerHeight - 150;

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
      vy += gravity;

      x += vx;
      y += vy;

      vx *= friction;
      vy *= friction;

      // 좌우 벽
      if (x < 0) {
        x = 0;
        vx *= -bounce;
      }
      if (x > window.innerWidth - el.offsetWidth) {
        x = window.innerWidth - el.offsetWidth;
        vx *= -bounce;
      }

      // 바닥
      if (y > window.innerHeight - el.offsetHeight) {
        y = window.innerHeight - el.offsetHeight;
        vy *= -bounce;

        // ✅ [변경 2] 무한 점프 제거
        if (Math.abs(vy) < 1) vy = 0;
      }

      // 천장
      if (y < 0) {
        y = 0;
        vy *= -bounce;
      }
    }

    // ✅ [변경 3] 화면 밖 방지 (핵심 안정화)
    x = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, y));

    const rotation = vx * 0.5;

    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
});
