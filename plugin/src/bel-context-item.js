import {bindable, LogManager, customElement} from 'aurelia-framework';
import {OpenbelapiService} from './resources/openbelapi-service';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('context-item');

@customElement('bel-context-item')
export class BelContextItem {
  @bindable type;
  @bindable annotation;
  @bindable annotationTypes;
  @bindable index;
  @bindable last;
  @bindable debounceTime = 100;
  @bindable hasTypeFocus = false;
  @bindable hasAnnotationFocus = false;
  @bindable showResults = false;

    static inject = [OpenbelapiService, EventAggregator];
    constructor(openbelapiService, eventAggregator) {
        this.api = openbelapiService;
        this.ea = eventAggregator;
    }

    notifyAddBlank() {
        this.ea.publish('addContextItemBlank');
    }

    /*
     *  Annotation Types
     */
    hasTypeFocusChanged(newValue) {
        this.filterTypes();
        // logger.debug('Annotation Type focus changed: ', newValue);
        // logger.debug('Annotation Types: ', this.annotationTypes);
        this.showTypes = newValue;
    }

    typeChanged() {
        // logger.debug('annotation Type changed');
        if (this.type && this.annotationTypes) {
            this.filterTypes();
        }
    }

    filterTypes() {
        // logger.debug('Filtering types');
        if (this.annotationTypes) {
            this.filteredTypes = this.annotationTypes.filter(item => {
                return item.annotation.name.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
            });
            // logger.debug('FT: ', this.filteredTypes);
        }
    }

    selectType(type) {
        this.type = type.annotation.name;
        this.showTypes = false;
    }

    typeClear() {
        this.selectedType = null;
        this.searchType = '';
        this.showTypes = false;
    }

    /*
     *  Annotation Values
     */
    hasAnnotationFocusChanged(newValue) {
        this.filterAnnotations();
        this.showAnnotations = newValue;
    }

    annotationChanged() {
        // logger.debug('Annotation changing');
        if (this.hasAnnotationFocus && this.annotation && this.annotation.length > 1) {
            this.filterAnnotations();
        }
    }

    filterAnnotations() {
        if (this.annotation.length > 1) {
            this.api.getBELAnnotationValues(this.annotation, this.type)
              .then(data => {
                  this.filteredAnnotations = data;
              })
              .catch(function(reason) {
                  logger.error('Filter annotations error: ', reason);
              });
        }
    }

    selectAnnotation(annotation) {
        this.annotation = annotation.annotation_value.name;
        this.type = annotation.annotation_value.annotation.name;
        this.showAnnotations = false;
    }

    annotationClear() {
        this.showAnnotations = false;
    }
}
