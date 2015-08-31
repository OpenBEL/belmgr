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
    this.annotations = [];
    this.relationsList = relationsList;
    this.pubmed = null;

  }


  async activate(params) {

    logger.debug('Relation List: ', relationsList);

    if (params.id) {
      logger.debug('ID: ', params.id);
      this.evidenceId = params.id;

      // Get BEL Evidencea
      try {
        this.evidence = await this.api.getBelEvidence(this.evidenceId);
        await this.getPubmed();
        logger.debug('Evidence: ', this.evidence);
        logger.debug('PubmedAwait: ', this.pubmed);
        this.annotations = this.evidence.experiment_context;

        // Adding blank input field to allow adding new Annotations
        this.annotations.push({'name': '', 'value': ''});

        this.annotationList = await this.api.getBelAnnotations();
        logger.debug("BEL Annotations", this.annotations);
        logger.debug('AnnoList: ', this.annotationList);
      }
      catch (err) {
        logger.error('GET BEL Evidence error: ', err);
      }
    }
  }

  /**
   * Remove blank annotations (added to the end - or just annotations with empty values
   *
   * @param obj
   * @returns {boolean}
   */
  removeBlankAnnotations(obj) {
    if (obj.value) {return true;}
    else {return false;}
  }

  /**
   * Submit BEL Evidence to API
   * @returns {boolean}
   */
  submit() {
    this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
    logger.debug('Submit evidence', JSON.stringify(this.evidence,null,2));
    // this.api.loadBelEvidence(this.evidenceId, this.evidence);
    return true;
  }

  /**
   * Check for citation information mismatch or missing information for Pubmed entries
   *
   * Add Pubmed data to evidence.citation if evidence.citation information is missing
   */
  citationPubmedChecks() {
    if (this.evidence.citation.type === 'PubMed') {
      // Check date
      if (!this.evidence.citation.date) {
        this.evidence.citation.date = this.pubmed.journalInfo.printPublicationDate;
      }
      else if (this.evidence.citation.date !== this.pubmed.journalInfo.printPublicationDate) {
        this.pubmed.bel.mismatch.date = true;
      }
      // Check authors
      if (!this.evidence.citation.authors) {
        this.evidence.citation.authors = this.pubmed.bel.authors;
      }
      else if (this.evidence.citation.authors !== this.pubmed.bel.authors) {
        this.pubmed.bel.mismatch.authors = true;
      }
      // Check refString
      if (!this.evidence.citation.name) {
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
        this.citationPubmedChecks();
      }
      catch (err) {
        logger.error('GET Pubmed error: ', err);
      }
    }
  }

  /**
   * Allow deletion of Evidence Annotations/Experiment Context
   *
   * @param idx
   */
  removeAnnotation(idx) {
    this.annotations.splice(idx, 1);
  }

  /**
   * Add blank annotation to end of Annotation input allFields
   *
   * @param idx
   * @param event
   */
  addBlankAnnotation(idx, event) {
//    logger.debug('Event', event);
//    this.annotations[idx].value = event.target.value;
//    event.target.value = '';
    if (this.annotations[this.annotations.length - 1]) {
      logger.debug('Anno1: ', this.annotations);
      this.annotations.push({'name': '', 'value': ''});
      logger.debug('Anno2: ', this.annotations);
    }
  }
}

/**
 * Convert authors delimited by ';' in webpage to '|' for storage
 */
export class PipeDelimValueConverter {
  toView(text) {
    if (text) {
      text = text.replace(/\|/g, ';');
    }
    return text;
  }

  fromView(text) {
    if (text) {
      text = text.replace(/\;/g, '|');
      logger.debug('Pipe-fromView: ', text);
    }
    return text;
  }
}

/**
 * Convert Object to pretty-printed JSON string to insert into the VIEW
 * @example Insert into the View: <pre>${object | objectToString}</pre>
 */
export class ObjectToStringValueConverter {
  toView(object) {
    logger.debug('Here in Object to string converter');
    return JSON.stringify(object, null, 2);
  }
}
