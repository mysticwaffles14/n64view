# n64view
An open-source Nintendo 64 controller overlay for OBS with native MayFlash MF103 support.

N64View is an open-source Nintendo 64 controller overlay for OBS.

It was created to provide reliable support for controller adapters that do not map correctly in existing gamepad viewers, beginning with the MayFlash MF103.

## Features

- OBS Browser Source support
- Transparent background
- Offline operation
- MayFlash MF103 XInput support
- Analog stick visualization
- A, B, Start, Z, L, R, C-button, and D-pad input display
- Smooth input animations
- Editable controller configuration

## Supported Controllers

| Controller or adapter | Status |
|---|---|
| MayFlash MF103 | Supported |
| Raphnet N64 adapter | Planned |
| Nintendo Switch Online N64 controller | Planned |
| Generic HID controllers | Planned |

## Installation

1. Download the latest release.
2. Extract the ZIP to a permanent folder.
3. In OBS, add a Browser Source.
4. Enable **Local file**.
5. Select `overlay/index.html`.
6. Set the Browser Source to:
   - Width: `829`
   - Height: `837`
   - FPS: `60`
7. Use the MayFlash MF103 in XInput mode.

## Current MF103 Mapping

| N64 input | Gamepad input |
|---|---|
| A | Button 1 |
| B | Button 0 |
| Z | Button 6 |
| L | Button 4 |
| R | Button 5 |
| Start | Button 9 |
| Analog stick | Axes 0 and 1 |
| C buttons | Axes 2 and 3 |

## Roadmap

- [x] MF103 input support
- [x] OBS Browser Source
- [x] Button and stick animations
- [ ] Layered vector controller artwork
- [ ] Controller profile system
- [ ] Theme support
- [ ] Settings interface
- [ ] Automatic controller detection
- [ ] Additional adapter support

## License

N64View is available under the MIT License.
