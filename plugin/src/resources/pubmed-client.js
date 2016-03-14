import {HttpClient} from 'aurelia-fetch-client';
import {LogManager} from 'aurelia-framework';
import 'fetch';
import Config from '../AppConfig';

let logger = LogManager.getLogger('pubmed-client');
let pubmedBaseUrl = Config.pubmedBaseUrl;

export class PubmedClient {
  client;
  constructor() {
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withBaseUrl(pubmedBaseUrl)
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
