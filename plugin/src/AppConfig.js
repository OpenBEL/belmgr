import {LogManager} from 'aurelia-framework';

var Configure = {
  'openBELApiUrl': 'https://thor/api',
  // 'openBELApiUrl' : 'http://next.belframework.org/api',
  // 'openBELApiUrl' : 'http://localhost:9292/api',
  // http://www.ebi.ac.uk/europepmc/webservices/rest/search?resulttype=core&query=ext_id:26793686 src:med
  'pubmedBaseUrl' : 'http://www.ebi.ac.uk/europepmc/webservices/rest/search',
  // append to loginUrl:  &redirect_uri=http://belmgr.belframework.org&state=#/search'
  'loginUrl' : 'https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile',

  'tokenStorageName' : 'BELMgrToken',
  'tokenHeaderName' : 'Authorization',

  'logLevel' : LogManager.logLevel.debug
}

export default Configure;
