import {LogManager} from 'aurelia-framework';

var Config = {
  'OpenBELApiUrl' : 'http://next.belframework.org/api',
  'pubmedBaseUrl' : 'http://www.ebi.ac.uk/europepmc/webservices/rest/search',
  'logLevel' : LogManager.logLevel.debug,
  'loginUrl' : 'https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile',
  'tokenStorageName' : 'BELMgrToken',
  'tokenHeaderName' : 'Authorization',
}

export default Config;
