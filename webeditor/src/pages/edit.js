import {LogManager} from 'aurelia-framework';
import {User} from 'belmgr-plugin/User';
import {Authentication} from 'belmgr-plugin/resources/authentication';

let logger = LogManager.getLogger('edit');

export class Edit {

    nanopubId = null;
    authEnabled = false;
    static inject = [User, Authentication];
    constructor(user, auth) {
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
