import { config } from "./config.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createAlphaHitTester(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  let ready = false;

  const redraw = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ready = true;
  };

  if (img.complete && img.naturalWidth) {
    redraw();
  } else {
    img.addEventListener("load", redraw, { once: true });
  }

  return (clientX, clientY) => {
    const rect = img.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return false;
    }

    if (!ready) return true;

    const x = Math.floor(((clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((clientY - rect.top) / rect.height) * canvas.height);

    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;

    const alpha = ctx.getImageData(x, y, 1, 1).data[3];
    return alpha > config.alphaThreshold;
  };
}

export function initInput(state) {
  const char = document.getElementById("char");
  if (!char) return;

  const hitTest = createAlphaHitTester(char);
  window.__characterHitTest = hitTest;
  window.__characterHover = false;
  window.__characterDragging = false;

  const syncCharCursor = (clientX, clientY) => {
    const hovering = hitTest(clientX, clientY);
    state.hoverCharacter = hovering;
    window.__characterHover = hovering;
    char.classList.toggle("hit", hovering);
  };

  const endDrag = () => {
    if (!state.dragArmed && !state.dragging) return;

    state.dragArmed = false;
    state.dragging = false;
    window.__characterDragging = false;

    state.pointerSpeed = 0;
    state.dragForce = 0;

    if (Number.isFinite(state.mouse.x) && Number.isFinite(state.mouse.y)) {
      syncCharCursor(state.mouse.x, state.mouse.y);
    } else {
      window.__characterHover = false;
      char.classList.remove("hit");
    }
  };

  window.addEventListener("pointermove", (e) => {
    syncCharCursor(e.clientX, e.clientY);

    if (!state.dragArmed && !state.dragging) return;

    const now = performance.now();
    const dt = Math.max((now - state.lastMoveAt) / 1000, 1 / 120);

    const dx = e.clientX - state.prevMouse.x;
    const dy = e.clientY - state.prevMouse.y;

    state.pointerVX = dx / dt;
    state.pointerVY = dy / dt;
    state.pointerSpeed = Math.hypot(state.pointerVX, state.pointerVY);

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
      window.__characterDragging = true;
    }

    const pullDistance = Math.hypot(
      e.clientX - state.dragStart.x,
      e.clientY - state.dragStart.y
    );

    state.dragForce = clamp(
      pullDistance / Math.max(window.innerHeight * 0.35, 180),
      0,
      1
    );
  });

  window.addEventListener("pointerleave", () => {
    state.hoverCharacter = false;
    window.__characterHover = false;
    window.__characterDragging = false;
    char.classList.remove("hit");
  });

  document.addEventListener("mouseleave", () => {
    state.hoverCharacter = false;
    window.__characterHover = false;
    window.__characterDragging = false;
    char.classList.remove("hit");
  });

  char.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (!hitTest(e.clientX, e.clientY)) return;

    e.preventDefault();

    state.dragArmed = true;
    state.dragging = false;
    window.__characterDragging = true;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.prevMouse.x = e.clientX;
    state.prevMouse.y = e.clientY;
    state.dragStart.x = e.clientX;
    state.dragStart.y = e.clientY;

    state.pointerVX = 0;
    state.pointerVY = 0;
    state.pointerSpeed = 0;
    state.dragForce = 0;
    state.lastMoveAt = performance.now();

    syncCharCursor(e.clientX, e.clientY);

    char.setPointerCapture?.(e.pointerId);
  });

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  window.addEventListener("blur", endDrag);
}
