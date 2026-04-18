export function render(state, root, rod) {

  const idleSwing = Math.sin(state.time * 1.5) * 0.01;
  const idleBounce = Math.sin(state.time * 2.2) * 2;

  const totalAngle = state.angle + idleSwing;
  
  const pivot = document.getElementById("pivot");
  
  export function render(state) {
    
    const idle = Math.sin(state.time * 1.5) * 0.01;
    
    pivot.style.transform = `
      translateX(-50%)
      rotate(${state.angle + idle}rad)
      ;
  }
