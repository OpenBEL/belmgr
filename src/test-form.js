import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';

@inject(Validation)
export class TestForm{
  constructor(validation){
    this.heading = 'Welcome to the Test Form!';
    this.firstName = 'John';
    this.lastName = 'Doe';

    this.validation = validation.on(this)
      .ensure('firstName')
      .isNotEmpty()
      .hasMinLength(3)
      .hasMaxLength(10)
      .ensure('lastName')
      .isNotEmpty()
      .hasMinLength(3)
      .hasMaxLength(10) ;

  }

  activate(params, routeConfig) {
    this.params = params;
    console.log('Params: ' + routeConfig);
    console.log('Here');
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
      .then( () => {
        alert(`Welcome, ${this.fullName}! `);
      })
      .catch(
        alert('Problem with form')
    );

  }
}
