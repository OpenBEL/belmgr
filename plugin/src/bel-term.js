import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('bel-completion');

@inject(OpenbelapiService)
@customElement('bel-term')
export class BelTerm {
  @bindable bel;
  @bindable debounceTime = 100;
  @bindable hasTermFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;
  cursor;
  loading = false;
  focused = false;

  constructor(OpenbelapiService) {
    this.api = OpenbelapiService;
  }

  hasFocus() {
    this.focused = true;
  }

  belChanged() {
    logger.debug('BEL Term changing ', this.bel);

    // Do not process change if change is due to selectTerm()
    if (this.selectedTerm) {
      this.selectedTerm = false;
      return;
    }

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

    this.bel = item.term;
    this.cursor = this.bel.length;
    logger.debug('BEL: ', this.bel, ' Cursor: ', this.cursor);

    this.showTerms = false;
    this.selectedTerm = true;
    this.belinput.setSelectionRange(this.cursor, this.cursor);
    this.belinput.focus();
  }

}
