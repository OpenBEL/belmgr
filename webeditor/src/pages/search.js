import {inject} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';
import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('search');

@inject(OpenbelapiService)
export class Search {

  searchQuery = "https://thor.selventa.com/api/evidence?start=0&size=10&faceted=1&max_values_per_facet=10&filter=%7B%22category%22:%22experiment_context%22,%22name%22:%22Anatomy%22,%22value%22:%22heart%22%7D&filter=%7B%22category%22:%22experiment_context%22,%22name%22:%22Cell%22,%22value%22:%22fibroblast%22";
  
  constructor(openbelapiService) {
    this.api = openbelapiService;
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
    this.search();  // returns a promise to get all of the data needed
  }

  search(start) {
//    logger.debug(JSON.stringify(this.selectedFacets, null, 2));
//    logger.debug('Search terms: ', this.searchTerms);
    if (typeof(start) != 'undefined') {
        this.searchStart = start;
    }

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
      filters.push(`{"category":"fts","name":"search","value":"${this.searchTerms}"}`);
    }
    logger.debug('Filters: ', filters);

    return this.api.search(this.searchStart, this.searchSize, this.searchFaceted, filters)
      .then(data => {
        this.evidences =  data.evidences;
        this.facetSets = data.facets;
        if (data.metadata) {
          this.search_metadata = data.metadata.collection_paging;
        }

        // Pagination setup
        this.pagerPrevious = this.pagerNext = '';
        if (this.search_metadata.current_page === 1) {this.pagerPrevious = 'disabled';}
        if (this.search_metadata.current_page === this.search_metadata.total_pages) {this.pagerNext = 'disabled';}
        this.searchStart = (Number(this.search_metadata.current_page) - 1) * Number(this.search_metadata.current_page_size) + 1;
        this.searchResultsRange = `${this.searchStart} - ${Number(this.searchStart) + Number(this.search_metadata.current_page_size) - 1}`;

        logger.debug("Search results: ", this.evidences);
        logger.debug("Search facets: ", this.facetSets);

        return data;
      })
      .catch(function(reason) {
        logger.error('Search error ', reason);
      });

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


  deleteEvidence(evidenceUrl, idx) {
    let evidenceId = this.api.getEvidenceId(evidenceUrl);
    this.api.deleteBelEvidence(evidenceId);
    this.evidences.splice(idx, 1);
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

  getSpeciesIcon(item) {
    let organisms = {
      "Mus musculus": "mouse-icon",
      "10090": "mouse-icon",
      "Rattus norvegicus": "rat-icon",
      "10116": "rat-icon",
      "Homo sapiens": "human-icon",
      "9606": "human-icon",
      "Unknown": "unknown-icon"
    }
    let result = item.evidence.experiment_context.find(x => x.name === 'Species');
    if (result) {
      return organisms[result.value];
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

