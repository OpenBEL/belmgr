import {bindable, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Authentication} from '../resources/authentication';
import {User} from './User';
import {OpenbelapiService} from '../resources/openbelapi-service';

let logger = LogManager.getLogger('nav-bar');

logger.debug('In nav-bar.js');

export class NavBar {
  @bindable router;
  authEnabled;
  selectedOpenbelApiUrl;
  endpointName;
  belVersion;
  navStick;
  window;

  static inject() { return [OpenbelapiService, User, Authentication, EventAggregator]; }
  constructor(api, user, auth, ea) {

    this.api = api;
    this.userData = user;
    this.auth = auth;
    this.ea = ea;

    this.authEnabled = this.userData.authEnabled;

    logger.debug('NavBar AuthEnabled: ', this.authEnabled);

    if (this.authEnabled && this.auth.checkToken()) {
      this.action = 'Logout';
    }
    else {
      this.action = 'Login';
    }
    this.getSelectedOpenbelApiUrl();
    this.api.getBelVersion().then(version => {
        this.belVersion = version;
    });
  }

  /* called when the view is attached to the dom */
  attached() {
    var selectedCB = obj => {
      this.endpointName = obj.name;
    };
    this.subscription1 = this.ea.subscribe('selectedOpenbelApiUrl', selectedCB);
    var updatedClientCB = obj => {
      this.api.getBelVersion().then(version => {
        this.belVersion = version;
      });
    };
    this.subscription2 = this.ea.subscribe('updatedAPIClient', updatedClientCB);
  }

  detached() {
    this.subscription1.dispose();
    this.subscription2.dispose();
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
    this.selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedAPI'));
    this.endpointName = this.selectedOpenbelApiUrl.name;
  }


}
