function distributeScroll(scrollState) {
  "use strict";
  scrollState.distributeToScrollChainDescendant();

  let deltaX = scrollState.deltaX;
  let deltaY = scrollState.deltaY;

  if (scrollState.shouldPropagate || this.currentlyScrolling)
    this.applyScroll(scrollState);

  // TODO - if we expose whether a scroll is the first of a sequence or not, this can be simplified.
  if (this.lastScrollWasInertial && !scrollState.inInertialPhase)
    this.currentlyScrolling = false;
  this.lastScrollWasInertial = scrollState.inInertialPhase;

  let scrolled = deltaX != scrollState.deltaX || deltaY != scrollState.deltaY;
  if (scrolled)
    this.currentlyScrolling = true;
}

function applyScroll(scrollState) {
  "use strict";
  let scrollable = this;
  if (this === document.scrollingElement)
    scrollable = document.body;

  scrollable = scrollable.container;

  let dx = scrollState.deltaX;
  let dy = scrollState.deltaY;
  if (!dx && !dy)
    return;

  let containedRect = this.container.getBoundingClientRect();
  let rect = this.getBoundingClientRect();

  // This ugly rounding is required due to precision issues with getBoundingClientRect().
  if (dx < 0)
    dx = Math.max(dx, (Math.round(10 * rect.right) - Math.round(10 * containedRect.right))/10);
  if (dy < 0)
    dy = Math.max(dy, (Math.round(10 * rect.bottom) - Math.round(10 * containedRect.bottom))/10);
  if (dx > 0)
    dx = Math.min(dx, (Math.round(10 * rect.left) - Math.round(10 * containedRect.left))/10);
  if (dy > 0)
    dy = Math.min(dy, (Math.round(10 * rect.top) - Math.round(10 * containedRect.top))/10);

  let transform = new WebKitCSSMatrix(scrollable.style.transform);
  let scrollLeft = transform.m41;
  let scrollTop = transform.m42;

  transform.m41 += dx;
  transform.m42 += dy;

  scrollable.style.transform = transform;

  let scrolled = false;
  if (dx !== 0) {
    scrollState.consumeDelta(scrollState.deltaX, 0);
    scrolled = true;
  }
  if (dy !== 0) {
    scrollState.consumeDelta(0, scrollState.deltaY);
    scrolled = true;
  }

  if (scrolled) {
    // We need to set currentlyScrolling in both distributeScroll and
    // applyScroll so that if we only override one of these methods,
    // but not the other, this bookkeeping remains accurate.
    this.currentlyScrolling = true;
  }
}
