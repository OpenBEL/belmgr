import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {relationsList} from '../resources/relationsList';

let logger = LogManager.getLogger('statement');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@bindable({name:"belsubject", attribute:"belsubject", defaultBindingMode: bindingMode.twoWay})
@bindable({name:"belrelationship", attribute:"belrelationship", defaultBindingMode: bindingMode.twoWay})
@bindable({name:"belobject", attribute:"belobject", defaultBindingMode: bindingMode.twoWay})
@customElement('statement')
@inject(relationsList)
export class Statement {

  // TODO pull relationsList from OpenBEL API
  constructor(relationsList) {
    this.relationsList = relationsList;
    // logger.debug('RL: ', relationsList);
  }

  // Pulling parent's context into scope
  bind(context) {
    this.$parent = context;
  }

  attached() {

  }

  belsubjectChanged(value) {
    logger.debug('BELsubject changed: ', this.belsubject);
  }

  evidenceChanged(value) {
    logger.debug('StatementChanged: ', this.evidence);
  }

}
