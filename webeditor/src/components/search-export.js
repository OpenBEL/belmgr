import {bindable} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugin/resources/openbelapi-service';
import {Authentication} from 'belmgr-plugin/resources/authentication';
import {UserState} from '../UserState';

import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('search-export');

export class SearchExport {
  @bindable searchUrl;

  exportUrl;
  authEnabled;
  dataType = 'json_evidence';

  dataTypes = [{
    id: 'bel',
    name: 'BEL Script',
    media_type: 'application / bel',
    extension: 'bel'
  }, {
    id: 'xbel',
    name: 'XBEL',
    media_type: 'application / xml',
    extension: 'xbel'
  }, {
    id: 'json_evidence',
    name: 'JSON Evidence',
    media_type: 'application / json',
    extension: 'json'
  }, {
    id: 'jgf',
    name: 'JSON Graph Format',
    media_type: 'application / vnd.jgf + json',
    extension: 'jgf.json'
  }, {
    id: 'nquads',
    name: 'N-quads RDF',
    media_type: 'application / n - quads',
    extension: 'nq'
  }, {
    id: 'turtle',
    name: 'Turtle RDF',
    media_type: 'application / turtle OR application / x - turtle',
    extension: 'ttl'
  }];

  static inject = [OpenbelapiService, Authentication, UserState];
  constructor(openbelapiService, authentication, userstate) {
    this.openbelapiService = openbelapiService;
    this.auth = authentication;
    this.state = userstate;
    this.authEnabled = this.state.authEnabled;
    logger.debug("AuthEnabled: ", this.authEnabled);
  }


  updateExportUrl() {
    this.exportUrl = this.updateQueryString(this.exportUrl, 'format', this.dataType.id);

    if (this.authEnabled) {
      this.exportUrl = this.updateQueryString(this.exportUrl, 'token', this.auth.getToken());
    }
  }

  searchUrlChanged(newvalue) {
    logger.debug('1 searchUrl: ', this.searchUrl);
    this.exportUrl = JSON.parse(JSON.stringify(this.searchUrl));

    this.updateExportUrl();

    logger.debug('1 ExportUrl: ', this.exportUrl);
  }

  setDataType(type) {
    this.dataType = type;

    this.updateExportUrl();

    logger.debug('2 ExportUrl: ', this.exportUrl);
  }

  // Not supplying a value will remove the parameter, supplying one will
  //   add/update the parameter. Sourced from: http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
  updateQueryString(url, key, value) {

    url = url.replace(/&$/, '');
    let re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
  }
}
