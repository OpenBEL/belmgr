import {inject, LogManager} from 'aurelia-framework';
import {Api} from './resources/api';

let logger = LogManager.getLogger('import');

// Notes:
//    https://github.com/github/fetch
//    http://blog.gospodarets.com/fetch_in_action/
//    http://www.petermorlion.com/file-upload-with-aurelia/


@inject(Api)
export class Import{
  heading = 'Upload your BEL Script into the BEL Evidence Repository';

  belFiles;

  constructor(Api) {
    this.api = Api;
  }

  upload() {
    logger.debug('File blob: ', this.belFiles);
    this.api.uploadBelFile(this.belFiles[0]).then(response => {
      let data = {"location": null, "msg": ''};
      if (response.ok) {
        data.location = response.headers.get("Location");
        logger.debug("Import location ", data.location);
      }

      if (response.status === 409) {
        data.msg = "Tried to upload duplicate dataset";
        logger.debug("Import err ", data.msg);
      }
    });
  }

}
