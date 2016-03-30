import {bindable} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';

export class SearchExport {
  @bindable filters;

  dataType;

  dataTypes = [{
    id: 'bel',
    name: 'BEL Script Translator',
    media_type: 'application / bel',
    extension: 'bel'
  }, {
    id: 'xbel',
    name: 'XBEL Translator',
    media_type: 'application / xml',
    extension: 'xbel'
  }, {
    id: 'json_evidence',
    name: 'JSON Evidence Translator',
    media_type: 'application / json',
    extension: 'json'
  }, {
    id: 'jgf',
    name: 'JSON Graph Format Translator',
    media_type: 'application / vnd.jgf + json',
    extension: 'jgf.json'
  }, {
    id: 'nquads',
    name: 'N-quads RDF Translator',
    media_type: 'application / n - quads',
    extension: 'nq'
  }, {
    id: 'turtle',
    name: 'Turtle RDF Translator',
    media_type: 'application / turtle OR application / x - turtle',
    extension: 'ttl'
  }];

  static inject = [OpenbelapiService];
  constructor(openbelapiService) {
    this.openbelapiService = openbelapiService;
  }

  setDataType(type) {
    console.log(type);
    this.dataType = type;
  }
  exportSearch() {
    console.log('Success!!!');
    this.openbelapiService.search(0, 10, 'yes', this.dataType, filters);
  }

}
