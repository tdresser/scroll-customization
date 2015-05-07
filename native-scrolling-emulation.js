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

  let top = null;
  let left = null;
  let bottom = null;
  let right = null;

  let distributedNodes = this.content.getDistributedNodes();

  for (var i = 0; i < distributedNodes.length; ++i) {
    var node = distributedNodes[i];
    if (!(node instanceof Element))
      continue;
    var rect = node.getBoundingClientRect();
    if (top == null)
      top = rect.top
    else
      top = Math.min(top, rect.top);

    if (left == null)
      left = rect.left
    else
      left = Math.min(left, rect.left);

    if (bottom == null)
      bottom = rect.bottom
    else
      bottom = Math.max(bottom, rect.bottom);

    if (right == null)
      right = rect.right
    else
      right = Math.max(right, rect.right);
  }

  rect = this.getBoundingClientRect();
  if (dx < 0)
    dx = Math.max(dx, rect.right - right);
  if (dy < 0)
    dy = Math.max(dy, rect.bottom - bottom);
  if (dx > 0)
    dx = Math.min(dx, rect.left - left);
  if (dy > 0)
    dy = Math.min(dy, rect.top - top);

  let transform = new WebKitCSSMatrix(scrollable.style.transform);
  let scrollLeft = transform.m41;
  let scrollTop = transform.m42;

  transform.m41 += dx;
  transform.m42 += dy;

  scrollable.style.transform = transform;

  let scrolled = false;
  if (transform.m41 != scrollLeft) {
    scrollState.consumeDelta(scrollState.deltaX, 0);
    scrolled = true;
  }
  if (transform.m42 != scrollTop) {
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
