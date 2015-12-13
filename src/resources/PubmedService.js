import {inject} from 'aurelia-framework';
import {Api} from './api';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('pubmed');

@inject(Api)
export class PubmedService {

  constructor(api) {
    this.api = api;
  }

  getPubmed(id) {

    return this.api.getPubmed(id)
      .then(pubmed => {
        pubmed = this.enhancePubmed(pubmed);
        return pubmed;
      })
      .catch(function(reason) {
        logger.error('Collect pubmed error: ', reason)
      });
  }

  enhancePubmed(pubmed) {
    pubmed.bel = {'mismatch': {'date': false, 'refString': false, 'authors': false, 'comment': false}};
    // Add reference string - e.g. J Lipid Res 2002 Jan 43(1) 2-12
    pubmed.bel.refString = pubmed.journalInfo.journal.isoabbreviation;
    pubmed.bel.refString += `, ${pubmed.journalInfo.dateOfPublication},`;
    pubmed.bel.refString += ` ${pubmed.journalInfo.volume}`;
    if (pubmed.journalInfo.issue) {
      pubmed.bel.refString += `(${pubmed.journalInfo.issue})`;
    }
    pubmed.bel.refString += ` p:${pubmed.pageInfo}`;

    // Adjust authors string to the BEL Evidence format - convert ',' to '|'
    // pubmed.bel.authors = pubmed.authorString.replace(/,/g , '|').replace(/\.$/, '');  old version - authors in BEL Evidence is now an array
    pubmed.bel.authors = pubmed.authorList.author.map(obj => {return obj.fullName;});

    return pubmed;

  }

}
