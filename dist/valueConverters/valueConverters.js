System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/keys'], function (_export) {
  var _createClass, _classCallCheck, _Object$keys, SortValueConverter, KeysValueConverter, PipedelimValueConverter;

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

      PipedelimValueConverter = (function () {
        function PipedelimValueConverter() {
          _classCallCheck(this, PipedelimValueConverter);
        }

        _createClass(PipedelimValueConverter, [{
          key: 'toView',
          value: function toView(text) {
            if (text) {
              text = text.replace(/\|/g, ';');
            }
            return text;
          }
        }, {
          key: 'fromView',
          value: function fromView(text) {
            if (text) {
              text = text.replace(/\;/g, '|');
            }
            return text;
          }
        }]);

        return PipedelimValueConverter;
      })();

      _export('PipedelimValueConverter', PipedelimValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy92YWx1ZUNvbnZlcnRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjttREFNYSxrQkFBa0IsRUErQmxCLGtCQUFrQixFQWlCbEIsdUJBQXVCOzs7Ozs7Ozs7Ozs7O0FBaER2Qix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBWXZCLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sS0FBSyxDQUNULElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDZCxrQkFBSSxDQUFDLEdBQUcsSUFBSTtrQkFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDOztBQUV2QixrQkFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsRUFBRTtBQUM5RixpQkFBQyxHQUFHLElBQUksQ0FBQztBQUNULGlCQUFDLEdBQUcsSUFBSSxDQUFDO2VBQ1Y7O0FBRUQscUJBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hELENBQUMsQ0FBQztXQUNaOzs7ZUF4QlUsa0JBQWtCOzs7OztBQStCbEIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQVF2QixnQkFBQyxNQUFNLEVBQUM7QUFDWixrQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsYUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVDLG1CQUFPLGFBQVksTUFBTSxDQUFDLENBQUM7V0FDNUI7OztlQVhVLGtCQUFrQjs7Ozs7QUFpQmxCLDZCQUF1QjtpQkFBdkIsdUJBQXVCO2dDQUF2Qix1QkFBdUI7OztxQkFBdkIsdUJBQXVCOztpQkFDNUIsZ0JBQUMsSUFBSSxFQUFFO0FBQ1gsZ0JBQUksSUFBSSxFQUFFO0FBQ1Isa0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqQztBQUNELG1CQUFPLElBQUksQ0FBQztXQUViOzs7aUJBQ08sa0JBQUMsSUFBSSxFQUFFO0FBQ2IsZ0JBQUksSUFBSSxFQUFFO0FBQ1Isa0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqQztBQUNELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7ZUFiVSx1QkFBdUIiLCJmaWxlIjoidmFsdWVDb252ZXJ0ZXJzL3ZhbHVlQ29udmVydGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU29ydCB2YWx1ZSBjb252ZXJ0ZXJcbiAqXG4gKiBUaGlzIHZhbHVlIGNvbnZlcnRlciB0YWtlcyBhbiBhcnJheSB3aXRoIGEgY29uZmlnIHBhcmFtZXRlciBhbmQgc29ydHMgdGhlIGFycmF5IGFuZFxuICogcmV0dXJucyBpdCB0byB0aGUgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNvcnRWYWx1ZUNvbnZlcnRlciB7XG4gIC8qKlxuICAgKiBUbyBWaWV3IG1ldGhvZFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0byBzb3J0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgc29ydCBjb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge2FycmF5fSBzb3J0ZWQgYXJyYXlcbiAgICogQGV4YW1wbGVcbiAgICogXCJpdGVtIG9mICRwYXJlbnQucmVzdWx0cy5mYWNldHNbZmFjZXQubmFtZV0gfCBzb3J0OiB7IHByb3BlcnR5OiAnZG9jX2NvdW50JywgZGlyZWN0aW9uOiAnZGVzYycgfVwiXG4gICAqXG4gICAqL1xuICB0b1ZpZXcoYXJyYXksIGNvbmZpZykge1xuICAgIHJldHVybiBhcnJheVxuICAgICAgLnNvcnQoKHZhbDEsIHZhbDIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIGEgPSB2YWwxLCBiID0gdmFsMjtcblxuICAgICAgICAgICAgICBpZiAoY29uZmlnLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnYXNjJyAmJiBjb25maWcuZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCkgIT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICAgICAgYSA9IHZhbDI7XG4gICAgICAgICAgICAgICAgYiA9IHZhbDE7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gYVtjb25maWcucHJvcGVydHldID4gYltjb25maWcucHJvcGVydHldO1xuICAgICAgICAgICAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEV4dHJhY3Qga2V5cyBmcm9tIG9iamVjdCBmb3IgdXNlIGluIHJlcGVhdC5mb3IgbG9vcFxuICovXG5leHBvcnQgY2xhc3MgS2V5c1ZhbHVlQ29udmVydGVyIHtcblxuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBleHRyYWN0IGtleXMgZnJvbVxuICAgKiBAcmV0dXJuIHthcnJheX0gbGlzdCBvZiBrZXlzXG4gICAqL1xuICB0b1ZpZXcob2JqZWN0KXtcbiAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgb24gRWRpdCBCRUwgcGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVkZWxpbVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuXG4gIH1cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==