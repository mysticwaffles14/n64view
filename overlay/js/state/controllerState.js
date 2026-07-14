export class ControllerState {
    constructor() {
        this.a = false;
        this.b = false;
        this.start = false;
        this.z = false;
        this.l = false;
        this.r = false;

        this.cUp = false;
        this.cDown = false;
        this.cLeft = false;
        this.cRight = false;

        this.dpadUp = false;
        this.dpadDown = false;
        this.dpadLeft = false;
        this.dpadRight = false;

        this.stick = {
            x: 0,
            y: 0,
        };
    }
}