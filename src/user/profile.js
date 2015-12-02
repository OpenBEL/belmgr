import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

@inject(AuthService )
export class Profile{
  constructor(auth){
    this.auth = auth;
    this.profile = null;
  };
  activate(){
    return this.auth.getMe()
      .then(data=>{
        this.profile = data;
      });
  }
  heading = 'Profile';

  email='';
  password='';

}
