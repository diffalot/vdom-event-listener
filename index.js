'use strict'

// FIXME: If you're reading this code, let me know if the following
// function is a good idea
function insureHasTarget (event) {
  if (!event.target) {
    event.target = event.srcElement
  }
  return event
}

var EventListener = function (handler, eventType) {
  this.handler = function (event) {
    handler(insureHasTarget(event))
  }
  this.eventType = eventType || 'keydown'
}
EventListener.prototype.hook = function (node, propertyName, previousValue) {
  if (node.addEventListener) {
    node.addEventListener(this.eventType, this.handler)
  } else {
    node.attachEvent('on' + this.eventType, this.handler)
  }
}
EventListener.prototype.unhook = function (node, propertyName, previousValue) {
  if (node.removeEventListener) {
    node.removeEventListener(this.eventType, this.handler)
  } else {
    node.detachEvent('on' + this.eventType, this.handler)
  }
}

module.exports = EventListener
