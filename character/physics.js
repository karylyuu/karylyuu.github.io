export function updatePhysics(state) {

  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = state.mouse.x - px;
  const dy = state.mouse.y - py;

  if (state.dragging) {

    // 🔥 올바른 각도
    const targetAngle = Math.atan2(dx, dy * 1.2);

    // 🔥 튐 방지 (핵심)
    state.angle += (targetAngle - state.angle) * 0.12;

    // 🔥 거리 제한 (핵심)
    let dist = Math.sqrt(dx * dx + dy * dy);

    const base = 80;

    // 👉 강제 범위 제한
    dist = Math.max(20, Math.min(160, dist));

    state.length += (dist - state.length) * 0.15;

  } else {
    // 자연 복귀
    state.angle *= 0.92;
    state.length += (80 - state.length) * 0.08;
  }
}
