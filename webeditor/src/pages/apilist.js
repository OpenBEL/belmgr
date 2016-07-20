import {Configure} from 'aurelia-configuration';
import {LogManager, BindingEngine} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('apilist');

export class ApiList{
  presetAPIs;
  userAPIs;
  selectedAPI;

  userEnteredURL;
  userEnteredAPIName;

  static inject = [Configure, EventAggregator];
  constructor(config, ea) {
    this.config = config;
    this.ea = ea;

    this.presetAPIs = this.config.get('openbelApiUrls');
    this.userAPIs = [];
    var storedUserAPIs = localStorage.getItem('userAPIs');
    if (storedUserAPIs) {
      try {
          this.userAPIs = JSON.parse(storedUserAPIs);
      } catch (e) {
          // couldn't parse as JSON, remove it
          localStorage.removeItem('userAPIs');
      }
    }

    var storedSelectedAPIJSON = localStorage.getItem('selectedAPI');
    var storedSelectedAPI = null;
    if (storedSelectedAPIJSON) {
      try {
        storedSelectedAPI = JSON.parse(storedSelectedAPIJSON);
      } catch (e) {
          // couldn't parse as JSON, remove it
          localStorage.removeItem('selectedAPI');
      }
    }

    if (storedSelectedAPI === null) {
      // set a default
      this.selectedAPI = this.presetAPIs[0];
    } else {
      // is the stored selected API still valid?
      let selectedName = storedSelectedAPI.name;
      let selectedURL = storedSelectedAPI.api;
      for (const apiobj of [...this.presetAPIs, ...this.userAPIs]) {
        let aoName = apiobj.name;
        let aoURL = apiobj.api;
        if (aoName == selectedName && aoURL == selectedURL) {
          // found it, restore the selection
          this.selectedAPI = apiobj;
          break;
        }
      }
    }
    this.store();
  }

  changedAPI(apiobj) {
    this.store();
    this.ea.publish('selectedOpenbelApiUrl', apiobj);
  }

  addUserAPI() {
    var api = {api: this.userEnteredURL, name: this.userEnteredAPIName};
    this.userAPIs.push(api);
    this.store();
    this.userEnteredURL = '';
    this.userEnteredAPIName = '';
  }

  removeUserAPI(index) {
    this.userAPIs.splice(index, 1);
    this.store();
  }

  store() {
    localStorage.setItem('userAPIs', JSON.stringify(this.userAPIs));
    localStorage.setItem('selectedAPI', JSON.stringify(this.selectedAPI));
  }

}
