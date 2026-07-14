# Architecture

N64View currently contains three layers:

1. **Input profile** — maps raw Gamepad API buttons and axes to N64 controls.
2. **Renderer** — updates visual elements from normalized N64 input state.
3. **Theme** — supplies controller artwork and visual styling.

The current alpha still contains some mapping values in the overlay code. The next architecture task is to load the selected file from `profiles/` instead.
