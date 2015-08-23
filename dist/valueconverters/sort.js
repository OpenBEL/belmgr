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
              var a = val1,
                  b = val2;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlY29udmVydGVycy9zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBQWEsa0JBQWtCOzs7Ozs7Ozs7OztBQUFsQix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBQ3ZCLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sS0FBSyxDQUNULElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDZCxrQkFBSSxDQUFDLEdBQUcsSUFBSTtrQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDOztBQUV2QixrQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsRUFBRTtBQUM5RixpQkFBQyxHQUFHLElBQUksQ0FBQztBQUNULGlCQUFDLEdBQUcsSUFBSSxDQUFDO2VBQ1Y7O0FBRUQscUJBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztXQUNaOzs7ZUFiVSxrQkFBa0IiLCJmaWxlIjoidmFsdWVjb252ZXJ0ZXJzL3NvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU29ydFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KGFycmF5LCBjb25maWcpIHtcbiAgICByZXR1cm4gYXJyYXlcbiAgICAgIC5zb3J0KCh2YWwxLCB2YWwyKSA9PiB7XG4gICAgICAgICAgICAgIHZhciBhID0gdmFsMSwgYiA9IHZhbDI7XG5cbiAgICAgICAgICAgICAgaWYgKGNvbmZpZy5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSAhPT0gJ2FzYycgJiYgY29uZmlnLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnYXNjZW5kaW5nJykge1xuICAgICAgICAgICAgICAgIGEgPSB2YWwyO1xuICAgICAgICAgICAgICAgIGIgPSB2YWwxO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFbY29uZmlnLnByb3BlcnR5XSA+IGJbY29uZmlnLnByb3BlcnR5XTtcbiAgICAgICAgICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=