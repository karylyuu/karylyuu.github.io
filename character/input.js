export function initInput(state) {

  const char = document.getElementById("char");

  char.addEventListener("mousedown", () => {
    state.dragging = true;
  });

  window.addEventListener("mouseup", () => {
    state.dragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.dragging) return;

    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
  });
}
