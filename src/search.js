import {inject} from 'aurelia-framework';
import {Api} from './resources/api';
import {SortValueConverter} from './value_converters/value_converters.js';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('search');

@inject(Api)
export class Search {

  constructor(api) {
    this.api = api;
    this.results = null;
    this.selected_facets = {};
    this.search_terms = null;
    this.search_start = 0;
    this.search_size = 10;
    this.search_faceted = 1;
  }


  async activate() {

    // Get initial search results
    try {
      this.results = await this.api.search(this.search_start, this.search_size, this.search_faceted);
      logger.debug("Search results: %O", this.results.evidences);
      logger.debug("Search facets: ", this.results.facets);
    }
    catch (err) {
      logger.error('Search result error: ', err);
    }

    // Testing pubmed queries
//    this.api.getPubmed('1945500')
//      .then(results => logger.debug('Pubmed results: ', results))
//      .catch(reason => logger.error(`Pubmed Error: ${reason}`));
  }

  async search() {
//    logger.debug(JSON.stringify(this.selected_facets, null, 2));
//    logger.debug('Search terms: ', this.search_terms);
    let filters = []; // filters to send to api.search
    if (this.selected_facets) {
      let keys = Object.keys(this.selected_facets);
      for (let key of keys) {
          if (this.selected_facets[key]) {
          filters.push(key);
        }
      }
    }
    if (this.search_terms) {
      filters.push(`{"category": "fts", "name": "search", "value": "${this.search_terms}" }`);
    }
    logger.debug('Filters: ', filters);
    try {
      this.results = await this.api.search(this.search_start, this.search_size, this.search_faceted, filters);
      logger.debug("Search results: %O", this.results.evidences);
      logger.debug("Search facets: ", this.results.facets);
    }
    catch (err) {
      logger.error('Search result error: ', err);
    }
  }

  get_evidence_id(url) {
    let matches = url.match(/\/(\w+?)$/);
    logger.debug('Matches: ', matches[1]);
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
