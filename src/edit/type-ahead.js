import {computedFrom, inject, bindable, LogManager} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';

let logger = LogManager.getLogger('type-ahead');

@inject(TaskQueue)
export class TypeAhead {
  @bindable searchText = 'ap';
  @bindable selectedOption;
  @bindable options = [{'name': 'apple'}, {'name': 'orange'}, {'name': 'banana'}];
  @bindable debounceTime = 100;
  @bindable text = 'text';
  @bindable hasFocus = false;
  lastSearchValue = '';
  @bindable showResults = false;
  constructor(taskQueue){
    this.taskQueue = taskQueue;
  }
  searchTextChanged(newValue){
    this.filterResults();
    this.showResults = true;
  }
  hasFocusChanged(newValue){
    logger.debug('NV: ', newValue);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showResults = newValue;
    });
  }
  filterResults(){
    logger.debug('Options: ', this.options);
    this.results = this.options.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    });
  }
  optionsChanged(){
    this.filterResults();
  }
  selectItem(item){
    this.selectedOption = item;
    this.searchText = this.selectedOption[this.text];
    this.showResults = false;
  }
  clear(){
    this.selectedOption = null;
    this.searchText = '';
    this.showResults = false;
  }

  selectedOptionChanged(){
    console.log('changed')
  }
}
