import {inject} from 'aurelia-framework';
import {Api} from './resources/api';
import {SortValueConverter} from './valueConverters/valueConverters.js';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('search');

@inject(Api)
export class Search {

  constructor(api) {
    this.api = api;
    this.results = null;
    this.selectedFacets = {};
    this.searchTerms = null;
    this.searchStart = 0;
    if (! localStorage.getItem('belMgrSearchSize')) {
      this.searchSize = "10";
    }
    else {
      this.searchSize = localStorage.getItem('belMgrSearchSize');
    }
    this.searchFaceted = 1;

    this.evidences = [];
    this.facetSets = {};
  }


  activate() {
    // Get initial search results
    this.search();

  }

  async search() {
//    logger.debug(JSON.stringify(this.selectedFacets, null, 2));
//    logger.debug('Search terms: ', this.searchTerms);
    let filters = []; // filters to send to api.search
    if (this.selectedFacets) {
      let keys = Object.keys(this.selectedFacets);
      for (let key of keys) {
          if (this.selectedFacets[key]) {
          filters.push(key);
        }
      }
    }
    if (this.searchTerms) {
      filters.push(`{"category": "fts", "name": "search", "value": "${this.searchTerms}" }`);
    }
    logger.debug('Filters: ', filters);
    try {
      this.results = await this.api.search(this.searchStart, this.searchSize, this.searchFaceted, filters);
      this.evidences =  this.results.evidences;
      this.facetSets = this.results.facets;

      logger.debug("Search results: ", this.evidences);
      logger.debug("Search facets: ", this.facetSets);
    }
    catch (err) {
      logger.error('Search result error: ', err);
    }
    this.pagerPrevious = this.pagerNext = '';
    if (this.searchStart === 0) {this.pagerPrevious = 'disabled';}
    this.searchResultsRange = `${this.searchStart + 1} - ${Number(this.searchStart) + Number(this.searchSize)}`;
  }

  /**
   * Save Search results size in local storage
   */
  saveSearchSize() {
    localStorage.setItem('belMgrSearchSize', this.searchSize.toString());
    this.search();
  }

  /**
   *
   * @param direction
   */
  pageSearchResults(direction) {
    this.searchStart += Number(this.searchSize) * direction;
    this.search();
  }

  /**
   * Get Evidence ID from self link href in evidence object
   *
   * @param url
   * @returns evidenceID
   */
  getEvidenceId(url) {
    let matches = url.match(/\/(\w+?)$/);
    // logger.debug('Matches: ', matches[1]);
    return matches[1];
  }

//  uri_encode(uri) {
//    return encodeURIComponent(uri);
//  }
//
//  get facet_values() {
//    let facet_values = [];
//
//    for (let key of this.results.facets[this.facet_type]) {
//      count = this.results.facets[this.facet_type][key]["count"];
//      filter = this.results.facets[this.facet_type][key]["filter"];
//
//      facet_values.append({"key": key, "count": count, "filter": filter});
//    }
//    logger.debug(facet_values);
//    return facet_values;
//  }

}

/**
 * Stringify value
 */
export class StringifyValueConverter {
  toView(value) {
    if (value === null)
      return 'null';
    if (value === undefined)
      return 'undefined';
    return JSON.stringify(value, null, 2);
  }
}


/**
 * Extract keys from object for use in repeat.for loop
 */
export class KeysValueConverter {

  /**
   * To View method
   *
   * @param {Object} object to extract keys from
   * @return {array} list of keys
   */
  toView(object){
    if (typeof object === 'object') {
      logger.debug('Keys: ', Object.keys(object));
      let arr = Object.keys(object);
      return arr;
    }
    else {
      return [];
    }
  }
}
