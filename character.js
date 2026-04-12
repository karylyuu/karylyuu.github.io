window.addEventListener("load", () => {
  const el = document.getElementById("char");

  if (!el) {
    console.error("char not found");
    return;
  }

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
      vy += gravity;

      x += vx;
      y += vy;

      vx *= friction;
      vy *= friction;

      if (x < 0) {
        x = 0;
        vx *= -bounce;
      }
      if (x > window.innerWidth - el.offsetWidth) {
        x = window.innerWidth - el.offsetWidth;
        vx *= -bounce;
      }

      if (y > window.innerHeight - el.offsetHeight) {
        y = window.innerHeight - el.offsetHeight;
        vy *= -bounce;

        if (Math.abs(vy) < 1) vy = -10;
      }

      if (y < 0) {
        y = 0;
        vy *= -bounce;
      }
    }

    const rotation = vx * 0.5;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
});
