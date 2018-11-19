// // Protractor configuration file, see link for more information
// // https://github.com/angular/protractor/blob/master/lib/config.ts
// let SpecReporter1 = require('jasmine-spec-reporter').SpecReporter;
// //import {WebDriver} from 'selenium-webdriver';

// exports.config = {
//   allScriptsTimeout: 360000,
//   specs: [
//     './e2e/**/*.e2e-spec.ts'
//   ],
//   // baseUrl: 'http://localhost:4000/',
//   seleniumAddress: 'http://localhost:4444/wd/hub/',
//   capabilities: {
//     'browserName': 'chrome'
//   },
//   directConnect: false,
//   baseUrl: 'http://localhost:4200',
//   framework: 'jasmine2',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 360000,
//     print: function() {}
//   },
//   onPrepare() {
//     require('ts-node').register({
//       project: 'e2e/tsconfig.e2e.json'
//     });
//     jasmine.getEnv().addReporter(new SpecReporter1({ spec: { displayStacktrace: true } }));
//   }
// };
let globals = require('protractor');
let browser = globals.browser;
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./e2e/steps/**/*.steps.ts'],
    tags: [],
    strict: true,
    //format: ['progress', 'pretty:output.txt'],
    dryRun: false,
    compiler: []
  },
  onPrepare() {
    browser.manage().window().maximize(); // maximize the browser before executing the feature files
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });    
  }
};