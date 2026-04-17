import { state } from "./state.js";
import { updatePhysics } from "./physics.js";
import { render } from "./render.js";
import { initInput } from "./input.js";

const root = document.getElementById("char-root");

initInput(state, root);

function animate() {

  state.time += 0.016;

  updatePhysics(state);
  render(state, root);

  requestAnimationFrame(animate);
}

animate();
