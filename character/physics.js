export function updatePhysics(state) {

  const pivot = document.getElementById("pivot");
  const rect = pivot.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  // 마우스 기준
  const dx = state.mouse.x - px;
  const dy = state.mouse.y - py;

  if (state.dragging) {

    // 🔥 각도 계산 (핵심)
    const targetAngle = Math.atan2(dx, dy);

    state.angle += (targetAngle - state.angle) * 0.2;

    // 🔥 길이 계산 (핵심)
    let dist = Math.sqrt(dx * dx + dy * dy);

    // 제한 (비율 0.3 ~ 2)
    const base = 80;
    const min = base * 0.3;
    const max = base * 2;

    state.length += (dist - state.length) * 0.2;
    state.length = Math.max(min, Math.min(max, state.length));

  } else {
    // 복귀
    state.angle *= 0.9;
    state.length += (80 - state.length) * 0.1;
  }
}
