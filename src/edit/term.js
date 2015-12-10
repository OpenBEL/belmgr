import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('contextitem');

@inject(Api, TaskQueue)
@customElement('term')
export class Term {
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

  }

  /*
   *  Annotation Values
   */
  hasTermFocusChanged(newValue){
    this.filterTerms();
    logger.debug('Term focus changed: ', newValue);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showTerms = newValue;
    });
  }

  termChanged(){
    logger.debug('Term changing');
    if (this.hasTermFocus && this.term.length > 1) {
      this.filterTerms();
    }
  }

  async filterTerms(){
    try {
      if (this.term.length > 1) {
        this.filteredTerms = await this.api.getBELAnnotationValues(this.term, this.cursor)
        logger.debug('BEL: ', this.filteredTerms);
      }
    }
    catch (err) {
      logger.error('Filter terms error: ', err);
    }
  }

  selectTerm(term){
    this.term = null;  // FIXME
    this.showTerms = false;
  }

  termClear(){
    this.showTerms = false;
  }
}
