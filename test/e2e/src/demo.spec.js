import {PageObject_Search} from './search.po.js';
import {PageObject_Skeleton} from './skeleton.po.js';

describe('BELMgr', function() {
  var po_search,
      po_skeleton;

  beforeEach( () => {
    po_skeleton = new PageObject_Skeleton();
    po_search = new PageObject_Search();

    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });

  it('should load the page and display the initial page title', () => {
    expect(po_skeleton.getCurrentPageTitle()).toBe('Welcome | BEL Manager');
  });

  it('should navigate to search page', () => {
    po_skeleton.navigateTo('#/search');
    browser.sleep(200);
    expect(po_skeleton.getCurrentPageTitle()).toBe('Search | BEL Manager');
  });

  it('should search terms', () => {
    let initialSearchCnt = po_search.getResultCnt();
    po_search.setSearchterms('heart');
    browser.sleep(2000);
    expect(po_search.getResultCnt()).not.toBe(initialSearchCnt);
  });

});
