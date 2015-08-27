import {inject} from 'aurelia-framework';
import {Api} from './resources/api';
import {relationsList} from './relationsList';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('edit');


@inject(Api)
export class Edit {

  constructor(api) {
    this.evidenceId = null;
    this.api = api;
    this.msg = 'Edit page';
    this.evidence = {};
    this.relationsList = relationsList;
    this.annotationList = this.api.getBelAnnotations();
  }

  async activate(params) {

    logger.debug('Relation List: ', relationsList);

    if (params.id) {
      logger.debug('ID: ', params.id);
      this.evidenceId = params.id;

      // Get BEL Evidence
      try {
        this.evidence = await this.api.getBelEvidence(this.evidenceId);
        logger.debug("BEL Evidence", this.evidence);
      }
      catch (err) {
        logger.error('GET BEL Evidence error: ', err);
      }
      // Get Pubmed
      try {
        let id = 1945500;
        this.results = await this.api.getPubmed(id);
        logger.debug("Pubmed", this.results);
      }
      catch (err) {
        logger.error('GET Pubmed error: ', err);
      }
    }
  }

  /**
   * Submit BEL Evidence to API
   * @returns {boolean}
   */
  submit() {
    this.api.loadBelEvidence(this.evidenceId, this.evidence);
    return true;
  }
}

/**
 * Convert authors delimited by ';' in webpage to '|' for storage
 */
export class PipedelimValueConverter {
  toView(text) {
    if (text) {
      text = text.replace('|', ';');
    }
    return text;

  }
  fromView(text) {
    if (text) {
      text = text.replace(';', '|');
    }
    return text;
  }
}
