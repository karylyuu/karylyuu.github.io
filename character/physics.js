export function updatePhysics(state) {

  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = state.mouse.x - px;
  const dy = state.mouse.y - py;

  const base = 80;

  if (state.dragging) {

    // ✔ 각도 (수정됨)
    const targetAngle = Math.atan2(dx, -dy);

    state.angle += (targetAngle - state.angle) * 0.08;

    // ✔ 길이 (완전 수정)
    let targetLength = base + (dy * -0.5);

    const min = base * 0.3;
    const max = base * 2;

    targetLength = Math.max(min, Math.min(max, targetLength));

    state.length += (targetLength - state.length) * 0.15;

  } else {
    // 복귀
    state.angle *= 0.92;
    state.length += (base - state.length) * 0.08;
  }
}
