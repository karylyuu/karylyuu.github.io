export function render(state, root, rod) {

  const idleSwing = Math.sin(state.time * 1.5) * 0.01;
  const idleBounce = Math.sin(state.time * 2.2) * 2;

  const totalAngle = state.angle + idleSwing;

  // 캐릭터
  root.style.transform = `
    translateX(-50%)
    rotate(${totalAngle}rad)
    translateY(${idleBounce}px)
  `;

  // 막대기 (살짝만 따라감)
  rod.style.transform = `
    translateX(-50%)
    rotate(${totalAngle * 0.3}rad)
  `;
}
