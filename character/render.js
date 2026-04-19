import { config } from "./config.js";

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

  const idle = state.dragging
    ? 0
    : Math.sin(state.time * config.idleSpeed) * config.idleAmplitude;

  pivot.style.transform = `
    translateX(-50%)
    rotate(${state.angle + idle}rad)
  `;

  rod.style.height = `${state.length}px`;

  // 막대가 캐릭터 중심부로 살짝 파고들어 보이게
  char.style.bottom = `${Math.max(0, state.length - config.charOverlap)}px`;

  const stretch = Math.max(0, state.length - config.baseLength);
  const squashY = 1 - Math.min(stretch * 0.0016, 0.08);

  char.style.transform = `
    translateX(-50%)
    scaleY(${squashY})
  `;
}
