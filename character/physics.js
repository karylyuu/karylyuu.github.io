import { config } from "./config.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function smoothStep(value) {
  return value * value * (3 - 2 * value);
}

export function updatePhysics(state, time = 0) {
  const pivot = document.getElementById("pivot");
  if (!pivot) return;

  const dtMs = state.lastPhysicsTime ? time - state.lastPhysicsTime : 16.667;
  state.lastPhysicsTime = time;
  const dt = clamp(dtMs / 16.667, 0.5, 2.0);

  const rect = pivot.getBoundingClientRect();
  const anchorX = rect.left + rect.width / 2;
  const anchorY = rect.bottom;

  const dx = state.mouse.x - anchorX;
  const dy = state.mouse.y - anchorY;

  if (state.dragging) {
    const rawAngle = dx * config.angleFactor + state.pointerVX * config.speedAngleFactor;
    const targetAngle = clamp(rawAngle, -config.maxAngle, config.maxAngle);

    const overflow = Math.max(0, Math.abs(rawAngle) - config.maxAngle);
    const overflowShrink = overflow * config.overflowLengthFactor * config.baseLength;

    const speedForce = smoothStep(clamp(state.pointerSpeed / 1800, 0, 1)) * state.dragForce;

    const pullUp = dy < 0
      ? Math.min(-dy * config.upLengthFactor * (1 + speedForce * 0.45), config.baseLength * 1.15)
      : 0;

    const pullDown = dy >= 0
      ? -Math.min(dy * config.downLengthFactor * (1 + speedForce * 0.20), config.baseLength * 0.22)
      : 0;

    const speedStretch = -state.pointerVY * config.speedLengthFactor * 0.010;

    let targetLength = config.baseLength + pullUp + pullDown + speedStretch - overflowShrink;
    targetLength = clamp(targetLength, config.minLength, config.maxLength);

    state.angularVel += (targetAngle - state.angle) * config.dragAngleSpring * dt;
    state.lengthVel += (targetLength - state.length) * config.dragLengthSpring * dt;

    state.angularVel += state.pointerVX * 0.0000025 * speedForce * dt;
    state.lengthVel += -state.pointerVY * 0.00022 * speedForce * dt;

    state.angularVel *= Math.pow(config.dragAngleDamping, dt);
    state.lengthVel *= Math.pow(config.dragLengthDamping, dt);

    state.angle += state.angularVel * dt;
    state.length += state.lengthVel * dt;

    state.releaseMode = dy < 0 ? 1 : -1;
    return;
  }

  const releaseUp = state.releaseMode > 0;
  const releaseAngleSpring = releaseUp
    ? config.releaseAngleSpringUp
    : config.releaseAngleSpringDown;
  const releaseLengthSpring = releaseUp
    ? config.releaseLengthSpringUp
    : config.releaseLengthSpringDown;
  const releaseAngleDamping = releaseUp
    ? config.releaseAngleDampingUp
    : config.releaseAngleDampingDown;
  const releaseLengthDamping = releaseUp
    ? config.releaseLengthDampingUp
    : config.releaseLengthDampingDown;

  const stretchRatio = clamp(Math.abs(state.length - config.baseLength) / config.baseLength, 0, 1);
  const energy = smoothStep(clamp(state.dragForce + stretchRatio * 0.6, 0, 1));

  state.angularVel += (-state.angle * releaseAngleSpring + (releaseUp ? config.releaseAngleKickUp : -config.releaseAngleKickDown) * energy) * dt;
  state.lengthVel += ((config.baseLength - state.length) * releaseLengthSpring + (releaseUp ? config.releaseLengthKickUp : config.releaseLengthKickDown) * energy) * dt;

  state.angularVel += state.lengthVel * config.coupling * dt;
  state.lengthVel += state.angularVel * (config.coupling * 0.35) * dt;

  state.angularVel *= Math.pow(releaseAngleDamping, dt);
  state.lengthVel *= Math.pow(releaseLengthDamping, dt);

  state.angle += state.angularVel * dt;
  state.length += state.lengthVel * dt;

  state.angle = clamp(state.angle, -config.maxAngle, config.maxAngle);
  state.length = clamp(state.length, config.minLength, config.maxLength);

  if (Math.abs(state.angle) < 0.0007) state.angle = 0;
  if (Math.abs(state.angularVel) < 0.00002) state.angularVel = 0;
  if (Math.abs(state.length - config.baseLength) < 0.02 && Math.abs(state.lengthVel) < 0.02) {
    state.length = config.baseLength;
    state.lengthVel = 0;
  }
}
