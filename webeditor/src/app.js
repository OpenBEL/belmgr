import {inject} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';
import {User} from 'belmgr-plugin/User';
import {Router} from 'aurelia-router';

let logger = LogManager.getLogger('app');

@inject(OpenbelapiService, User, Router)
export class App {

  // static inject=[OpenbelapiService, User, Router, AuthService];
  // constructor(api, user, router, authservice) {
  constructor(OpenbelapiService, User, Router) {
    self = this;
    this.api = OpenbelapiService;
    this.userData = User;
    logger.debug('Router: ', Router);
  }

  configureRouter(config, Router) {
    logger.debug("Configuring router");
    config.title = 'BEL Manager';
    config.map([
      { route: ['', 'welcome'],   moduleId: './pages/welcome',         name: 'home',      nav: true,  title: 'Welcome' },
      { route: 'search',          moduleId: './pages/search',          name: 'search',    nav: true,  title: 'Search' },
      { route: 'edit/:id',        moduleId: './pages/edit',            name: 'edit',      activationStrategy: 'replace', nav: false, title: 'Edit BEL' },
      { route: 'create',          moduleId: './pages/edit',            name: 'create',    activationStrategy: 'replace', nav: true,  title: 'Compose' },
      { route: 'import',          moduleId: './pages/import',          name: 'import',    nav: true,  title: 'Datasets' },
      { route: 'apilist',         moduleId: './pages/apilist',         name: 'apilist',   nav: false,  title: 'API Endpoints' },
      // { route: 'about',           moduleId: './pages/about',           name: 'about',     nav: true,  title: 'About' },
      // { route: 'help',            moduleId: './pages/help',            name: 'help',      nav: true,  title: 'Help' }
    ]);
    config.mapUnknownRoutes(instruction => {
      // logger.debug('mapUnknownRoutes instruction: ', instruction);
      // TODO would be good to figure out how to handle redirects for authentication flow
      router.navigateToRoute('home');
    });

    this.router = Router;
  }

  activate(params, routeConfig, navigationInstruction) {
    return Promise.all([
                         this.api.authEnabled().then(enabled => {this.userData.authEnabled = enabled;}),
                         this.api.getBelVersion().then(version => {this.userData.belVersion = version;})
                       ]);
  }
}
