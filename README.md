# Gamepad Navigator

[Greasemonky script]

v0.1 | by Mr Speaker | mrspeaker.net | @mrspeaker

Navigate the web with a gamepad! Of course!

    *Up/down* to scroll the page
    *left/right* to move between links.
    *Fire* to visit!
    *"Select"* for back, and *"Start"* for forward.

This greasemonkey script currently works only in Firefox with the gamepad API (Chrome version coming soon - it looks like you need to poll the controller instead of responding to events, so I have to write a lil handler for that). The buttons are set up for the NES-style Retrolink controller - so modify the button and axis IDs to match your device.

defaults IDs are:

    var axisX = 4,
        axisY = 5,
        buttonGo = [1, 2],
        buttonBack = [8],
        buttonForward = [9],

Buttons are all an array - so you can specify multiple buttons to do the same thing.
The top-most link in the screen will be highlighted by default as you scroll around.

Lol.



