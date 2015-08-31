System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, DateYearValueConverter;

    return {
        setters: [function (_babelRuntimeHelpersCreateClass) {
            _createClass = _babelRuntimeHelpersCreateClass["default"];
        }, function (_babelRuntimeHelpersClassCallCheck) {
            _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            DateYearValueConverter = (function () {
                function DateYearValueConverter() {
                    _classCallCheck(this, DateYearValueConverter);
                }

                _createClass(DateYearValueConverter, [{
                    key: "toView",
                    value: function toView(value) {
                        return new Date(value).getFullYear();
                    }
                }]);

                return DateYearValueConverter;
            })();

            _export("DateYearValueConverter", DateYearValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9kYXRlLXllYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt1Q0FBYSxzQkFBc0I7Ozs7Ozs7Ozs7O0FBQXRCLGtDQUFzQjt5QkFBdEIsc0JBQXNCOzBDQUF0QixzQkFBc0I7Ozs2QkFBdEIsc0JBQXNCOzsyQkFDekIsZ0JBQUMsS0FBSyxFQUFFO0FBQ04sK0JBQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQzVDOzs7dUJBSFEsc0JBQXNCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9kYXRlLXllYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF0ZVllYXJWYWx1ZUNvbnZlcnRlciB7XG4gICAgdG9WaWV3KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogVXNhZ2VcbiAqXG4gKiA8cmVxdWlyZSBmcm9tPVwiZGF0ZS15ZWFyXCI+PC9yZXF1aXJlPlxuICogZGF0ZVZhbCA9ICdEZWNlbWJlciAxNywgMTk5NSAwMzoyNDowMCc7XG4gKiA8aDEgdGV4dENvbnRlbnQuYmluZD1cImRhdGVWYWwgfCBkYXRlWWVhclwiPjE5OTU8L2gxPlxuICovXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=