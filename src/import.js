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
    // logger.debug('File blob: ', this.belFiles);
    this.api.uploadDataset(this.belFiles[0]).then(response => {
      let data = {"location": null, "msg": ''};
      if (response.ok) {
        data.location = response.headers.get("Location");
        // logger.debug("Import location ", data.location);
        toastr.success('', 'Dataset Loaded');

        this.api.getDatasets().then(data => {this.datasets = data;});

      }
    })
    .catch(response => {
      if (response.status === 409) {
        return response.json();
      }
    })
    .then(json => {
      // logger.debug("JSON ", json);
      toastr.options = {"timeOut": "15000"};
      toastr.error(json.msg, 'Duplicate Dataset');
      toastr.options = {"timeOut": "5000"};
    })
    .catch(res => {
      logger.error(`Dataset import error: `, res);
    });

  }

  delete(url, idx) {

    this.api.deleteDataset(url);
    this.datasets.splice(idx, 1);
  }

}
