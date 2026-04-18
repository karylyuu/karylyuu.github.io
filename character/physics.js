export function updatePhysics(state) {

  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = state.mouse.x - px;
  const dy = state.mouse.y - py;

  const base = 50;

  if (state.dragging) {

    // 🎯 각도 (안정화)
    const targetAngle = Math.atan2(dx, -dy);
    state.angle += (targetAngle - state.angle) * 0.08;

    // 🎯 길이 계산
    let targetLength;

    if (dy < 0) {
      // 👉 위로 당김 (이완)
      targetLength = base + (-dy * 0.6);
    } else {
      // 👉 아래로 당김 (압축 - 더 약하게!)
      targetLength = base - (dy * 0.2);
    }

    const min = base * 0.35;  // 완전 안 사라지게
    const max = base * 2;     // 최대 2배

    targetLength = Math.max(min, Math.min(max, targetLength));

    state.length += (targetLength - state.length) * 0.18;

  } else {

    // 🔥 진짜 물리 (핵심)
    const spring = (50 - state.length) * 0.08;
    state.velocityY += spring;

    state.velocityY *= 0.85;
    state.length += state.velocityY;

    // 각도도 스프링 복귀
    const angleSpring = -state.angle * 0.05;
    state.velocity += angleSpring;

    state.velocity *= 0.88;
    state.angle += state.velocity;
  }
}
