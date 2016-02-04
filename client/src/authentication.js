import {inject, LogManager} from 'aurelia-framework';

import {Api} from './resources/api';
import Config from './AppConfig';

let logger = LogManager.getLogger('authenticate');

@inject(Api, AppConfig)
export class Authentication {

  constructor(Api, AppConfig) {
    this.api = Api;
    this.appconfig = AppConfig;
    this.tokenName = this.appconfig.tokenName;
  }

  authEnabled() {
    let authEnabledAPI = '/authentication-enabled';
    let promise = this.apiClient.fetch(authEnabledAPI);
    promise = promise.then(this.toJSON);
    promise = promise.then(data => data.enabled);
    promise = promise.catch(this.logAsError);
    return promise;
  }

  authenticate() {
    let next = window.location.href;
    logger.debug('Next: ', next);
    window.location.href = baseUrl + '/authenticate?state=' + next;
  }

  setToken(token) {
    localStorage.setItem(this.tokenName, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenName);
  }

  removeToken() {
    localStorage.removeItem(this.tokenName);
  }

  getPayload() {
    let token = this.getToken();

    if (token && token.split('.').length === 3) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    }
  }

  // Will return true if token exists even though it is checking format and expiration
  isAuthenticated() {
    let token = this.getToken();

    if (token) {return true;}

    return false;

    // if (token) {
    //   if (token.split('.').length === 3) {
    //     let base64Url = token.split('.')[1];
    //     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     let exp = JSON.parse(window.atob(base64)).exp;
    //     if (exp) {
    //       return Math.round(new Date().getTime() / 1000) <= exp;
    //     }
    //     return true;
    //   }
    //   return true;
    // }
    // return false;
  }

  isString(value) {
    return typeof value === 'string';
  }

  logout(redirect) {
    let tokenName = this.tokenName;
    return new Promise((resolve, reject)=>{
      this.storage.remove(tokenName);

      if (this.appconfig.logoutRedirect && !redirect) {
        window.location.href = this.appconfig.logoutRedirect;
      }
      else if (this.isString(redirect)) {
        // window.location.href =redirect;
        // this.router.navigate(redirect);
        window.location.href = redirect;
      }

      resolve();
    });
  }

}
