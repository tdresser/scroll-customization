# scroll-customization
Experiments with scroll customization in Chrome.

A limited version of the API (for touch scroll gestures on main thread scrolling) has landed in Chrome behind a runtime flag. To use it on a desktop Chrome you need to [emulate touch](https://developer.chrome.com/devtools/docs/device-mode#touch-emulation) in devtools and pass the following flags:

    --disable-threaded-scrolling --enable-blink-features=ScrollCustomization

Documentation is [here](https://docs.google.com/a/chromium.org/document/d/1VnvAqeWFG9JFZfgG5evBqrLGDZYRE5w6G5jEDORekPY/edit?pli=1#heading=h.kd0gtwwz5bf9).


