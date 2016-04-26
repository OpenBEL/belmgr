import {LogManager} from 'aurelia-framework';

LogManager.setLevel(LogManager.logLevel.debug);

let logger = LogManager.getLogger('webeditor-main');

export function configure(aurelia) {
  aurelia.use
    .developmentLogging()
    .standardConfiguration()
    .plugin('aurelia-gravatar')
    .plugin('aurelia-animator-css')
    .plugin('belmgr-plugin')
    .plugin('aurelia-configuration')

    // todo: this is crashing the belmgr. uncomment and I get 
    // 'aurelia-templating.js:692 Uncaught (in promise) Error: A BindingLanguage must implement parseText(...)' 
    // in console:
    // .plugin('aurelia-dialog');

  aurelia.start().then(a => a.setRoot());
}


