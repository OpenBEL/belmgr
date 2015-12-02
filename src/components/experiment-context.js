import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('experiment-context');

@inject(Api)
@bindable({
  name:'exp', //name of the property on the class
  attribute:'expcontext', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'expChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('experiment-context')
export class ExperimentContext {

  experimentContextStr;

  constructor(Api) {
    this.api = Api;
  }

  async activate() {
    try {
      this.annotationList = await this.api.getBelAnnotationList();
    }
    catch (err) {
      logger.error('GET BEL Annotation List error: ', err);
    }

    logger.debug('Annotation List: ', this.annotationList);

    // Adding blank input field to allow adding new Annotations
    this.exp.push({'name': '', 'value': ''});
    this.experimentContextStr = JSON.stringify(this.exp, null, 2);
    logger.debug('Exp Context: ', this.exp);
  }

  /**
   * Allow deletion of Evidence Experiment Context
   *
   * @param idx
   */
  removeExperimentContext(idx) {
    this.experimentContext.splice(idx, 1);
  }

  expChanged(value) {
    console.log('Exp: ', this.exp);
  }
  /**
   * Add blank experiment content to end of experiment context input allFields
   *
   * @param idx
   * @param event
   */
  addBlankExperimentContext(idx, event) {
    if (this.experimentContext[this.experimentContext.length - 1]) {
      this.experimentContext.push({'name': '', 'value': ''});
    }
  }

  /**
   * Remove blank annotations (added to the end - or just annotations with empty values
   *
   * @param obj
   * @returns {boolean}
   */
  removeBlankExperimentContext(obj) {
    return obj.value;
  }

}

