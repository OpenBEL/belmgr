import {LogManager} from 'aurelia-framework';
import {OpenbelapiService} from 'belmgr-plugins';

let logger = LogManager.getLogger('app');

export class App {

  evidence = {
    bel_statement: "kin(p(HGNC:SRC)) directlyIncreases p(HGNC:TRIP6,pmod(P,Y,55))",
    bel_statement_subject: "kin(p(HGNC:SRC))",
    bel_statement_relationship: "directlyIncreases",
    bel_statement_object: "p(HGNC:TRIP6,pmod(P,Y,55))",
    citation: {
      type: "PubMed",
      name: "J Biol Chem 2007 Jun 25",
      id: "17591779",
      date: "",
      authors: [],
      comment: ""
    },
    summary_text: "LPA stimulation targets TRIP6 to the focal adhesion complexes and promotes c-Src-dependent phosphorylation of TRIP6 at Tyr-55, which creates a docking site for the Crk SH2 domain, thereby promoting LPA-induced morphological changes and cell migration. ",
    experiment_context: [
      {
        name: "Species",
        value: "9606"
      }
    ],
    metadata: [
      {
        name: "document_header",
        value: {
          Name: "BEL Framework Large Corpus Document",
          Description: "Approximately 61,000 statements.",
          Version: "20150611",
          Copyright: "Copyright (c) 2011-2015, Selventa. All rights reserved.",
          Authors: "Selventa",
          Licenses: "Creative Commons Attribution-Non-Commercial-ShareAlike 3.0 Unported License",
          ContactInfo: "support@belframework.org"
        }
      },
      {
        name: "dataset",
        value: "BEL Framework Large Corpus Document/20150611"
      }
    ]
  };

  static inject = ['OpenbelapiService'];
  constructor(openbelapiService) {
    this.api = openbelapiService;
  }


}
