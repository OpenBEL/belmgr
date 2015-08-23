import {inject} from 'aurelia-framework';
import {Api} from './resources/api';
import {SortValueConverter} from './valueconverters/sort.js';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('search');

@inject(Api)
export class Search {

  constructor(api) {
    this.api = api;
    this.results = null;
  }
  async activate () {

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

  // Used for debugging
  stringify(object) {
    return JSON.stringify(object);
  }

//  facet_list = [
//    {'name': 'status', 'title': 'Status'},
//    {'name': 'organisms', 'title': 'Organisms'},
//    {'name': 'tissue', 'title': 'Tissues'},
//    {'name': 'endpoint', 'title': 'Study Endpoints'}
//  ];

}

export class KeysValueConverter {
  toView(value){
    logger.debug('Keys: ', Object.keys(value));
    return Object.keys(value);
  }
}

//export class StringifyValueConverter {
//  toView(value){
//    return JSON.stringify(value);
//  }
//}
