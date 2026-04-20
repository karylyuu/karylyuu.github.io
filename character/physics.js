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
    const rawAngle = dx * config.angleFactor;
    const targetAngle = clamp(rawAngle, -config.maxAngle, config.maxAngle);

    const overflow = Math.max(0, Math.abs(rawAngle) - config.maxAngle);
    const overflowShrink = overflow * config.overflowLengthFactor * config.baseLength;

    const verticalStretch =
      dy < 0
        ? Math.min(-dy * config.upLengthFactor, config.baseLength * 1.05)
        : -Math.min(dy * config.downLengthFactor, config.baseLength * 0.2);

    let targetLength = config.baseLength + verticalStretch - overflowShrink;
    targetLength = clamp(targetLength, config.minLength, config.maxLength);

    state.angularVel += (targetAngle - state.angle) * config.dragAngleSpring;
    state.lengthVel += (targetLength - state.length) * config.dragLengthSpring;

    state.angularVel *= config.dragAngleDamping;
    state.lengthVel *= config.dragLengthDamping;

    state.angle += state.angularVel;
    state.length += state.lengthVel;

    state.releaseMode = dy < 0 ? 1 : -1;
    return;
  }

  const releaseAngleSpring =
    state.releaseMode > 0
      ? config.releaseAngleSpringUp
      : config.releaseAngleSpringDown;

  const releaseLengthSpring =
    state.releaseMode > 0
      ? config.releaseLengthSpringUp
      : config.releaseLengthSpringDown;

  state.angularVel += -state.angle * releaseAngleSpring;
  state.lengthVel += (config.baseLength - state.length) * releaseLengthSpring;

  state.angularVel += state.lengthVel * config.coupling;
  state.lengthVel += state.angularVel * (config.coupling * 0.35);

  state.angularVel *= config.releaseAngleDamping;
  state.lengthVel *= config.releaseLengthDamping;

  state.angle += state.angularVel;
  state.length += state.lengthVel;

  state.angle = clamp(state.angle, -config.maxAngle, config.maxAngle);
  state.length = clamp(state.length, config.minLength, config.maxLength);
}
