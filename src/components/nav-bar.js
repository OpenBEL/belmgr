import {bindable, LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('nav-bar');

@inject(Api)
export class NavBar {
  @bindable router = null;
  @bindable loggedIn = false;

  constructor(api) {
    this.api = api;
    let token = this.api.getToken();
    if (token === null) {
      this.action = 'Login';
    } else {
      this.action = 'Logout';
    }
    let tokens = window.location.search.split('?jwt=');
    if (tokens.length > 1) {
      let jwt = tokens[1];
      logger.debug('Setting token: ', jwt);
      this.api.setToken(jwt);
      logger.debug('Getting token: ', this.api.getToken());
      window.location.href = window.location.origin;
    }
  }

  navbarAction() {
    if (this.action === 'Logout') {
      this.api.removeToken();
      this.action = 'Login';
      window.location.href = window.location.origin;
    } else {
      this.api.authenticate();
      this.action = 'Logout';
    }
  }
}
