exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'test/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  jasmineNodeOpts: {
    print: function () {}
  },

  onPrepare: function () {
    // Add jasmine spec reporter
    var SpecReporter = require('jasmine-spec-reporter')
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}))

    // Angular is not in this app so we shouldn't let protractor wait for it
    browser.ignoreSynchronization = true

    // Load the page for checking facebook login status
    browser.driver.get('http://localhost:9966/')

    // Wait for the html to load (.message is rendered via erb, but not yet displayed
    browser.driver.wait(function () {
      return browser.driver.findElement(by.css('#test-application'))
    }, 10000)
  },

  baseUrl: 'http://localhost:9966/'
}
