const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 360000, 
    capabilities: { 
        browserName: "chrome" ,
       /*  chromeOptions: {
            binary: process.env.CHROME_BIN,
            args: ['--no-sandbox']
          } */
        noGlobals: false,              
        chromeOptions: {
            binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            args: ['--window-size=1920,1080'],
            extensions: [],
        }
    },
    /*     * Configure Protractor to use the SSA MDE Selenium Grid for testing     */    
    seleniumAddress: "http://localhost:4444/wd/hub",
    //http://selenium-hub.labs.addev.ssa.gov:4444/wd/hub
    /*     * Point to the URL of your deployed application in OpenShift     */   
    baseUrl: "http://localhost:4200/index.html",
    /* http://development.ba.ad.ssa.gov/getstats/index.html*/
    framework: "custom", 
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    /*     * Designate the location of the BDD features files     */    
    specs: ["./e2e/features/*.feature",],
    directConnect: true,
    /*     * Configure CucumberJS to do the following:     * - Detect the format in reports/integrationTest.json in order to generate     *   the results HTML in reports/integrationTests/index.html where Jenkins looks     *   for this.     * - Designate the location of the BDD steps definitions     * - Configure tags used to identify tests to execute and ignore     */    
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
        //jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
      }
};