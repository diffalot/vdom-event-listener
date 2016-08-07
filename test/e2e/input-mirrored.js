describe('application loads', function () {
  it('should have test-application in the dom', function () {
    browser.driver.isElementPresent(by.css('#test-application'))
    .then(function (result) {
      expect(result).toEqual(true)
    })
  })
})

describe('events fire', function () {
  it('should mirror text as it is entered', function () {
    browser.driver.findElement(by.css('#test-input'))
    .sendKeys('testing input')
    .then(function () {
      return browser.driver.findElement(by.css('#echo-output')).getText()
    })
    .then(function (text) {
      expect(text).toEqual('testing input')
    })
  })
  it('should update the dom when enter is pressed', function () {
    browser.driver.findElement(by.css('#test-input'))
    .sendKeys(protractor.Key.RETURN)
    .then(function () {
      return browser.driver.findElement(by.css('#enter-output')).getText()
    })
    .then(function (text) {
      expect(text).toEqual('testing input')
    })
  })
})
