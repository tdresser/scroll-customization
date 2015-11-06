'use strict';

// Add necessary sugar to make the scroll customization APIs look nicer. The
// scroll customization bindings are a bit awkward at the moment  due to
// limitations in Blink binding generator (no support for function attributes
// that can be overridden). This is a neat trick to fix this in Javascript to
// get the natural bindings:
//
// Actual API:
// Elemen::setApplyScroll(scrollCallback, mode); mode = ["disable-native-scroll" | "perform-before-native-scroll" | "perform-after-native-scroll"]
// 
// Ideal API implemented here:
// Element.applyScroll = scrollCallback;
function mixinScrollCustomizationSyntaxSugar(element) {

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  // The default distribute scroll behaviour
  element.distributeScroll = function(scrollState) {
    scrollState.distributeToScrollChainDescendant();
    this.applyScroll(scrollState);
  }

  // The default apply scroll behaviour
  element.applyScroll = function(scrollState) {
    // clamp delta
    var clampedDeltaX = clamp(scrollState.deltaX, this.scrollLeft + this.clientWidth - this.scrollWidth, this.scrollLeft);
    var clampedDeltaY = clamp(scrollState.deltaY, this.scrollTop + this.clientHeight - this.scrollHeight, this.scrollTop);

    // actually scroll
    this.scrollLeft -= clampedDeltaX;
    this.scrollTop -= clampedDeltaY;

    // report the amount of scroll consumed
    scrollState.consumeDelta(clampedDeltaX, clampedDeltaY);
  }

  // Override native scroll methods with above default ones
  element.setDistributeScroll(function(scrollState) {
    element.distributeScroll(scrollState);
  }, "disable-native-scroll");
  element.setApplyScroll(function(scrollState) {
    element.applyScroll(scrollState);
  }, "disable-native-scroll");
}
