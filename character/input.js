export function initInput(state) {

  let lastX = 0;
  const char = document.getElementById("char");

  char.addEventListener("mousedown", (e) => {
    state.dragging = true;
    lastX = e.clientX;
  });

  window.addEventListener("mouseup", () => {
    state.dragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.dragging) return;

    const dx = e.clientX - lastX;
    lastX = e.clientX;

    state.input.dx += dx;
  });
}
