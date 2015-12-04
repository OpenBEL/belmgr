import {customElement, bindable} from 'aurelia-framework';

@customElement('experiment-context-item')
export class ExperimentContextItem {
  @bindable context;
  @bindable annotationList;
}
