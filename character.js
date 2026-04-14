window.addEventListener("load", () => {
  const wrapper = document.getElementById("character");
  const el = wrapper.querySelector("img");

  let x = 0;
  let y = 0;

  let vx = 2;  // 🔥 처음에 살짝 움직이게
  let vy = -5;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const gravity = 0.4;
  const friction = 0.96;
  const bounce = 0.6;

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

      // 🔥 바닥 (받침대 기준)
      if (y > 0) {
        y = 0;
        vy *= -bounce;

        if (Math.abs(vy) < 0.5) vy = 0;
      }
    }

    el.style.transform =
      `translate(${x}px, ${y}px) rotate(${vx * 0.5}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
});
