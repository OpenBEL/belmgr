import {bindable, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Authentication} from 'belmgr-plugin/resources/authentication';
import {User} from 'belmgr-plugin/User';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';

let logger = LogManager.getLogger('nav-bar');

export class NavBar {
  @bindable router;
  authEnabled;
  selectedOpenbelApiUrl;
  endpointName;
  belVersion;
  navStick;
  window;

  static inject=[OpenbelapiService, User, Authentication, EventAggregator];
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
    this.belVersion = this.api.getBelVersion().then(version => {return version});
  }

  /* called when the view is attached to the dom */
  attached() {
    var cb = obj => {
      this.endpointName = obj.name;
    };
    this.subscription = this.ea.subscribe('selectedOpenbelApiUrl', cb);
  }

  detached() {
    this.subscription.dispose();
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
