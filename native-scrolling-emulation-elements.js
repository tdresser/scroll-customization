var JSScrollerProto = Object.create(HTMLElement.prototype);
JSScrollerProto.applyScroll = applyScroll;
JSScrollerProto.distributeScroll = distributeScroll;

var JSApplyScrollProto = Object.create(HTMLElement.prototype);
JSApplyScrollProto.applyScroll = applyScroll;

var JSDistributeScrollProto = Object.create(HTMLElement.prototype);
JSDistributeScrollProto.distributeScroll = distributeScroll;

var protos = [JSScrollerProto, JSApplyScrollProto, JSDistributeScrollProto];
for (var i = 0; i < protos.length; ++i) {
  protos[i].createdCallback = function() {
    this.style.overflow = "scroll";
    this.style.display = "block";
  }
}

var JSScroller = document.registerElement('js-scroller', {
    prototype: JSScrollerProto
});
var JSApplyScroll = document.registerElement('js-apply-scroll', {
    prototype: JSApplyScrollProto
});
var JSDistributeScroll = document.registerElement('js-distribute-scroll', {
    prototype: JSDistributeScrollProto
});
