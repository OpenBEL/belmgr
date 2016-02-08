import {LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Authentication} from './authentication';
import Config from '../AppConfig';

let baseUrl = Config.baseUrl;
let loginUrl = Config.loginUrl;

let logger = LogManager.getLogger('openbelapi-client');

export class OpenbelapiClient {

  client;

  static inject = [Authentication]
  constructor(auth) {
    this.auth = auth;
    let self = this;
    this.client = new HttpClient().configure(config => {
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
          request(req) {
            logger.debug(`Requesting ${req.method} ${req.url}`);

            // If id_token exists as a query param - save it
            let urlParams = location.search.split(/[?&]/).slice(1).map(function(paramPair) {
              return paramPair.split(/=(.+)?/).slice(0, 2);
              }).reduce(function (obj, pairArray) {
                obj[pairArray[0]] = pairArray[1];
                return obj;
              }, {});

            if (urlParams.id_token) {
              self.auth.setToken(urlParams.id_token);
            }

            let token = self.auth.getToken();
            req.headers.append(self.auth.tokenHeaderName, 'Bearer ' + token);

            return req; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(resp) {
            logger.debug(`Received ${resp.status} ${resp.url}`);
            return resp; // you can return a modified Response
          },
          responseError(resp) {
            if (resp.status === 401) {
              logger.info('Backend returned HTTP 401, redirecting to home.');
              // window.location.href = window.location.origin;
              window.location.href = `${loginUrl}&redirect_uri=${window.location.href}&state=${window.location.path}`;
            }
            logger.debug(`Received ${resp.status} ${resp.url}`);
            let rejection = Promise.reject(resp);
            return rejection;
          }
        });
    });
  }
}

