import { config } from "./config.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function initInput(state) {
  const char = document.getElementById("char");
  const grabCursor = document.getElementById("grab-cursor");
  if (!char) return;

  const setGrabCursor = (x, y, visible) => {
    if (!grabCursor) return;
    grabCursor.style.left = `${x}px`;
    grabCursor.style.top = `${y}px`;
    grabCursor.dataset.visible = visible ? "true" : "false";
  };

  const endDrag = () => {
    if (!state.dragArmed && !state.dragging) return;

    if (state.dragging) {
      state.angularVel += clamp(
        state.pointerVX * config.releaseAngleFactor,
        -0.22,
        0.22
      );

      state.lengthVel += clamp(
        state.pointerVY * config.releaseLengthFactor,
        -1.4,
        1.4
      );
    }

    state.dragArmed = false;
    state.dragging = false;

    document.body.classList.remove("character-holding");
    setGrabCursor(state.mouse.x, state.mouse.y, false);
  };

  char.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    state.dragArmed = true;
    state.dragging = false;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.prevMouse.x = e.clientX;
    state.prevMouse.y = e.clientY;
    state.dragStart.x = e.clientX;
    state.dragStart.y = e.clientY;

    state.pointerVX = 0;
    state.pointerVY = 0;
    state.lastMoveAt = performance.now();

    setGrabCursor(e.clientX, e.clientY, true);
    document.body.classList.add("character-holding");

    char.setPointerCapture?.(e.pointerId);
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      setGrabCursor(e.clientX, e.clientY, state.dragArmed || state.dragging);

      if (!state.dragArmed && !state.dragging) return;

      const now = performance.now();
      const dt = Math.max((now - state.lastMoveAt) / 1000, 1 / 120);

      const dx = e.clientX - state.prevMouse.x;
      const dy = e.clientY - state.prevMouse.y;

      state.pointerVX = dx / dt;
      state.pointerVY = dy / dt;

      state.prevMouse.x = e.clientX;
      state.prevMouse.y = e.clientY;
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
      state.lastMoveAt = now;

      if (state.dragArmed && !state.dragging) {
        const moved = Math.hypot(
          e.clientX - state.dragStart.x,
          e.clientY - state.dragStart.y
        );

        if (moved < config.dragThreshold) return;
        state.dragging = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  window.addEventListener("blur", endDrag);
}
