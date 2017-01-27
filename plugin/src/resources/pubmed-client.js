import {HttpClient} from 'aurelia-fetch-client';
import {LogManager} from 'aurelia-framework';
import 'fetch';

let logger = LogManager.getLogger('pubmed-client');

export class PubmedClient {
    client;
    pubmedBaseUrl;

    constructor () {
        this.pubmedBaseUrl = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";

        this.client = new HttpClient();
        this.client.configure(config => {
            config
              .withBaseUrl(this.pubmedBaseUrl)
              .withDefaults({
                  headers: {
                      'Accept': 'application/json',
                      'X-Requested-With': 'Fetch'
                  }
              })
              .rejectErrorResponses()
              .withInterceptor({
                  request(req) {
                      logger.debug(`Requesting ${req.method} ${req.url}`);
                      return req; // you can return a modified Request, or you can short-circuit the request by returning a
                      // Response
                  },
                  response(resp) {
                      logger.debug(`Received ${resp.status} ${resp.url}`);
                      return resp; // you can return a modified Response
                  }
              });
        });
    }
}
