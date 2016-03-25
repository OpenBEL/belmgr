import {bindable, LogManager, customElement} from 'aurelia-framework';
import {CompositionTransaction} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('contextitem');

@customElement('bel-context-item')
export class BelContextItem {
  @bindable type;
  @bindable annotation;
  @bindable index;
  @bindable last;
  @bindable debounceTime = 100;
  @bindable hasTypeFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;

  types;

  static inject = [OpenbelapiService, CompositionTransaction, EventAggregator];
  constructor(openbelapiService, compositionTransaction, eventAggregator){
    this.api = openbelapiService;
    this.compositionTransaction = compositionTransaction;
    this.ea = eventAggregator;
    this.compositionTransactionNotifier = null;
  }

  created() {
    this.compositionTransactionNotifier = this.compositionTransaction.enlist();

    this.api.getBelAnnotationTypes()
      .then(types => {
        this.types = types;
        logger.debug('AnnotationTypes: ', this.types);
        this.compositionTransactionNotifier.done();
      })
      .catch(function(reason) {
        logger.error('GET AnnotationTypes Error: ', reason);
      });
  }

  attached() {
    logger.debug('Index: ', this.index);
    logger.debug('Last: ', this.last);
    logger.debug('Type ', this.type);
    logger.debug('Anno ', this.annotation);
    logger.debug('Types: ', this.types);
  }

  notifyAddBlank() {
    this.ea.publish('addContextItemBlank');
  }

  /*
   *  Annotation Types
   */
  hasTypeFocusChanged(newValue){
    this.filterTypes();
    logger.debug('Type focus changed: ', newValue);
    logger.debug('Types: ', this.types);
    this.showTypes = newValue;
  }

  typeChanged(){
    if (this.type && this.types) {
      this.filterTypes();
    }
  }

  filterTypes(){
    if (this.types) {
      this.filteredTypes = this.types.filter(item => {
        return item.annotation.name.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
      });
      logger.debug('FT: ', this.filteredTypes);
    }
  }

  selectType(type){
    this.type = type.annotation.name;
    this.showTypes = false;
  }

  typeClear(){
    this.selectedType = null;
    this.searchType = '';
    this.showTypes = false;
  }

  /*
   *  Annotation Values
   */
  hasAnnotationFocusChanged(newValue){
    this.filterAnnotations();
    logger.debug('Annotation focus changed: ', newValue);
    this.showAnnotations = newValue;
  }

  annotationChanged(){
    logger.debug('Annotation changing');
    if (this.hasAnnotationFocus && this.annotation && this.annotation.length > 1) {
      this.filterAnnotations();
    }
  }

  async filterAnnotations(){
    try {
      if (this.annotation.length > 1) {
        this.filteredAnnotations = await this.api.getBELAnnotationValues(this.annotation, this.type)
        logger.debug('FA: ', this.filteredAnnotations);
      }
    }
    catch (err) {
      logger.error('Filter annotations error: ', err);
    }
  }

  selectAnnotation(annotation){
    this.annotation = annotation.annotation_value.name;
    this.type = annotation.annotation_value.annotation.name;
    this.showAnnotations = false;
  }

  annotationClear(){
    this.showAnnotations = false;
  }
}
