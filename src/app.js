
export class App {
  configureRouter(config, router) {
    config.title = 'BEL Manager';
    config.map([
      { route: ['', 'welcome'],   moduleId: './welcome',         name: 'home',      nav: true,  title: 'Welcome' },
      { route: 'search',          moduleId: './search',          name: 'search',    nav: true,  title: 'Search' },
      { route: 'edit/:id',        moduleId: './edit/main',       name: 'edit',      nav: false, title: 'Edit BEL' },
      { route: 'create',          moduleId: './edit/main',            name: 'create',    nav: true,  title: 'New BEL' },
      { route: 'import',          moduleId: './import',          name: 'import',    nav: true,  title: 'Import' },
      { route: 'about',           moduleId: './about',           name: 'about',     nav: true,  title: 'About' },
      { route: 'signup',          moduleId: './user/signup',     name: 'signup',    nav: false, title: 'Signup' },
      { route: 'login',           moduleId: './user/login',      name: 'login',     nav: false, title: 'Login' },
      { route: 'logout',          moduleId: './user/logout',     name: 'logout',    nav: false, title: 'Logout' },
      { route: 'profile',         moduleId: './user/profile',    name: 'profile',   nav: false, title: 'Profile' },
      { route: 'reset-password',  moduleId: './user/reset-password',    name: 'reset-password',   nav: false, title: 'Password Reset' }
    ]);

    this.router = router;
  }
}
