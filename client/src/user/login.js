import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Api} from '../resources/api';

@inject(AuthService, Api)
export class Login {

  constructor(auth, api) {
    this.auth = auth;
    this.api = api;
    let tokens = window.location.search.split('?jwt=');
    if (tokens.length > 1) {
      let jwt = tokens[1];
      document.cookie = "token=" + jwt;
      window.location.href = "/";
    }
  };

  heading = 'Login';

  email='';
  password='';
  login() {
    this.api.authenticate();
  };
}
