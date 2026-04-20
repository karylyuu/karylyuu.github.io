import { config } from "./config.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function updatePhysics(state) {
  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const rect = pivot.getBoundingClientRect();
  const anchorX = rect.left + rect.width / 2;
  const anchorY = rect.bottom;

  const dx = state.mouse.x - anchorX;
  const dy = state.mouse.y - anchorY;

  if (state.dragging) {
    const targetAngle = clamp(
      dx * config.dragAngleFactor,
      -config.maxAngle,
      config.maxAngle
    );

    // 위로 당기면 길어지고, 아래로 당기면 짧아지게
    const targetLength = clamp(
      config.baseLength - dy * config.dragLengthFactor,
      config.minLength,
      config.maxLength
    );

    const angleError = targetAngle - state.angle;
    const lengthError = targetLength - state.length;

    state.angularVel += angleError * config.dragAngleSpring;
    state.lengthVel += lengthError * config.dragLengthSpring;

    // 아주 약한 축간 결합으로 '원운동 같은 귀환감'을 만든다
    state.angularVel += state.lengthVel * config.releaseCoupling * 0.5;
    state.lengthVel += state.angularVel * config.releaseCoupling * 0.25;

    state.angularVel *= config.dragAngleDamping;
    state.lengthVel *= config.dragLengthDamping;

    state.angle += state.angularVel;
    state.length += state.lengthVel;
  } else {
    state.angularVel += -state.angle * config.releaseAngleSpring;
    state.lengthVel += (config.baseLength - state.length) * config.releaseLengthSpring;

    state.angularVel += state.lengthVel * config.releaseCoupling;
    state.lengthVel += state.angularVel * (config.releaseCoupling * 0.35);

    state.angularVel *= config.releaseAngleDamping;
    state.lengthVel *= config.releaseLengthDamping;

    state.angle += state.angularVel;
    state.length += state.lengthVel;
  }

  state.angle = clamp(state.angle, -config.maxAngle, config.maxAngle);
  state.length = clamp(state.length, config.minLength, config.maxLength);
}
