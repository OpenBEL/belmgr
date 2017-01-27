import {inject} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';
// import Config from '../AppConfig';
import {Configure} from 'aurelia-configuration';
import {AuthService} from 'aurelia-keycloak';

let logger = LogManager.getLogger('Authentication');

@inject(Configure)
export class Authentication {

    constructor (Configure) {
        this.config = Configure;
        this.keycloak = AuthService.keycloak;
        var self = this;
        logger.debug('KC1: ', self.keycloak);

    }

    /*
      this.auth.authenticate(window.location.href, window.location.hash)
     */
    authenticate(protocol, host, pathname, hash) {
        let cleanHash = hash.replace('#/', '');
        if (!cleanHash) {cleanHash = 'home';}
        logger.debug('Protocol: ', protocol, ' Host: ', host, ' Pathname: ', pathname, ' State: ', cleanHash);
        // logger.debug('LoginUrl ', this.showResults(this.keycloak.createLoginUrl()));
        let redirectUri = '${protocol}//${host}${pathname}?state=${cleanHash}';

        this.keycloak.login(redirectUri=redirectUri);

        // window.location.href = `${this.loginUrl}&redirect_uri=${protocol}//${host}${pathname}?state=${cleanHash}`;

    }

    getToken() {
        return this.keycloak.token;
    }

    logout(redirect) {
        this.keycloak.logout(redirectUri=redirect);
    }

    checkToken() {
        if (!this.keycloak.tokenParsed) {
            return false;
        }
        return true;
    }

    getPayload() {
        return this.keycloak.loadProfile();
    }

    // Will return true if token exists even though it is checking format and expiration
    isAuthenticated() {
        this.keycloak.authenticated;
    }
}
