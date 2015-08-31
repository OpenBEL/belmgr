System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "babel-runtime/core-js/get-iterator"], function (_export) {
    var _createClass, _classCallCheck, _getIterator, ObjectValuesValueConverter;

    return {
        setters: [function (_babelRuntimeHelpersCreateClass) {
            _createClass = _babelRuntimeHelpersCreateClass["default"];
        }, function (_babelRuntimeHelpersClassCallCheck) {
            _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
        }, function (_babelRuntimeCoreJsGetIterator) {
            _getIterator = _babelRuntimeCoreJsGetIterator["default"];
        }],
        execute: function () {
            "use strict";

            ObjectValuesValueConverter = (function () {
                function ObjectValuesValueConverter() {
                    _classCallCheck(this, ObjectValuesValueConverter);
                }

                _createClass(ObjectValuesValueConverter, [{
                    key: "toView",
                    value: function toView(obj) {
                        var temp = [];

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _getIterator(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var val = _step.value;

                                temp.push(val);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        return temp;
                    }
                }]);

                return ObjectValuesValueConverter;
            })();

            _export("ObjectValuesValueConverter", ObjectValuesValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9vYmplY3QtdmFsdWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cURBQ2EsMEJBQTBCOzs7Ozs7Ozs7Ozs7O0FBQTFCLHNDQUEwQjt5QkFBMUIsMEJBQTBCOzBDQUExQiwwQkFBMEI7Ozs2QkFBMUIsMEJBQTBCOzsyQkFDN0IsZ0JBQUMsR0FBRyxFQUFFO0FBRVIsNEJBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7OztBQUlkLDhEQUFnQixHQUFHLDRHQUFFO29DQUFaLEdBQUc7O0FBQ1Isb0NBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsK0JBQU8sSUFBSSxDQUFDO3FCQUNmOzs7dUJBWlEsMEJBQTBCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9vYmplY3QtdmFsdWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQSBWYWx1ZUNvbnZlcnRlciBmb3IgaXRlcmF0aW5nIGFuIE9iamVjdCdzIHZhbHVlcyBpbnNpZGUgb2YgYSByZXBlYXQuZm9yIGluIEF1cmVsaWFcbmV4cG9ydCBjbGFzcyBPYmplY3RWYWx1ZXNWYWx1ZUNvbnZlcnRlciB7XG4gICAgdG9WaWV3KG9iaikge1xuICAgICAgICAvLyBDcmVhdGUgYSB0ZW1wb3JhcnkgYXJyYXkgdG8gcG9wdWxhdGUgd2l0aCBvYmplY3QgdmFsdWVzXG4gICAgICAgIGxldCB0ZW1wID0gW107XG5cbiAgICAgICAgLy8gQSBiYXNpYyBmb3IuLmluIGxvb3AgdG8gZ2V0IHZhbHVlc1xuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9TdGF0ZW1lbnRzL2Zvci4uLm9mXG4gICAgICAgIGZvciAobGV0IHZhbCBvZiBvYmopIHtcbiAgICAgICAgICAgIHRlbXAucHVzaCh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfVxufVxuXG4vKipcbiAqIFVzYWdlXG4gKlxuICogPHJlcXVpcmUgZnJvbT1cIm9iamVjdC12YWx1ZXNcIj48L3JlcXVpcmU+XG4gKiA8bGkgcmVwZWF0LmZvcj1cInZhbCBvZiBteVZtT2JqZWN0IHwgb2JqZWN0VmFsdWVzXCI+JHt2YWx9PC9saT5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9