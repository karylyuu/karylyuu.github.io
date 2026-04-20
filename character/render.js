import { config } from "./config.js";

let pivot;
let rod;

export function render(state) {
  if (!pivot) {
    pivot = document.getElementById("pivot");
    rod = document.getElementById("rod");
  }

  if (!pivot || !rod) return;

  const idle = state.dragging
    ? 0
    : Math.sin(state.time * config.idleSpeed) * config.idleAmplitude;

  pivot.style.transform = `
    translateX(-50%)
    rotate(${state.angle + idle}rad)
  `;

  rod.style.height = `${state.length + config.rodHeadOverlap}px`;
}
