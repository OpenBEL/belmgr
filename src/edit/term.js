import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('bel-completion');

@inject(Api, TaskQueue)
@customElement('term')
export class Term {
  @bindable bel;
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
    this.filterTerms(this.bel, this.bel.length);
    logger.debug('Term focus changed: ', newValue);
    var self = this;

    this.taskQueue.queueMicroTask(() => {
      self.showTerms = newValue;
    });
  }

  // belChanged(){
  //   logger.debug('Term changing');
  //   if (this.hasTermFocus && this.bel.length > 1) {
  //     this.filterTerms();
  //   }
  // }

  filterTerms(event) {
    let cursor = event.srcElement.selectionEnd;
    logger.debug('FilterTerms: query ', this.bel, ' event ', event, ' cursor ', cursor);
    logger.debug('InputElem ', this.belinput);

    if (this.hasTermFocus && this.bel.length > 1) {

      this.api.getBelCompletions(this.bel, cursor)
      .then(results => {
        logger.debug("Completions: ", results);
        this.filteredTerms = results;
        this.showTerms = true;
      })
      .catch(reason => {
        logger.debug('Filter BEL Completions error ', reason);
      });
    }
  }

  // Update the BEL Term input field and set the cursor
  selectTerm(item){
    let cursor = item.cursor;
    logger.debug('Cursor: ', cursor);

    this.taskQueue.queueMicroTask(() => {
      this.bel = item.term;
      this.showTerms = false;
    });

    this.taskQueue.queueMicroTask(() => {
      this.belinput.focus();
      this.belinput.setSelectionRange(cursor, cursor); // Not working thought it might be timing issue which is why I added the taskqueue wrapping
    });
  }

  termClear(){
    this.showTerms = false;
  }
}
