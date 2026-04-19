export const state = {
  time: 0,

  angle: 0,
  angularVel: 0,

  length: 50,
  lengthVel: 0,

  dragging: false,
  dragArmed: false,

  mouse: { x: 0, y: 0 },
  prevMouse: { x: 0, y: 0 },
  dragStart: { x: 0, y: 0 },

  pointerVX: 0,
  pointerVY: 0,
  lastMoveAt: 0
};
