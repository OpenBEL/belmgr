import {LogManager} from 'aurelia-framework';
import {User} from '../components/User';
import {Authentication} from '../resources/authentication';

let logger = LogManager.getLogger('edit');
logger.debug('In edit.js');

export class Edit{

  nanopubId = null;
  authEnabled = false;
  static inject() { return [User, Authentication]; }
  constructor (user, auth) {
    this.userData = user;
    this.auth = auth;

    // Authenticate if needed so user doesn't create a new bel nanopub and lose it when OpenBEL API requires authentication
    if (this.userData.authEnabled && !this.auth.checkToken()) {
      this.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
    }
  }

  activate(params) {
    if (params.id) {
      this.nanopubId = params.id;
    }
  }
}
