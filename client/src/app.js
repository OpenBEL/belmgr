
export class App {
  configureRouter(config, router) {
    config.title = 'BEL Manager';
    config.map([
      { route: ['', 'welcome'],   moduleId: './pages/welcome',         name: 'home',      nav: true,  title: 'Welcome' },
      { route: 'search',          moduleId: './pages/search',          name: 'search',    nav: true,  title: 'Search' },
      { route: 'edit/:id',        moduleId: './pages/edit',            name: 'edit',      nav: false, title: 'Edit BEL' },
      { route: 'create',          moduleId: './pages/edit',            name: 'create',    nav: true,  title: 'New BEL' },
      { route: 'import',          moduleId: './pages/import',          name: 'import',    nav: true,  title: 'Datasets' },
      { route: 'about',           moduleId: './pages/about',           name: 'about',     nav: true,  title: 'About' },
      { route: 'help',            moduleId: './pages/help',            name: 'help',      nav: true,  title: 'Help' }
    ]);

    this.router = router;
  }
}
