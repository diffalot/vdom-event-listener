
browser.url('/')

describe('application loads', function () {
  it('should have test-application in the dom', function () {
    browser.pause(1000)
    var title = browser.getTitle()
    expect(title).toBe('B E E F Y')
    var visible = browser.isVisible('#test-application')
    expect(visible).toBe(true)
  })
})

describe('events fire', function () {
  it('should allow text entry', function (done) {
    browser.setValue('#test-input', 'testing input')
  })
  it('should mirror text as it is entered', function () {
    var text = browser.getText('#echo-output')
    expect(text).toEqual('testing input')
  })
  it('should update the dom when enter is pressed', function () {
    browser.keys(['Enter'])
    var text = browser.getText('#enter-output')
    expect(text).toEqual('testing input')
  })
})
