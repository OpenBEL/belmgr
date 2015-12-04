import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('citation');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('citation')
export class Metadata {

  evidenceChanged(value) {
    logger.debug('CitationChanged: ', this.evidence);
  }
}
