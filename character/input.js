function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function initInput(state) {
  const char = document.getElementById("char");
  if (!char) return;

  const DRAG_THRESHOLD = 6; // 👈 이게 핵심

  let pendingDrag = false;

  char.addEventListener("dragstart", (e) => e.preventDefault());

  char.addEventListener("mousedown", (e) => {
    pendingDrag = true;
    state.dragging = false;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;

    state.prevMouse.x = e.clientX;
    state.prevMouse.y = e.clientY;

    state.pointerVX = 0;
    state.pointerVY = 0;
    state.lastMoveTime = performance.now();
  });

  window.addEventListener("mousemove", (e) => {
    const dx = e.clientX - state.mouse.x;
    const dy = e.clientY - state.mouse.y;

    // 🔥 아직 드래그 확정 안됐을 때
    if (pendingDrag && !state.dragging) {
      const dist = Math.hypot(dx, dy);

      if (dist > DRAG_THRESHOLD) {
        state.dragging = true;
      } else {
        return; // 👈 그냥 클릭 상태 유지
      }
    }

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
    // 🔥 클릭만 했을 경우
    if (pendingDrag && !state.dragging) {
      pendingDrag = false;
      return;
    }

    if (!state.dragging) return;

    state.dragging = false;
    pendingDrag = false;

    state.releaseAngularVel = clamp(state.pointerVX * 0.0009, -0.28, 0.28);
    state.releaseLengthVel = clamp(-state.pointerVY * 0.0007, -1.2, 1.2);

    state.pointerVX = 0;
    state.pointerVY = 0;
  });

  window.addEventListener("blur", () => {
    state.dragging = false;
    pendingDrag = false;
  });
}
