import {inject} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PubmedService} from './resources/pubmed-service';

// Subscribed to the 'pubmed' EventAggregator channel for the pubmed content
//   needed for this component

let logger = LogManager.getLogger('pubmed-customelement');

@inject(EventAggregator, PubmedService)
export class Pubmed {
  pubmed;

  constructor(eventAggregator, pubmedService) {
    this.ea = eventAggregator;
    this.pubmedService = pubmedService;
  }

  attached() {
      this.subscription = this.ea.subscribe('pubmed', pubmed => {
      // logger.debug('Received Payload: ', payload);
      this.pubmed = pubmed;
      // if (!this.pubmed.title) {
      //   this.pubmed = this.pubmedService.getPubMed(this.pubmed.id);
      // }
    });
  }

  detached() {
    this.subscription.dispose();
  }

}
