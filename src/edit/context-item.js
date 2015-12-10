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

  /*
   *  Annotation Types
   */
  hasTypeFocusChanged(newValue){
    this.filterTypes();
    logger.debug('Type focus changed: ', newValue);
    logger.debug('Types: ', this.types);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showTypes = newValue;
    });
  }

  typeChanged(){
    if (this.type && this.types) {
      this.filterTypes();
    }
  }

  filterTypes(){
    this.filteredTypes = this.types.filter(item => {
      return item.annotation.name.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
    });
    logger.debug('FT: ', this.filteredTypes);
  }

  selectType(type){
    this.type = type.annotation.name;
    this.showTypes = false;
  }

  typeClear(){
    this.selectedType = null;
    this.searchType = '';
    this.showTypes = false;
  }

  /*
   *  Annotation Values
   */
  hasAnnotationFocusChanged(newValue){
    this.filterAnnotations();
    logger.debug('Annotation focus changed: ', newValue);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showAnnotations = newValue;
    });
  }

  annotationChanged(){
    logger.debug('Annotation changing');
    if (this.hasAnnotationFocus && this.annotation.length > 1) {
      this.filterAnnotations();
    }
  }

  async filterAnnotations(){
    try {
      if (this.annotation.length > 1) {
        this.filteredAnnotations = await this.api.getBELAnnotationValues(this.annotation, this.type)
        logger.debug('FA: ', this.filteredAnnotations);
      }
    }
    catch (err) {
      logger.error('Filter annotations error: ', err);
    }
  }

  selectAnnotation(annotation){
    this.annotation = annotation.annotation_value.name;
    this.type = annotation.annotation_value.annotation.name;
    this.showAnnotations = false;
  }

  annotationClear(){
    this.showAnnotations = false;
  }
}
