import { browser, by, element } from 'protractor';
let publicUrl;
export class AppPage {
  
  navigateTo() {
    browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = true;
    //let url = 'http://development.ba.ad.ssa.gov/getstats/index.html'
    //return browser.get('http://development.ba.ad.ssa.gov/getstats/index.html');
    return browser.get('http://localhost:4200/index.html');
    // browser.wait(()=>{
    //   browser.get('http://development.ba.ad.ssa.gov/getstats/index.html').then((url)=>{
    //     publicUrl = url;
    //     return console.log(publicUrl);
    //   });
    // });
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle(){
    browser.waitForAngularEnabled(false);
    return browser.getTitle();
  }
  
  getTable(): any{
    browser.waitForAngularEnabled(false);
    return element.all(by.css("table tbody tr"));  
  }
  
  getPaginationSize(): any{
    browser.waitForAngularEnabled(false);
    return element.all(by.css("pagination-template ul li"));  
  }

  testPagination(): any{
    browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = false;
    let getPaginationsize = element.all(by.css('pagination-template ul li a'));
    return getPaginationsize;   
}

  getTableValues(): any{
    var tabledata = element.all(by.css("./table"));
    // get rows 
    var rows = tabledata.all(by.tagName("tr"));
    // get cell values
    var cells = rows.all(by.tagName("td"));
    expect(cells.get(0).getText()).toEqual("1");
    expect(cells.get(1).getText()).toEqual("001");
    expect(cells.get(2).getText()).toEqual("13");
  }

  getTableConsole(){
  //   element.all(by.repeater('tx in transactions')).then(function(rows){
  //     rows.each(function(row){
  //         row.all(by.tagName('td')).then(function(columns){
  //             /* For getting text in date column*/
  //             columns[0].getAttribute('innerText').then(function(dateText){
  //                 console.log('Date: ' + dateText);
  //             });
  //             /* For getting text in Amount column*/
  //             columns[1].getAttribute('innerText').then(function(amountText){
  //                 console.log('Amount: ' + amountText);
  //             });
  //             /* For getting text in Transaction column*/
  //             columns[2].getAttribute('innerText').then(function(transactionType){
  //                 console.log('Transaction Type: ' + transactionType);
  //             });
  //         });
  //     });
  // });
  }

  submitTestSSN() {
    element(by.id('ssn')).sendKeys('003726202');
    element(by.buttonText('Submit')).click();
    return element.all(by.css("table tbody tr")).count();
  }

  editRowFromTestSSN(firstName, lastName) {
    //element(by.css('app-lightbox[ng-reflect-index="0"] button')).click();
    element.all(by.buttonText('Edit')).get(0).click();

    element(by.id('name')).clear().then(function() {
      element(by.id('name')).sendKeys(firstName);
    });

    element.all(by.css('.modal-footer')).all(by.buttonText('Save')).get(0).click();
  }

  getFirstNameForFirstRow() {
    return element.all(by.tagName("table")).all(by.tagName("tr")).all(by.tagName("td")).get(0).getText();
  }

  enterLeadsTab() {
    element(by.xpath('//a[contains(text(), "Leads")]')).click();
  }

  testSideNav() {
    element(by.buttonText('Profile')).click();
    element(by.buttonText('Select Claimant')).click();
    element(by.buttonText('Create Lead')).click();
    element(by.buttonText('Schedule Appointment')).click();
  }

  testNextButtonNav() {
    element(by.buttonText('Profile')).click();
    element(by.buttonText('Next')).click();
    element(by.buttonText('Next')).click();
    element(by.buttonText('Next')).click();
  }

  isFinishedButtonDisplayed() {
    return element(by.buttonText('Finished')).isDisplayed();
  }

  // TODO: Fix failing navigation
  testBackButtonNav() {
    // element(by.xpath('//a[contains(text(), "Leads")]')).click();
    // element(by.buttonText('Schedule Appointment')).click();

    element(by.buttonText('Back')).click();
    element(by.buttonText('Back')).click();
    element(by.buttonText('Back')).click();
  }

  isLanguageLabelDisplayed() {
    return element(by.xpath('//label[contains(text(), "Language")]')).isDisplayed();
  }
}