import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {Api} from '../resources/api';

import $ from 'jquery';
import selectize from 'selectize';

let logger = LogManager.getLogger('context-item');

// TODO  replace textbox for contextType with textbox/dropdown like selectize.js - e.g. https://gist.github.com/monkeyhouse/fc5bd63ec852bad6b5e3

@inject(Api)
@customElement('context-item')
export class ContextItem {
  @bindable context;
  @bindable annotationTypes;
  @bindable index;
  @bindable last;

  constructor(Api) {
    this.api = Api;
  }

  bind() {
    // logger.debug('Index: ', this.index, ' Last: ', this.last, ' Types: ', this.annotationTypes);
  }

}
