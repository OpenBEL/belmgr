import {LogManager} from 'aurelia-framework';
import {CustomLogAppender} from './resources/custom-log-appender';

LogManager.addAppender(new CustomLogAppender());
LogManager.setLevel(LogManager.logLevel.debug);
// LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia) {

  aurelia.use
    .standardConfiguration()
//    .developmentLogging()
    .plugin('aurelia-validation')
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
