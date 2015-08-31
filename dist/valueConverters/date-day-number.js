System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, DayNumberValueConverter;

    return {
        setters: [function (_babelRuntimeHelpersCreateClass) {
            _createClass = _babelRuntimeHelpersCreateClass["default"];
        }, function (_babelRuntimeHelpersClassCallCheck) {
            _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            DayNumberValueConverter = (function () {
                function DayNumberValueConverter() {
                    _classCallCheck(this, DayNumberValueConverter);
                }

                _createClass(DayNumberValueConverter, [{
                    key: "toView",
                    value: function toView(value) {
                        return new Date(value).getDate();
                    }
                }]);

                return DayNumberValueConverter;
            })();

            _export("DayNumberValueConverter", DayNumberValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9kYXRlLWRheS1udW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt1Q0FBYSx1QkFBdUI7Ozs7Ozs7Ozs7O0FBQXZCLG1DQUF1Qjt5QkFBdkIsdUJBQXVCOzBDQUF2Qix1QkFBdUI7Ozs2QkFBdkIsdUJBQXVCOzsyQkFDMUIsZ0JBQUMsS0FBSyxFQUFFO0FBQ1YsK0JBQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ3BDOzs7dUJBSFEsdUJBQXVCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9kYXRlLWRheS1udW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF5TnVtYmVyVmFsdWVDb252ZXJ0ZXIge1xuICAgIHRvVmlldyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLmdldERhdGUoKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBVc2FnZVxuICogR2V0cyB0aGUgY3VycmVudCBkYXkgZnJvbSBhIHN1cHBsaWVkIERhdGUgU3RyaW5nXG4gKlxuICogPHJlcXVpcmUgZnJvbT1cImRhdGUtZGF5LW51bWJlclwiPjwvcmVxdWlyZT5cbiAqIGRhdGVWYWwgPSAnRGVjZW1iZXIgMTcsIDE5OTUgMDM6MjQ6MDAnO1xuICogPGgxIHRleHRDb250ZW50LmJpbmQ9XCJkYXRlVmFsIHwgZGF5TnVtYmVyXCI+MTc8L2gxPlxuICovXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=