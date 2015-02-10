window.onload = function() {
  "use strict";

  var foo = document.getElementById("foo");
  foo.style.webkitPerspective = "800px";
  foo.style.width = "100%";
  foo.style.height = "1000px";

  var container = document.createElement("div");
  container.style.webkitTransformStyle = "preserve-3d";
  container.style.width = "100%";
  container.style.height = "1000px";
  container.style.position = "absolute";
  container.style.left = "50%";
  container.style.top = "200px";
  var baseTransform = 'translateZ(-100px) rotateX(-20deg) ';
  container.style.webkitTransform = baseTransform;

  while (foo.firstChild) {
    var child = foo.firstChild;
    foo.removeChild(foo.firstChild);
    container.appendChild(child);
  }

  foo.appendChild(container);

  var rotation = 0;

  var originalScroll = foo.applyScroll;
  foo.applyScroll = function(scrollState) {
    rotation += scrollState.deltaX;
    container.style.webkitTransform = baseTransform + 'rotateY(' + (rotation/10) + 'deg)';
    scrollState.consumeDelta(scrollState.deltaX, 0);
    originalScroll.call(foo, scrollState);
  }

  // TODO - handle FOUC.
  var children = container.children;

  var width = 0;
  for (var i = 0; i < children.length; ++i)
    width += children[i].width;

  var radius = width / (2 * Math.PI);

  container.style.webkitTransformOrigin = "0% 0% " + (0) + "px";

  var angle = 0;
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];
    angle += 360/children.length;
    var transform =
        'translateX(' + (-child.width / 2) + 'px)' +
        'rotateY(' + (angle) + 'deg)' +
        'translateZ(' + radius + 'px)';
    child.style.webkitTransform = transform;
    child.style.position = "absolute";
    child.style.pointerEvents = "none";
  }
};
