export const config = {
  baseLength: 52,
  minLength: 36,
  maxLength: 132,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  dragAngleFactor: 0.0024,
  dragLengthFactor: 0.42,
  dragEase: 0.18,

  springK: 0.085,
  damping: 0.905,

  lengthSpringK: 0.13,
  lengthDamping: 0.84,

  releaseAngleFactor: 0.00028,
  releaseLengthFactor: 0.00065,

  idleAmplitude: 0.0025,
  idleSpeed: 6.5,

  charOverlap: 24,
  alphaThreshold: 20
};
