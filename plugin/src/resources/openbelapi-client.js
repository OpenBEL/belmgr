import {LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

import {Configure} from 'aurelia-configuration';

import 'fetch';
import {Authentication} from './authentication';

let logger = LogManager.getLogger('openbelapi-client');

export class OpenbelApiClient {

    client;
    openbelApiUrl;

    static inject = [Authentication, Router, Configure];
    constructor(auth, router, config) {
        this.auth = auth;
        this.router = router;
        this.config = config;

        this.selectedOpenbelApiUrl = this.getApiUrl();
        this.client = this.configureClient(this.selectedOpenbelApiUrl);
    }

    configureClient(selectedOpenbelApiUrl){
        let self = this;
        let client = new HttpClient().configure(config => {
            config
              .withBaseUrl(selectedOpenbelApiUrl.api)
              .withDefaults({
                  credentials: 'same-origin',
                  headers: {
                      'Accept': 'application/hal+json',
                      'X-Requested-With': 'Fetch'
                  }
              })
              .rejectErrorResponses()
              .withInterceptor({
                  request(req) {
                      logger.debug(`Requesting ${req.method} ${req.url}`);

                      // If id_token exists as a query param - save it
                      // TODO - rework this to check for id_token first
                      // TODO - update the location directly instead of redirecting in Aurelia
                      let urlParams = location.href.split(/[?&#]/).slice(1).map(function(paramPair) {
                          return paramPair.split(/=(.+)?/).slice(0, 2);
                      }).reduce(function (obj, pairArray) {
                          obj[pairArray[0]] = pairArray[1];
                          return obj;
                      }, {});

                      let token = self.auth.getToken();
                      req.headers.append('Authorization', 'Bearer ' + token);

                      return req; // you can return a modified Request, or you can short-circuit the request by returning a Response
                  },
                  response(resp) {
                      logger.debug(`Received ${resp.status} ${resp.url}`);
                      if (resp.status === 401) {
                          let rejection = Promise.reject(resp);
                          return rejection;
                      }
                      return resp; // you can return a modified Response
                  },
                  responseError(resp) {
                      if (resp.status === 401) {
                          logger.info('Backend returned HTTP 401, redirecting to loginUrl.');
                          // window.location.href = window.location.origin;
                          self.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
                      }
                      logger.debug(`Received ${resp.status} ${resp.url}`);
                      let rejection = Promise.reject(resp);
                      return rejection;
                  }
              });
        });

        return client;
    }

    getApiUrl() {
        let openbelApiUrls = this.config.get('openbelApiUrls');
        let selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedAPI'));
        if (! selectedOpenbelApiUrl) {
            localStorage.setItem('selectedAPI', JSON.stringify(openbelApiUrls[0]));
            return openbelApiUrls[0];
        }
        return selectedOpenbelApiUrl;
    }
}

