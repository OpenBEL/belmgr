import {LogManager} from 'aurelia-framework';

// LogManager.setLevel(LogManager.logLevel.error);
// LogManager.setLevel(LogManager.logLevel.info);
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia) {
  aurelia.use
    .developmentLogging()
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('belmgr-plugins')
    .plugin('aurelia-configuration');

  aurelia.start().then(a => a.setRoot(''));
}


