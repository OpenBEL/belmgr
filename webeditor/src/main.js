import {LogManager} from 'aurelia-framework';
import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

LogManager.setLevel(LogManager.logLevel.debug);
let logger = LogManager.getLogger('webeditor-main');

export function configure(aurelia) {

  logger.debug('Before Aureli.use')

  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('aurelia-configuration');

  if (environment.debug) {
    aurelia.use.developmentLogging();
    logger.debug('Here in main.js')
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  aurelia.start().then(a => a.setRoot());
}


