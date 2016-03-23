import {customElement, bindable, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('context');

// custom element named:  bel-context
export class BelContext {
  @bindable evidence;

  static inject = [EventAggregator];
  constructor(eventAggregator) {
    this.ea = eventAggregator;
  }

  attached() {
    // Add blank entry to end of experiment context to insert new form fields
    this.addBlank();

    this.subscription = this.ea.subscribe('addContextItemBlank', () => {
      this.addBlank();
      logger.debug('Checking to add Blank', this.evidence.experiment_context);
    });
  }

  detached() {
    this.subscription.dispose();
  }

  evidenceChanged(value) {
    logger.debug('Experiment Context changes: ', this.evidence.experiment_context);
    this.experiment_context = this.evidence.experiment_context;
  }

  /**
   * Add blank experiment content to end of experiment context
   */
  addBlank() {
    if (this.evidence.experiment_context && this.evidence.experiment_context.length > 0) {
      let last_item_idx = this.evidence.experiment_context.length - 1;
      if (this.evidence.experiment_context[last_item_idx].value) {
        this.evidence.experiment_context.push({'name': '', 'value': ''});
      }
    }
    else {
      this.evidence.experiment_context = [];
      this.evidence.experiment_context.push({'name': '', 'value': ''});
    }
  }

  /**
   * Allow deletion of Evidence Experiment Context
   *
   * @param idx
   */
  removeItem(idx) {
    this.evidence.experiment_context.splice(idx, 1);
  }

}

