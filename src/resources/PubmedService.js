import {inject} from 'aurelia-framework';
import {Api} from './api';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('pubmed');

@inject(Api)
export class PubmedService {

  constructor(api) {
    this.api = api;
    this.pubmed = {};
  }

  async getPubmed(id) {

    try {
      this.pubmed = await this.api.getPubmed(id);

      // filter and enhance PubMed object
      if (this.pubmed) {this.enhancePubmed();}

      logger.debug(`PubMed ID: ${id}  Pubmed: ${this.pubmed}`);
      return this.pubmed;
    }
    catch (err) {
      logger.error('GET Pubmed error: ', err);
    }

  }

  enhancePubmed() {
    this.pubmed.bel = {'mismatch': {'date': false, 'refString': false, 'authors': false, 'comment': false}};
    // Add reference string - e.g. J Lipid Res 2002 Jan 43(1) 2-12
    this.pubmed.bel.refString = this.pubmed.journalInfo.journal.isoabbreviation;
    this.pubmed.bel.refString += `, ${this.pubmed.journalInfo.dateOfPublication},`;
    this.pubmed.bel.refString += ` ${this.pubmed.journalInfo.volume}`;
    if (this.pubmed.journalInfo.issue) {
      this.pubmed.bel.refString += `(${this.pubmed.journalInfo.issue})`;
    }
    this.pubmed.bel.refString += ` p:${this.pubmed.pageInfo}`;

    // Adjust authors string to the BEL Evidence format - convert ',' to '|'
    this.pubmed.bel.authors = this.pubmed.authorString.replace(/,/g , '|').replace(/\.$/, '');
  }

}
