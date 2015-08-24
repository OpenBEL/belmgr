System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/keys'], function (_export) {
  var _createClass, _classCallCheck, _Object$keys, SortValueConverter, KeysValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys['default'];
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

      KeysValueConverter = (function () {
        function KeysValueConverter() {
          _classCallCheck(this, KeysValueConverter);
        }

        _createClass(KeysValueConverter, [{
          key: 'toView',
          value: function toView(object) {
            logger.debug('Keys: ', _Object$keys(object));
            return _Object$keys(object);
          }
        }]);

        return KeysValueConverter;
      })();

      _export('KeysValueConverter', KeysValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlX2NvbnZlcnRlcnMvdmFsdWVfY29udmVydGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO21EQU1hLGtCQUFrQixFQStCbEIsa0JBQWtCOzs7Ozs7Ozs7Ozs7O0FBL0JsQix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBWXZCLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sS0FBSyxDQUNULElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDZCxrQkFBSSxDQUFDLEdBQUcsSUFBSTtrQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDOztBQUV2QixrQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsRUFBRTtBQUM5RixpQkFBQyxHQUFHLElBQUksQ0FBQztBQUNULGlCQUFDLEdBQUcsSUFBSSxDQUFDO2VBQ1Y7O0FBRUQscUJBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztXQUNaOzs7ZUF4QlUsa0JBQWtCOzs7OztBQStCbEIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQVF2QixnQkFBQyxNQUFNLEVBQUM7QUFDWixrQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsYUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVDLG1CQUFPLGFBQVksTUFBTSxDQUFDLENBQUM7V0FDNUI7OztlQVhVLGtCQUFrQiIsImZpbGUiOiJ2YWx1ZV9jb252ZXJ0ZXJzL3ZhbHVlX2NvbnZlcnRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNvcnQgdmFsdWUgY29udmVydGVyXG4gKlxuICogVGhpcyB2YWx1ZSBjb252ZXJ0ZXIgdGFrZXMgYW4gYXJyYXkgd2l0aCBhIGNvbmZpZyBwYXJhbWV0ZXIgYW5kIHNvcnRzIHRoZSBhcnJheSBhbmRcbiAqIHJldHVybnMgaXQgdG8gdGhlIHZpZXcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTb3J0VmFsdWVDb252ZXJ0ZXIge1xuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gYXJyYXkgdG8gc29ydFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIHNvcnQgY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAcmV0dXJuIHthcnJheX0gc29ydGVkIGFycmF5XG4gICAqIEBleGFtcGxlXG4gICAqIFwiaXRlbSBvZiAkcGFyZW50LnJlc3VsdHMuZmFjZXRzW2ZhY2V0Lm5hbWVdIHwgc29ydDogeyBwcm9wZXJ0eTogJ2RvY19jb3VudCcsIGRpcmVjdGlvbjogJ2Rlc2MnIH1cIlxuICAgKlxuICAgKi9cbiAgdG9WaWV3KGFycmF5LCBjb25maWcpIHtcbiAgICByZXR1cm4gYXJyYXlcbiAgICAgIC5zb3J0KCh2YWwxLCB2YWwyKSA9PiB7XG4gICAgICAgICAgICAgIHZhciBhID0gdmFsMSwgYiA9IHZhbDI7XG5cbiAgICAgICAgICAgICAgaWYgKGNvbmZpZy5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSAhPT0gJ2FzYycgJiYgY29uZmlnLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnYXNjZW5kaW5nJykge1xuICAgICAgICAgICAgICAgIGEgPSB2YWwyO1xuICAgICAgICAgICAgICAgIGIgPSB2YWwxO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFbY29uZmlnLnByb3BlcnR5XSA+IGJbY29uZmlnLnByb3BlcnR5XTtcbiAgICAgICAgICAgIH0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG5cbiAgLyoqXG4gICAqIFRvIFZpZXcgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gZXh0cmFjdCBrZXlzIGZyb21cbiAgICogQHJldHVybiB7YXJyYXl9IGxpc3Qgb2Yga2V5c1xuICAgKi9cbiAgdG9WaWV3KG9iamVjdCl7XG4gICAgbG9nZ2VyLmRlYnVnKCdLZXlzOiAnLCBPYmplY3Qua2V5cyhvYmplY3QpKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9