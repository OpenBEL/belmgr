/**
 * Convert Object to pretty-printed JSON string to insert into the VIEW
 *
 * Usage:
 *
 * <require from="stringify"></require>
 * <pre>${object | stringify}</pre>
 */

export class StringifyValueConverter {
  toView(object) {
    return JSON.stringify(object, null, 2);
  }
}
