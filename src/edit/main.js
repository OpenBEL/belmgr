import {inject, LogManager} from 'aurelia-framework';
import {activationStrategy, Router} from 'aurelia-router';

import {Api} from '../resources/api';
import {relationsList} from '../resources/relationsList';
import {PubmedService} from '../resources/PubmedService';

import {Prompt} from '../components/dialogs/prompt';
import {DialogService} from 'aurelia-dialog';

let logger = LogManager.getLogger('edit');

@inject(Api, PubmedService, DialogService, Router)
export class Edit {

    evidenceId = null;
    citationId = null;
    evidence = {};
    metadata = {
      'evidence_notes': '', 'evidence_status': '', 'author': '',
      'creation_date': '', 'reviewer': '', 'review_date': '',
      'evidence_source': ''};
    submitEvidence = {};  // add back the top-level 'evidence' key, value prior to submission
    annotations = [];
    relationsList = relationsList;
    pubmed = null;

  // Needed to allow New BEL menu item to refresh the form
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(Api, PubmedService, DialogService, Router) {
    this.api = Api;
    this.pubmedService = PubmedService;
    this.dialogService = DialogService;
    this.router = Router;
  }

  async activate(params) {

    logger.debug('Relation List: ', relationsList);

    if (params.id) {
      logger.debug('ID: ', params.id);
      this.evidenceId = params.id;

      // Get BEL Evidence
      try {
        this.evidence = await this.api.getBelEvidence(this.evidenceId);
        this.extractFormMetadata();

        this.types = await this.api.getBelAnnotationTypes();
        logger.debug('AnnotationTypes: ', this.types);

        logger.info('BEL Statement: ', this.evidence);
        // this.belComponents = await this.api.getBelComponents(this.evidence.bel_statement);

        this.citationId = this.evidence.citation.id;

        logger.debug('Bel components: ', this.belComponents);
        await this.getPubmed();

        logger.debug('Evidence: ', this.evidence);
        logger.debug('PubmedAwait: ', this.pubmed);
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

  prepareEvidence() {
    // Prepare BEL Statement
    this.evidence.bel_statement = `${this.evidence.bel_subject} ${this.evidence.bel_relationship} ${this.evidence.bel_object}`;

    // Remove blank entries in evidence.experiment_context
    logger.debug('Cleaning evidence -- context items');
    this.evidence.experiment_context = this.evidence.experiment_context.filter(obj => obj.value);

    // Add to Metadata
    this.addFormMetadata();

    this.submitEvidence = {'evidence': this.evidence};
  }

  // Add to evidence Metadata
  //   Note - this is only for adding strings
  //   TODO - support adding objects as values
  addFormMetadata() {
    for (let key in this.metadata) {
      let idx = this.evidence.metadata.findIndex(obj => obj.name === key);
      if (idx >= 0) {
        this.evidence.metadata[idx].value += this.metadata.key;
      } else {
        this.evidence.metadata.push(
          {
            'name' : key,
            'value': this.metadata[key]
          });
      }
    }
  }

  extractFormMetadata() {
    for (let k in this.metadata) {
      let idx = this.evidence.metadata.findIndex(obj => obj.name === k);
      if (idx >= 0) {
        this.metadata[k] = this.evidence.metadata[idx].value;
      }
    }
  }

  /**
   * Submit BEL Evidence to API
   * @returns {boolean}
   */

  // TODO test this
  submit() {
    let prompt = 'This will update the Evidence!';
    this.dialogService.open({ viewModel: Prompt, model: prompt}).then(response => {
      if (!response.wasCancelled) {
        logger.debug('approvedPrompt');
        this.submitUpdate;
      } else {
        logger.debug('cancelledPrompt');
      }
      logger.debug(response.output);
    });
    return true;
  }

  // TODO  Add notification of successful update or new evidence
  submitUpdate() {
    this.prepareEvidence();
    logger.debug('Submit evidence', JSON.stringify(this.submitEvidence, null, 2));
    this.api.loadBelEvidence(this.submitEvidence, this.evidenceId);
    return true;
  }

  submitNew() {
    this.prepareEvidence();
    logger.debug('Submit evidence', JSON.stringify(this.submitEvidence, null, 2));

    this.api.loadBelEvidence(this.submitEvidence)
    .then(location => {
      logger.debug('Loc: ', location);
      let evidenceId = this.api.getEvidenceId(location);
      logger.debug('Router: ', this.router);
      this.router.navigateToRoute('edit', { id: evidenceId });
    })
    .catch(function(reason) {
      logger.error(`Cannot reset: ${reason}`)
    });

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
