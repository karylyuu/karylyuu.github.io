export const config = {
  baseLength: 50,
  minLength: 40,
  maxLength: 112,

  // 막대가 캐릭터 몸 안쪽으로 더 들어가는 깊이
  rodHeadOverlap: 72,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  // 좌우 반응
  angleFactor: 0.0019,
  dragAngleSpring: 0.11,
  dragAngleDamping: 0.88,
  releaseAngleSpringUp: 0.085,
  releaseAngleSpringDown: 0.065,
  releaseAngleDamping: 0.91,

  // 상하 반응
  upLengthFactor: 0.55,
  downLengthFactor: 0.16,
  overflowLengthFactor: 0.95,
  dragLengthSpring: 0.14,
  dragLengthDamping: 0.89,
  releaseLengthSpringUp: 0.14,
  releaseLengthSpringDown: 0.09,
  releaseLengthDamping: 0.915,

  // 축간 결합감
  coupling: 0.0015,

  idleAmplitude: 0.0022,
  idleSpeed: 6.1,

  alphaThreshold: 18
};
