import {LogManager} from 'aurelia-framework';
import {OpenbelapiService} from 'local-plugin/resources/openbelapi-service';
import {UserState} from './UserState';
import {Router} from 'aurelia-router';

let logger = LogManager.getLogger('app');

export class App {

  static inject=[OpenbelapiService, UserState, Router];
  constructor(api, state, router) {
    this.api = api;
    this.state = state;
    logger.debug('Router: ', router);

    // router.addRoute({ route: 'test', moduleId: './test', name: 'access_token', nav:false, title: 'testing'});
  }

  configureRouter(config, router) {
    logger.debug("Configuring router");
    config.title = 'BEL Manager';
    config.map([
      { route: ['', 'welcome'],   moduleId: './pages/welcome',         name: 'home',      nav: true,  title: 'Welcome' },
      { route: 'search',          moduleId: './pages/search',          name: 'search',    nav: true,  title: 'Search' },
      { route: 'edit/:id',        moduleId: './pages/edit',            name: 'edit',      activationStrategy: 'replace', nav: false, title: 'Edit BEL' },
      { route: 'create',          moduleId: './pages/edit',            name: 'create',    activationStrategy: 'replace', nav: true,  title: 'New BEL' },
      { route: 'import',          moduleId: './pages/import',          name: 'import',    nav: true,  title: 'Datasets' },
      { route: 'about',           moduleId: './pages/about',           name: 'about',     nav: true,  title: 'About' },
      { route: 'help',            moduleId: './pages/help',            name: 'help',      nav: true,  title: 'Help' }
    ]);

    config.mapUnknownRoutes(instruction => {
        router.navigateToRoute('home');
    });
    logger.debug("Configured router", config);

    this.router = router;
    logger.debug("After setting router");

  }

  activate(params, routeConfig, navigationInstruction) {
    logger.debug('App Activation: ', params, routeConfig, navigationInstruction);
    return this.api.authEnabled().then(enabled => {
      this.state.authEnabled = enabled;
    });
  }
}
