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

  // rod가 캐릭터 몸 안쪽으로 더 들어가도록 충분한 오버랩을 준다
  rod.style.height = `${state.length + config.rodHeadOverlap}px`;

  const stretch = Math.max(0, state.length - config.baseLength);
  const squashY = 1 - Math.min(stretch * 0.0016, 0.08);

  char.style.transform = `
    translateX(-50%)
    scaleY(${squashY})
  `;
}
