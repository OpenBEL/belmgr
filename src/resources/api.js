import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('api');

let baseUrl = 'http://next.belframework.org/api';
let parse = message => JSON.parse(message.response);

// http://europepmc.org/RestfulWebService#search
// http://www.ebi.ac.uk/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med ext_id:1945500
// http://next.belframework.org/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med  // proxied to remove CORS issue
// http://next.belframework.org/europepmc/webservices/rest/search/resulttype=core&format=json&query=src:med ext_id:1945500
// Using this technique to proxy http://oskarhane.com/avoid-cors-with-nginx-proxy_pass
let pubmedBaseUrl = 'http://next.belframework.org/europepmc/webservices/rest/search';

export class Api {

  constructor() {
    // Simple API Client - not preconfigured with BaseUrl
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withDefaults({
          headers: {
            'Accept'          : 'application/json',
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
          headers: {
            'Accept'          : 'application/json',
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
            'Accept'          : 'application/json'
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
    let new_facets = {};

    for (let facet of facets) {
      // logger.debug("Facet: ", facet);
      if (facet.category === 'experiment_context' || facet.name === 'Status') {
        // logger.debug("Status Facet: ", facet);
        new_facets[facet.name] = [];
        for (let value of facet.values) {
          let name = value["value"];
          new_facets[facet.name].push({
            'name': name,
            'count' : value.count,
            'filter' : value.filter
          });
        }
      }
    }

    return new_facets;
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
  search(start = 0, size = 10, faceted = "yes", filters) {
    let max_values_per_facet = 20;
    let getstring = `/evidence?start=${start}&size=${size}&faceted=${faceted}&max_values_per_facet=${max_values_per_facet}`;
    if (filters) {
      for (let filter of filters) {
        getstring += `&filter=${filter}`;
      }
    }
    // logger.debug('Filters2: ', filters);
    // logger.debug('Getstring: ', getstring);

    return this.apiClient.fetch(getstring)
      .then(response => response.json())
      .then(data => {
              let new_data = {};
              new_data['evidences'] = data.evidence;
              new_data['facets'] = this.processFacets(data.facets);
              logger.debug('New Data: ', new_data);
              return new_data;
            })
      .catch(function (reason) {
                         if (reason.status === 404) {
                           return {"evidences": null, "facets": {}};
                         }
                         else {
                           logger.error("Search API Error: ", reason);
                         }
             });
  }

  /**
   * Get BEL Evidence from API Service
   *
   * @param id
   * @returns evidence object
   */
  getBelEvidence(id) {
    return this.apiClient.fetch(`/evidence/${id}`)
      .then(response => response.json())
      .then(data => {
                        // logger.debug('BEL Evidence: ', data);
                        return data['evidence'][0];
            })
      .catch(function(reason) {logger.error(`GET BEL Evidence Error: ${reason}`)});

  }

  /**
   * Load BEL Evidence (POST or PUT)
   *
   * @param id
   * @param evidence
   */
  loadBelEvidence(id, evidence) {
    if (id) {
      return this.apiClient.fetch(`/evidence/${id}`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(evidence)
        })
        .then(response => response.json())
        .catch(function (reason) {logger.error(`POST BEL Evidence Error: ${reason}`)});
    }
    else {
      return this.apiClient.fetch(`/evidence/${id}`, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(evidence)
      })
        .then(response => response.json())
        .catch(function (reason) {logger.error(`PUT BEL Evidence Error: ${reason}`)});
    }
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
                         // logger.debug('Pubmed: ', data);
                        return data.resultList.result[0];
                       })
      .catch(function(reason) {logger.error(`GET Pubmed Error: ${reason}`)});
  }

  // Get list of all BEL Relations
  getBelRelations() {
    return this.apiClient.fetch('/annotations')
      .then(response => response.json())
      .then(data => {
              logger.debug('GET BEL Annotations: ', data);
              return data;
            })
      .catch(function(reason) {logger.error(`GET BEL Annotations Error: ${reason}`)});
  }

  // Get list of all BEL Annotation Resources
  getBelAnnotations() {
    return this.apiClient.fetch('/annotations')
      .then(response => response.json())
      .then(data => {
                         logger.debug('GET BEL Annotations: ', data);
                         return data['annotations'];
            })
      .catch(function(reason) {logger.error(`GET BEL Annotations Error: ${reason}`)});
  }
}
