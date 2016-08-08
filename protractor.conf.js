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
  var HttpsProxyAgent = require('https-proxy-agent')
  config.sauceAgent = new HttpsProxyAgent('http://localhost:9966')

  config.sauceUser = process.env.SAUCE_USERNAME
  config.sauceKey = process.env.SAUCE_ACCESS_KEY

  delete config.seleniumAddress

  delete config.capabilities

  var browsers = require('./test/sauce-capabilities.json')

  for (var i = 0; i < browsers.length; ++i) {
    browsers[i]['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER
    browsers[i].build = process.env.TRAVIS_BUILD_NUMBER
    browsers[i].shardTestFiles = true
  }

  console.log(browsers)

  config.multiCapabilities = browsers

  config.onComplete = function () {
    browser.getSession().then(function (session) {
      console.log('SauceOnDemandSessionID=' + session.getId())
    })
  }
}

exports.config = config
