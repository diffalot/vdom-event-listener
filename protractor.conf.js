var config = {
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
  },

  baseUrl: 'http://localhost:9966/'
}

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME
  config.sauceKey = process.env.SAUCE_ACCESS_KEY

  delete config.seleniumAddress

  delete config.capabilities

  config.multiCapabilities = [{
    browserName: 'firefox',
    name: 'firefox-tests',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'chrome',
    name: 'chrome-tests',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER
  }]

  config.onComplete = function () {
    browser.getSession().then(function (session) {
      console.log('SauceOnDemandSessionID=' + session.getId())
    })
  }
}

exports.config = config
