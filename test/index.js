'use strict'

require('core-js/fn/promise')
require('core-js/fn/object')
require('core-js/fn/array')

var EventListener = require('../')
var createElement = require('virtual-dom/create-element')
var h = require('virtual-dom/h')

var test = require('tape')
var syntheticEvent = require('synthetic-dom-events')

test('input is appended to document', function (t) {
  t.plan(1)

  function update (event) {
    console.log('... received event', event, event.target.value)
  }

  var vnode = h('input', {
    id: 'input-element',
    type: 'text',
    value: 'initial value',
    listeningHook: new EventListener(update)
  })

  var element = createElement(vnode)

  document.body.appendChild(element)
  var input = document.getElementById('input-element')

  t.notEqual(input, null)

  input.outerHTML = ''
})

var value = ''

test('input updates', function (t) {
  t.plan(1)

  function update (event) {
    value = event.target.value
  }

  var vnode = h('input', {
    id: 'input-element',
    type: 'text',
    value: value,
    listeningHook: new EventListener(update)
  })

  var element = createElement(vnode)

  document.body.appendChild(element)
  var input = document.getElementById('input-element')

  input.value = 'testing input'

  var inputEvent = syntheticEvent('keydown')

  if (input.dispatchEvent) {
    input.dispatchEvent(inputEvent)
  } else {
    input.fireEvent('onkeydown', inputEvent)
  }

  t.equal(value, 'testing input')

  value = ''
  input.outerHTML = ''
})
