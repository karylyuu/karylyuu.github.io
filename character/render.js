const pivot = document.getElementById("pivot");
const rod = document.getElementById("rod");

export function render(state) {

  // 회전
  pivot.style.transform = `
    translateX(-50%)
    rotate(${state.angle}rad)
  `;

  // 길이 적용
  rod.style.height = `${state.length}px`;
}
