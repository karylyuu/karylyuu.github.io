export function updatePhysics(state) {

  // 드래그 중엔 복원력 제거
  if (!state.dragging) {
    const force = -state.angle * 0.045;
    state.velocity += force;
  }

  // 입력 힘
  state.velocity += state.input.dx * 0.003;

  // 감쇠
  state.velocity *= 0.92;

  state.angle += state.velocity;

  const max = Math.PI / 3;
  state.angle = Math.max(-max, Math.min(max, state.angle));

  state.input.dx = 0;
}
