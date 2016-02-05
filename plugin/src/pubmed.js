import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PubmedService} from './resources/pubmed-service';

@inject(EventAggregator, PubmedService)
export class Pubmed {
  pubmed;

  constructor(EventAggregator, PubmedService) {
    this.eventAggregator = eventAggregator;
    this.pubmedService = PubmedService;
  }

  subscribe() {
    this.eventAggregator.subscribe('pubmed', payload => {
      this.pubmed = payload;
      if (!this.pubmed.title) {
        this.pubmed = this.pubmedService.getPubMed(this.pubmed.id);
      }
    });
  }
}
