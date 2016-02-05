import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('context');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay //default binding mode used with the .bind command
})
@customElement('context')
@inject(OpenbelapiService)
export class Context {
  @bindable types;

  constructor(OpenbelapiService) {
    this.api = OpenbelapiService;

    logger.debug('Context evidence: ', this.evidence);
  }

  attached() {
    // Add blank entry to end of experiment context to insert new form fields
    this.addBlank();
  }

  evidenceChanged(value) {
    logger.debug('Experiment Context changes: ', this.evidence.experiment_context);
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

