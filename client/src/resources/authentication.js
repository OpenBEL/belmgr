import {ApiClient} from './api-client';

let tokenStorageName = 'BELMgrToken';
let tokenHeaderName = 'Authorization';

export class Authentication {

  static inject = [ApiClient];
  constructor (ApiClient) {
    this.client = ApiClient.client;
  }

  authEnabled() {
    let authEnabledAPI = '/authentication-enabled';
    return this.client.fetch(authEnabledAPI)
      .then(data => data.json())
      .then(data => {
        return data.enabled;
      });
  }

  setToken(token) {
    localStorage.setItem(tokenStorageName, token);
  }

  getToken() {
    return localStorage.getItem(tokenStorageName);
  }

  removeToken() {
    localStorage.removeItem(tokenStorageName);
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

      if (this.Config.logoutRedirect && !redirect) {
        window.location.href = this.Config.logoutRedirect;
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
