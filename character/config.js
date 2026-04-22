export const config = {
  baseLength: 50,
  minLength: 38,
  maxLength: 124,

  // 막대가 몸체 안쪽으로 더 파고드는 정도
  rodHeadOverlap: 72,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  // 좌우 반응
  angleFactor: 0.0019,
  speedAngleFactor: 0.00022,
  dragAngleSpring: 0.14,
  dragAngleDamping: 0.84,
  releaseAngleSpringUp: 0.18,
  releaseAngleSpringDown: 0.11,
  releaseAngleDampingUp: 0.92,
  releaseAngleDampingDown: 0.86,
  releaseAngleKickUp: 0.030,
  releaseAngleKickDown: 0.018,

  // 상하 반응
  upLengthFactor: 0.62,
  downLengthFactor: 0.12,
  speedLengthFactor: 0.040,
  overflowLengthFactor: 0.90,
  dragLengthSpring: 0.16,
  dragLengthDamping: 0.84,
  releaseLengthSpringUp: 0.21,
  releaseLengthSpringDown: 0.11,
  releaseLengthDampingUp: 0.93,
  releaseLengthDampingDown: 0.86,
  releaseLengthKickUp: 4.2,
  releaseLengthKickDown: 2.0,

  // 축간 결합감
  coupling: 0.010,

  idleAmplitude: 0.0022,
  idleSpeed: 6.1,

  alphaThreshold: 18
};
