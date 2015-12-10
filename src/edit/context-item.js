import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('contextitem');

@inject(Api, TaskQueue)
@customElement('context-item')
export class ContextItem {
  @bindable type;
  @bindable annotation;
  @bindable types;
  @bindable index;
  @bindable last;
  @bindable debounceTime = 100;
  @bindable hasTypeFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;

  constructor(Api, TaskQueue){
    this.api = Api;
    this.taskQueue = TaskQueue;
  }

  attached() {
    logger.debug('Index: ', this.index);
    logger.debug('Last: ', this.last);
    logger.debug('Type ', this.type);
    logger.debug('Anno ', this.annotation);
    logger.debug('Types: ', this.types);
  }

  hasTypeFocusChanged(newValue){
    logger.debug('Type focus changed: ', newValue);
    logger.debug('Types: ', this.types);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showTypes = newValue;
    });
  }

  filterTypes(){
    this.filteredTypes = this.types.filter(item => {
      return item.type.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
    });
  }

  selectType(type){
    this.selectedOption = type;
    this.searchText = this.selectedOption[this.text];
    this.showTypes = false;
  }

  typeClear(){
    this.selectedType = null;
    this.searchType = '';
    this.showTypes = false;
  }

  selectedTypeChanged(){
    console.log('changed')
  }

}
