import {inject, bindable, LogManager} from 'aurelia-framework';
import {activationStrategy, Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as toastr from "toastr";

import {OpenbelapiService} from '../resources/openbelapi-service';

let logger = LogManager.getLogger('bel-nanopub');

@bindable({name:"nanopubId", attribute:"nanopub-id"})
@inject(OpenbelapiService, Router, EventAggregator)
export class BelNanopub {

    nanopub;
    metadata = {
      'nanopub_notes': '', 'nanopub_status': '', 'author': '',
      'creation_date': '', 'reviewer': '', 'review_date': '',
      'nanopub_source': ''};
    submitNanopub = {};  // add back the top-level 'nanopub' key, value prior to submission
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
    if (this.nanopubId) {
      logger.debug('Inside loadFormData -- NanopubID: ', this.nanopubId);
      // Return Promise in activate to wait until all data is collected before building
      //   the page
      return this.api.getBelNanopub(this.nanopubId)
        .then(nanopub => {
          this.nanopub = nanopub;
          logger.debug('Nanopub: ', this.nanopub);
          this.extractFormMetadata(); // depends on this.metadata and this.nanopub
          return this.api.getBelComponents(this.nanopub.bel_statement);
        })
        .then(comp => {
          this.belSubject = comp.subject;
          this.belObject = comp.object;
          this.belRelationship = comp.relationship;
          logger.debug('Subj: ', this.belSubject);

        })
        .catch(reason => {
          logger.error('Process BEL Nanopub Error: ', reason);
        });
    }
    else {
      this.nanopub = new Nanopub();
      // this.nanopub = {};
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
    this.nanopub.bel_statement = `${this.belSubject} ${this.belRelationship} ${this.belObject}`;

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
  addFormMetadata() {
    if (this.nanopub.metadata) {
      for (let key in this.metadata) {
        let idx = this.nanopub.metadata.findIndex(obj => obj.name === key);
        if (idx >= 0) {
          this.nanopub.metadata[idx].value += this.metadata.key;
        } else {
          this.nanopub.metadata.push(
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
      let idx = this.nanopub.metadata.findIndex(obj => obj.name === k);
      if (idx >= 0) {
        this.metadata[k] = this.nanopub.metadata[idx].value;
      }
    }
  }

  submitUpdate() {
    logger.debug('Prior to prepare update nanopub', JSON.stringify(this.nanopub, null, 2));
    let submitNanopub = this.prepareNanopub();
    logger.debug('Update nanopub', JSON.stringify(submitNanopub, null, 2));
    this.api.loadBelNanopub(submitNanopub, this.nanopubId)
    .then(response => {
      toastr.success('', 'Updated Nanopub');
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
    logger.debug('Prior to prepare new nanopub', JSON.stringify(this.nanopub, null, 2));
    let submitNanopub = this.prepareNanopub();
    logger.debug('Submit new nanopub', JSON.stringify(submitNanopub, null, 2));

    this.api.loadBelNanopub(submitNanopub)
    .then(response => {
      return response.headers.get('Location');
    })
    .then(location => {
      logger.debug('Loc: ', location);
      let nanopubId = this.api.getIdFromUrl(location);
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
  citation;
  constructor(data) { // { citation: 'blue', red: 'gray' }
    Object.assign(this, data);
  }
}
