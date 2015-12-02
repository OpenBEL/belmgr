/**
 * Sort value converter
 *
 * This value converter takes an array with a config parameter and sorts the array and
 * returns it to the view.
 */
export class SortValueConverter {
  /**
   * To View method
   *
   * @param {array} array to sort
   * @param {Object} config sort configuration
   *
   * @return {array} sorted array
   * @example
   * "item of $parent.results.facets[facet.name] | sort: { property: 'doc_count', direction: 'desc' }"
   *
   */
  toView(array, config) {
    return array
      .sort((val1, val2) => {
              var a = val1, b = val2;

              if (config.direction.toLowerCase() !== 'asc' && config.direction.toLowerCase() !== 'ascending') {
                a = val2;
                b = val1;
              }

              return a[config.property] > b[config.property];
            });
  }
}


/**
 * Extract keys from object for use in repeat.for loop
 */
export class KeysValueConverter {

  /**
   * To View method
   *
   * @param {Object} object to extract keys from
   * @return {array} list of keys
   */
  toView(object){
    logger.debug('Keys: ', Object.keys(object));
    return Object.keys(object);
  }
}

/**
 * Convert authors delimited by ';' on Edit BEL page to '|' for storage
 */
export class PipemeValueConverter {
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


/**
 * Convert Object to pretty-printed JSON string to insert into the VIEW
 *
 * Usage:
 *
 * <require from="ObjectToString"></require>
 * <pre>${object | objectToString}</pre>
 */

export class ObjectToStringValueConverter {
  toView(object) {
    return JSON.stringify(object, null, 2);
  }
}

