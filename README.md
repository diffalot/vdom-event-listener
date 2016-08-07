
# vdom-event-listener

A virtual-dom hook that adds eventListeners on dom nodes

# Example

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

# Usage

## `new EventListener(function handler (event), [eventType])`

`handler` is a function that takes the event that will be fired off as its only argument.

`eventType` defaults to `'input'` (and falls back to `'propertychange'` for ie8 support), but for input types like `'checkbox'` it is better to use `'change'`.

# Browser Compatibility

[![Sauce Test Status](https://saucelabs.com/browser-matrix/diffalot.svg)](https://saucelabs.com/u/diffalot)
