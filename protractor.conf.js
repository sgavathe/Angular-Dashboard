// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
//import {WebDriver} from 'selenium-webdriver';

exports.config = {
  allScriptsTimeout: 360000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://development.ba.ad.ssa.gov/getstats/index.html',
  framework: "jasmine2", 
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  /*     * Designate the location of the BDD features files     */    
  specs: ["./e2e/features/*.feature",],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 360000,
    print: function() {}
  },
  cucumberOpts: { 
    compiler: "ts:ts-node/register", 
    format: ['json:reports/integrationTests.json'], 
    require: ["./e2e/steps/*.ts"], 
    strict: true, 
    tags: ["~@ignore", "@TypeScriptScenario or @CucumberScenario or @ProtractorScenario"] 
},
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
