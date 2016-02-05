/**
 * Convert from text string delimited by ';' in View to an array in the VM
 *
 * Usage:
 *  <require from="arrayify"></require>
 *  <pre>${string | arrayify}</pre>
 *
 */
export class ArrayifyValueConverter {
  toView(array) {
    let text = "";
    if (array) {
      text = array.join('; ');
    }
    return text;
  }
  fromView(text) {
    let array = [];
    if (text) {
      array = text.split('; ');
    }
    return array;
  }
}
