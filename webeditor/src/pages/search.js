import {inject} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';
import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('search');

@inject(OpenbelapiService)
export class Search {

  filters;
  searchUrl = null;
  searching = false;

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

    this.nanopubs = [];
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

    this.filters = []; // filters to send to api.search
    if (this.selectedFacets) {
      let keys = Object.keys(this.selectedFacets);
      for (let key of keys) {
          if (this.selectedFacets[key]) {
          this.filters.push(key);
        }
      }
    }

    if (this.searchTerms) {
      this.filters.push(`{"category":"fts","name":"search","value":"${this.searchTerms}"}`);
    }
    logger.debug('Filters: ', this.filters);

    this.searching = true;
    return this.api.search(this.searchStart, this.searchSize, this.searchFaceted, this.filters)
      .then(data => {
        logger.debug('Search result data: ', data);
        this.searchUrl = data.searchUrl;
        this.nanopubs =  data.nanopubs;
        this.facetSets = data.facets;
        this.search_metadata = data.metadata.collection_paging;
        let start_page = this.search_metadata.current_page;
        let end_page = this.search_metadata.total_pages;

        // Pagination setup
        this.pagerPrevious = this.pagerNext = '';
        if (!!this.search_metadata) {
          if (this.search_metadata.current_page === 1) {this.pagerPrevious = 'disabled';}
          if (this.search_metadata.current_page === this.search_metadata.total_pages) {this.pagerNext = 'disabled';}
          this.searchStart = (Number(this.search_metadata.current_page) - 1) * Number(this.search_metadata.current_page_size) + 1;
          this.searchResultsRange = `${start_page} of ${end_page}`;
        }
        else {
          this.searching = false;
          return data = {};
        }

        logger.debug("Search results: ", this.nanopubs);
        logger.debug("Search facets: ", this.facetSets);

        this.searching = false;
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
    if (this.searchSize <= 100) {
      localStorage.setItem('belMgrSearchSize', this.searchSize.toString());
    }
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


  deleteNanopub(nanopubUrl, idx) {
    let nanopubId = this.api.getNanopubId(nanopubUrl);
    this.api.deleteBelNanopub(nanopubId);
    this.nanopubs.splice(idx, 1);
    var deleteModal = document.getElementById("deleter");
    deleteModal.setAttribute("class", "modal fade");
  }

  deleteConfiramtion() {
    var deleteModal = document.getElementById("deleter");
    var modalFade = document.getElementByClassName("modal-backdrop");
    deleteModal.setAttribute("class", "modal fade in");
    modalFade.setAttribute("class", "modal-backdrop fade");
  };
  closeDeleter() {
    var deleteModal = document.getElementById("deleter");
    var modalFade = document.getElementByClassName("modal-backdrop");
    deleteModal.setAttribute("class", "modal fade");
    odalFade.setAttribute("class", "modal-backdrop fade");
  };
  /**
   * Get Species from Nanopub Experiment Context
   * @param nanopub
   * @returns 'Genus species'
   */

  // getSpecies(nanopub) {
  //   let default_val = 'Unknown';
  //   let item = nanopub.experiment_context.find(x => x.name === 'Ncbi Taxonomy');
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
    let result = item.nanopub.experiment_context.find(x => x.name === 'Species');
    if (result) {
      return organisms[result.value];
    }
    return organisms.Unknown;
  }

  /**
   * Creates array of experiment_context values without the Ncbi Taxonomy item
   * @param nanopub
   * @returns array of experiment_context values
   */
  getExperimentContextItems(nanopub) {
    let items = nanopub.experiment_context.filter(x => x.name !== 'Ncbi Taxonomy').map(x => `${x.name}::${x.value}`);
    return items;
  }

}

