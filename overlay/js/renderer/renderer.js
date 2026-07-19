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

            start: {
                element: document.getElementById("start-button"),
                x: 200,
                y: 230
            },

            z: {
                element: document.getElementById("z-button"),
                x: 170,
                y: 245
            },

            l: {
                element: document.getElementById("l-button"),
                x: 35,
                y: 35
            },

            r: {
                element: document.getElementById("r-button"),
                x: 325,
                y: 35
            },

            dpad: {
                element: document.getElementById("dpad"),
                x: 50,
                y: 120,
                editable: true
            },

            dUp: {
                element: document.getElementById("d-up"),
                x: 35,
                y: 5,
                editable: false
            },

            dDown: {
                element: document.getElementById("d-down"),
                x: 35,
                y: 65,
                editable: false
            },

            dLeft: {
                element: document.getElementById("d-left"),
                x: 5,
                y: 35,
                editable: false
            },

            dRight: {
                element: document.getElementById("d-right"),
                x: 65,
                y: 35,
                editable: false
            },

            cButtons: {
                element: document.getElementById("c-buttons"),
                x: 275,
                y: 80
            },

            cUp: {
                element: document.getElementById("c-up"),
                x: 45,
                y: 0,
                editable: false
            },

            cDown: {
                element: document.getElementById("c-down"),
                x: 45,
                y: 60,
                editable: false
            },

            cLeft: {
                element: document.getElementById("c-left"),
                x: 15,
                y: 30,
                editable: false
            },

            cRight: {
                element: document.getElementById("c-right"),
                x: 75,
                y: 30,
                editable: false
            },

            stick: {
                element: document.getElementById("stick-base"),
                x: 150,
                y: 150
            },
        };

    for (const button of Object.values(this.buttons)) {
            this.positionButton(button);
        }

            this.initializeUI();
            this.initializeEditor();
            this.initializeKeyboardShortcuts();
            this.initializeMouseHandlers();
            this.createGrid();
            this.loadLayout();
}

initializeEditor() {
    this.layoutMode = false;
    this.selectedButton = null;

    this.dragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    this.history = [];
    this.redoHistory = [];

    this.snapToGrid = false;
    this.gridSize = 10;


}

initializeUI() {
    this.aValue = document.getElementById("a-value");
    this.bValue = document.getElementById("b-value");
    this.startValue = document.getElementById("start-value");
    this.stickX = document.getElementById("stick-x");
    this.stickY = document.getElementById("stick-y");

    this.stickIndicator =
        document.getElementById("stick-indicator");

    this.layoutInfo = document.getElementById("layout-info");
    this.grid = document.getElementById("grid");
    this.debugPanel =
    document.getElementById("debug-panel");

    this.developerHeader =
    document.getElementById("developer-header");

    this.skinSelect =
    document.getElementById("skin-select");

    this.skinSelect.addEventListener(
    "change",
    (event) => {
        this.setSkin(event.target.value);
    }
);

}

setSkin(skinName) {
    document.body.classList.remove(
        "skin-classic",
        "skin-test",
        "skin-minimal"
    );

    document.body.classList.add(
        `skin-${skinName}`
    );

    console.log(`Skin changed to: ${skinName}`);
}

initializeKeyboardShortcuts() {
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

        if(event.ctrlKey && event.key.toLowerCase() === "s") {
            event.preventDefault();
            this.saveLayout();
            return;
        }

        if (
            this.layoutMode &&
            event.ctrlKey &&
            event.key.toLowerCase() === "z"
        ) {
            event.preventDefault();
            this.undo();
            return;
        }

        if (
            this.layoutMode &&
            event.ctrlKey &&
            event.key.toLowerCase() === "y"
        ) {
            event.preventDefault();

            this.redo();

            return;
}

        if (this.layoutMode && event.key === "Escape") {
            event.preventDefault();

            this.selectedButton = null;
            this.updateLayoutMode();

            console.log("Button deselected");
            return;
        }

        if (
            this.layoutMode &&
            event.key.toLowerCase() === "c"
        ) {
            event.preventDefault();
            this.copyLayout();
            return;
        }

        if (
            this.layoutMode &&
            event.key.toLowerCase() === "l"
        ) {
            event.preventDefault();

            this.loadLayout();

            return;
}

        if (
            this.layoutMode &&
            event.key.toLowerCase() === "g"
        ) {
            event.preventDefault();

            this.snapToGrid = !this.snapToGrid;
            this.updateLayoutMode();

            console.log(
                this.snapToGrid
                    ? "Snap to Grid ON"
                    : "Snap to Grid OFF"
            );

            return;
        }

        if (!this.layoutMode || !this.selectedButton) {
            return;
        }

        const step = event.shiftKey ? 10 : 1;

        switch (event.key) {
            case "ArrowUp":
                this.saveHistory();
                this.moveSelectedButton(0, -step);
                break;

            case "ArrowDown":
                this.saveHistory();
                this.moveSelectedButton(0, step);
                break;

            case "ArrowLeft":
                this.saveHistory();
                this.moveSelectedButton(-step, 0);
                break;

            case "ArrowRight":
                this.saveHistory();
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
}

initializeMouseHandlers() {
    for (const [name, button] of Object.entries(this.buttons)) {
        if (button.editable === false) {
            continue;
        }
        button.element.addEventListener("mousedown", (event) => {
            if (!this.layoutMode) {
                return;
            }

            event.preventDefault();

            this.saveHistory();
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
    }

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

    positionButton(button) {
        button.element.style.left = `${button.x}px`;
        button.element.style.top = `${button.y}px`;
    }

    
    moveSelectedButton(dx, dy) {
    if (!this.selectedButton) {
        return;
    }

    let newX = this.selectedButton.x + dx;
    let newY = this.selectedButton.y + dy;

    if (this.snapToGrid) {
        newX =
            Math.round(newX / this.gridSize) *
            this.gridSize;

        newY =
            Math.round(newY / this.gridSize) *
            this.gridSize;
}

this.selectedButton.x = newX;
this.selectedButton.y = newY;

    this.positionButton(this.selectedButton);
    this.updateLayoutInfo();

}
    animateButton(button, pressed) {
        button.element.style.transform = pressed
        ? "translateY(2px) scale(0.96)"
        : "translateY(0) scale(1)";

        button.element.style.filter = pressed
        ? "brightness(1.25)"
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
        this.updateLayoutInfo();
        this.grid.style.display =
            this.layoutMode && this.snapToGrid
            ? "block"
            : "none";

        this.debugPanel.style.display =
            this.layoutMode 
            ? "block" 
            : "none";

        this.developerHeader.style.display =
            this.layoutMode ? "block" : "none";

        document.body.classList.toggle(
            "editor-mode",
            this.layoutMode
);
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

getLayoutSnapshot() {
    const snapshot = {};

    for (const [name, button] of Object.entries(this.buttons)) {
        if (button.editable === false) {
            continue;
        }

        snapshot[name] = {
            x: button.x,
            y: button.y
        };
    }

    return snapshot;
}

saveHistory() {
    this.history.push(this.getLayoutSnapshot());

    this.redoHistory = [];

    console.log("Layout state saved");
}

undo() {
    const previousLayout = this.history.pop();

    if (!previousLayout) {
        console.log("Nothing to undo");
        return;
    }

    this.redoHistory.push(this.getLayoutSnapshot());

    for (const [name, position] of Object.entries(previousLayout)) {
        const button = this.buttons[name];

        button.x = position.x;
        button.y = position.y;

        this.positionButton(button);
    }

    this.updateLayoutInfo();
    console.log("Undo complete");
}

redo() {
    const nextLayout = this.redoHistory.pop();

    if (!nextLayout) {
        console.log("Nothing to redo");
        return;
    }

    this.history.push(this.getLayoutSnapshot());

    for (const [name, position] of Object.entries(nextLayout)) {
        const button = this.buttons[name];

        button.x = position.x;
        button.y = position.y;

        this.positionButton(button);
    }

    this.updateLayoutInfo();

    console.log("Redo complete");
}

createGrid() {
    this.grid.innerHTML = "";

    const width = this.grid.clientWidth;
    const height = this.grid.clientHeight;

    for (let x = 0; x <= width; x += this.gridSize) {
        const line = document.createElement("div");

        line.className = "grid-line vertical";
        line.style.left = `${x}px`;

        this.grid.appendChild(line);
    }

    for (let y = 0; y <= height; y += this.gridSize) {
        const line = document.createElement("div");

        line.className = "grid-line horizontal";
        line.style.top = `${y}px`;

        this.grid.appendChild(line);
    }
}

updateStickIndicator() {
    const maxMovement = 25;
    const deadzone = 0.08;

    let x = this.controller.stick.x;
    let y = this.controller.stick.y;

    if (Math.abs(x) < deadzone) {
        x = 0;
    }

    if (Math.abs(y) < deadzone) {
        y = 0;
    }

    x *= maxMovement;
    y *= maxMovement;

    this.stickIndicator.style.transform =
        `translate(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px)
        )`;
}

saveLayout() {
    const layout = this.getLayoutSnapshot();
    const layoutText = JSON.stringify(layout);
        localStorage.setItem("n64view-layout", layoutText);
        console.log("Layout saved to localStorage");
}   

loadLayout() {
    const layoutText =
        localStorage.getItem("n64view-layout");

    if (!layoutText) {
        console.log("No saved layout found");
        return;
    }

    const layout = JSON.parse(layoutText);

    for (const [name, position] of Object.entries(layout)) {
        const button = this.buttons[name];

        if (!button) {
            continue;
        }

        button.x = position.x;
        button.y = position.y;

        this.positionButton(button);
    }

    this.updateLayoutInfo();

    console.log("Layout loaded");
}

    render() {
        this.aValue.textContent = this.controller.a ? "ON" : "OFF";
        this.bValue.textContent = this.controller.b ? "ON" : "OFF";
        this.startValue.textContent = this.controller.start ? "ON" : "OFF";
                
        this.stickX.textContent = this.controller.stick.x.toFixed(2);
        this.stickY.textContent = this.controller.stick.y.toFixed(2);

        this.animateButton(this.buttons.a, this.controller.a);
        this.animateButton(this.buttons.b, this.controller.b);
        this.animateButton(this.buttons.start, this.controller.start);
        this.animateButton(this.buttons.z, this.controller.z);
        
        this.animateButton(this.buttons.dUp, this.controller.dUp);
        this.animateButton(this.buttons.dDown, this.controller.dDown);
        this.animateButton(this.buttons.dLeft, this.controller.dLeft);
        this.animateButton(this.buttons.dRight, this.controller.dRight);

        this.animateButton(this.buttons.cUp, this.controller.cUp);
        this.animateButton(this.buttons.cDown, this.controller.cDown);
        this.animateButton(this.buttons.cLeft, this.controller.cLeft);
        this.animateButton(this.buttons.cRight, this.controller.cRight);

        this.animateButton(
            this.buttons.l,
            this.controller.l
        );

        this.animateButton(
            this.buttons.r,
            this.controller.r
        );

        this.updateStickIndicator();
    }
}