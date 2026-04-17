import { config } from "./config.js";

export function updatePhysics(state) {

  // 스프링 복원력
  const force = -state.angle * config.stiffness;
  state.velocity += force;

  // 드래그 힘
  state.velocity += state.input.dx * config.dragPower;

  // 감쇠
  state.velocity *= config.damping;

  // 각도 적용
  state.angle += state.velocity;

  // 제한
  state.angle = Math.max(
    -config.maxAngle,
    Math.min(config.maxAngle, state.angle)
  );

  // 입력 초기화
  state.input.dx = 0;
}
