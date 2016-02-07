import {bindable, LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {OpenbelapiService} from 'local-plugin/resources/openbelapi-service';

let logger = LogManager.getLogger('nav-bar');

@inject(OpenbelapiService)
export class NavBar {
  @bindable router = null;
  @bindable loggedIn = false;

  constructor(OpenbelapiService) {
    this.api = OpenbelapiService;

    this.api.authEnabled().then(enabled => {
      if (enabled) {
    console.log(this.api)

        let token = this.api.getToken();
        if (token === null) {
          this.action = 'Login';
        } else {
          this.action = 'Logout';
        }
        let tokens = window.location.search.split('?jwt=');
        if (tokens.length > 1) {
          let jwt = tokens[1];
          logger.info('Logged in.');
          this.api.setToken(jwt);
          window.location.href = window.location.origin;
        }
      }
    })
    .catch(function(reason) {
        logger.error('NavBar AuthEnabled Error: ', reason);
    });
  }

  navbarAction() {
    if (this.action === 'Logout') {
      this.api.removeToken();
      logger.info('Logged out.');
      window.location.href = window.location.origin;
    } else if (this.action === 'Login') {
      this.api.authenticate();
    }
  }
}
