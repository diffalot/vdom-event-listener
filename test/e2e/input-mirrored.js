describe('application loads', function () {
  it('should have test-application in the dom', function () {
    browser.driver.isElementPresent(by.css('#test-application'))
    .then(function (result) {
      expect(result).toEqual(true)
    })
  })
})
