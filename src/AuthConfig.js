import Config from './AppConfig';

let baseUrl = Config.baseUrl;

function extend(obj, src) {
  Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  return obj;
}

var configForLocalDev = {
  'loginUrl': 'login',
  'signupUrl': '/#signup',
  'profileUrl'    : '/#user/me'
}

var configForDevelopment = {
  'loginUrl': 'http',
  'signupUrl': '/signup',
  'profileUrl'    : '/#user/me'
}

var configForProduction = {
  'loginUrl': 'http',
  'signupUrl': '/signup',
  'profileUrl'    : '/#user/me'
}

var config = configForLocalDev;

if (window.location.hostname==='localhost' || window.location.hostname==='openbel.dev') {
  config = configForLocalDev;
}
if (window.location.hostname==='belmgr.dev.belframework.org') {
  config = configForDevelopment;
}

if (window.location.hostname==='belmgr.stage.belframework.org') {
  config = configForStage;
}

if (window.location.hostname==='belmgr.belframework.org') {
  config = configForProduction;
}

var defaults = {
  'storage'       : 'sessionStorage',
  'loginRedirect' : '/#search',
  'logoutRedirect': '/',
  'loginOnSignup' : true
}

var authconfig = extend(config, defaults);

export default authconfig;
