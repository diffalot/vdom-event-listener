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

  var sauceBrowsers = require('browserslist-saucelabs')
  var browsers = sauceBrowsers({browsers: ['> 1%']})
    .concat(sauceBrowsers({browsers: ['last 2 versions']}))
    .concat(sauceBrowsers({browsers: ['ie >= 8']}))

  for (var i = 0; i < browsers.length; ++i) {
    browsers[i]['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER
    browsers[i].build = process.env.TRAVIS_BUILD_NUMBER
    browsers[i].shardTestFiles = true

    // delete browsers[i].deviceName
    // delete browsers[i].platform

    // browsers[i].browserName = browsers[i].browserName.toLowerCase()

    browsers[i].name = browsers[i].browserName.toLowerCase() + '-' + browsers[i].version + '-tests'
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
