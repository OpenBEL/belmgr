import {LogManager} from 'aurelia-framework';
import {UserState} from '../UserState';
import {Authentication} from 'local-plugin/resources/authentication';

let logger = LogManager.getLogger('edit');

export class Edit{

  evidenceId = null;
  authEnabled = false;
  static inject = [UserState, Authentication];
  constructor (state, auth) {
    this.state = state;
    this.auth = auth;

    // Authenticate if needed so user doesn't create a new bel nanopub and lose it when OpenBEL API requires authentication
    if (this.state.authEnabled && !this.auth.checkToken()) {
      this.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
    }
  }

  activate(params) {
    if (params.id) {
      this.evidenceId = params.id;
    }
  }
}
