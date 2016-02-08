import {LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import Config from '../AppConfig';
import {OpenbelapiClient} from './openbelapi-client';
import {Authentication} from './authentication';

let logger = LogManager.getLogger('openbelapi');

let baseUrl = Config.baseUrl;
let pubmedBaseUrl = Config.pubmedBaseUrl;

export class OpenbelapiService {
  static inject = [OpenbelapiClient, Authentication];
  constructor(openbelapiClient, authentication) {
    this.apiClient = openbelapiClient.client;
    this.auth = authentication;
  }

  /**
   * <p>Process facets from search</p>
   * <p>This removes the facets that won't be used in the search results page
   *    and reorganizes it for presentation in the search results page.
   * </p>
   *
   * @param {Object} facets - facets returned by BEL API from search
   * @returns {Object} facets - facets after processing to be used in web page
   * */
  processFacets(facets) {
    let newFacets = {};

    for (let facet of facets) {
      // logger.debug("Facet: ", facet);
      if (facet.category === 'experiment_context' || facet.name === 'Status' || facet.category === 'citation') {
        // logger.debug("Status Facet: ", facet);
        let facetName = facet.name;

        if (facet.category === 'citation') {
          facetName = 'Reference ID';
        }

        newFacets[facetName] = [];
        for (let value of facet.values) {
          let name = value.value;
          newFacets[facetName].push({
            'name': name,
            'count': value.count,
            'filter': value.filter
          });
        }
      }
    }

    return newFacets;
  }

  /**
   * Search the BELMgr database and return website ready results
   *
   * @param {String} filter - search string
   * @param {Integer} start - result page starting point (default = 0)
   * @param {Integer} size - number of results returned (default = 10)
   * @param {Integer} faceted - facet results if equals 1 (default = 1)
   * @return {Promise} data - processed search results ready to display on the search results web page
   * */
  search(start = 0, size = 10, faceted = 'yes', filters) {
    /* eslint-disable camelcase */
    let max_values_per_facet = 10;
    let getstring = `/evidence?start=${start}&size=${size}&faceted=${faceted}&max_values_per_facet=${max_values_per_facet}`;
    /* eslint-enable camelcase */
    if (filters) {
      for (let filter of filters) {
        getstring += `&filter=${filter}`;
      }
    }
    // logger.debug('Filters2: ', filters);
    logger.debug('Getstring: ', getstring);

    let token = this.auth.getToken();

    return this.apiClient.fetch(getstring, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        /* eslint-disable camelcase */
        let new_data = {};
        new_data.evidences = data.evidence_collection;
        new_data.facets = this.processFacets(data.facets);
        new_data.metadata = data.metadata;
        logger.debug('Search results: ', new_data);
        return new_data;
        /* eslint-enable camelcase */
      })
      .catch(function(reason) {
        if (reason.status === 404) {
          return {
            'evidences': null,
            'facets': {}
          };
        }
        logger.error('Search API Error: ', reason);
      });
  }

  /**
   * Get BEL components (subject, relation, object) from a BEL statement
   * @param belStatement
   * @returns {"subject": "", "relationship": "", "object": ""}
   */
  getBelComponents(belStatement) {
    if (belStatement) {
      return this.apiClient.fetch(`/expressions/${belStatement}/components?flatten=1`)
        .then(response => response.json())
        .then(data => {
          // logger.debug('BEL Evidence: ', data);
          return data.expression_components;
        })
        .catch(function(reason) {
          logger.error(`GET BEL Components Error: ${reason}`);
        });
    }
    let comp = {};
    return comp;
  }

  getBelEvidence(id) {

    let token = this.auth.getToken();

    return this.apiClient.fetch(`/evidence/${id}`, { headers: { Authorization: 'Bearer ' + token }})
      .then(response => response.json())
      .then(data => {
        let evidence = data.evidence;
        return evidence;
      })
      .catch(function(reason) {
        logger.error(`GET BEL Evidence Error: ${reason}`);
      });
  }

  /**
   * Load BEL Evidence (POST or PUT)
   *
   * @param id
   * @param evidence
   */
  loadBelEvidence(evidence, id) {

    let token = this.auth.getToken();
    // Update Evidence given an Id
    if (id) {
      return this.apiClient.fetch(`/evidence/${id}`, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(evidence)
      }).catch(response => {
        logger.error('PUT Evidence error ', response);
      });
    }

    // Create new Evidence
    return this.apiClient.fetch(`/evidence`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(evidence)
    }).catch(response => {
      logger.error('POST Evidence error ', response);
    });
  }

  deleteBelEvidence(evidenceId) {

    let token = this.auth.getToken();

    return this.apiClient.fetch(`/evidence/${evidenceId}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
        'Authorization': 'Bearer ' + token
      }
    })
    .catch(function(reason) {
      logger.error(`DELETE BEL Evidence Error: `, reason);
    });
  }

  // Get list of all BEL Annotation Resources
  getBelAnnotationTypes() {
    return this.apiClient.fetch('/annotations')
      .then(response => response.json())
      .then(data => data.annotation_collection)
      .catch(function(reason) {
        logger.error(`GET BEL Annotation Types Error: ${reason}`);
      });
  }

  // Get BEL Annotation values for the edit form typeahead
  //   the query string should be wildcarded on the OpenBEL API side (e.g. 'ho sap' -> 'ho* sap*')
  /* eslint-disable camelcase */
  getBELAnnotationValues(query, annotation_type) {
    let numResults = 10;
    let query_string = '';

    if (annotation_type) {
      query_string = `/annotations/${annotation_type}/values?filter={"category":"fts","name":"search","value":"${query}"}&start=0&size=${numResults}`;
    } else {
      query_string = `/annotations/values?filter={"category":"fts","name":"search","value":"${query}"}&start=0&size=${numResults}`;
    }

    return this.apiClient.fetch(query_string)
      .then(response => response.json())
      .then(data => data.annotation_value_collection)
      .catch(function(reason) {
        logger.error(`GET BEL Annotation Values Error: ${reason}`);
      });
  }
  /* eslint-enable camelcase */

  // Get BEL term completions for the edit form typeahead
  getBelCompletions(query, cursor) {
    return this.apiClient.fetch(`/expressions/${query}/completions?caret_position=${cursor}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let data = json.completion_collection;
        // logger.debug('Data: ', data);
        let completions = this.processBelCompletions(query, data);
        // logger.debug('Completions: ', completions);
        return completions;
      })
      .catch(reason => {
        // TODO handle 404's - since they are correct - just no term found
        logger.error('GET Bel Completions error: ', reason);
      });
  }

  processBelCompletions(query, data) {
    let results = [];
    // logger.debug('Data: ', data);
    for (let d of data) {
      // logger.debug('d: ', d);
      let bel = query.slice(0);
      let cursor = 0;
      if (d.completion.actions) {
        for (let action of d.completion.actions) {
          // logger.debug('Action: ', action);
          let len = bel.length;
          let front = '';
          let back = '';
          if (action.delete) {
            if (action.delete.start_position > 0) {
              front = bel.slice(0, action.delete.start_position);
            }
            if (action.delete.end_position < len) {
              back = bel.slice(action.delete.end_position + 1);
            }
            bel = front + back;
          }

          if (action.insert) {
            if (action.insert.position > 0) {
              front = bel.slice(0, action.insert.position);
            }
            if (action.insert.position < len) {
              back = bel.slice(action.insert.position);
            }
            bel = front + d.completion.value + back;
          }

          if (action.move_cursor) {
            cursor = action.move_cursor.position;
          }

          // logger.debug('F: ', front, ' B: ', back, ' BEL: ', bel, ' T: ', d.completion.type, ' Label: ', d.completion.label, ' Val: ', d.completion.value);
        }

        let classType = '';
        if (d.completion.type === 'namespace_value') {
          classType = 'nsval';
        } else if (d.completion.type === 'namespace_identifier') {
          classType = 'nsid';
        } else if (d.completion.type === 'function') {
          classType = 'function';
        }

        if (d.completion.label !== d.completion.value) {
          results.push({term: bel, type: classType, label: d.completion.label, value: d.completion.value, cursor: cursor});
        } else {
          results.push({term: bel, type: classType, value: d.completion.value, cursor: cursor});
        }
      }
    }
    return results;
  }

  // Upload BEL Script to OpenBEL Evidence Store
  // Notes:
  //    https://github.com/github/fetch
  //    http://blog.gospodarets.com/fetch_in_action/
  //    http://www.petermorlion.com/file-upload-with-aurelia/

  uploadDataset(file) {
    let data = new FormData();
    data.append('file', file);

    let token = this.auth.getToken();

    return this.apiClient.fetch('/datasets', {
      method: 'post',
      body: data,
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  // TODO remove getEvidenceId in favor of getIdFromUrl
  //
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
   * Get ID from self link href
   *
   * @param url
   * @returns ID
   */
  getIdFromUrl(url) {
    // logger.debug('U: ', url);
    let matches = url.match(/\/([\-\w]*)$/);
    // logger.debug('Matches: ', matches);
    return matches[1];
  }

  getDatasets() {
    return this.apiClient.fetch('/datasets', { headers: { Authorization: 'Bearer ' + this.auth.getToken() }})
      .then(response => response.json())
      .then(data => {return data.dataset_collection;})
      .catch(function(reason) {
        logger.error('GET Datasets Error: ', reason);
      });
  }

  deleteDataset(url) {
    let dId = this.getIdFromUrl(url);
    return this.apiClient.fetch(`/datasets/${dId}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + this.auth.getToken() }})
      .then(response => {
        return response;
      }).catch(function(reason) {
        logger.error('Delete Datasets Error: ', reason);
      });
  }

  // Does the API require authentication? - used to indicate whether to show login link
  authEnabled() {
    let authEnabledAPI = '/authentication-enabled';
    return this.apiClient.fetch(authEnabledAPI)
      .then(data => data.json())
      .then(data => {
        return data.enabled;
      });
  }
}
