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
      filters.push(`{"category":"fts","name":"search","value":"${this.searchTerms}"sue}`);
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

  /**
   * Get Species from Evidence Experiment Context
   * @param evidence
   * @returns 'Genus species'
   */

  // getSpecies(evidence) {
  //   let default_val = 'Unknown';
  //   let item = evidence.experiment_context.find(x => x.name === 'Ncbi Taxonomy');
  //   if (item) {
  //     return item.value;
  //   }
  //   return default_val;
  // }

  getSpecies(evidence) {
    let organisms = {
      "Mus musculus": "mouse-icon",
      "Rattus norvegicus": "rat-icon",
      "Homo sapiens": "human-icon",
      "Unknown": "unknown-icon"  
    }
    let item = evidence.experiment_context.find(x => x.name === 'Ncbi Taxonomy');
    if (item) {
      return organisms[item.value];
    }
    return organisms.Unknown;
  }




  /**
   * Creates array of experiment_context values without the Ncbi Taxonomy item
   * @param evidence
   * @returns array of experiment_context values
   */
  getExperimentContextItems(evidence) {
    let items = evidence.experiment_context.filter(x => x.name !== 'Ncbi Taxonomy').map(x => `${x.name}::${x.value}`);
    return items;
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
