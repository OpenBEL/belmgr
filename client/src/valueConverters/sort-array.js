/**
 * Sort array value converter
 *
 * This value converter takes an array with a config parameter and sorts the array and
 * returns it to the view.
 *
 * Usage:
 *   <require from="sort-array"></require>
 *   <pre>${object | sort:{ property: 'doc_count', direction: 'desc' } }</pre>
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
