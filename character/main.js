import { state } from "./state.js";
import { initInput } from "./input.js";
import { updatePhysics } from "./physics.js";
import { render } from "./render.js";

initInput(state);

function animate() {

  state.time += 0.016;

  updatePhysics(state);
  render(state);

  requestAnimationFrame(animate);
}

animate();
