export const config = {
  baseLength: 50,
  minLength: 42,
  maxLength: 122,

  rodHeadOverlap: 66,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  angleFactor: 0.00185,
  upLengthFactor: 0.45,
  downLengthFactor: 0.16,
  overflowLengthFactor: 0.52,

  dragAngleSpring: 0.10,
  dragLengthSpring: 0.085,
  dragAngleDamping: 0.88,
  dragLengthDamping: 0.86,

  releaseAngleSpring: 0.072,
  releaseLengthSpringUp: 0.12,
  releaseLengthSpringDown: 0.08,
  releaseAngleDamping: 0.91,
  releaseLengthDamping: 0.89,

  releaseAngleFactor: 0.00022,
  releaseLengthFactor: 0.00052,
  releaseCoupling: 0.0016,

  idleAmplitude: 0.0022,
  idleSpeed: 6.1,

  alphaThreshold: 18
};
