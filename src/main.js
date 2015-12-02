import {LogManager} from 'aurelia-framework';
// import {CustomLogAppender} from './resources/CustomLogAppender';
import {ConsoleAppender} from 'aurelia-logging-console';

import authconfig from './AuthConfig';
import {ApplicationState} from './AppState';

// LogManager.addAppender(new CustomLogAppender());
LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);
// LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // .developmentLogging()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('aurelia-auth', (baseConfig) =>{baseConfig.configure(authconfig);})
    .plugin('aurelia-dialog');

  aurelia.start().then(a => a.setRoot());
}


