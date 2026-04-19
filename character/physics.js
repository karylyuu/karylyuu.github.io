import { config } from "./config.js";


  const dy = state.mouse.y - anchorY;

  if (state.dragging) {
    const targetAngle = clamp(
      dx * config.dragAngleFactor,
      -config.maxAngle,
      config.maxAngle
    );

    const targetLength = clamp(
      config.baseLength + dy * config.dragLengthFactor,
      config.minLength,
      config.maxLength
    );

    state.angle = lerp(state.angle, targetAngle, config.dragEase);
    state.length = lerp(state.length, targetLength, 0.22);

    state.angularVel *= 0.72;
    state.lengthVel *= 0.72;
    return;
  }

  state.angularVel += -state.angle * config.springK;
  state.angularVel *= config.damping;
  state.angle += state.angularVel;

  state.lengthVel += (config.baseLength - state.length) * config.lengthSpringK;
  state.lengthVel *= config.lengthDamping;
  state.length += state.lengthVel;

  if (Math.abs(state.angle) > config.maxAngle) {
    state.angle = clamp(state.angle, -config.maxAngle, config.maxAngle);
    state.angularVel *= -0.32;
  }

  if (
    Math.abs(state.length - config.baseLength) < 0.05 &&
    Math.abs(state.lengthVel) < 0.05
  ) {
    state.length = config.baseLength;
    state.lengthVel = 0;
  }
}
