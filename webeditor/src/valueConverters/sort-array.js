/**
 * Sort array value converter
 */
export class SortValueConverter {

  toView(array) {
    console.log('Array: ', array);
    return array.sort();
  }
}
