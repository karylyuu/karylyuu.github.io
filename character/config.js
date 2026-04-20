export const config = {
  baseLength: 50,
  minLength: 40,
  maxLength: 105,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  angleFactor: 0.00195,

  upLengthFactor: 0.52,
  downLengthFactor: 0.14,
  overflowLengthFactor: 0.85,

  dragAngleSpring: 0.11,
  dragLengthSpring: 0.14,
  dragAngleDamping: 0.86,
  dragLengthDamping: 0.88,

  releaseAngleSpringUp: 0.082,
  releaseAngleSpringDown: 0.064,
  releaseLengthSpringUp: 0.13,
  releaseLengthSpringDown: 0.085,

  releaseAngleDamping: 0.905,
  releaseLengthDamping: 0.915,

  coupling: 0.0016,

  idleAmplitude: 0.0022,
  idleSpeed: 6.1,

  alphaThreshold: 18
};
