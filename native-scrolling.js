function distributeScroll(scrollState) {
  "use strict";
  scrollState.distributeToScrollChainDescendant();

  var deltaX = scrollState.deltaX;
  var deltaY = scrollState.deltaY;

  if (scrollState.shouldPropagate || this.currentlyScrolling) {
    this.applyScroll(scrollState);
  }

  // TODO - if we expose whether a scroll is the first of a sequence or not, this can be simplified.
  if (this.lastScrollWasInertial && !scrollState.inInertialPhase)
    this.currentlyScrolling = false;
  this.lastScrollWasInertial = scrollState.inInertialPhase;

  var scrolled = deltaX != scrollState.deltaX || deltaY != scrollState.deltaY;
  if (scrolled)
    this.currentlyScrolling = true;
}

function applyScroll(scrollState) {
  "use strict";

  var scrollable = this;
  if (this === document.documentElement)
    scrollable = document.body;

  // TODO - once we support fractional scrollTop and scrollLeft, get rid of this hack.
  var dx = roundIncreasingMagnitude(scrollState.deltaX);
  var dy = roundIncreasingMagnitude(scrollState.deltaY);
  if (!dx && !dy)
    return;

  var scrollLeft = scrollable.scrollLeft;
  var scrollTop = scrollable.scrollTop;

  scrollable.scrollLeft -= dx;
  scrollable.scrollTop -= dy;

  if (scrollable.scrollLeft != scrollLeft)
    scrollState.consumeDelta(scrollState.deltaX, 0);
  if (scrollable.scrollTop != scrollTop)
    scrollState.consumeDelta(0, scrollState.deltaY);

  var scrolled = scrollable.scrollLeft != scrollLeft || scrollable.scrollTop != scrollTop;
  if (scrolled) {
    // We need to set currentlyScrolling in both distributeScroll and
    // applyScroll so that if we only override one of these methods,
    // but not the other, this bookkeeping remains accurate.
    this.currentlyScrolling = true;
  }
}
