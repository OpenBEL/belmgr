import {inject} from 'aurelia-framework';

export class Edit {

  constructor() {
    this.msg = 'Edit page';
  }

  activate(params) {
    this.id = params.id;


  }
}
