import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {Api} from '../resources/api';

import $ from 'jquery';
import selectize from 'selectize';

let logger = LogManager.getLogger('context');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('context')
@inject(Api)
export class Context {

  annotationTypes;

  constructor(Api) {
    this.api = Api;
  }

  async attached() {
    // Add blank entry to end of experiment context to insert new form fields
    this.addBlank(0, null);

    try {
      this.annotationTypes = await this.api.getBelAnnotationTypes();
    }
    catch (err) {
      logger.error('GET BEL Annotation Types List error: ', err);
    }
    logger.debug('Annotation Types: ', this.annotationTypes);
  }

  evidenceChanged(value) {
    console.log('Experiment Context changes: ', this.evidence);
  }

  /**
   * Add blank experiment content to end of experiment context
   */
  addBlank(idx, event) {
    logger.debug('add Blank Items: ', this.evidence.experiment_context.length,
                 'Item: ', this.evidence.experiment_context[this.evidence.experiment_context.length-1]);
    this.evidence.experiment_context.push({'name': '', 'value': ''});
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

