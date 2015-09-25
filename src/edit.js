import {inject} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';

import {Api} from './resources/api';
import {relationsList} from './relationsList';
import {PubmedService} from './resources/PubmedService';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('edit');


@inject(Api, PubmedService)
export class Edit {

  // Needed to allow New BEL menu item to refresh the form
  determineActivationStrategy(){
    return activationStrategy.replace;
  }

  constructor(Api, PubmedService) {
    this.api = Api;
    this.pubmedService = PubmedService;
    this.evidenceId = null;
    this.citationId = null;
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

      // Get BEL Evidence
      try {
        this.data = await this.api.getBelEvidence(this.evidenceId);
        this.evidence = this.data.evidence;
        logger.info('BEL Statement: ', this.evidence);
        this.belComponents = await this.api.getBelComponents(this.evidence.bel_statement);

        this.citationId = this.evidence.citation.id;

        logger.debug('BC: ', this.belComponents);
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
   * Force the evidence object to be recreated for force an update of the nested
   * object binding in the View
   */
  refreshEvidenceObjBinding () {
    let temp = this.evidence;
    this.evidence = {};
    this.evidence = temp;
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
    this.evidence.bel_statement = `${this.belComponents.subject} ${this.belComponents.relationship} ${this.belComponents.object}`;
    this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
    this.evidence.citation.id = this.citationId;
    this.data.evidence[0] = this.evidence;
    logger.debug('Submit evidence', JSON.stringify(this.data,null,2));
    this.api.loadBelEvidence(this.evidence, this.evidenceId);
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
    if (this.citationId && this.evidence.citation.type === 'PubMed') {
      try {
        this.pubmed = await this.pubmedService.getPubmed(this.citationId);
        if (this.pubmed) {this.citationPubmedChecks();}
        else {
          this.evidence.citation = {};
        }

        this.refreshEvidenceObjBinding();
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
    if (this.annotations[this.annotations.length - 1]) {
      this.annotations.push({'name': '', 'value': ''});
    }
  }


  // Todo: convert replace* methods with getter/setters after making sure they will update the View correctly

  /**
   * Replace evidence citation date with newval
   * @param newval
   */
  replaceCitationDate(newval) {
    this.evidence.citation.date = newval;
    this.pubmed.bel.mismatch.date = false;
    this.refreshEvidenceObjBinding();
  }

  /**
   * Replace evidence citation date with newval
   * @param newval
   */
  replaceCitationName(newval) {
    this.evidence.citation.name = newval;
    this.pubmed.bel.mismatch.refString = false;
    this.refreshEvidenceObjBinding();
  }

  /**
   * Replace evidence citation date with newval
   * @param newval
   */
  replaceCitationAuthors(newval) {
    this.evidence.citation.authors = newval;
    this.pubmed.bel.mismatch.authors = false;
    this.refreshEvidenceObjBinding();
  }

}

/**
 * Convert authors delimited by ';' in webpage to '|' for storage
 *
 * use it in the View as ' | pipeDelim'
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
 * Convert author array to from text string delimited by ';'
 *
 * use it in the View as ' | stringToArray'
 */
export class StringToArrayValueConverter {
  toView(array) {
    let text = "";
    if (array) {
      text = array.join('; ');
    }
    return text;
  }
  fromView(text) {
    let array = [];
    if (text) {
    array = text.split('; ');
    }
    return array;
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


// // AURELIA DIALOG TRY 
import {EditPerson} from 'editperson';
import {DialogService} from 'aurelia-dialog';
export class Welcome {
  static inject = [DialogService];
  constructor(dialogService) {
    this.dialogService = dialogService;
  }
  person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };
  submit(){
    this.dialogService.open({ viewModel: EditPerson, model: this.person}).then(response => {
      if (!response.wasCancelled) {
        console.log('good');
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }
}