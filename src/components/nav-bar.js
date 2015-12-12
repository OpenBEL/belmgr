import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Api} from '../resources/api';

@inject(Api)
export class NavBar {
  @bindable router = null;
  @bindable loggedIn = false;

  constructor(api) {
    this.api = api;
    let cookies = '; ' + document.cookie;
    let tokens = cookies.split('; token=');
    if (tokens.length == 2) {
      this.loggedIn = true;
    }
    tokens = window.location.search.split('?jwt=');
    if (tokens.length > 1) {
      let jwt = tokens[1];
      document.cookie = "token=" + jwt;
      window.location.href = "/";
    }
  }

  navbarLogout() {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.loggedIn = false;
    window.location.href = "/";
  }

  navbarLogin() {
    this.api.authenticate();
  }
}
