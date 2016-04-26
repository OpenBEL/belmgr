import {LogManager} from 'aurelia-framework';

LogManager.setLevel(LogManager.logLevel.debug);

let logger = LogManager.getLogger('webeditor-main');

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('belmgr-plugin')
    // .plugin('aurelia-configuration')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = true;
      config.settings.startingZIndex = 1005;
    });

  aurelia.start().then(a => a.setRoot());
}
