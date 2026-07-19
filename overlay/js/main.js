import { Renderer } from "./renderer/renderer.js";
import { ControllerState } from "./state/controllerState.js";
import { InputManager } from "./input/inputManager.js";

const controller = new ControllerState();
const inputManager = new InputManager(controller);
const renderer = new Renderer(controller);

let previousState = "";

function update() {
    const connected = inputManager.update();
    renderer.render();
   
    if (connected) {
        const currentState = JSON.stringify(controller);

        if (currentState !== previousState) {
            console.log(currentState);
            previousState = currentState;
        }
    } else if (previousState !== "disconnected") {
        console.log("Waiting for controller...");
        previousState = "disconnected";
    }

    requestAnimationFrame(update);
}

console.log("N64View started");

update();