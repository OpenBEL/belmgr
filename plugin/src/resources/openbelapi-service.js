import {inject} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {OpenbelApiClient} from './openbelapi-client';
import {Authentication} from './authentication';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('openbelApi');

@inject(OpenbelApiClient, Authentication, EventAggregator)
export class OpenbelapiService {
    constructor(OpenbelApiClient, Authentication, EventAggregator) {
        this.openbelApiClient = OpenbelApiClient;
        this.apiClient = this.openbelApiClient.client;
        this.auth = Authentication;
        this.ea = EventAggregator;
        this.ea.subscribe('selectedOpenbelApiUrl', obj => {
            this.updateClient(obj)
            this.ea.publish('updatedAPIClient');
        });
    }

    /**
     *  Update client with new Openbel API Url
     */
    updateClient(selectedOpenbelApiUrl) {
        this.apiClient = this.openbelApiClient.configureClient(selectedOpenbelApiUrl);
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
            if (
              facet.category === 'experiment_context' ||
              facet.name === 'Status' ||
              facet.category === 'citation' ||
              facet.name === 'dataset' ||
              facet.name === 'nanopub_status'
            ) {
                let facetName = facet.name;

                if (facet.category === 'citation') {
                    facetName = 'Reference ID';
                }
                if (facet.name === 'dataset') {
                    facetName = 'Datasets';
                }
                if (facet.name === 'nanopub_status') {
                    facetName = 'Nanopub Status';
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
        let getstring = `/nanopubs?start=${start}&size=${size}&faceted=${faceted}&max_values_per_facet=${max_values_per_facet}`;
        /* eslint-enable camelcase */


        if (filters) {
            for (let filter of filters) {
                getstring += `&filter=${filter}`;
            }
        }

        // logger.debug('Filters2: ', filters);
        logger.debug('Getstring1: ', getstring);

        return this.apiClient.fetch(getstring)
          .then(response => response.json())
          .then(data => {
              logger.debug('Data: ', data);
              let newData = {};
              newData.nanopubs = data.nanopub_collection;
              newData.facets = this.processFacets(data.facets);
              newData.metadata = data.metadata;
              newData.searchUrl = data._links.self.href;
              return newData;
          })
          .catch(function(reason) {
              if (reason.status === 404) {
                  return {
                      'nanopubs': null,
                      'facets': {}
                  };
              }
              if (reason.status === 401) {
                  logger.info('Unauthorized request');
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
                  // logger.debug('BEL Nanopub: ', data);
                  return data.expression_components;
              })
              .catch(function(reason) {
                  logger.error(`GET BEL Components Error: ${reason}`);
              });
        }
        let comp = {};
        return comp;
    }

    getBelNanopub(id) {

        let token = this.auth.getToken();

        return this.apiClient.fetch(`/nanopubs/${id}`)
          .then(response => response.json())
          .then(data => {
              let nanopub = data.nanopub;
              return nanopub;
          })
          .catch(function(reason) {
              logger.error(`GET BEL Nanopub Error: ${reason}`);
          });
    }

    /**
     * Load BEL Nanopub (POST or PUT)
     *
     * @param id
     * @param nanopub
     */
    loadBelNanopub(nanopub, id) {

        // Update Nanopub given an Id
        if (id) {
            return this.apiClient.fetch(`/nanopubs/${id}`, {
                method: 'put',
                headers: {
                    'Accept': 'application/hal+json',
                    'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'

                },
                body: JSON.stringify(nanopub)
            }).catch(response => {
                logger.error('PUT Nanopub error ', response);
            });
        }

        // Create new Nanopub
        return this.apiClient.fetch(`/nanopubs`, {
            method: 'post',
            headers: {
                'Accept': 'application/hal+json',
                'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'
            },
            body: JSON.stringify(nanopub)
        }).catch(response => {
            logger.error('POST Nanopub error ', response);
        });
    }

    deleteBelNanopub(nanopubId) {

        return this.apiClient.fetch(`/nanopubs/${nanopubId}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/hal+json',
                'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'
            }
        })
        .catch(function(reason) {
            logger.error(`DELETE BEL Nanopub Error: `, reason);
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
            let bel     = query.slice(0);
            let cursor  = 0;
            cursor      = d.completion.caret_position;
            let valid   = d.completion.validation.valid_semantics;
            let message = d.completion.validation.message;

            let classType = '';
            if (d.completion.type === 'namespace_value') {
                classType = 'nsval';
            } else if (d.completion.type === 'namespace_identifier') {
                classType = 'nsid';
            } else if (d.completion.type === 'function') {
                classType = 'function';
            }

            if (d.completion.label !== d.completion.value) {
                results.push({term: bel, type: classType, label: d.completion.label, value: d.completion.value, cursor: cursor, valid: valid, message: message});
            } else {
                results.push({term: bel, type: classType, value: d.completion.value, cursor: cursor, valid: valid, message: message});
            }
        }
        return results;
    }

    // Upload BEL Script to OpenBEL Nanopub Store
    // Notes:
    //    https://github.com/github/fetch
    //    http://blog.gospodarets.com/fetch_in_action/
    //    http://www.petermorlion.com/file-upload-with-aurelia/

    uploadDataset(file) {
        let data = new FormData();
        data.append('file', file);

        return this.apiClient.fetch('/datasets', {
            method: 'post',
            body: data
        });
    }

    // TODO remove getNanopubId in favor of getIdFromUrl
    //
    /**
     * Get Nanopub ID from self link href in nanopub object
     *
     * @param url
     * @returns nanopubID
     */
    getNanopubId(url) {
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
        let matches = url.match(/edit\/([\-\w]*)$/);
        // logger.debug('Matches: ', matches);
        if (matches !== null && matches.length > 0) {return matches[1];}
        return null;
    }

    getDatasets() {
        return this.apiClient.fetch('/datasets')
          .then(response => response.json())
          .then(data => {return data.dataset_collection;})
          .catch(function(reason) {
              logger.error('GET Datasets Error: ', reason);
          });
    }

    getRelationships() {
        return this.apiClient.fetch('/language/relationships')
          .then(response => response.json())
          .then(data => {
              logger.debug('Relationships: ', data.relationship_collection);
              return data.relationship_collection;
          })
          .catch(function(reason) {
              logger.error('GET Relationships Error: ', reason);
          });
    }

    getBelVersion() {
        return this.apiClient.fetch('/language/version')
          .then(response => response.json())
          .then(data => {
              return data.bel_version.string;
          })
          .catch(function(reason) {
              logger.error('GET BEL Version Error: ', reason);
          });
    }

    deleteDataset(url) {
        let dId = this.getIdFromUrl(url);
        return this.apiClient.fetch(`/datasets/${dId}`, { method: 'DELETE'})
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
          }).catch(function(reason) {
              logger.error('authentication-enabled error: ', reason);
          });
    }
}
