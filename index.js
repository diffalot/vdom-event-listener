'use strict'

var EventListener = function (fn, listener) {
  this.fn = fn
  this.listener = listener || 'input'
}
EventListener.prototype.hook = function (node, propertyName, previousValue) {
  this.inputChange = node.addEventListener(this.listener, this.fn)
}
EventListener.prototype.unhook = function (node, propertyName, previousValue) {
  node.removeEventListener(this.listener, this.inputChange)
}

module.exports = EventListener
