import {inject, LogManager} from 'aurelia-framework';
import {Api} from './resources/api';

let logger = LogManager.getLogger('import');

@inject(Api)
export class Welcome{
  heading = 'Upload your BEL Script into the BEL Evidence Repository';

  belScripts = [];

  constructor(Api) {
    this.api = Api;
  }

  upload() {
    logger.debug('File blob: ', belScripts);
    this.api.uploadBelScript(this.belScripts[0]);
  }

}
