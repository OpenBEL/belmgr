import {bindable, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Authentication} from 'belmgr-plugin/resources/authentication';
import {UserState} from '../UserState.js';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';

let logger = LogManager.getLogger('nav-bar');

export class NavBar {
  @bindable router;
  authEnabled;
  selectedOpenbelApiUrl;
  endpointName;

  static inject=[OpenbelapiService, UserState, Authentication, EventAggregator];
  constructor(api, state, auth, ea) {
    this.api = api;
    this.state = state;
    this.auth = auth;
    this.ea = ea;

    this.authEnabled = this.state.authEnabled;

    logger.debug('NavBar AuthEnabled: ', this.authEnabled);

    if (this.authEnabled && this.auth.checkToken()) {
      this.action = 'Logout';
    }
    else {
      this.action = 'Login';
    }
    this.getSelectedOpenbelApiUrl();
  }

  attached() {
    this.ea.subscribe('selectedOpenbelApiUrl', obj => {this.endpointName = obj.name;});
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

  getSelectedOpenbelApiUrl() {
    this.selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedOpenbelApiUrl'));
    this.endpointName = this.selectedOpenbelApiUrl.name;
  }
}
