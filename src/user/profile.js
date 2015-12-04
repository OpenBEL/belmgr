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


// below is breaking the js 

// export class Profile{

//   users = [
//     {'name': 'Anthony Bargnesi', 'email': 'abargnesi@selventa.com'},
//     {'name': 'Nick Bargnesi', 'email': 'nbargnesi@selventa.com'},
//     {'name': 'William Hayes', 'email': 'whayes@selventa.com'},
//     {'name': 'Kelly McCann', 'email': 'kmccann@selventa.com'}
//   ];
}
