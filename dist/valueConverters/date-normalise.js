System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, NormaliseDateValueConverter;

    return {
        setters: [function (_babelRuntimeHelpersCreateClass) {
            _createClass = _babelRuntimeHelpersCreateClass["default"];
        }, function (_babelRuntimeHelpersClassCallCheck) {
            _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            NormaliseDateValueConverter = (function () {
                function NormaliseDateValueConverter() {
                    _classCallCheck(this, NormaliseDateValueConverter);
                }

                _createClass(NormaliseDateValueConverter, [{
                    key: "toView",
                    value: function toView(value) {
                        return new Date(value).toDateString();
                    }
                }]);

                return NormaliseDateValueConverter;
            })();

            _export("NormaliseDateValueConverter", NormaliseDateValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9kYXRlLW5vcm1hbGlzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3VDQUFhLDJCQUEyQjs7Ozs7Ozs7Ozs7QUFBM0IsdUNBQTJCO3lCQUEzQiwyQkFBMkI7MENBQTNCLDJCQUEyQjs7OzZCQUEzQiwyQkFBMkI7OzJCQUM5QixnQkFBQyxLQUFLLEVBQUU7QUFDTiwrQkFBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztxQkFDN0M7Ozt1QkFIUSwyQkFBMkIiLCJmaWxlIjoidmFsdWVDb252ZXJ0ZXJzL2RhdGUtbm9ybWFsaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE5vcm1hbGlzZURhdGVWYWx1ZUNvbnZlcnRlciB7XG4gICAgdG9WaWV3KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvRGF0ZVN0cmluZygpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFVzYWdlXG4gKlxuICogPHJlcXVpcmUgZnJvbT1cImRhdGUtbm9ybWFsaXNlXCI+PC9yZXF1aXJlPlxuICogZGF0ZVZhbCA9ICdEZWNlbWJlciAxNywgMTk5NSAwMzoyNDowMCc7XG4gKiA8aDEgdGV4dENvbnRlbnQuYmluZD1cImRhdGVWYWwgfCBub3JtYWxpc2VEYXRlXCI+U3VuIERlYyAxNyAxOTk1PC9oMT5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9