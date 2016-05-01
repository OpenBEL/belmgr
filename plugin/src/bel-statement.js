import {customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {CompositionTransaction} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('statement');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@bindable({name:"belSubject", attribute:"bel-subject", defaultBindingMode: bindingMode.twoWay})
@bindable({name:"belRelationship", attribute:"bel-relationship", defaultBindingMode: bindingMode.twoWay})
@bindable({name:"belObject", attribute:"bel-object", defaultBindingMode: bindingMode.twoWay})
@customElement('bel-statement')
export class BelStatement {

  @bindable evidence;
  relationships = [];

  static inject=[OpenbelapiService, CompositionTransaction];
  constructor(openbelapiService, compositionTransaction) {
    this.api = openbelapiService;
    this.compositionTransaction = compositionTransaction;
  }

  created() {
    this.compositionTransactionNotifier = this.compositionTransaction.enlist();
    this.api.getRelationships()
      .then(relationships => {
        this.relationships = relationships;
        logger.debug('Relationships: ', this.relationships);
        this.compositionTransactionNotifier.done();
      })
      .catch(function(reason) {
        logger.error('GET Relationships Error: ', reason);
      });
  }

  // Pulling parent's context into scope
  bind(context) {
    this.$parent = context;
  }

  belSubjectChanged(value) {
    logger.debug('BELsubject changed: ', this.belsubject);
  }

  evidenceChanged(value) {
    logger.debug('StatementChanged: ', this.evidence);
  }

}
