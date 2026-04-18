const pivot = document.getElementById("pivot");

const seg1 = document.querySelector(".seg1");
const seg2 = document.querySelector(".seg2");
const seg3 = document.querySelector(".seg3");

// 지연 변수
let seg2Angle = 0;
let seg3Angle = 0;

export function render(state) {

  const idle = Math.sin(state.time * 1.5) * 0.01;
  const total = state.angle + idle;

  // 전체 회전
  pivot.style.transform = `
    translateX(-50%)
    rotate(${total}rad)
  `;

  // 부드러운 지연 (핵심)
  seg2Angle += (total - seg2Angle) * 0.2;
  seg3Angle += (total - seg3Angle) * 0.35;

  // 세그먼트별 회전
  seg1.style.transform = `
    translateX(-50%)
    rotate(${total * 0.2}rad)
  `;

  seg2.style.transform = `
    translateX(-50%)
    rotate(${seg2Angle}rad)
  `;

  seg3.style.transform = `
    translateX(-50%)
    rotate(${seg3Angle}rad)
  `;
}
