window.addEventListener("load", () => {
  const el = document.getElementById("char");

  if (!el) {
    console.error("char not found");
    return;
  }

  // 🔥 기준: 오른쪽 / 아래 거리
  let rightOffset = 40;
  let bottomOffset = 40;

  // 실제 좌표
  let x = window.innerWidth - rightOffset - el.offsetWidth;
  let y = window.innerHeight - bottomOffset - el.offsetHeight;

  let vx = 0;
  let vy = 0;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const gravity = 0.5;
  const friction = 0.98;
  const bounce = 0.7;

  // 초기 위치 적용
  el.style.left = x + "px";
  el.style.top = y + "px";

  // 드래그 시작
  el.addEventListener("mousedown", (e) => {
    dragging = true;
    el.style.cursor = "grabbing";

    offsetX = e.clientX - x;
    offsetY = e.clientY - y;

    vx = vy = 0;
  });

  // 드래그 이동
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    vx = 0;
    vy = 0;

    el.style.left = x + "px";
    el.style.top = y + "px";
  });

  // 드래그 종료
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

      // 벽 충돌
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

      el.style.left = x + "px";
      el.style.top = y + "px";
    }

    // 👉 회전만 transform 사용
    const rotation = vx * 0.5;
    el.style.transform = `rotate(${rotation}deg)`;

    requestAnimationFrame(animate);
  }

  animate();

  // 🔥 핵심: 화면 크기 바뀌면 다시 고정
  window.addEventListener("resize", () => {
    x = window.innerWidth - rightOffset - el.offsetWidth;
    y = window.innerHeight - bottomOffset - el.offsetHeight;

    el.style.left = x + "px";
    el.style.top = y + "px";
  });
});
