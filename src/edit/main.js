import {inject} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';

import {Api} from '../resources/api';
import {relationsList} from '../resources/relationsList';
import {PubmedService} from '../resources/PubmedService';

import {Prompt} from '../components/dialogs/prompt';
import {DialogService} from 'aurelia-dialog';

import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('edit');


@inject(Api, PubmedService, DialogService)
export class Edit {

  // Needed to allow New BEL menu item to refresh the form
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(Api, PubmedService, DialogService) {
    this.api = Api;
    this.pubmedService = PubmedService;
    this.evidenceId = null;
    this.citationId = null;
    this.evidence = {};
    this.annotations = [];
    this.relationsList = relationsList;
    this.pubmed = null;
    this.dialogService = DialogService;
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

        logger.debug('BEL Experiment Context', this.experimentContext);
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
   * Submit BEL Evidence to API
   * @returns {boolean}
   */

  submit() {
    let prompt = 'This will update the Evidence!';
    this.dialogService.open({ viewModel: Prompt, model: prompt}).then(response => {
      if (!response.wasCancelled) {
        console.log('approvedPrompt');
        this.submitUpdate;
      } else {
        console.log('cancelledPrompt');
      }
      console.log(response.output);
    });
    return true;
  }

  submitUpdate() {
    this.evidence.bel_statement = `${this.belComponents.subject} ${this.belComponents.relationship} ${this.belComponents.object}`;
    this.evidence.experiment_context = this.annotations.filter(this.removeBlankExperimentContext);
    this.evidence.citation.id = this.citationId;
    this.data.evidence[0] = this.evidence;
    logger.debug('Submit evidence', JSON.stringify(this.data,null,2));
    this.api.loadBelEvidence(this.evidence, this.evidenceId);
    return true;
  }

  submitNew() {
    this.evidence.bel_statement = `${this.belComponents.subject} ${this.belComponents.relationship} ${this.belComponents.object}`;
    this.evidence.experiment_context = this.annotations.filter(this.removeBlankExperimentContext);
    this.evidence.citation.id = this.citationId;
    this.data.evidence[0] = this.evidence;
    logger.debug('Submit evidence', JSON.stringify(this.data,null,2));
    this.api.loadBelEvidence(this.evidence);
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
