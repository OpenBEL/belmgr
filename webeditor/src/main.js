import {LogManager} from 'aurelia-framework';

LogManager.setLevel(LogManager.logLevel.debug);

let logger = LogManager.getLogger('webeditor-main');

export function configure(aurelia) {
  aurelia.use
    .developmentLogging()
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('belmgr-plugins')
    .plugin('aurelia-configuration');

  aurelia.start().then(a => a.setRoot());
}


