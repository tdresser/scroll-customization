# scroll-customization
Experiments with scroll customization in Chrome.

A limited version of thes API has landed in Chrome behind a flag. 
It works only for touch scroll gestures on main thread scrolling.
So to use it on a desktop chrome you can emulate touch using devtools and
pass the following flags: ```--disable-threaded-scrolling --enable-blink-features=ScrollCustomization```

Documentation is [here](https://docs.google.com/a/chromium.org/document/d/1VnvAqeWFG9JFZfgG5evBqrLGDZYRE5w6G5jEDORekPY/edit?pli=1#heading=h.kd0gtwwz5bf9).

Latest version requires a custom build that includes this [Chrome patch](https://codereview.chromium.org/850443002/) in progress.

