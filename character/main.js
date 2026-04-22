import { state } from "./state.js";
import { initInput } from "./input.js";
import { updatePhysics } from "./physics.js";
import { render } from "./render.js";

initInput(state);

function animate(time = 0) {
  state.time = time * 0.001;

  updatePhysics(state, time);
  render(state);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
