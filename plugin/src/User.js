import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('User');

/* Manage user and state information

  authEnabled: determined by API endpoint (needs to be changed when one changes the API endpoint)

  apiEndpoints:  determined by either BelMgr config or captured from localStorage/Userdata repository

  selectedApiEndpoint: either localStorage/Userdata repo or first entry in apiEndpoints list

  belVersion: determined by API endpoint


  When we have an online user data repository, we'll add code here
  to get and update the user data in this module.

 */

export class User {

  authEnabled;
  apiEndpoints;
  selectedApiEndpoint;
  belVersion;

  constructor() {
    this.test = 1;
  }

}
