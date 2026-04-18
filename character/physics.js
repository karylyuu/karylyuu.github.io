export function updatePhysics(state) {

  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();

  const px = rect.left + rect.width / 2;
  const py = rect.bottom;

  const dx = state.mouse.x - px;
  const dy = state.mouse.y - py;

  const baseLen = 50;

  if (state.dragging) {

    // 🎯 목표 각도
    let targetAngle = Math.atan2(dx, -dy);

    // ✔ 각도 제한 (유나 핵심)
    const max = Math.PI / 4; // 45도
    targetAngle = Math.max(-max, Math.min(max, targetAngle));

    // ✔ 각도 스무딩
    state.angle += (targetAngle - state.angle) * 0.15;

    // ✔ 길이 (위/아래 다르게)
    let targetLen;

    if (dy < 0) {
      targetLen = baseLen + (-dy * 0.5);
    } else {
      targetLen = baseLen - (dy * 0.25);
    }

    const min = baseLen * 0.4;
    const maxLen = baseLen * 2;

    targetLen = Math.max(min, Math.min(maxLen, targetLen));

    state.length += (targetLen - state.length) * 0.2;

    // 🔥 드래그 중엔 속도 초기화 (중요)
    state.angularVel = 0;
    state.lengthVel = 0;

  } else {

    // =========================
    // 🔥 진짜 물리 (유나 핵심)
    // =========================

    // ✔ 각도 스프링
    const angleSpring = -state.angle * 0.06;
    state.angularVel += angleSpring;

    // ✔ 감쇠
    state.angularVel *= 0.92;

    // ✔ 적용
    state.angle += state.angularVel;

    // ✔ 길이 스프링
    const lenSpring = (baseLen - state.length) * 0.1;
    state.lengthVel += lenSpring;

    state.lengthVel *= 0.85;
    state.length += state.lengthVel;
  }
}
