export const config = {
  baseLength: 50,
  minLength: 34,
  maxLength: 118,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  dragAngleFactor: 0.0022,
  dragLengthFactor: 0.28,
  dragEase: 0.16,

  springK: 0.08,
  damping: 0.905,

  lengthSpringK: 0.12,
  lengthDamping: 0.86,

  releaseAngleFactor: 0.00025,
  releaseLengthFactor: 0.00042,

  idleAmplitude: 0.003,
  idleSpeed: 6.0,

  charOverlap: 18
};
