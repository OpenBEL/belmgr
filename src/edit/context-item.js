import {inject} from 'aurelia-framework';
import {bindable, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('contextitem');

@inject(Api, TaskQueue)
@customElement('context-item')
export class ContextItem {
  @bindable context;
  @bindable types;
  @bindable index;
  @bindable last;

  @bindable debounceTime = 100;
  @bindable hasTypeFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;

  lastSearchValue = '';

  logger.debug('Context: ', this.context);
  logger.debug('Types: ', this.types);

  type = this.context.name;
  annotation = this.context.value;



  constructor(Api, TaskQueue){
    this.api = Api;
    this.taskQueue = TaskQueue;
  }

  searchTypeChanged(newValue){
    this.filterTypes();
    this.showTypes = true;
  }

  hasTypeFocusChanged(newValue){
    logger.debug('Type focus changed: ', newValue);
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

  typesChanged(){
    this.filterTypes();
  }

  selectType(type){
    this.selectedOption = type;
    this.searchText = this.selectedOption[this.text];
    this.showResults = false;
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
