
# vdom-event-listener

A virtual-dom hook that adds eventListeners on dom nodes

# Usage

```javascript
const h = require('virtual-dom/h')

const EventListener = require('vdom-event-listener')

function update (event) {
  console.log('... received event', event, event.target.value)
}

function render () {
  return h('input', {
    className: 'i-has-class',
    type: 'text',
    value: 'initial value',
    listeningHook: new EventListener(update)
  })
}

render()
```

# Arguments

new EventListener(callbackFunction, eventName)

callbackFunction = callback(event)

eventName = defaults to `'input'`, but for input types like `'checkbox'` it is better to use `'change'`

# Browser Compatibility

[![Sauce Test Status](https://saucelabs.com/browser-matrix/diffalot.svg)](https://saucelabs.com/u/diffalot)
