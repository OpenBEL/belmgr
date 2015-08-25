import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'BEL Manager';
    config.map([
      { route: ['','welcome'],  moduleId: './welcome',    name: 'home',     nav: true,  title:'Welcome' },
      { route: 'search',        moduleId: './search',     name: 'search',   nav: true,  title:'Search' },
      { route: 'edit/:url',     moduleId: './edit',       name: 'edit',     nav: false,  title:'Edit BEL' },
      { route: 'create',        moduleId: './edit',       name: 'create',   nav: false,  title:'Create BEL' },
      { route: 'about',         moduleId: './about',      name: 'about',    nav: true,  title:'About' }
    ]);

    this.router = router;
  }
}
