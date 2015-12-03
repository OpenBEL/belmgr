import {LogManager} from 'aurelia-framework';
// import {CustomLogAppender} from './resources/CustomLogAppender';
import {ConsoleAppender} from 'aurelia-logging-console';

import authconfig from './AuthConfig';
import {ApplicationState} from './AppState';
import Config from './AppConfig';

// LogManager.addAppender(new CustomLogAppender());
LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(Config.logLevel);

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('aurelia-auth', (baseConfig) =>{baseConfig.configure(authconfig);})
    .plugin('aurelia-dialog');

  aurelia.start().then(a => a.setRoot());
}


