import { Given, When, Then, After, Before, setDefaultTimeout } from 'cucumber';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
import { AppPage } from '../app.po';

///*http://nexus.ba.ssa.gov:8082/nexus/content/groups/EVAL_SSA_GROUP/org/seleniumhq/selenium/*/
//defineSupportCode(({ Given, When, Then, After, Before, setDefaultTimeout}) => {

    setDefaultTimeout(600 * 1000);

    let page: AppPage;

    Before(() => {
        page = new AppPage();
    });

    Given('I have loaded GETSTATS 6.0', function () {
        return page.navigateTo();
    });

    Then('the title should be {string}', function (expectedVal) {
        let actualValue = page.getTitle();
        return expect(actualValue).to.be.eventually.equals(expectedVal.toString());
    });

    Then('the pagination should be {string}', function (expectedVal) {
        let actualValue = page.testPagination(); 
        let item = 'false';
        actualValue.count().then(function (pagination) {
            if (pagination > 0) {
      
                for (var i = 0; i < pagination; i++) {
                    browser.sleep(2000);   
                    actualValue.get(i).click();
                }
                item = 'true';
                return item;
            } else {
                console.log('Pagination not exists');
                item = 'false';
                return item;
            }
        });
        return item;
        //return expect(actualValue).to.be.eventually.equals('true');
    });

    Then('the table pages length should be {int}', function (expectedVal) {
        let actualValue = page.getPaginationSize();
        return expect(actualValue.count()).to.be.eventually.equals(expectedVal);
    });

    Then('the table row length should be {int}', function (expectedVal) {
        let actualValue = page.getTable();
        return expect(actualValue.count()).to.be.eventually.equals(expectedVal);
    });
    
    
//});