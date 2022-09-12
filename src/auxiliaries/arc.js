import { applyRotation } from "./linalg";

/**
 * Make an SVG arc for the timer indicator
 * The function takes an angle argument in degrees
 */

export default function makeArc(a) {
  if (a > 360) return "M 50,50 L50,0 A50,50 1 0 1 50,0 Z";
  if (a < 181) {
    return `M 50,50 L50,0 A50,50 1 0 1 ${applyRotation([0, -50], a)[0] + 50},${
      applyRotation([0, -50], a)[1] + 50
    } Z`;
  } else {
    return `M 50,50 L50,0 A50,50 1 0 1 50,100 A50,50 1 0 1 ${
      applyRotation([0, -50], a)[0] + 50
    },${applyRotation([0, -50], a)[1] + 50} Z`;
  }
}
