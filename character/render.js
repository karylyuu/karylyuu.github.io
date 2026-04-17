export function render(state, root) {

  const idleSwing = Math.sin(state.time * 1.5) * 0.01;
  const idleBounce = Math.sin(state.time * 2.2) * 2;

  root.style.transform = `
    translateX(-50%)
    rotate(${state.angle + idleSwing}rad)
    translateY(${idleBounce}px)
  `;
}
