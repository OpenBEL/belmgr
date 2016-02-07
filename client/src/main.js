import {LogManager} from 'aurelia-framework';
import Config from 'local-plugin/AppConfig';

LogManager.setLevel(Config.logLevel);

export function configure(aurelia) {
  aurelia.use
    .developmentLogging()
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .feature('local-plugin');

  aurelia.start().then(a => a.setRoot());
}


