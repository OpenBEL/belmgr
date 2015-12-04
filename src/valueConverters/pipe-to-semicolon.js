/**
 * Convert authors delimited by ';' on Edit BEL page to '|' for storage
 *
 * Usage:
 *   <require from="pipe-to-semicolon"></require>
 *   ${object | semiToPipe}
 */

export class SemiToPipeValueConverter {
  toView(text) {
    if (text) {
      text = text.replace(/\|/g, ';');
    }
    return text;

  }
  fromView(text) {
    if (text) {
      text = text.replace(/\;/g, '|');
    }
    return text;
  }
}
