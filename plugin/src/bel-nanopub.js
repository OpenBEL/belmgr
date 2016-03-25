import {inject, bindable, LogManager} from 'aurelia-framework';
import {activationStrategy, Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as toastr from "toastr";

import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('bel-nanopub');

@bindable({name:"evidenceId", attribute:"evidence-id"})
@inject(OpenbelapiService, Router, EventAggregator)
export class BelNanopub {

    evidence;
    metadata = {
      'evidence_notes': '', 'evidence_status': '', 'author': '',
      'creation_date': '', 'reviewer': '', 'review_date': '',
      'evidence_source': ''};
    submitEvidence = {};  // add back the top-level 'evidence' key, value prior to submission
    annotations = [];

  // Needed to allow New BEL menu item to refresh the form
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(openbelapiService, router, eventAggregator) {
    this.api = openbelapiService;
    this.router = router;
    this.ea = eventAggregator;
  }

  bind() {
    this.loadFormData();
  }

  attached() {
    this.subscription = this.ea.subscribe('pubmed', payload => {
      // logger.debug('Received payload: ', payload);
      this.pubmed = payload;
      this.showPubmed = true;
    });
  }

  detached() {
    this.subscription.dispose();
  }


  loadFormData() {
    logger.debug('In load form data');
    if (this.evidenceId) {
      logger.debug('Inside loadFormData -- EvidenceID: ', this.evidenceId);
      // Return Promise in activate to wait until all data is collected before building
      //   the page
      return this.api.getBelEvidence(this.evidenceId)
        .then(evidence => {
          this.evidence = evidence;
          logger.debug('Evidence: ', this.evidence);
          this.extractFormMetadata(); // depends on this.metadata and this.evidence
          return this.api.getBelComponents(this.evidence.bel_statement);
        })
        .then(comp => {
          this.belSubject = comp.subject;
          this.belObject = comp.object;
          this.belRelationship = comp.relationship;
          logger.debug('Subj: ', this.belSubject);

        })
        .catch(reason => {
          logger.error('Process BEL Evidence Error: ', reason);
        });
    }
    else {
      this.evidence = new Evidence();
      // this.evidence = {};
      return this.api.getBelAnnotationTypes()
            .then(types => {
              this.types = types;
              logger.debug('AnnotationTypes: ', this.types);
            })
            .catch(function(reason) {
              logger.error(`GET Annotation Types: ${reason}`);
            });
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
    let submitEvidence = {};
    // Prepare BEL Statement
    this.evidence.bel_statement = `${this.belSubject} ${this.belRelationship} ${this.belObject}`;

    // Remove blank entries in evidence.experiment_context
    logger.debug('Cleaning evidence -- context items');
    this.evidence.experiment_context = this.evidence.experiment_context.filter(obj => obj.value);

    // Add to Metadata
    this.addFormMetadata();

    submitEvidence = {'evidence': this.evidence};
    return submitEvidence;
  }

  // Add to evidence Metadata
  //   Note - this is only for adding strings
  //   TODO - support adding objects as values
  addFormMetadata() {
    if (this.evidence.metadata) {
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
  }

  extractFormMetadata() {
    for (let k in this.metadata) {
      let idx = this.evidence.metadata.findIndex(obj => obj.name === k);
      if (idx >= 0) {
        this.metadata[k] = this.evidence.metadata[idx].value;
      }
    }
  }

  submitUpdate() {
    logger.debug('Prior to prepare update evidence', JSON.stringify(this.evidence, null, 2));
    let submitEvidence = this.prepareEvidence();
    logger.debug('Update evidence', JSON.stringify(submitEvidence, null, 2));
    this.api.loadBelEvidence(submitEvidence, this.evidenceId)
    .then(response => {
      toastr.success('', 'Updated Evidence');
    })
    .catch(function(reason) {
      toastr.options = {"timeOut": "15000"};
      toastr.error('', 'Cannot update Evidence');
      toastr.options = {"timeOut": "5000"};
      logger.error('Problem updating Evidence ', reason);
    });

    return true;
  }

  submitNew() {
    logger.debug('Prior to prepare new evidence', JSON.stringify(this.evidence, null, 2));
    let submitEvidence = this.prepareEvidence();
    logger.debug('Submit new evidence', JSON.stringify(submitEvidence, null, 2));

    this.api.loadBelEvidence(submitEvidence)
    .then(response => {
      return response.headers.get('Location');
    })
    .then(location => {
      logger.debug('Loc: ', location);
      let evidenceId = this.api.getIdFromUrl(location);
      logger.debug('Router: ', this.router);
      toastr.success('', 'Created New Evidence');
      this.router.navigateToRoute('edit', { id: evidenceId });
    })
    .catch(function(reason) {
      toastr.options = {"timeOut": "15000"};
      toastr.error('', 'Cannot create new Evidence');
      toastr.options = {"timeOut": "5000"};
      logger.error('Problem creating Evidence ', reason);
    });

    return true;
  }

}

// this.evidence = new Evidence(data);   // data = evidence from ApI call
class Evidence {
  citation;
  constructor(data) { // { citation: 'blue', red: 'gray' }
    Object.assign(this, data);
  }
}
