System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], function (_export) {
  var _createClass, _classCallCheck, CustomLogAppender;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass["default"];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
    }],
    execute: function () {
      "use strict";

      CustomLogAppender = (function () {
        function CustomLogAppender() {
          _classCallCheck(this, CustomLogAppender);
        }

        _createClass(CustomLogAppender, [{
          key: "debug",
          value: function debug(logger, message) {
            for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              rest[_key - 2] = arguments[_key];
            }

            console.debug.apply(console, ["DEBUG [" + logger.id + "] " + message].concat(rest));
          }
        }, {
          key: "info",
          value: function info(logger, message) {
            for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              rest[_key2 - 2] = arguments[_key2];
            }

            console.info.apply(console, ["INFO [" + logger.id + "] " + message].concat(rest));
          }
        }, {
          key: "warn",
          value: function warn(logger, message) {
            for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              rest[_key3 - 2] = arguments[_key3];
            }

            console.warn.apply(console, ["WARN [" + logger.id + "] " + message].concat(rest));
          }
        }, {
          key: "error",
          value: function error(logger, message) {
            for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
              rest[_key4 - 2] = arguments[_key4];
            }

            console.error.apply(console, ["ERROR [" + logger.id + "] " + message].concat(rest));
          }
        }]);

        return CustomLogAppender;
      })();

      _export("CustomLogAppender", CustomLogAppender);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9DdXN0b21Mb2dBcHBlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3FDQUFhLGlCQUFpQjs7Ozs7Ozs7Ozs7QUFBakIsdUJBQWlCO0FBQ2pCLGlCQURBLGlCQUFpQixHQUNmO2dDQURGLGlCQUFpQjtTQUNiOztxQkFESixpQkFBaUI7O2lCQUd2QixlQUFDLE1BQU0sRUFBRSxPQUFPLEVBQVU7OENBQUwsSUFBSTtBQUFKLGtCQUFJOzs7QUFDNUIsbUJBQU8sQ0FBQyxLQUFLLE1BQUEsQ0FBYixPQUFPLGVBQWlCLE1BQU0sQ0FBQyxFQUFFLFVBQUssT0FBTyxTQUFPLElBQUksRUFBQyxDQUFDO1dBQzNEOzs7aUJBRUcsY0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFVOytDQUFMLElBQUk7QUFBSixrQkFBSTs7O0FBQzNCLG1CQUFPLENBQUMsSUFBSSxNQUFBLENBQVosT0FBTyxjQUFlLE1BQU0sQ0FBQyxFQUFFLFVBQUssT0FBTyxTQUFPLElBQUksRUFBQyxDQUFDO1dBQ3pEOzs7aUJBRUcsY0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFVOytDQUFMLElBQUk7QUFBSixrQkFBSTs7O0FBQzNCLG1CQUFPLENBQUMsSUFBSSxNQUFBLENBQVosT0FBTyxjQUFlLE1BQU0sQ0FBQyxFQUFFLFVBQUssT0FBTyxTQUFPLElBQUksRUFBQyxDQUFDO1dBQ3pEOzs7aUJBRUksZUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFVOytDQUFMLElBQUk7QUFBSixrQkFBSTs7O0FBQzVCLG1CQUFPLENBQUMsS0FBSyxNQUFBLENBQWIsT0FBTyxlQUFpQixNQUFNLENBQUMsRUFBRSxVQUFLLE9BQU8sU0FBTyxJQUFJLEVBQUMsQ0FBQztXQUMzRDs7O2VBakJVLGlCQUFpQiIsImZpbGUiOiJyZXNvdXJjZXMvQ3VzdG9tTG9nQXBwZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3VzdG9tTG9nQXBwZW5kZXIge1xuICBjb25zdHJ1Y3Rvcigpe31cblxuICBkZWJ1Zyhsb2dnZXIsIG1lc3NhZ2UsIC4uLnJlc3Qpe1xuICAgIGNvbnNvbGUuZGVidWcoYERFQlVHIFske2xvZ2dlci5pZH1dICR7bWVzc2FnZX1gLCAuLi5yZXN0KTtcbiAgfVxuXG4gIGluZm8obG9nZ2VyLCBtZXNzYWdlLCAuLi5yZXN0KXtcbiAgICBjb25zb2xlLmluZm8oYElORk8gWyR7bG9nZ2VyLmlkfV0gJHttZXNzYWdlfWAsIC4uLnJlc3QpO1xuICB9XG5cbiAgd2Fybihsb2dnZXIsIG1lc3NhZ2UsIC4uLnJlc3Qpe1xuICAgIGNvbnNvbGUud2FybihgV0FSTiBbJHtsb2dnZXIuaWR9XSAke21lc3NhZ2V9YCwgLi4ucmVzdCk7XG4gIH1cblxuICBlcnJvcihsb2dnZXIsIG1lc3NhZ2UsIC4uLnJlc3Qpe1xuICAgIGNvbnNvbGUuZXJyb3IoYEVSUk9SIFske2xvZ2dlci5pZH1dICR7bWVzc2FnZX1gLCAuLi5yZXN0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9