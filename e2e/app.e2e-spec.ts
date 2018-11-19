import { AppPage } from './app.po';

describe('t2angularpoc App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  
  it('should display GETSTATS', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('GETSTATS2');
  });

  // it('should return result on submitting test SSN', () => {
  //   page.navigateTo();

  //   expect(page.submitTestSSN()).toEqual(3);
  //   expect(page.getFirstNameForFirstRow()).toEqual('MARGARIT AVANESIAN')
  // });


  // it('should change details content by side nav items', () => {
  //   page.navigateTo();

  //   page.enterLeadsTab();
  //   page.testSideNav();

  //   expect(page.isFinishedButtonDisplayed()).toEqual(true);
  // });

  // it('should change details content by next button', () => {
  //   page.navigateTo();

  //   page.enterLeadsTab();
  //   page.testNextButtonNav();

  //   expect(page.isFinishedButtonDisplayed()).toEqual(true);
  // });

  // // TODO: Fix failing navigation
  // xit('should change details content by back button', () => {
  //   page.navigateTo();
  //   expect(page.testNextButtonNav()).toEqual(true);
  //   expect(page.testBackButtonNav()).toEqual(true);
  // });
});