export const config = {
  baseLength: 50,
  minLength: 34,
  maxLength: 122,

  // 막대가 캐릭터 몸 안쪽으로 들어가는 깊이
  rodHeadOverlap: 52,

  maxAngle: Math.PI / 4,
  dragThreshold: 5,

  dragAngleFactor: 0.00215,
  dragLengthFactor: 0.45,

  dragAngleSpring: 0.10,
  dragLengthSpring: 0.11,
  dragAngleDamping: 0.90,
  dragLengthDamping: 0.90,

  releaseAngleSpring: 0.072,
  releaseLengthSpring: 0.085,
  releaseAngleDamping: 0.92,
  releaseLengthDamping: 0.91,

  // 길이와 각도 사이에 아주 약한 곡선 감각을 주는 값
  releaseCoupling: 0.0016,

  idleAmplitude: 0.0025,
  idleSpeed: 6.2,

  alphaThreshold: 18
};
