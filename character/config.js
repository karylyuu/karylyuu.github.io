export const config = {
  baseLength: 52,
  minLength: 36,
  maxLength: 126,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  dragAngleFactor: 0.00235,
  dragLengthFactor: 0.28,
  dragEase: 0.16,

  springK: 0.082,
  damping: 0.905,

  lengthSpringK: 0.12,
  lengthDamping: 0.86,

  releaseAngleFactor: 0.00022,
  releaseLengthFactor: 0.00038,

  idleAmplitude: 0.0035,
  idleSpeed: 6.0,

  charOverlap: 18
};
