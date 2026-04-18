let pivot;
let rod;

export function render(state) {

  // 최초 1회만 가져오기
  if (!pivot) {
    pivot = document.getElementById("pivot");
    rod = document.getElementById("rod");
  }

  if (!pivot || !rod) return; // 안전장치

  pivot.style.transform = `
    translateX(-50%)
    rotate(${state.angle}rad)
  `;

  rod.style.height = `${state.length}px`;
}
