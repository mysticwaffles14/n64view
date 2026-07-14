import { ControllerState } from "./state/controllerState.js";

const controller = new ControllerState();

console.log("N64View started");
console.log(controller);

document.querySelector("h1").style.color = "#66ccff";