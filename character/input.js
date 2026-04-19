function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function initInput(state) {
  const char = document.getElementById("char");
  if (!char) return;

  char.addEventListener("dragstart", (e) => e.preventDefault());

  char.addEventListener("mousedown", (e) => {
    state.dragging = true;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;

    state.prevMouse.x = e.clientX;
    state.prevMouse.y = e.clientY;

    state.pointerVX = 0;
    state.pointerVY = 0;
    state.lastMoveTime = performance.now();

    state.releaseAngularVel = 0;
    state.releaseLengthVel = 0;
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.dragging) return;

    const now = performance.now();
    const dt = Math.max((now - state.lastMoveTime) / 1000, 1 / 120);

    state.pointerVX = (e.clientX - state.prevMouse.x) / dt;
    state.pointerVY = (e.clientY - state.prevMouse.y) / dt;

    state.prevMouse.x = e.clientX;
    state.prevMouse.y = e.clientY;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;

    state.lastMoveTime = now;
  });

  window.addEventListener("mouseup", () => {
    if (!state.dragging) return;

    state.dragging = false;

    state.releaseAngularVel = clamp(state.pointerVX * 0.0009, -0.28, 0.28);
    state.releaseLengthVel = clamp(-state.pointerVY * 0.0007, -1.2, 1.2);

    state.pointerVX = 0;
    state.pointerVY = 0;
  });

  window.addEventListener("blur", () => {
    state.dragging = false;
  });
}
