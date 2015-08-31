System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/keys'], function (_export) {
  var _createClass, _classCallCheck, _Object$keys, SortValueConverter, KeysValueConverter, PipemeValueConverter, ObjectToStringValueConverter;

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

      PipemeValueConverter = (function () {
        function PipemeValueConverter() {
          _classCallCheck(this, PipemeValueConverter);
        }

        _createClass(PipemeValueConverter, [{
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

        return PipemeValueConverter;
      })();

      _export('PipemeValueConverter', PipemeValueConverter);

      ObjectToStringValueConverter = (function () {
        function ObjectToStringValueConverter() {
          _classCallCheck(this, ObjectToStringValueConverter);
        }

        _createClass(ObjectToStringValueConverter, [{
          key: 'toView',
          value: function toView(object) {
            return JSON.stringify(object, null, 2);
          }
        }]);

        return ObjectToStringValueConverter;
      })();

      _export('ObjectToStringValueConverter', ObjectToStringValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy92YWx1ZUNvbnZlcnRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjttREFNYSxrQkFBa0IsRUErQmxCLGtCQUFrQixFQWlCbEIsb0JBQW9CLEVBMkJwQiw0QkFBNEI7Ozs7Ozs7Ozs7Ozs7QUEzRTVCLHdCQUFrQjtpQkFBbEIsa0JBQWtCO2dDQUFsQixrQkFBa0I7OztxQkFBbEIsa0JBQWtCOztpQkFZdkIsZ0JBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNwQixtQkFBTyxLQUFLLENBQ1QsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUNkLGtCQUFJLENBQUMsR0FBRyxJQUFJO2tCQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7O0FBRXZCLGtCQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxFQUFFO0FBQzlGLGlCQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ1QsaUJBQUMsR0FBRyxJQUFJLENBQUM7ZUFDVjs7QUFFRCxxQkFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQsQ0FBQyxDQUFDO1dBQ1o7OztlQXhCVSxrQkFBa0I7Ozs7O0FBK0JsQix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBUXZCLGdCQUFDLE1BQU0sRUFBQztBQUNaLGtCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxhQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUMsbUJBQU8sYUFBWSxNQUFNLENBQUMsQ0FBQztXQUM1Qjs7O2VBWFUsa0JBQWtCOzs7OztBQWlCbEIsMEJBQW9CO2lCQUFwQixvQkFBb0I7Z0NBQXBCLG9CQUFvQjs7O3FCQUFwQixvQkFBb0I7O2lCQUN6QixnQkFBQyxJQUFJLEVBQUU7QUFDWCxnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBRWI7OztpQkFDTyxrQkFBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztlQWJVLG9CQUFvQjs7Ozs7QUEyQnBCLGtDQUE0QjtpQkFBNUIsNEJBQTRCO2dDQUE1Qiw0QkFBNEI7OztxQkFBNUIsNEJBQTRCOztpQkFDakMsZ0JBQUMsTUFBTSxFQUFFO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3hDOzs7ZUFIVSw0QkFBNEIiLCJmaWxlIjoidmFsdWVDb252ZXJ0ZXJzL3ZhbHVlQ29udmVydGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU29ydCB2YWx1ZSBjb252ZXJ0ZXJcbiAqXG4gKiBUaGlzIHZhbHVlIGNvbnZlcnRlciB0YWtlcyBhbiBhcnJheSB3aXRoIGEgY29uZmlnIHBhcmFtZXRlciBhbmQgc29ydHMgdGhlIGFycmF5IGFuZFxuICogcmV0dXJucyBpdCB0byB0aGUgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNvcnRWYWx1ZUNvbnZlcnRlciB7XG4gIC8qKlxuICAgKiBUbyBWaWV3IG1ldGhvZFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBhcnJheSB0byBzb3J0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgc29ydCBjb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge2FycmF5fSBzb3J0ZWQgYXJyYXlcbiAgICogQGV4YW1wbGVcbiAgICogXCJpdGVtIG9mICRwYXJlbnQucmVzdWx0cy5mYWNldHNbZmFjZXQubmFtZV0gfCBzb3J0OiB7IHByb3BlcnR5OiAnZG9jX2NvdW50JywgZGlyZWN0aW9uOiAnZGVzYycgfVwiXG4gICAqXG4gICAqL1xuICB0b1ZpZXcoYXJyYXksIGNvbmZpZykge1xuICAgIHJldHVybiBhcnJheVxuICAgICAgLnNvcnQoKHZhbDEsIHZhbDIpID0+IHtcbiAgICAgICAgICAgICAgdmFyIGEgPSB2YWwxLCBiID0gdmFsMjtcblxuICAgICAgICAgICAgICBpZiAoY29uZmlnLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpICE9PSAnYXNjJyAmJiBjb25maWcuZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCkgIT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICAgICAgYSA9IHZhbDI7XG4gICAgICAgICAgICAgICAgYiA9IHZhbDE7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gYVtjb25maWcucHJvcGVydHldID4gYltjb25maWcucHJvcGVydHldO1xuICAgICAgICAgICAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEV4dHJhY3Qga2V5cyBmcm9tIG9iamVjdCBmb3IgdXNlIGluIHJlcGVhdC5mb3IgbG9vcFxuICovXG5leHBvcnQgY2xhc3MgS2V5c1ZhbHVlQ29udmVydGVyIHtcblxuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBleHRyYWN0IGtleXMgZnJvbVxuICAgKiBAcmV0dXJuIHthcnJheX0gbGlzdCBvZiBrZXlzXG4gICAqL1xuICB0b1ZpZXcob2JqZWN0KXtcbiAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgb24gRWRpdCBCRUwgcGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVtZVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuXG4gIH1cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuXG4vKipcbiAqIFVzYWdlXG4gKlxuICogPHJlcXVpcmUgZnJvbT1cIk9iamVjdFRvU3RyaW5nXCI+PC9yZXF1aXJlPlxuICogPHByZT4ke29iamVjdCB8IG9iamVjdFRvU3RyaW5nfTwvcHJlPlxuICovXG5cbi8qKlxuICogQ29udmVydCBPYmplY3QgdG8gcHJldHR5LXByaW50ZWQgSlNPTiBzdHJpbmcgdG8gaW5zZXJ0IGludG8gdGhlIFZJRVdcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFRvU3RyaW5nVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcob2JqZWN0KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgbnVsbCwgMik7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9