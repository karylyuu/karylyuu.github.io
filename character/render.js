let pivot;
let rod;
let char;

export function render(state) {
  if (!pivot) {
    pivot = document.getElementById("pivot");
    rod = document.getElementById("rod");
    char = document.getElementById("char");
  }

  if (!pivot || !rod || !char) return;

  const idle = state.dragging ? 0 : Math.sin(state.time * 7) * 0.004;
  const angle = state.angle + idle;

  pivot.style.transform = `
    translateX(-50%)
    rotate(${angle}rad)
  `;

  rod.style.height = `${state.length}px`;

  const stretch = Math.max(0, state.length - 50);
  const squashY = 1 - Math.min(stretch * 0.0025, 0.09);

  char.style.transform = `
    translateX(-50%)
    scaleY(${squashY})
  `;
}
