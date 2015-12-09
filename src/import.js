import {inject, LogManager} from 'aurelia-framework';
import {Api} from './resources/api';

let logger = LogManager.getLogger('import');

// Notes:
//    https://github.com/github/fetch
//    http://blog.gospodarets.com/fetch_in_action/
//    http://www.petermorlion.com/file-upload-with-aurelia/


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
