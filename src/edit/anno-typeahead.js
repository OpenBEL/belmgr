import {inject, customAttribute, bindable, LogManager} from 'aurelia-framework';
import $ from 'jquery';
import typeahead from 'typeahead';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('anno-typeahead');


@inject(Element, Api)
@customAttribute('anno-typeahead')
export class AnnoTypeahead {
  @bindable value;

  isSearching = false;

  constructor(Element, Api) {
    this.element = Element;
    this.api = Api;
  }

  attached() {

    let completions = this.getCompletions('homo');
    logger.debug('Completions: ', completions);

    this.minLength = 2;
    $(this.element).typeahead(
      {
        hint     : true,
        highlight: true,
        minLength: this.minLength,
        display: 'annotation_value.name',
      },
      {
        name      : 'context',
        source: (value) => {logger.debug('Source query: ', value); this.getCompletions(value);},
        templates: {
          notFound: `<div class="empty-message">Unable to find any symbols that match the current query</div>`,
          suggestion: data => {
            return `<div><strong class="symbol">${data.annotation_value.annotation.name}</strong><span class="name">${data.annotation_value.name}</span></div>`;
          }
        }
      });
  }

  // ???
  detached() {
    this.element.removeEventListener('change');
    this.element.removeEventListener('input');
  }

  getCompletions(query) {
//    try {
//      let completions = this.api.getBELAnnotationValues(query);
//      logger.debug('Completions: ', completions);
//      return completions;
//    }
//    catch (err) {
//      logger.error('GET Context Item error: ', err);
//    }
    return [
        {
          "annotation_value": {
            "type": "SpeciesAnnotationConcept",
            "identifier": "9606",
            "name": "Homo sapiens",
            "annotation": {
              "rdf_uri": "http://www.openbel.org/bel/namespace/ncbi-taxonomy",
              "name": "Ncbi Taxonomy",
              "prefix": "taxon",
              "domain": "species"
            },
            "match_text": "<<Homo>> sapiens",
            "_links": {
              "self": {
                "type": "annotation_value",
                "href": "http://next.belframework.org/api/annotations/ncbi-taxonomy/values/9606"
              },
              "collection": {
                "type": "annotation",
                "href": "http://next.belframework.org/api/annotations/ncbi-taxonomy"
              }
            }
          }
        }, {
          "annotation_value": {
            "type": "AnnotationConcept",
            "identifier": "0002888",
            "name": "Homo sapiens cell line",
            "annotation": {
              "rdf_uri": "http://www.openbel.org/bel/namespace/experimental-factor-ontology",
              "name": "Experimental Factor Ontology",
              "prefix": "efo",
              "domain": "cell-line"
            },
            "match_text": "<<Homo>> sapiens cell line",
            "_links": {
              "self": {
                "type": "annotation_value",
                "href": "http://next.belframework.org/api/annotations/experimental-factor-ontology/values/0002888"
              },
              "collection": {
                "type": "annotation",
                "href": "http://next.belframework.org/api/annotations/experimental-factor-ontology"
              }
            }
          }
        }
      ];
  }
}
