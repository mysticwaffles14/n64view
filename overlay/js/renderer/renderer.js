export class Renderer {
    constructor(controllerState) {
        this.controller = controllerState;

        this.buttons = {
            a: {
                element: document.getElementById("a-button"),
                x: 255,
                y: 185
            },

            b: {
                element: document.getElementById("b-button"),
                x: 220,
                y: 155
            },

            cUp: {
                element: document.getElementById("c-up"),
                x: 310,
                y: 80
            },

            cLeft: {
                element: document.getElementById("c-left"),
                x: 275,
                y: 115
            },

            cRight: {
                element: document.getElementById("c-right"),
                x: 345,
                y: 115
            },

            cDown: {
                element: document.getElementById("c-down"),
                x: 310,
                y: 150
            }
        };

        for (const button of Object.values(this.buttons)) {
            this.positionButton(button);
        }

        this.aValue = document.getElementById("a-value");
        this.bValue = document.getElementById("b-value");
        this.startValue = document.getElementById("start-value");
        this.stickX = document.getElementById("stick-x");
        this.stickY = document.getElementById("stick-y");

        this.layoutMode = false;
        window.addEventListener("keydown", (event) => {
if (event.key === "F2") {
    event.preventDefault();

    this.layoutMode = !this.layoutMode;
    this.updateLayoutMode();

    console.log(
        this.layoutMode
            ? "Layout Mode ON"
            : "Layout Mode OFF"
    );
}
});
    }
    
    positionButton(button) {
        button.element.style.left = `${button.x}px`;
        button.element.style.top = `${button.y}px`;
    }

    animateButton(button, pressed) {
        button.element.style.transform = pressed
            ? "scale(0.9)"
            : "scale(1)";

        button.element.style.filter = pressed
            ? "brightness(1.6)"
            : "brightness(1)";
    }

    updateLayoutMode() {
        for (const button of Object.values(this.buttons)) {
            button.element.style.outline =
                this.layoutMode
                    ? "2px solid white"
                    : "none";
        }
    }

    render() {
        this.aValue.textContent = this.controller.a ? "ON" : "OFF";
        this.bValue.textContent = this.controller.b ? "ON" : "OFF";
        this.startValue.textContent = this.controller.start ? "ON" : "OFF";

        this.stickX.textContent = this.controller.stick.x.toFixed(2);
        this.stickY.textContent = this.controller.stick.y.toFixed(2);

        this.animateButton(this.buttons.a, this.controller.a);
        this.animateButton(this.buttons.b, this.controller.b);
    }
}