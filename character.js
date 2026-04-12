window.addEventListener("load", () => {
  const el = document.getElementById("char");

  if (!el) {
    console.error("char not found");
    return;
  }

  // ✅ 시작 위치 (확실하게 보이는 위치)
  let x = window.innerWidth - 160;
  let y = window.innerHeight - 160;

  let vx = 0;
  let vy = 0;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const gravity = 0.5;
  const friction = 0.98;
  const bounce = 0.7;

  el.style.left = x + "px";
  el.style.top = y + "px";

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

    el.style.left = x + "px";
    el.style.top = y + "px";
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

      // 벽
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

        if (Math.abs(vy) < 1) vy = 0;
      }

      // 천장
      if (y < 0) {
        y = 0;
        vy *= -bounce;
      }

      // 👉 위치 직접 갱신 (핵심)
      el.style.left = x + "px";
      el.style.top = y + "px";
    }

    // 👉 기울기만 transform 사용
    const rotation = vx * 0.5;
    el.style.transform = `rotate(${rotation}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
});
