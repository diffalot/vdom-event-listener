'use strict'

var InputChange = function (fn, listener) {
  this.fn = fn
  this.listener = listener || 'input'
}
InputChange.prototype.hook = function (node, propertyName, previousValue) {
  this.inputChange = node.addEventListener(this.listener, this.fn)
}
InputChange.prototype.unhook = function (node, propertyName, previousValue) {
  node.removeEventListener(this.listener, this.inputChange)
}

module.exports = InputChange
