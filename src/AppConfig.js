import {LogManager} from 'aurelia-framework';

function extend(obj, src) {
  Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  return obj;
}

var configForLocalDev = {
  'baseUrl' : 'http://next.belframework.org/api',
  'logLevel' : LogManager.logLevel.debug
}

var configForDevelopment = {
  'baseUrl': 'http://next.belframework.org/api',
  'logLevel' : LogManager.logLevel.debug
}

var configForProduction = {
  'baseUrl': 'http://next.belframework.org/api',
  'logLevel' : LogManager.logLevel.debug
}

var appconfig ;

if (window.location.hostname==='localhost' || window.location.hostname==='openbel.dev') {
  appconfig = configForLocalDev;
}

if (window.location.hostname==='belmgr.dev.belframework.org') {
  appconfig = configForDevelopment;
}

if (window.location.hostname==='belmgr.belframework.org') {
  appconfig = configForProduction;
}

var defaults = {
  'pubmedBaseUrl' : 'http://www.ebi.ac.uk/europepmc/webservices/rest/search'
}

var Config = extend(appconfig, defaults);

console.log(Config);

export default Config;
