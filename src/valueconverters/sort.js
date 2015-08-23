export class SortValueConverter {
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
