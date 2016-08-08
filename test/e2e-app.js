'use strict'

require('core-js/fn/promise')
require('core-js/fn/object')
require('core-js/fn/array')

var redux = require('redux')
var mainLoop = require('main-loop')
const h = require('virtual-dom/h')
const create = require('virtual-dom/create-element')
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')

const EventListener = require('../')

function reducer (state, action) {
  switch (action.type) {
    case 'ENTER_PRESSED':
      state = Object.assign({}, state, {
        targetValue: action.value
      })
      break
  }
  // console.log('redux action', action)
  // console.log('redux state', state)
  return state
}

const store = redux.createStore(reducer, {targetValue: ''})

var textValue = ''

function inputChanged (event) {
  textValue = event.target.value
  document.getElementById('echo-output').innerHTML = textValue
}

function enterPressed (event) {
  if (event.code === 'Enter' || event.key === 13 || event.keyCode === 13) {
    // note that on every enter press, the render cycle builds new EventListeners
    store.dispatch({
      type: 'ENTER_PRESSED',
      value: textValue
    })
  }
}

function render (state) {
  return h('div#test-application', [
    h('input#test-input', {
      className: 'i-has-class',
      type: 'text',
      value: '',
      autofocus: true,
      listeningHook: new EventListener(inputChanged),
      enterHook: new EventListener(enterPressed, 'keypress')
    }),
    h('p#echo-output', ''),
    h('p#enter-output', state.targetValue)
  ])
}

var loop = mainLoop(store.getState(), render, {
  create: create,
  diff: diff,
  patch: patch
})

document.body.appendChild(loop.target)

function update () {
  loop.update(store.getState())
}

store.subscribe(update)
