let selectedGamepadIndex = null;

export function getConnectedGamepads() {
    return Array.from(navigator.getGamepads()).filter(Boolean);
}

function hasActivity(gamepad) {
    const buttonPressed = gamepad.buttons.some(
        (button) => button.pressed || button.value > 0.5
    );

    const axisMoved = gamepad.axes.some(
        (axis) => Math.abs(axis) > 0.15
    );

    return buttonPressed || axisMoved;
}

export function getPreferredGamepad() {
    const gamepads = getConnectedGamepads();

    if (gamepads.length === 0) {
        selectedGamepadIndex = null;
        return null;
    }

    const matchingGamepads = gamepads.filter((gamepad) =>
        /mayflash|mf103|xbox 360/i.test(gamepad.id)
    );

    const activeGamepad = matchingGamepads.find(hasActivity);

    if (activeGamepad) {
        selectedGamepadIndex = activeGamepad.index;
        return activeGamepad;
    }

    const previouslySelected = gamepads.find(
        (gamepad) => gamepad.index === selectedGamepadIndex
    );

    if (previouslySelected) {
        return previouslySelected;
    }

    // Your MF103 has been appearing as the second Xbox controller.
    const defaultGamepad =
        matchingGamepads.at(-1) ?? gamepads[0];

    selectedGamepadIndex = defaultGamepad.index;

    return defaultGamepad;
}