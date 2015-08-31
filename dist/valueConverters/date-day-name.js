System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check'], function (_export) {
    var _createClass, _classCallCheck, DayNameValueConverter;

    return {
        setters: [function (_babelRuntimeHelpersCreateClass) {
            _createClass = _babelRuntimeHelpersCreateClass['default'];
        }, function (_babelRuntimeHelpersClassCallCheck) {
            _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
        }],
        execute: function () {
            'use strict';

            DayNameValueConverter = (function () {
                function DayNameValueConverter() {
                    _classCallCheck(this, DayNameValueConverter);
                }

                _createClass(DayNameValueConverter, [{
                    key: 'toView',
                    value: function toView(value) {
                        var dateStr = new Date(value).getDay();

                        switch (dateStr) {
                            case 0:
                                return 'Sunday';
                                break;
                            case 1:
                                return 'Monday';
                                break;
                            case 2:
                                return 'Tuesday';
                                break;
                            case 3:
                                return 'Wednesday';
                                break;
                            case 4:
                                return 'Thursday';
                                break;
                            case 5:
                                return 'Friday';
                                break;
                            case 6:
                                return 'Saturday';
                                break;
                            default:
                                return 'Error';
                                break;
                        }
                    }
                }]);

                return DayNameValueConverter;
            })();

            _export('DayNameValueConverter', DayNameValueConverter);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9kYXRlLWRheS1uYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7dUNBQWEscUJBQXFCOzs7Ozs7Ozs7OztBQUFyQixpQ0FBcUI7eUJBQXJCLHFCQUFxQjswQ0FBckIscUJBQXFCOzs7NkJBQXJCLHFCQUFxQjs7MkJBQ3hCLGdCQUFDLEtBQUssRUFBRTtBQUNWLDRCQUFJLE9BQU8sR0FBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFeEMsZ0NBQU8sT0FBTztBQUNWLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxRQUFRLENBQUM7QUFDcEIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxRQUFRLENBQUM7QUFDcEIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxTQUFTLENBQUM7QUFDckIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxXQUFXLENBQUM7QUFDdkIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxVQUFVLENBQUM7QUFDdEIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxRQUFRLENBQUM7QUFDcEIsc0NBQU07QUFBQSxBQUNOLGlDQUFLLENBQUM7QUFDRix1Q0FBTyxVQUFVLENBQUM7QUFDdEIsc0NBQU07QUFBQSxBQUNOO0FBQ0ksdUNBQU8sT0FBTyxDQUFDO0FBQ25CLHNDQUFNO0FBQUEseUJBQ1Q7cUJBQ0o7Ozt1QkE5QlEscUJBQXFCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9kYXRlLWRheS1uYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERheU5hbWVWYWx1ZUNvbnZlcnRlciB7XG4gICAgdG9WaWV3KHZhbHVlKSB7XG4gICAgICAgIGxldCBkYXRlU3RyID0gIG5ldyBEYXRlKHZhbHVlKS5nZXREYXkoKTtcblxuICAgICAgICBzd2l0Y2goZGF0ZVN0cikge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAnU3VuZGF5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAnTW9uZGF5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnVHVlc2RheSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1dlZG5lc2RheSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1RodXJzZGF5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAnRnJpZGF5JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHJldHVybiAnU2F0dXJkYXknO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnRXJyb3InO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBVc2FnZVxuICogR2V0cyB0aGUgY3VycmVudCBkYXkgbmFtZSBmcm9tIGEgc3VwcGxpZWQgRGF0ZSBTdHJpbmdcbiAqXG4gKiA8cmVxdWlyZSBmcm9tPVwiZGF0ZS1kYXktbmFtZVwiPjwvcmVxdWlyZT5cbiAqIGRhdGVWYWwgPSAnRGVjZW1iZXIgMTcsIDE5OTUgMDM6MjQ6MDAnO1xuICogPGgxIHRleHRDb250ZW50LmJpbmQ9XCJkYXRlVmFsIHwgZGF5TmFtZVwiPlN1bmRheTwvaDE+XG4gKi9cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==