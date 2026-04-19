function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function updatePhysics(state) {
  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();

  // 현재 리그의 실제 회전 축을 캐릭터 쪽으로 조금 올려 잡는다.
  // rod가 캐릭터 아래쪽에 살짝 숨는 느낌을 만들기 위해서다.
  const anchorX = rect.left + rect.width / 2;
  const anchorY = rect.bottom - 34;

  const dx = state.mouse.x - anchorX;
  const dy = state.mouse.y - anchorY;

  const baseLen = 50;
  const maxAngle = Math.PI / 4;

  if (state.dragging) {
    // 아래로 끌 때도 각도가 튀지 않게, 세로축은 안정적인 기준값으로 둔다.
    const stabilizedY = Math.max(90, Math.abs(dy) + 40);

    let targetAngle = dx * 0.0025;
    targetAngle = clamp(targetAngle, -maxAngle, maxAngle);

    // 각도는 부드럽게 따라가도록
    state.angle += (targetAngle - state.angle) * 0.18;

    // 길이는 방향별 분기 대신 거리 기반으로 자연스럽게
    const distance = Math.hypot(dx, dy);
    let targetLen = baseLen + Math.min(distance * 0.15, 60);
    targetLen = clamp(targetLen, baseLen * 0.85, baseLen * 1.8);

    state.length += (targetLen - state.length) * 0.15;

    // 드래그 중에는 관성값을 약하게 정리
    state.angularVel *= 0.78;
    state.lengthVel *= 0.78;
  } else {
    // 놓는 순간의 속도 보정
    if (state.releaseAngularVel) {
      state.angularVel += state.releaseAngularVel;
      state.releaseAngularVel *= 0.45;
      if (Math.abs(state.releaseAngularVel) < 0.0005) state.releaseAngularVel = 0;
    }

    if (state.releaseLengthVel) {
      state.lengthVel += state.releaseLengthVel;
      state.releaseLengthVel *= 0.45;
      if (Math.abs(state.releaseLengthVel) < 0.01) state.releaseLengthVel = 0;
    }

    // 복원 스프링
    state.angularVel += -state.angle * 0.09;
    state.angularVel *= 0.90;
    state.angle += state.angularVel;

    state.lengthVel += (baseLen - state.length) * 0.12;
    state.lengthVel *= 0.86;
    state.length += state.lengthVel;
  }
}
