import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {Api} from '../resources/api';

import $ from 'jquery';
import selectize from 'selectize';

let logger = LogManager.getLogger('experiment-context');

// TODO  replace textbox for contextType with textbox/dropdown like selectize.js - e.g. https://gist.github.com/monkeyhouse/fc5bd63ec852bad6b5e3

@inject(Api)
@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('experiment-context')
export class ExperimentContext {

  annotationTypes;

  constructor(Api) {
    this.api = Api;

    this.myOptions = [
      {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
      {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
      {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
    ];

  }

  async attached() {
    try {
      this.annotationTypes = await this.api.getBelAnnotationTypes();
    }
    catch (err) {
      logger.error('GET BEL Annotation Types List error: ', err);
    }

    logger.debug('Annotation List: ', this.annotationTypes);

    // Adding blank input field to allow adding new Annotations
//    this.exp.push({'name': '', 'value': ''});
//    this.experimentContextStr = JSON.stringify(this.exp, null, 2);
//    logger.debug('Exp Context: ', this.exp);

    $(this.mySelect).selectize({
      create : true,
      valueField : 'id',
      sortField : 'title',
      labelField : 'title',
      options : this.myOptions
     });
  }

  /**
   * Allow deletion of Evidence Experiment Context
   *
   * @param idx
   */
  removeExperimentContext(idx) {
    this.evidence.experiment_context.splice(idx, 1);
  }

  evidenceChanged(value) {
    console.log('Exp: ', this.evidence);
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

