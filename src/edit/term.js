import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('bel-completion');

@inject(Api, TaskQueue)
@customElement('term')
export class Term {
  @bindable bel;
  @bindable debounceTime = 100;
  @bindable hasTermFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;
  cursor;
  loading = false;
  focused = false;

  constructor(Api, TaskQueue) {
    this.api = Api;
    this.taskQueue = TaskQueue;
  }

  // hasFocusChanged(newValue) {
  //   logger.debug('Focused: ', newValue);
  //   this.focused = newValue;
  // }

  hasFocus() {
    this.focused = true;
  }

  belChanged() {
    logger.debug('BEL Term changing ', this.bel);

    if (this.focused && this.bel && this.bel.length > 0) {
      this.cursor = this.belinput.selectionEnd;
      this.loading = true;
      this.api.getBelCompletions(this.bel, this.cursor)
      .then(results => {
        // logger.debug("Completions: ", results);
        this.filteredTerms = results;
        this.showTerms = true;
        this.loading = false;
      })
      .catch(reason => {
        logger.error('Filter BEL Completions error ', reason);
      });
    }
  }

  blurred() {
    // logger.debug("Blurred ");
    this.showTerms = false;
    this.loading = false;
    this.focused = false;
  }

  // Update the BEL Term input field and set the cursor
  selectTerm(item) {
    logger.debug('Item: ', item);

    this.cursor = item.cursor;
    this.bel = item.term;

    this.taskQueue.queueMicroTask(() => {
      this.showTerms = false;
    });

    this.taskQueue.queueMicroTask(() => {
      this.belinput.focus();
      this.belinput.setSelectionRange(this.cursor, this.cursor);
    });
  }

}
