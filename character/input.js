export function initInput(state) {

  const char = document.getElementById("char");

  char.addEventListener("mousedown", (e) => {
    state.dragging = true;

    // 🔥 핵심: 시작 위치 고정
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
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
