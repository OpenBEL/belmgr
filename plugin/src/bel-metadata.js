import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('metadata');

@bindable({
  name:'nanopub', //name of the property on the class
  attribute:'nanopub', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'nanopubChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('bel-metadata')
export class BelMetadata {
  @bindable metadata;

  nanopubChanged(value) {
    logger.debug('Metadata Changed: ', this.nanopub);
  }
}

