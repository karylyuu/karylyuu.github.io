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

    const vertical =
      dy < 0
        ? -dy * config.upLengthFactor
        : -dy * config.downLengthFactor;

    const targetLength = clamp(
      config.baseLength + vertical - overflowShrink,
      config.minLength,
      config.maxLength
    );

    state.angularVel += (targetAngle - state.angle) * config.dragAngleSpring;
    state.lengthVel += (targetLength - state.length) * config.dragLengthSpring;

    state.angularVel *= config.dragAngleDamping;
    state.lengthVel *= config.dragLengthDamping;

    state.angle += state.angularVel;
    state.length += state.lengthVel;
  } else {
    const stretch = state.length - config.baseLength;
    const lengthSpring =
      stretch >= 0 ? config.releaseLengthSpringUp : config.releaseLengthSpringDown;

    state.angularVel += -state.angle * config.releaseAngleSpring;
    state.lengthVel += (config.baseLength - state.length) * lengthSpring;

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
