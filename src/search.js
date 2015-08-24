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
    this.facet_type = null;
  }

  async activate() {

    // Get initial search results
    try {
      this.results = await this.api.search();
      console.log("Search results: %O", this.results.evidences);
      console.log("Search facets: ", this.results.facets);
    }
    catch (err) {
      console.log(err);
    }
  }
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

  // Used for debugging
  stringify(object) {
    return JSON.stringify(object);
  }
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
    logger.debug('Keys: ', Object.keys(object));
    let arr = Object.keys(object);
    return arr;
  }
}

/**
 * Extract keys from object for use in repeat.for loop
 */
export class ValuesValueConverter {

  /**
   * To View method
   *
   * @param {Object} object to extract keys from
   * @return {array} list of keys
   */
  toView(object){
    logger.debug('Keys: ', Object.values(object));
    return Object.keys(object);
  }
}
