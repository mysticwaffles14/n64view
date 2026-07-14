# OBS setup

## Add the overlay

1. Extract or clone N64View to a permanent folder.
2. Open OBS.
3. Add a **Browser Source**.
4. Enable **Local file**.
5. Select `overlay/index.html`.
6. Use width `829`, height `837`, and FPS `60`.
7. Leave **Shutdown source when not visible** disabled while testing.

## MayFlash MF103 mode

Use XInput mode. A browser gamepad tester should identify the adapter as an Xbox 360 controller or standard gamepad.

## No input in OBS

- Confirm the controller works in a browser gamepad tester.
- Connect the controller before opening OBS.
- Press a controller button once.
- Right-click the Browser Source and choose **Refresh**.
- Confirm that OBS is loading `overlay/index.html`, not an older extracted copy.

## Debug mode

Open `overlay/index.html?debug=1` in a browser to view raw buttons and axes.
