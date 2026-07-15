export class Renderer {
    constructor(controllerState) {
        this.controller = controllerState;

        this.aValue = document.getElementById("a-value");
        this.aButton = document.getElementById("a-button");
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
        if (this.controller.a) {

    this.aButton.style.transform = "scale(0.9)";

    this.aButton.style.filter =
        "brightness(1.6)";

}
else {

    this.aButton.style.transform = "scale(1)";

    this.aButton.style.filter =
        "brightness(1)";
}
    }
}