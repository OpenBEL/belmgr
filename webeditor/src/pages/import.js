import { LogManager } from 'aurelia-framework';
import { OpenbelapiService } from 'belmgr-plugin/resources/openbelapi-service';
import { Authentication } from 'belmgr-plugin/resources/authentication';
import * as toastr from "toastr";

let logger = LogManager.getLogger('import');

// Notes:
//    https://github.com/github/fetch
//    http://blog.gospodarets.com/fetch_in_action/
//    http://www.petermorlion.com/file-upload-with-aurelia/


export class Import {
    heading = 'Upload your BEL Script into the BEL Evidence Repository';

    belFiles;
    datasets;
    tokenParam;
    loading = false; // todo set a spinner state while loading dataset
    uploadFn = '';

    static inject = [OpenbelapiService, Authentication];
    constructor(openbelapiService, authentication) {
        this.api = openbelapiService;
        this.auth = authentication;
    }

    // TODO test authenticated download of datasets
    activate() {
        let token = this.auth.getToken();
        if (token) {
            this.tokenParam = '&token=' + token;
        }

        return this.api.getDatasets().then(data => {
                this.datasets = data;
                logger.debug('Datasets: ', this.datasets);

            })
            .catch(function(reason) {
                logger.error(`GET import datasets Error: ${reason}`)
            });
    }

    upload() {
        this.loading = true;
        logger.debug('Loading: ', this.loading);

        // logger.debug('File blob: ', this.belFiles);
        this.api.uploadDataset(this.belFiles[0]).then(response => {
                let data = { "location": null, "msg": '' };
                if (response.ok) {
                    data.location = response.headers.get("Location");
                    // logger.debug("Import location ", data.location);
                    toastr.success('', 'Dataset Loaded');

                    this.api.getDatasets().then(data => {
                        this.datasets = data;
                    });
                }
                this.loading = false;
            })
            .catch(response => {
                if (response.status === 409) {
                    let json = response.json();
                    // logger.debug("JSON ", json);
                    toastr.options = { "timeOut": "15000" };
                    toastr.error(json.msg, 'Duplicate Dataset');
                    toastr.options = { "timeOut": "5000" };
                } else {
                    logger.error('Problem loading dataset ', response);
                }
                this.loading = false;
            });
        logger.debug('Loading: ', this.loading);

    }

    delete(url, idx) {
        this.api.deleteDataset(url);
        this.datasets.splice(idx, 1)
        var deleteModal = document.getElementById('deleter');
        deleteModal.setAttribute('class', 'modal fade');
    }

    belFilesChanged() {
        logger.debug('belFilesChanged belfiles ', this.belFiles);
        if (this.belFiles) {
            this.uploadFn = this.belFiles[0].name;
            logger.debug('fn: ', this.uploadFn);
        } else {
            this.uploadFn = 'select files:';
            logger.debug('Upload file DB', this.uploadFn);
        }
    }

    deleteConfiramtion() {
        var getModal = document.getElementById(deleter);
        var deleteModal = document.getElementById('deleter');
        deleteModal.setAttribute('class', 'modal fade in');
    }

    closeDeleter() {
        var deleteModal = document.getElementById('deleter');
        deleteModal.setAttribute('class', 'modal fade');
    }
}
