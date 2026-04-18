let pivot;
let rod;
let char;

export function render(state) {

  // 🔹 최초 1회만 DOM 연결
  if (!pivot) {
    pivot = document.getElementById("pivot");
    rod = document.getElementById("rod");
    char = document.getElementById("char");
  }

  if (!pivot || !rod || !char) return;

  // =========================
  // 🔥 1. idle (미세 흔들림)
  // =========================
  const idle = Math.sin(performance.now() * 0.002) * 0.01;

  const angle = state.angle + idle;

  // =========================
  // 🔥 2. 회전 적용
  // =========================
  pivot.style.transform = `
    translateX(-50%)
    rotate(${angle}rad)
  `;

  // =========================
  // 🔥 3. 막대 길이
  // =========================
  rod.style.height = `${state.length}px`;

  // =========================
  // 🔥 4. 캐릭터 위치 보정 (핵심)
  // =========================
  // 막대 길이에 따라 캐릭터 살짝 눌림/복원 느낌

  const stretch = (state.length - 50) * 0.002;

  char.style.transform = `
    translateX(-50%)
    translateY(${6 + stretch * 10}px)
    scaleY(${1 - stretch * 0.2})
  `;
}
