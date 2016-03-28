import {bindable, LogManager} from 'aurelia-framework';
import {Authentication} from 'belmgr-plugin/resources/authentication';
import {UserState} from '../UserState.js';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';

let logger = LogManager.getLogger('nav-bar');

export class NavBar {
  @bindable router;
  authEnabled;

  static inject=[OpenbelapiService, UserState, Authentication];
  constructor(api, state, auth) {
    this.api = api;
    this.state = state;
    this.auth = auth;

    this.authEnabled = this.state.authEnabled;

    logger.debug('NavBar AuthEnabled: ', this.authEnabled);

    if (this.authEnabled && this.auth.checkToken()) {
      this.action = 'Logout';
    }
    else {
      this.action = 'Login';
    }
  }

  bind() {
    // debugger;
  }

  navbarAction() {
    if (this.action === 'Logout') {
      this.auth.removeToken();
      logger.info('Logged out.');
      window.location.href = window.location.origin;
    } else if (this.action === 'Login') {
      this.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
    }
  }
}
