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
        this.layoutInfo = document.getElementById("layout-info");

this.layoutMode = false;
this.selectedButton = null;
this.draging = false;
this.dragOffsetX = 0;
this.dragOffsetY = 0;

window.addEventListener("keydown", (event) => {
    if (event.key === "F2") {
        event.preventDefault();

        this.layoutMode = !this.layoutMode;

        if (!this.layoutMode) {
            this.selectedButton = null;
        }

        this.updateLayoutMode();

        console.log(
            this.layoutMode
                ? "Layout Mode ON"
                : "Layout Mode OFF"
        );

        return;
    }

if (this.layoutMode && event.key === "Escape") {
    event.preventDefault();

    this.selectedButton = null;
    this.updateLayoutMode();

    console.log("Button deselected");
    return;
}

    if (this.layoutMode && event.key.toLowerCase() === "c") {
        event.preventDefault();
        this.copyLayout();
        return;
    }
    if (!this.layoutMode || !this.selectedButton) {
    return;

}

const step = event.shiftKey ? 10 : 1;

switch (event.key) {
    case "ArrowUp":
    this.moveSelectedButton(0, -step);
    break;

    case "ArrowDown":
    this.moveSelectedButton(0, step);
    break;

case "ArrowLeft":
    this.moveSelectedButton(-step, 0);
    break;

case "ArrowRight":
    this.moveSelectedButton(step, 0);
    break;

    default:
        return;
}

event.preventDefault();

console.log(
    `Position: x=${this.selectedButton.x}, y=${this.selectedButton.y}`
);
    
});

for (const [name, button] of Object.entries(this.buttons)) {
    button.element.addEventListener("mousedown", (event) => {
        if (!this.layoutMode) {
            return;
        }

        event.preventDefault();

        this.selectedButton = button;
        this.dragging = true;

        const viewportRect =
            button.element.parentElement.getBoundingClientRect();

        const mouseX = event.clientX - viewportRect.left;
        const mouseY = event.clientY - viewportRect.top;

        this.dragOffsetX = mouseX - button.x;
        this.dragOffsetY = mouseY - button.y;

        this.updateLayoutMode();

        console.log(`Selected button: ${name}`);
    });

    window.addEventListener("mousemove", (event) => {
    if (
        !this.layoutMode ||
        !this.dragging ||
        !this.selectedButton
    ) {
        return;
    }

    const viewportRect =
        this.selectedButton.element.parentElement
            .getBoundingClientRect();

    const mouseX = event.clientX - viewportRect.left;
    const mouseY = event.clientY - viewportRect.top;

    const newX = mouseX - this.dragOffsetX;
    const newY = mouseY - this.dragOffsetY;

    const dx = newX - this.selectedButton.x;
    const dy = newY - this.selectedButton.y;

    this.moveSelectedButton(dx, dy);
});

    window.addEventListener("mouseup", () => {
        this.dragging = false;

});

}

    }
    
    positionButton(button) {
        button.element.style.left = `${button.x}px`;
        button.element.style.top = `${button.y}px`;
    }
    
    moveSelectedButton(dx, dy) {
    if (!this.selectedButton) {
        return;
    }

    this.selectedButton.x += dx;
    this.selectedButton.y += dy;

    this.positionButton(this.selectedButton);
    this.updateLayoutInfo();

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
        if (!this.layoutMode) {
            button.element.style.outline = "none";
        } else if (button === this.selectedButton) {
            button.element.style.outline = "3px solid #4da3ff";
        } else {
            button.element.style.outline = "2px solid white";
        }
    }
}

copyLayout() {
    const layout = {};

    for (const [name, button] of Object.entries(this.buttons)) {
        layout[name] = {
            x: button.x,
            y: button.y
        };
    }

    const layoutText = JSON.stringify(layout, null, 4);

    navigator.clipboard.writeText(layoutText)
        .then(() => {
            console.log("Layout copied to clipboard");
        })
        .catch((error) => {
            console.error("Could not copy layout:", error);
        });
}

updateLayoutInfo() {
    if (!this.layoutMode) {
        this.layoutInfo.style.display = "none";
        return;
    }

    this.layoutInfo.style.display = "block";

    if (!this.selectedButton) {
        this.layoutInfo.textContent = "Select a button";
        return;
    }

    this.layoutInfo.textContent =
        `X: ${this.selectedButton.x} | Y: ${this.selectedButton.y}`;

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