import {inject, customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {OpenbelapiService} from './resources/openbelapi-service';
import {PubmedService} from './resources/pubmed-service';

let logger = LogManager.getLogger('bel-citation');

@bindable({
  name:'evidence', //name of the property on the class
  attribute:'evidence', //name of the attribute in HTML e.g. x.bind=""
  changeHandler:'evidenceChanged', //name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
  defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('bel-citation')
@inject(OpenbelapiService, PubmedService, EventAggregator)
export class BelCitation {
  citationId;

  constructor(openbelapiService, pubmedService, eventAggregator) {
    this.api = openbelapiService;
    this.pubmedService = pubmedService;
    this.eventAggregator = eventAggregator;
  }

  // Pulling parent's context into scope
  bind(context) {
    this.$parent = context;
  }

  publish(payload) {
    this.eventAggregator.publish('pubmed', payload);
  }

  attached() {
    if (this.evidence.citation) {
      if (this.evidence.citation.id) {
        this.citationId = this.evidence.citation.id;
      }
    }
    else {
      this.evidence.citation = {};
      this.evidence.citation.type = 'PubMed';
    }

    if (this.citationId) {
      this.collectPubmed();
    }
  }

  evidenceChanged(value) {
    logger.debug('CitationChanged: ', this.evidence);
  }

  collectPubmed() {
    this.evidence.citation.id = this.citationId;

    logger.debug('Id: ', this.evidence.citation.id, ' Type: ', this.evidence.citation.type);

    // Collect Pubmed data from service
    if (this.citationId && this.evidence.citation.type === 'PubMed') {
      this.pubmedService.getPubmed(this.citationId)
        .then(pubmed => {
          this.pubmed = pubmed;
          this.citationPubmedChecks();
          this.$parent.refreshEvidenceObjBinding();

        })
        .catch(reason => {
          this.pubmed = {};
          logger.error('Collect pubmed data', reason);
        });
    }
    else {
      this.pubmed = {};
      this.$parent.pubmed = {};
    }
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
