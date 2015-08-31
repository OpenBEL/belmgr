System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check'], function (_export) {
  var _createClass, _classCallCheck, SortValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }],
    execute: function () {
      'use strict';

      SortValueConverter = (function () {
        function SortValueConverter() {
          _classCallCheck(this, SortValueConverter);
        }

        _createClass(SortValueConverter, [{
          key: 'toView',
          value: function toView(array, config) {
            return array.sort(function (val1, val2) {
              var a = val1;
              var b = val2;

              if (config.direction.toLowerCase() !== 'asc' && config.direction.toLowerCase() !== 'ascending') {
                a = val2;
                b = val1;
              }
              return a[config.property] > b[config.property];
            });
          }
        }]);

        return SortValueConverter;
      })();

      _export('SortValueConverter', SortValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9zb3J0LWFycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBTWEsa0JBQWtCOzs7Ozs7Ozs7OztBQUFsQix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBWXJCLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sS0FBSyxDQUNQLElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDcEIsa0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNiLGtCQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7O0FBRWIsa0JBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLEVBQUU7QUFDOUYsaUJBQUMsR0FBRyxJQUFJLENBQUM7QUFDVCxpQkFBQyxHQUFHLElBQUksQ0FBQztlQUNWO0FBQ0QscUJBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztXQUNSOzs7ZUF4QlEsa0JBQWtCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9zb3J0LWFycmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTb3J0IHZhbHVlIGNvbnZlcnRlclxuICpcbiAqIFRoaXMgdmFsdWUgY29udmVydGVyIHRha2VzIGFuIGFycmF5IHdpdGggYSBjb25maWcgcGFyYW1ldGVyIGFuZCBzb3J0cyB0aGUgYXJyYXkgYW5kXG4gKiByZXR1cm5zIGl0IHRvIHRoZSB2aWV3LlxuICovXG5leHBvcnQgY2xhc3MgU29ydFZhbHVlQ29udmVydGVyIHtcbiAgICAvKipcbiAgICAgKiBUbyBWaWV3IG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHthcnJheX0gYXJyYXkgdG8gc29ydFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgc29ydCBjb25maWd1cmF0aW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gc29ydGVkIGFycmF5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBcIml0ZW0gb2YgJHBhcmVudC5yZXN1bHRzLmZhY2V0c1tmYWNldC5uYW1lXSB8IHNvcnQ6IHsgcHJvcGVydHk6ICdkb2NfY291bnQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XCJcbiAgICAgKlxuICAgICAqL1xuICAgIHRvVmlldyhhcnJheSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gYXJyYXlcbiAgICAgICAgICAuc29ydCgodmFsMSwgdmFsMikgPT4ge1xuICAgICAgICAgICAgbGV0IGEgPSB2YWwxO1xuICAgICAgICAgICAgbGV0IGIgPSB2YWwyO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnYXNjJyAmJiBjb25maWcuZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCkgIT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICAgIGEgPSB2YWwyO1xuICAgICAgICAgICAgICBiID0gdmFsMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhW2NvbmZpZy5wcm9wZXJ0eV0gPiBiW2NvbmZpZy5wcm9wZXJ0eV07XG4gICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFVzYWdlXG4gKlxuICogPHJlcXVpcmUgZnJvbT1cInNvcnQtYXJyYXlcIj48L3JlcXVpcmU+XG4gKlxuICogPHRlbXBsYXRlIHJlcGVhdC5mb3I9XCJpdGVtIGluIGFycmF5IHwgc29ydDogeyBwcm9wZXJ0eTogJzxzb3J0YWJsZSBwcm9wZXJ0eSBvZiBpdGVtPicsIGRpcmVjdGlvbjogJzxkZXNjKGRlZmF1bHQpfGFzYz4nXCJcbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9