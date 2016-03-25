import {LogManager} from 'aurelia-framework';

var Config = {
  'openBELApiUrl' : 'http://localhost:9292/api',
  'pubmedBaseUrl' : 'http://www.ebi.ac.uk/europepmc/webservices/rest/search',
  'logLevel' : LogManager.logLevel.info,
  'loginUrl' : 'https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile'
}

export default Config;