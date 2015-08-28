import {inject} from 'aurelia-framework';
import {Api} from './resources/api';
import {relationsList} from './relationsList';
import {PubmedService} from './resources/PubmedService';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('edit');


@inject(Api, PubmedService)
export class Edit {

  constructor(Api, PubmedService) {
    this.api = Api;
    this.pubmedService = PubmedService;

    this.evidenceId = null;
    this.evidence = {};
    this.relationsList = relationsList;

//    this.api.getBelAnnotations()
//      .then(data => {this.annotationList = data;logger.debug('AnnoList: ', this.annotationList);})
//      .catch(
//        function(reason) {logger.error(`GET BEL Annotations Error: ${reason}`)}
//      );


    this.pubmed = null;
  }

  async activate(params) {

    logger.debug('Relation List: ', relationsList);

    if (params.id) {
      logger.debug('ID: ', params.id);
      this.evidenceId = params.id;

      // Get BEL Evidence
      try {
        this.evidence = await this.api.getBelEvidence(this.evidenceId);
        this.annotationList = await this.api.getBelAnnotations();
        logger.debug("BEL Evidence", this.evidence);
        logger.debug('AnnoList: ', this.annotationList);
      }
      catch (err) {
        logger.error('GET BEL Evidence error: ', err);
      }
      // Get Pubmed
      this.getPubmed();
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

//  authors: ""
//  comment: ""
//  date: ""
//  id: "11792716"
//  name: "J Lipid Res 2002 Jan 43(1) 2-12"
//  type: "PubMed"

  /**
   * Check for citation information mismatch or missing information for Pubmed entries
   *
   * Add Pubmed data to evidence.citation if evidence.citation information is missing
   */
  citationPubmedChecks () {
    if (this.evidence.citation.type === 'PubMed') {
      // Check date
      if (! this.evidence.citation.date) {
        this.evidence.citation.date = this.pubmed.journalInfo.printPublicationDate;
      }
      else if (this.evidence.citation.date !== this.pubmed.journalInfo.printPublicationDate) {
        this.pubmed.bel.mismatch.date = true;
      }
      // Check authors
      if (! this.evidence.citation.authors) {
        this.evidence.citation.authors = this.pubmed.bel.authors;
      }
      else if (this.evidence.citation.authors !== this.pubmed.bel.authors) {
        this.pubmed.bel.mismatch.authors = true;
      }
      // Check refString
      if (! this.evidence.citation.name) {
        this.evidence.citation.name = this.pubmed.bel.refString;
      }
      else if (this.evidence.citation.name !== this.pubmed.bel.refString) {
        this.pubmed.bel.mismatch.refString = true;
      }
    }
  }

  async getPubmed() {
    // Get Pubmed
    if (this.evidence.citation.type === 'PubMed' && this.evidence.citation.id) {
      try {
        this.pubmed = await this.pubmedService.getPubmed(this.evidence.citation.id);
      }
      catch (err) {
        logger.error('GET Pubmed error: ', err);
      }

      this.citationPubmedChecks();
    }
  }


}

/**
 * Convert authors delimited by ';' in webpage to '|' for storage
 */
export class PipedelimValueConverter {
  toView(text) {
    if (text) {
      text = text.replace(/\|/g, ';');
    }
    return text;

  }
  fromView(text) {
    if (text) {
      text = text.replace(/\;/g, '|');
    }
    return text;
  }
}
