var JSScrollerProto = Object.create(HTMLElement.prototype);
console.log("ASSIGN CREATED CALLBACK");
JSScrollerProto.createdCallback = function() {
  console.log("CREATED CALLBACK");
  this.applyScroll = applyScroll;
  this.distributeScroll = distributeScroll;
  this.style.overflow = "hidden";
  this.style.display = "block";

  this.container = document.createElement("div");
  //  var root = this.container.createShadowRoot();
  var root = document.createElement("content");

  this.container.appendChild(root);
  this.appendChild(this.container);
}

var JSApplyScrollProto = Object.create(HTMLElement.prototype);
JSApplyScrollProto.createdCallback = function() {
  this.applyScroll = applyScroll;
  this.style.overflow = "hidden";
  this.style.display = "block";
}

var JSDistributeScrollProto = Object.create(HTMLElement.prototype);
JSDistributeScrollProto.createdCallback = function() {
  this.distributeScroll = distributeScroll;
  this.style.overflow = "hidden";
  this.style.display = "block";
}

console.log("REGISTERING");

var JSScroller = document.registerElement('js-scroller', {
    prototype: JSScrollerProto
});
var JSApplyScroll = document.registerElement('js-apply-scroll', {
    prototype: JSApplyScrollProto
});
var JSDistributeScroll = document.registerElement('js-distribute-scroll', {
    prototype: JSDistributeScrollProto
});
