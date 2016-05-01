import {Configure} from 'aurelia-configuration';
import {LogManager} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('apilist');

export class ApiList{

  selectedOpenbelApiUrl
  userOpenbelApiUrls;
  addUrl;
  addUrlName;
  selectedUrl;
  selectedUrlName;

  static inject = [Configure, EventAggregator];
  constructor(config, ea) {
    this.config = config;
    this.ea = ea;

    this.getApiUrls();
  }

  storeUserApiUrls() {
    localStorage.setItem('userOpenbelApiUrls', JSON.stringify(this.userOpenbelApiUrls));
  }

  storeSelectedApiUrl() {
    localStorage.setItem('selectedOpenbelApiUrl', JSON.stringify(this.selectedOpenbelApiUrl));
  }

  addUserOpenbelApiUrl() {
    this.userOpenbelApiUrls.push({'api': this.addUrl, 'name': this.addUrlName});
    this.storeUserApiUrls();
    this.addUrl = '';
    this.addUrlName = '';
  }

  getApiUrls() {
    this.presetOpenbelApiUrls = this.config.get('openbelApiUrls');
    this.selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedOpenbelApiUrl'));
    this.userOpenbelApiUrls = JSON.parse(localStorage.getItem('userOpenbelApiUrls')) || [];

    if (! this.selectedOpenbelApiUrl) {
      this.selectedOpenbelApiUrl = this.presetOpenbelApiUrls[0];
    }
    this.updateSelectedFlag(this.selectedOpenbelApiUrl);
  }

  removeUserOpenbelApiUrl(index) {
    this.userOpenbelApiUrls.splice(index, 1);
    this.storeUserApiUrls();
  }

  setSelected(selectedUrl, selectedUrlName) {
    this.selectedOpenbelApiUrl = {'api': selectedUrl, 'name': selectedUrlName, 'selected': true};
    this.updateSelectedFlag(this.selectedOpenbelApiUrl);
    this.storeUserApiUrls();
    this.storeSelectedApiUrl();
    this.ea.publish('selectedOpenbelApiUrl', this.selectedOpenbelApiUrl);
  }

  updateSelectedFlag(selectedOpenbelApiUrl) {
    let flag = false;  // Found selected api index in user or preset endpoints

    this.userOpenbelApiUrls = this.userOpenbelApiUrls.map(function(e) {
      if (e) {
        e.selected = false;
        if (selectedOpenbelApiUrl.api == e.api) {e.selected = true; flag = true;}
        return e;
      }
    });

    if (!flag) {
      this.presetOpenbelApiUrls = this.presetOpenbelApiUrls.map(function(e) {
        if (e) {
          e.selected = false;
          if (selectedOpenbelApiUrl.api == e.api) {e.selected = true; flag = true;}
          return e;
        }
      });
    }
    if (!flag) {
      this.selectedOpenbelApiUrl.selected = true;
      this.userOpenbelApiUrls.push(this.selectedOpenbelApiUrl);
    }

    this.storeUserApiUrls();
  }

}

