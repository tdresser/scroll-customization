function distributeScroll(scrollState) {
  "use strict";

  console.log("DS " + this.id);
  scrollState.distributeToScrollChainDescendant();
  console.log("DONE DS " + this.id);

  let deltaX = scrollState.deltaX;
  let deltaY = scrollState.deltaY;

  if (scrollState.shouldPropagate || this.currentlyScrolling) {
    console.log("NOT BAILING ON APPLYSCROLL");
    this.applyScroll(scrollState);
    console.log("DONE APPLYSCROLL");
  } else {
    console.log("BAIL ON APPLYSCROLL");
    console.log("CURRENTLY SCROLLING? " + this.currentlyScrolling);
    console.log("Should propagate? " + scrollState.shouldPropagate);
  }

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

  console.log("AS " + this.id);
  let scrollable = this;
  if (this === document.scrollingElement)
    scrollable = document.body;

  console.log(this);
  console.log(scrollable.container);
  scrollable = scrollable.container;

  let dx = scrollState.deltaX;
  let dy = scrollState.deltaY;
  if (!dx && !dy)
    return;

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
