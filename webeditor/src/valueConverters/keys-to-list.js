/**
 * Extract keys from object for use in repeat.for loop
 *
 * Usage:
 *
 *   <require from="keys-to-list"></require>
 *   ' | keys'
 *
 */
export class KeysValueConverter {

  /**
   * To View method
   *
   * @param {Object} object to extract keys from
   * @return {array} list of keys
   */
  toView(object) {
    return Object.keys(object).sort();
  }
}
