import {inject, bindable, bindingMode, LogManager, customElement} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';
import {Api} from '../resources/api';

let logger = LogManager.getLogger('contextitem');

@inject(Api, TaskQueue)
@customElement('ci')
@bindable({
  name:'index', //name of the property on the class
  attribute:'index', //name of the attribute in HTML e.g. x.bind=""
  defaultBindingMode: bindingMode.twoWay, //default binding mode used with the .bind command
})
export class ContextItem {
  @bindable index;
  @bindable last;

  constructor(Api, TaskQueue){
    this.api = Api;
    this.taskQueue = TaskQueue;


  }

  attached() {
    logger.debug('Index: ', this.index);
    logger.debug('Last: ', this.last);
  }

}
