var Carousel3DProto = Object.create(HTMLElement.prototype);
Carousel3DProto.createdCallback = function() {
  "use strict";
  var self = this;

  var root = this.createShadowRoot();
  var rootNode = document.createElement("div");
  rootNode.style.display = "none";
  rootNode.style.webkitPerspective = "800px";
  rootNode.style.width = "100%";
  rootNode.style.height = "1000px";

  var container = document.createElement("div");
  container.style.webkitTransformStyle = "preserve-3d";
  container.style.width = "100%";
  container.style.height = "1000px";
  container.style.position = "absolute";
  container.style.left = "50%";
  container.style.top = "200px";
  var baseTransform = 'translateZ(-100px) rotateX(-20deg) ';
  container.style.webkitTransform = baseTransform;

  var content = document.createElement("content");
  container.appendChild(content);
  rootNode.appendChild(container);
  root.appendChild(rootNode);

  var rotation = 0;

  var originalScroll = rootNode.applyScroll;
  rootNode.applyScroll = function(scrollState) {
    rotation += scrollState.deltaX;
    container.style.webkitTransform = baseTransform + 'rotateY(' + (rotation/10) + 'deg)';
    scrollState.consumeDelta(scrollState.deltaX, 0);
    originalScroll.call(rootNode, scrollState);
  }

  window.addEventListener("load", function() {
    var children = self.children;

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
    rootNode.style.display = "block";
  });
};

var Carousel3D = document.registerElement('carousel-3d', {
  prototype: Carousel3DProto
});
