import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {LogManager} from 'aurelia-framework';
import Config from '../AppConfig';

let logger = LogManager.getLogger('api');

//let baseUrl = 'http://next.belframework.org/api';
let baseUrl = Config.baseUrl;

let parse = message => JSON.parse(message.response);

// http://europepmc.org/RestfulWebService#search
// http://www.ebi.ac.uk/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med ext_id:1945500
// http://next.belframework.org/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med  // proxied
// to remove CORS issue
// http://next.belframework.org/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med
// ext_id:1945500 Using this technique to proxy http://oskarhane.com/avoid-cors-with-nginx-proxy_pass

// let pubmedBaseUrl = 'http://next.belframework.org/europepmc/webservices/rest/search';
// let pubmedBaseUrl = 'http://www.ebi.ac.uk/europepmc/webservices/rest/search';
let pubmedBaseUrl = Config.pubmedBaseUrl;


export class Api {

  constructor() {
    // Simple API Client - not preconfigured with BaseUrl
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .rejectErrorResponses()
        .withInterceptor({
          request(request) {
              logger.debug(`Requesting ${request.method} ${request.url}`);
              return request; // you can return a modified Request, or you can short-circuit the request by returning a
              // Response
            },
            response(response) {
              logger.debug(`Received ${response.status} ${response.url}`);
              return response; // you can return a modified Response
            }
        });
    });

    // OpenBEL API Client - preconfigured with BaseUrl
    this.apiClient = new HttpClient();
    // this.apiClient.baseUrl = baseUrl;
    this.apiClient.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .rejectErrorResponses()
        .withInterceptor({
          request(request) {
              logger.debug(`Requesting ${request.method} ${request.url}`);
              return request; // you can return a modified Request, or you can short-circuit the request by returning a
              // Response
            },
            response(response) {
              logger.debug(`Received ${response.status} ${response.url}`);
              return response; // you can return a modified Response
            }
        });
    });

    // Pubmed API Client - preconfigured with BaseUrl
    this.pubmedClient = new HttpClient();
    this.pubmedClient.configure(config => {
      config
        .withBaseUrl(pubmedBaseUrl)
        .withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        })
        .rejectErrorResponses()
        .withInterceptor({
          request(request) {
              logger.debug(`Requesting ${request.method} ${request.url}`);
              return request; // you can return a modified Request, or you can short-circuit the request by returning a
              // Response
            },
            response(response) {
              logger.debug(`Received ${response.status} ${response.url}`);
              return response; // you can return a modified Response
            }
        });
    });
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

  getCookie(name) {
    let cookies = '; ' + document.cookie;
    let tokens = cookies.split('; ' + name + '=');
    if (tokens.length == 2) return tokens.pop().split(';').shift();
    return null;
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
    let max_values_per_facet = 10;
    let getstring = `/evidence?start=${start}&size=${size}&faceted=${faceted}&max_values_per_facet=${max_values_per_facet}`;
    if (filters) {
      for (let filter of filters) {
        getstring += `&filter=${filter}`;
      }
    }
    // logger.debug('Filters2: ', filters);
    logger.debug('Getstring: ', getstring);

    return this.apiClient.fetch(getstring, {
      headers: {
        Authorization: "Bearer " + this.getCookie("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        let new_data = {};
        new_data.evidences = data.evidence_collection;
        new_data.facets = this.processFacets(data.facets);
        new_data.metadata = data.metadata;
        logger.debug('Search results: ', new_data);
        return new_data;
      })
      .catch(function(reason) {
        if (reason.status === 404) {
          return {
            "evidences": null,
            "facets": {}
          };
        } else {
          logger.error("Search API Error: ", reason);
        }
      });
  }

  /**
   * Get BEL components (subject, relation, object) from a BEL statement
   * @param belStatement
   * @returns {"subject": "", "relationship": "", "object": ""}
   */
  getBelComponents(belStatement) {
    return this.apiClient.fetch(`/expressions/${belStatement}/components?flatten=1`)
      .then(response => response.json())
      .then(data => {
        // logger.debug('BEL Evidence: ', data);
        return data.expression_components;
      })
      .catch(function(reason) {
        logger.error(`GET BEL Components Error: ${reason}`)
      });
  }

  /**
   * Get BEL Evidence from API Service
   *
   * @param id
   * @returns evidence object
   */
  // getBelEvidence(id) {
  //   return this.apiClient.fetch(`/evidence/${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       return data.evidence;
  //     })
  //     .then(evidence => {
  //       logger.debug("Ev1: ", evidence);
  //       this.getBelComponents(evidence.bel_statement)
  //       .then(comp => {
  //         evidence.bel_subject = comp.subject;
  //         evidence.bel_object = comp.object;
  //         evidence.bel_relationship = comp.relationship;
  //         logger.debug('Evidence: ', evidence);
  //         logger.debug('Comp: ', comp);
  //         return evidence;
  //       })
  //       .catch(function(reason) {
  //         logger.error(`GET Statement components error: ${reason}`)
  //       });
  //       return evidence;
  //     })
  //     .catch(function(reason) {
  //       logger.error(`GET BEL Evidence Error: ${reason}`)
  //     });
  // }

  getBelEvidence(id) {
    return this.apiClient.fetch(`/evidence/${id}`, {headers:{Authorization: "Bearer " + this.getCookie("token") }})
      .then(response => response.json())
      .then(data => {
        let evidence = data.evidence;
        return evidence;
      })
      .catch(function(reason) {
        logger.error(`GET BEL Evidence Error: ${reason}`)
      });
  }

  /**
   * Load BEL Evidence (POST or PUT)
   *
   * @param id
   * @param evidence
   */
  loadBelEvidence(evidence, id) {
    // Update Evidence given an Id
    if (id) {
      return this.apiClient.fetch(`/evidence/${id}`, {
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
            'Authorization': "Bearer " + this.getCookie("token")
          },
          body: JSON.stringify(evidence)
        })
        .catch(response => {
          logger.error('PUT Evidence error ', response);
        });
    } else {
      // Create new Evidence
      return this.apiClient.fetch(`/evidence`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
            'Authorization': "Bearer " + this.getCookie("token")
          },
          body: JSON.stringify(evidence)
        })
        .catch(response => {
          logger.error('POST Evidence error ', response);
        });
    }
  }

  deleteBelEvidence(evidenceId) {
    return this.apiClient.fetch(`/evidence/${evidenceId}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; profile=http://next.belframework.org/schema/evidence.schema.json',
        'Authorization': "Bearer " + this.getCookie("token")
      }
    })
    .catch(function(reason) {
      logger.error(`DELETE BEL Evidence Error: `, reason);
    });
  }

  /**
   * Get Pubmed document information - e.g. title, abstract, etc.
   *
   * @param id
   * @returns {*}
   */
  getPubmed(id) {

    let getstring = `/resulttype=core&format=json&query=ext_id:${id} src:med`;

    return this.pubmedClient.fetch(getstring)
      .then(response => response.json())
      .then(data => {
        return data.resultList.result[0];
      })
      .catch(response => {
        logger.error(`GET Pubmed Error: `, response);
      });
  }

  // Get list of all BEL Annotation Resources
  getBelAnnotationTypes() {
    return this.apiClient.fetch('/annotations')
      .then(response => response.json())
      .then(data => data.annotation_collection)
      .catch(function(reason) {
        logger.error(`GET BEL Annotation Types Error: ${reason}`)
      });
  }

  // Get BEL Annotation values for the edit form typeahead
  //   the query string should be wildcarded on the OpenBEL API side (e.g. 'ho sap' -> 'ho* sap*')
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
        logger.error(`GET BEL Annotation Values Error: ${reason}`)
      });
  }

  // Get BEL term completions for the edit form typeahead
  getBelCompletions(query, cursor) {

    let response = new Promise(function(resolve, reject) {
      let payload = [
        {term: 'abundance', cursor: 2},
        {term: 'activity', cursor: 4}
      ];

      if (true) {
        resolve(payload);
      }
      else {
        reject(Error("It broke"));
      }

    });

    return response;
  }


  getBelCompletions2(query, cursor) {

  }


  // Upload BEL Script to OpenBEL Evidence Store
  // Notes:
  //    https://github.com/github/fetch
  //    http://blog.gospodarets.com/fetch_in_action/
  //    http://www.petermorlion.com/file-upload-with-aurelia/

  uploadDataset(file) {
    let data = new FormData();
    data.append('file', file);

    return this.apiClient.fetch('/datasets', {
      method: 'post',
      body: data,
      headers: {
        Authorization: "Bearer " + this.getCookie("token")
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

  getDatasets(){
    return this.apiClient.fetch('/datasets', {headers:{Authorization: "Bearer " + this.getCookie("token") }})
      .then(response => response.json())
      .then(data => {return data.dataset_collection;})
      .catch(function(reason) {
        logger.error(`GET Datasets Error: ${reason}`)
      });
  }

  deleteDataset(url) {
    let dId = this.getIdFromUrl(url);
    return this.apiClient.fetch(`/datasets/${dId}`, {method: 'DELETE', headers:{Authorization: "Bearer " + this.getCookie("token") }})
      .then(response => {return response})
      .catch(function(reason) {
        logger.error(`Delete Datasets Error: ${reason}`)
      });
  }

  /*
   * The options hash can handle queryParams and accept keys.
   * (call with url OR path, not both)
   */
  apiGET(url, path, onSuccess, onErr, options) {
    if (url === null) {
      url = baseUrl;
      // append the path
      path = encodeURI(path);
      url += path;
    }

    // setup the options to our AJAX get
    const defaultOptions = {
      queryParams: null,
      accept: null
    };
    const argOptions = $.extend(defaultOptions, options || {});

    if (argOptions.queryParams !== null) {
      // append query parameters
      url += `?${argOptions.queryParams}`;
    }

    const ajaxOptions = {
      url: url,
      success: onSuccess,
      error: onErr
    };

    if (argOptions.accept !== null) {
      ajaxOptions.headers = { Accept: argOptions.accept };
    }
    $.ajax(ajaxOptions);
  }

  /**
   * Applies a completion to the input and returns the result.
   *
   * @memberOf belhop.complete
   *
   * @param {belhop.Completion} completion BEL API completion object
   * @param {string} input BEL expression to autocomplete.
   *
   * @return {string} Completed input string.
   */
  completeApply = function(completion, input) {
    let cDelete = this.completeActionDelete;
    let cInsert = this.completeActionInsert;
    /* applies a single action */
    function actOn(action) {
      if (action.delete) {
        const startPos = action.delete.start_position;
        const endPos = action.delete.end_position;
        input = cDelete(input, startPos, endPos);
      } else if (action.insert) {
        const value = action.insert.value;
        const position = action.insert.position;
        input = cInsert(input, value, position);
      }
    }
    /* apply each action, mutating input */
    let actions = completion.actions;
    actions.forEach(actOn);
    return input;
  };

  /**
   * example:
   *
      let input = 'p(HGNC:AK';
      function onSuccess(response, status, request) {
        let completionCollection = response.completion_collection;
        let chosenCompletion = completionCollection[0].completion;
        let completed = api.completeApply(chosenCompletion, input);
        console.log("completed: " + completed);
      }
      function onErr(x) {
      }

      this.api.completeExpression(input, 9, onSuccess, onErr);

   * function onSuccess(response, status, request) {
   *   let completionCollection = response.completion_collection;
   *   // pick a completion from the array, first element selected here
   *   let chosenCompletion = completionCollection[0];
   *   // apply it
   *   api.completeApply(chosenCompletion, input);
   * }
   */
  completeExpression = function(input, caretPosition, onSuccess, onErr) {
    const path = `/expressions/${input}/completions`;
    const getOpts = {};
    getOpts.queryParams = `caret_position=${caretPosition}`;
    this.apiGET(null, path, onSuccess, onErr, getOpts);
  };

  /**
   * Delete the characters from startPos to endPos inclusively and return the
   * result.
   *
   * @protected
   * @memberOf belhop.complete.actions
   *
   * @param {string} str Input string to operate on.
   * @param {number} startPos Starting position of the deletion range.
   * @param {number} endPos Ending position of the deletion range.
   *
   * @example
   * > // delete "JUNK" from input
   * > belhop.complete.actions.delete('fooJUNKbar', 3, 6);
   * 'foobar'
   *
   * @return {string} Input string after deletion operation.
   */
  completeActionDelete = function(str, startPos, endPos) {
    const str1 = str.substr(0, startPos);
    const str2 = str.substr(endPos + 1);
    const ret = str1 + str2;
    return ret;
  };

  /**
   * Insert the string value at position and return the result.
   *
   * @protected
   * @memberOf belhop.complete.actions.insert
   *
   * @param {string} str Input string to operate on.
   * @param {string} value String to insert.
   * @param {number} position Insertion position.
   *
   * @example
   * > // insert "bar" into input
   * > belhop.complete.actions.insert('foo', 'bar', 3);
   * 'foobar'
   *
   * @return {string} Input string after insertion operation.
   */
  completeActionInsert = function(str, value, position) {
    const str1 = str.substr(0, position);
    const str2 = value;
    const str3 = str.substr(position);
    const rslt = str1 + str2 + str3;
    return rslt;
  };

  authenticate = function() {
    let current = window.location.href;
    window.location.href = baseUrl + '/authenticate?state=' + current;
  }

}
