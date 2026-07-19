import { getPreferredGamepad } from "./gamepad.js";

export class InputManager {
    constructor(controllerState) {
        this.controllerState = controllerState;
    }

    update() {
        const gamepad = getPreferredGamepad();

        if (!gamepad) {
            return false;
        }
      
        this.controllerState.a = this.isButtonPressed(gamepad, 1);
        this.controllerState.b = this.isButtonPressed(gamepad, 0);
        this.controllerState.z = this.isButtonPressed(gamepad, 6);
        this.controllerState.l = this.isButtonPressed(gamepad, 4);
        this.controllerState.r = this.isButtonPressed(gamepad, 5);
        this.controllerState.start = this.isButtonPressed(gamepad, 9);

        this.controllerState.stick.x = this.getAxis(gamepad, 0);
        this.controllerState.stick.y = this.getAxis(gamepad, 1);

        this.controllerState.dUp = this.isButtonPressed(gamepad, 12);
        this.controllerState.dDown = this.isButtonPressed(gamepad, 13);
        this.controllerState.dLeft = this.isButtonPressed(gamepad, 14);
        this.controllerState.dRight = this.isButtonPressed(gamepad, 15);

        const cAxisX = this.getAxis(gamepad, 2);
        const cAxisY = this.getAxis(gamepad, 3);

        this.controllerState.cUp = cAxisY < -0.5;
        this.controllerState.cDown = cAxisY > 0.5;
        this.controllerState.cLeft = cAxisX < -0.5;
        this.controllerState.cRight = cAxisX > 0.5;

 
        return true;
    }

    isButtonPressed(gamepad, buttonIndex) {
        const button = gamepad.buttons[buttonIndex];

        return Boolean(
            button &&
            (button.pressed || button.value > 0.5)
        );
    }

    getAxis(gamepad, axisIndex) {
        const value = gamepad.axes[axisIndex];

        return Number.isFinite(value) ? value : 0;
    }
}