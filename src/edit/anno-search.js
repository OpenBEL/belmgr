import {inject, customAttribute, bindable} from 'aurelia-framework';
import typeahead from 'typeahead';
import {Api} from '../resources/api';

@inject(Element, HttpClient, Api)
@customAttribute('anno-typeahead')
export class AnnoTypeahead {
  @bindable value;

  isSearching = false;

  constructor(element, http) {
    this.element = element;
    this.http = http;
  }

}
