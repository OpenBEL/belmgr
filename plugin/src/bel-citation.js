import {customElement, bindable, bindingMode, LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {OpenbelapiService} from './resources/openbelapi-service';
import {PubmedService} from './resources/pubmed-service';

let logger = LogManager.getLogger('bel-citation');

@bindable({
    name: 'nanopub', //name of the property on the class
    attribute: 'nanopub', //name of the attribute in HTML e.g. x.bind=""
    changeHandler: 'nanopubChanged', //name of the method to invoke when the property changes
    defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
    defaultValue: undefined //default value of the property, if not bound or set in HTML
})
@customElement('bel-citation')
export class BelCitation {
    lastCitationId;

    static inject = [OpenbelapiService, PubmedService, EventAggregator];
    constructor(openbelapiService, pubmedService, eventAggregator) {
        this.api = openbelapiService;
        this.pubmedService = pubmedService;
        this.ea = eventAggregator;
    }

    /**
     * Force the nanopub object to be recreated for force an update of the nested
     * object binding in the View
     */
    refreshNanopubObjBinding() {
        let temp = this.nanopub;
        this.nanopub = {};
        this.nanopub = temp;
    }

    publish(payload) {
        this.ea.publish('pubmed', payload);
        logger.debug('Publish pubmed data');
    }

    attached() {
        logger.debug('Attached Nanopub: ', this.nanopub);
    }

    nanopubChanged(value) {
        // if (this.nanopub.citation.id && !this.nanopub.citation.type) {
        //   this.nanopub.citation.type === 'PubMed';
        // }
        logger.debug('CitationChanged: ', this.nanopub);

        if (this.nanopub.citation.type &&
            this.nanopub.citation.type.toUpperCase() === 'PubMed'.toUpperCase()) {
          this.nanopub.citation.type = 'PubMed';
          // logger.debug('Is type pubmed? ', this.nanopub.citation.type );
        }
        if (!this.nanopub.citation.type) {
          this.nanopub.citation.type = 'PubMed';
          // logger.debug('Is type set? ', this.nanopub.citation.type );
        }
        if (this.nanopub.citation.id != this.lastCitationId) {
          this.lastCitationId = this.nanopub.citation.id;
          this.collectPubmed();
        }
    }

    collectPubmed() {
        // Collect Pubmed data from service
        if (this.nanopub.citation.id && this.nanopub.citation.type === 'PubMed') {
            this.pubmedService.getPubmed(this.nanopub.citation.id)
              .then(pubmed => {
                  this.pubmed = pubmed;
                  if (this.nanopub.citation.id === this.lastCitationId) {
                      this.citationPubmedChecks();
                  } else {  // replace citation data if new CitationId
                    if (this.pubmed.journalInfo && this.pubmed.journalInfo.printPublicationDate) {
                      this.nanopub.citation.date = this.pubmed.journalInfo.printPublicationDate;
                    }
                    this.nanopub.citation.authors = this.pubmed.bel.authors;
                    this.nanopub.citation.name = this.pubmed.bel.refString;
                  }
                  this.refreshNanopubObjBinding();
                  this.publish(pubmed);
              })
              .catch(reason => {
                  this.pubmed = {};
                  logger.error('Collect pubmed data', reason);
              });
        } else {
            logger.debug('Else collectPubmed');
            this.pubmed = {};
        }
    }


    /**
     * Check for citation information mismatch or missing information for Pubmed entries
     *
     * Add Pubmed data to nanopub.citation if nanopub.citation information is missing
     */
    citationPubmedChecks() {
        if (this.nanopub.citation.type === 'PubMed') {
            // Check date
            let printdate = null;
            if (this.pubmed.journalInfo && this.pubmed.journalInfo.printPublicationDate) {
              printdate = this.pubmed.journalInfo.printPublicationDate;
            }
            if (!this.nanopub.citation.date) {
                  this.nanopub.citation.date = printdate;}
            else if (this.nanopub.citation.date !== printdate) {
                this.pubmed.bel.mismatch.date = true;
            }
            // Check authors
            if (!this.nanopub.citation.authors) {
                this.nanopub.citation.authors = this.pubmed.bel.authors;
            } else if (this.nanopub.citation.authors !== this.pubmed.bel.authors) {
                this.pubmed.bel.mismatch.authors = true;
            }
            // Check refString
            if (!this.nanopub.citation.name) {
                this.nanopub.citation.name = this.pubmed.bel.refString;
            } else if (this.nanopub.citation.name !== this.pubmed.bel.refString) {
                this.pubmed.bel.mismatch.refString = true;
            }
        }
    }

    // Todo: convert replace* methods with getter/setters after making sure they will update the View correctly

    /**
     * Replace nanopub citation date with newval
     * @param newval
     */
    replaceCitationDate(newval) {
        this.nanopub.citation.date = newval;
        this.pubmed.bel.mismatch.date = false;
        this.refreshNanopubObjBinding();
    }

    /**
     * Replace nanopub citation name with newval
     * @param newval
     */
    replaceCitationName(newval) {
        this.nanopub.citation.name = newval;
        this.pubmed.bel.mismatch.refString = false;
        this.refreshNanopubObjBinding();
    }

    /**
     * Replace nanopub citation authors with newval
     * @param newval
     */
    replaceCitationAuthors(newval) {
        this.nanopub.citation.authors = newval;
        this.pubmed.bel.mismatch.authors = false;
        this.refreshNanopubObjBinding();
    }

}
