import {inject, bindable, LogManager} from 'aurelia-framework';
import {activationStrategy, Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as toastr from "toastr";

import {OpenbelapiService} from './resources/openbelapi-service';

let logger = LogManager.getLogger('bel-nanopub');

@bindable({name:"nanopubId", attribute:"nanopub-id"})
@inject(OpenbelapiService, Router, EventAggregator)
export class BelNanopub {

  nanopub;
  statement;
  annotationTypes;
  metadata = {
    'nanopub_notes': '', 'nanopub_status': '', 'author': '',
    'creation_date': '', 'reviewer': '', 'review_date': '',
    'nanopub_source': ''};
  submitNanopub = {};  // add back the top-level 'nanopub' key, value prior to submission
  annotations = [];
  required_field = '';

  // Needed to allow New BEL menu item to refresh the form
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  constructor(openbelapiService, router, eventAggregator) {
    this.api = openbelapiService;
    this.router = router;
    this.ea = eventAggregator;

    this.nanopub = new Nanopub();

    this.nanopubId = this.api.getIdFromUrl(window.location.href);

    this.api.getBelAnnotationTypes()
      .then(types => {
        this.annotationTypes = types;
        logger.debug('AnnotationTypes: ', this.annotationTypes);
      })
      .catch(function(reason) {
        logger.error(`GET Annotation Types: ${reason}`);
      });
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
    if (this.nanopubId) {
      // Return Promise in activate to wait until all data is collected before building
      //   the page
      return this.api.getBelNanopub(this.nanopubId)
        .then(nanopub => {
          this.nanopub = nanopub;
          this.statement = this.nanopub.bel_statement;
          this.extractFormMetadata(); // depends on this.metadata and this.nanopub
        })
        .catch(reason => {
          logger.error('Process BEL Nanopub Error: ', reason);
        });
    }
    else {
      this.nanopub = new Nanopub();
      this.pubmed = null;
      this.showPubmed = false;
    }
  }

  /**
   * Force the nanopub object to be recreated for force an update of the nested
   * object binding in the View
   */
  refreshNanopubObjBinding () {
    let temp = this.nanopub;
    this.nanopub = {};
    this.nanopub = temp;
  }

  prepareNanopub() {
    let submitNanopub = {};
    // Prepare BEL Statement
    logger.debug('Preparing Nanopub Stmt:', this.statement);
    this.nanopub.bel_statement = this.statement;

    // Remove blank entries in nanopub.experiment_context
    logger.debug('Cleaning nanopub -- context items');
    this.nanopub.experiment_context = this.nanopub.experiment_context.filter(obj => obj.value);

    // Add to Metadata
    this.addFormMetadata();

    submitNanopub = {'nanopub': this.nanopub};
    return submitNanopub;
  }

  // Add to nanopub Metadata
  //   Note - this is only for adding strings
  //   TODO - support adding objects as values
  //
  //   Extract and Add Form Metadata should be completely refactored.
  addFormMetadata() {
    if (this.nanopub.metadata) {
      // logger.debug('Metadata', this.metadata);
      for (let key in this.metadata) {
        if (key === 'key') {continue;}
        let idx = this.nanopub.metadata.findIndex(obj => obj.name === key);

        if (idx >= 0) {
          // logger.debug('Add Metadata Data Key', key, 'Val', this.metadata[key], 'Idx', idx);
          this.nanopub.metadata[idx].value = this.metadata[key];
        } else {

          // logger.debug('Add Metadata Key', key, 'Val', this.metadata[key]);

          let val = "";
          if (this.metadata[key] === undefined) {
            val = "";
          }
          else {val = this.metadata[key];}

          this.nanopub.metadata.push({'name' : key, 'value': val});
        }
      }
    }
  }

  // Copy Nanopub Metadata into form object
  extractFormMetadata() {
    for (let key in this.metadata) {
      if (key === 'key') {continue;}
      let idx = this.nanopub.metadata.findIndex(obj => obj.name === key);
      if (idx >= 0) {
        // logger.debug('Extract Metadata Key', idx, 'Val', this.nanopub.metadata[idx]['value']);
        if (this.nanopub.metadata[idx] !== undefined) {
          this.metadata[key] = this.nanopub.metadata[idx]['value'];
          // logger.debug('Loading Metadata Key', key, 'Val', this.metadata[key]);
        }
      }
    }
    // logger.debug('Created Metadata', this.metadata);
  }

  checkNanopub(nanopub) {
    if (nanopub.nanopub.citation.type && nanopub.nanopub.citation.id && nanopub.nanopub.bel_statement) {
      this.required_field = '';
      return true;
    }
    else {
      this.required_field = 'text-danger';
      return false;
    }
  }

  submitUpdate() {
    // logger.debug('Prior to prepare update nanopub', JSON.stringify(this.nanopub, null, 2));
    let submitNanopub = this.prepareNanopub();
    if (! this.checkNanopub(submitNanopub)) {
      toastr.options = {"timeOut": "15000"};
      toastr.error("Must fill out required form fields: Citation Type, Citation ID and BEL Statement");
      return true;
    }

    // logger.debug('Update nanopub', JSON.stringify(submitNanopub, null, 2));

    this.api.loadBelNanopub(submitNanopub, this.nanopubId)
    .then(response => {
      toastr.success('', 'Updated Nanopub');
      // logger.debug('After update nanopub', submitNanopub);
    })
    .catch(function(reason) {
      toastr.options = {"timeOut": "15000"};
      toastr.error('', 'Cannot update Nanopub');
      toastr.options = {"timeOut": "5000"};
      logger.error('Problem updating Nanopub ', reason);
    });

    return true;
  }

  submitNew() {
    // logger.debug('Prior to prepare new nanopub', JSON.stringify(this.nanopub, null, 2));
    let submitNanopub = this.prepareNanopub();
    if (! this.checkNanopub(submitNanopub)) {
      toastr.options = {"timeOut": "15000"};
      toastr.error("Must fill out required form fields: Citation Type, Citation ID and BEL Statement");
      logger.debug('Required_field', this.required_field);
      return true;
    }
    // logger.debug('Submit new nanopub', JSON.stringify(submitNanopub, null, 2));

    this.api.loadBelNanopub(submitNanopub)
    .then(response => {
      return response.headers.get('Location');
    })
    .then(location => {
      logger.debug('Loc: ', location);
      this.nanopubId = this.api.getIdFromUrl(location);
      logger.debug('Router: ', this.router);
      toastr.success('', 'Created New Nanopub');
      this.router.navigateToRoute('edit', { id: nanopubId });
    })
    .catch(function(reason) {
      toastr.options = {"timeOut": "15000"};
      toastr.error('', 'Cannot create new Nanopub');
      toastr.options = {"timeOut": "5000"};
      logger.error('Problem creating Nanopub ', reason);
    });

    return true;
  }

}

// this.nanopub = new Nanopub(data);   // data = nanopub from ApI call
class Nanopub {
  citation={};
  bel_statement="";
  experiment_context=[];
  support="";
  metadata=[];
  constructor(data) { // { citation: 'blue', red: 'gray' }
    Object.assign(this, data);
  }
}
