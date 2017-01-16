import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {CompositionTransaction} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('bel-statement');


@customElement('bel-statement')
@inject(OpenbelapiService, CompositionTransaction)
export class BelStatement {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) statement;
  @bindable debounceTime = 400;  // TODO using a constant in the View template - change to use this value
  @bindable hasTermFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;
  cursor;
  loading = false;
  focused = false;

  constructor(openbelapiService, compositionTransaction) {
    this.api = openbelapiService;
    this.compositionTransaction = compositionTransaction;
  }

  created() {
    this.compositionTransactionNotifier = this.compositionTransaction.enlist();
  }

  // Pulling parent's context into scope
  bind(context) {
    this.$parent = context;
  }

  hasFocus() {
    this.focused = true;
  }

  // statement(value) {
  //   logger.debug('BEL Stmt changed: ', this.statement);
  // }

  nanopubChanged(value) {
    logger.debug('Nanopub changed: ', this.nanopub);
  }

  statementChanged() {
    logger.debug('BEL Stmt changing ', this.statement);

    // Do not process change if change is due to selectTerm()
    if (this.selectedTerm) {
      this.selectedTerm = false;
      return;
    }

    if (this.focused && this.statement && this.statement.length > 0) {
      this.cursor = this.belinput.selectionEnd;
      this.loading = true;
      this.api.getBelCompletions(this.statement, this.cursor)
      .then(results => {
        logger.debug("Completions: ", results);
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

    this.statement = item.value;
    this.cursor = item.cursor;
    logger.debug('BEL: ', this.statement, ' Cursor: ', this.cursor);

    this.showTerms = false;
    this.selectedTerm = true;
    this.belinput.focus();
    this.belinput.setSelectionRange(this.cursor, this.cursor);
  }


}
