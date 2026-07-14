export class Renderer {
    constructor(controllerState) {
        this.controller = controllerState;

        this.aValue = document.getElementById("a-value");
        this.bValue = document.getElementById("b-value");
        this.startValue = document.getElementById("start-value");
        this.stickX = document.getElementById("stick-x");
        this.stickY = document.getElementById("stick-y");
    }

    render() {
        console.log("Renderer:", this.controller.a);
        this.aValue.textContent = this.controller.a ? "ON" : "OFF";
        this.bValue.textContent = this.controller.b ? "ON" : "OFF";
        this.startValue.textContent = this.controller.start ? "ON" : "OFF";

        this.stickX.textContent = this.controller.stick.x.toFixed(2);
        this.stickY.textContent = this.controller.stick.y.toFixed(2);
    }
}