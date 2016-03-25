export class PageObject_Search {

  constructor() {

  }

  setSearchterms(value) {
    return element(by.valueBind('searchTerms')).clear().sendKeys(value);
  }

  getResultCnt() {
    return element(by.id('search-result-cnt')).getText();
  }
}
