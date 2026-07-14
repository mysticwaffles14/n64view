MF103 N64 OVERLAY v0.4
======================

FIRST DEVELOPMENT MILESTONE
---------------------------
This version starts the layered rebuild:
- Exact skin artwork from your supplied reference image
- Separate glow assets for A, B, Start, Z and every C button
- Smoothed analog-stick movement
- D-pad highlights
- Working L and R shoulder-button highlights
- External config.json for easy tuning
- Transparent OBS background
- Offline operation

USE THE MF103 IN XINPUT MODE
----------------------------
Hardware Tester should show:
  Xbox 360 Controller for Windows
or:
  STANDARD GAMEPAD

OBS SETUP
---------
1. Extract the ZIP to a permanent folder.
2. Add a Browser Source in OBS.
3. Enable Local file.
4. Select index.html.
5. Set Width: 829
6. Set Height: 837
7. Set FPS: 60
8. Press a controller button.
9. Refresh the Browser Source if needed.

CONFIGURATION
-------------
Open config.json in Notepad to adjust:
- Button numbers
- Axis numbers
- C-button threshold
- Analog deadzone
- Stick travel
- Stick smoothing

DEBUG MODE
----------
Open index.html?debug=1 in Chrome to display raw buttons and axes.

NEXT MILESTONE
--------------
The next step is separating the actual button and stick artwork into movable
layers so buttons visually depress and the stick graphic itself moves.


v0.3 FIX
--------
L and R are now visibly animated:
  L = Button 4
  R = Button 5

Their highlight areas sit along the upper-left and upper-right shoulder edges
of the controller artwork.


v0.4 NEW
--------
A, B, Start, and C buttons now visually depress. The analog stick now has a separate moving cap and shadow.
