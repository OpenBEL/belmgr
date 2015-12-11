import {inject, LogManager} from 'aurelia-framework';
import {Api} from './resources/api';
import * as toastr from "toastr";

let logger = LogManager.getLogger('import');

// Notes:
//    https://github.com/github/fetch
//    http://blog.gospodarets.com/fetch_in_action/
//    http://www.petermorlion.com/file-upload-with-aurelia/


@inject(Api)
export class Import{
  heading = 'Upload your BEL Script into the BEL Evidence Repository';

  belFiles;
  datasets;

  constructor(Api) {
    this.api = Api;
    logger.debug('Test');


  }

  activate() {
    return this.api.getDatasets().then(data => {
      this.datasets = data;
      logger.debug('Datasets: ', this.datasets);
    })
    .catch(function(reason) {
      logger.error(`GET import datasets Error: ${reason}`)
    });
  }

  upload() {
    logger.debug('File blob: ', this.belFiles);
    this.api.uploadBelFile(this.belFiles[0]).then(response => {
      let data = {"location": null, "msg": ''};
      if (response.ok) {
        data.location = response.headers.get("Location");
        logger.debug("Import location ", data.location);
        toastr.success('', 'Dataset Loaded');

        return this.api.getDatasets();
      }

      if (response.status === 409) {
        data.msg = "Tried to upload duplicate dataset";
        logger.debug("Import err ", data.msg);
        toastr.error(data.msg, 'Dataset Loading Error');
      }
    })
    .then(data => {
      this.datasets = data;
    })
    .catch(function(reason) {
      logger.error(`Dataset import error: ${reason}`);
    });
  }

  delete(url, idx) {

    this.api.deleteDataset(url);
    this.datasets.splice(idx, 1);
  }

}
