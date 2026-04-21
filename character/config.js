export const config = {
  baseLength: 50,
  minLength: 42,
  maxLength: 116,

  // 막대가 캐릭터 몸 안쪽으로 더 들어가는 깊이
  rodHeadOverlap: 72,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  // 좌우 반응
  angleFactor: 0.0019,
  dragAngleSpring: 0.09,
  dragAngleDamping: 0.90,
  releaseAngleSpringUp: 0.12,
  releaseAngleSpringDown: 0.07,
  releaseAngleDamping: 0.88,

  // 상하 반응
  upLengthFactor: 0.60,
  downLengthFactor: 0.13,
  overflowLengthFactor: 1.00,
  dragLengthSpring: 0.12,
  dragLengthDamping: 0.90,
  releaseLengthSpringUp: 0.20,
  releaseLengthSpringDown: 0.10,
  releaseLengthDamping: 0.88,

  // 축간 결합감
  coupling: 0.004,

  idleAmplitude: 0.0022,
  idleSpeed: 6.1,

  alphaThreshold: 18
};
