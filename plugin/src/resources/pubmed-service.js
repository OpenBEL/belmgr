import {inject} from 'aurelia-framework';
import {PubmedClient} from './pubmed-client';

import {LogManager} from 'aurelia-framework';
let logger = LogManager.getLogger('pubmed');

@inject(PubmedClient)
export class PubmedService {

    constructor(PubmedClient) {
        this.client = PubmedClient.client;
    }

    /**
     * Get Pubmed document information - e.g. title, abstract, etc.
     *
     * @param id
     * @returns {*}
     */
    getPubmed(id) {
        let getstring = `?resulttype=core&format=json&query=ext_id:${id} src:med`;

        return this.client.fetch(getstring)
          .then(response => response.json())
          .then(data => {
              return data.resultList.result[0];
          })
          .then(pubmed => {
              if (pubmed) {
                  pubmed = this.enhancePubmed(pubmed);
              }
              return pubmed;
          })
          .catch(response => {
              logger.error(`GET Pubmed Error: `, response);
          });
    }

    enhancePubmed(pubmed) {
        pubmed.bel = {'mismatch': {'date': false, 'refString': false, 'authors': false, 'comment': false}};
        // Add reference string - e.g. J Lipid Res 2002 Jan 43(1) 2-12
        // logger.debug('isoabbreviation: ', pubmed.journalInfo.journal.isoabbreviation);
        if (pubmed.journalInfo && pubmed.journalInfo.journal && pubmed.journalInfo.journal.isoabbreviation) {
          pubmed.bel.refString = pubmed.journalInfo.journal.isoabbreviation;

          pubmed.bel.refString += `, ${pubmed.journalInfo.dateOfPublication},`;
          pubmed.bel.refString += ` ${pubmed.journalInfo.volume}`;
          if (pubmed.journalInfo.issue) {
              pubmed.bel.refString += `(${pubmed.journalInfo.issue})`;
          }
          pubmed.bel.refString += ` p:${pubmed.pageInfo}`;
        }
        else {
          pubmed.bel.refString = null;
        }

        // Adjust authors string to the BEL Nanopub format - convert ',' to '|'
        // pubmed.bel.authors = pubmed.authorString.replace(/,/g , '|').replace(/\.$/, '');  old version - authors in BEL Nanopub is now an array
        if (pubmed.authorList) {
          pubmed.bel.authors = pubmed.authorList.author.map(obj => {return obj.fullName;});
        }
        else if (pubmed.authorString) {
          pubmed.bel.authors = [pubmed.authorString];
        }
        else {
          pubmed.bel.authors = null;
        }

        return pubmed;

    }

}
