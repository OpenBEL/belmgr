import {LogManager} from 'aurelia-framework';
import {Configure} from 'aurelia-configuration';

let logger = LogManager.getLogger('Authentication');
logger.debug('In authentication.js');

// let loginUrl = Config.loginUrl;

export class Authentication {

  loginUrl;

  static inject() { return [Configure]; }
  constructor (config) {
    logger.debug('In Authentication class');
    this.config = config;
    this.loginUrl = this.config.get('loginUrl');
    logger.debug('LoginUrl: ', this.loginUrl);
  }

  /*
    this.auth.authenticate(window.location.href, window.location.hash)
   */
  authenticate(protocol, host, pathname, hash) {
    let cleanHash = hash.replace('#/', '');
    if (!cleanHash) {cleanHash = 'home';}
    logger.debug('Protocol: ', protocol, ' Host: ', host, ' Pathname: ', pathname, ' State: ', cleanHash);
    window.location.href = `${this.loginUrl}&redirect_uri=${protocol}//${host}${pathname}?state=${cleanHash}`;
  }

  setToken(token) {
    localStorage.setItem('BELMgrToken', token);
  }

  getToken() {
    return localStorage.getItem('BELMgrToken');
  }

  removeToken() {
    localStorage.removeItem('BELMgrToken');
  }

  checkToken() {
    let token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  getPayload() {
    let token = this.getToken();

    if (token && token.split('.').length === 3) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    }
    else {return false;}
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
