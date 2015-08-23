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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9jdXN0b20tbG9nLWFwcGVuZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBQWEsaUJBQWlCOzs7Ozs7Ozs7OztBQUFqQix1QkFBaUI7QUFDakIsaUJBREEsaUJBQWlCLEdBQ2Y7Z0NBREYsaUJBQWlCO1NBQ2I7O3FCQURKLGlCQUFpQjs7aUJBR3ZCLGVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBVTs4Q0FBTCxJQUFJO0FBQUosa0JBQUk7OztBQUM1QixtQkFBTyxDQUFDLEtBQUssTUFBQSxDQUFiLE9BQU8sZUFBaUIsTUFBTSxDQUFDLEVBQUUsVUFBSyxPQUFPLFNBQU8sSUFBSSxFQUFDLENBQUM7V0FDM0Q7OztpQkFFRyxjQUFDLE1BQU0sRUFBRSxPQUFPLEVBQVU7K0NBQUwsSUFBSTtBQUFKLGtCQUFJOzs7QUFDM0IsbUJBQU8sQ0FBQyxJQUFJLE1BQUEsQ0FBWixPQUFPLGNBQWUsTUFBTSxDQUFDLEVBQUUsVUFBSyxPQUFPLFNBQU8sSUFBSSxFQUFDLENBQUM7V0FDekQ7OztpQkFFRyxjQUFDLE1BQU0sRUFBRSxPQUFPLEVBQVU7K0NBQUwsSUFBSTtBQUFKLGtCQUFJOzs7QUFDM0IsbUJBQU8sQ0FBQyxJQUFJLE1BQUEsQ0FBWixPQUFPLGNBQWUsTUFBTSxDQUFDLEVBQUUsVUFBSyxPQUFPLFNBQU8sSUFBSSxFQUFDLENBQUM7V0FDekQ7OztpQkFFSSxlQUFDLE1BQU0sRUFBRSxPQUFPLEVBQVU7K0NBQUwsSUFBSTtBQUFKLGtCQUFJOzs7QUFDNUIsbUJBQU8sQ0FBQyxLQUFLLE1BQUEsQ0FBYixPQUFPLGVBQWlCLE1BQU0sQ0FBQyxFQUFFLFVBQUssT0FBTyxTQUFPLElBQUksRUFBQyxDQUFDO1dBQzNEOzs7ZUFqQlUsaUJBQWlCIiwiZmlsZSI6InJlc291cmNlcy9jdXN0b20tbG9nLWFwcGVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1c3RvbUxvZ0FwcGVuZGVyIHtcbiAgY29uc3RydWN0b3IoKXt9XG5cbiAgZGVidWcobG9nZ2VyLCBtZXNzYWdlLCAuLi5yZXN0KXtcbiAgICBjb25zb2xlLmRlYnVnKGBERUJVRyBbJHtsb2dnZXIuaWR9XSAke21lc3NhZ2V9YCwgLi4ucmVzdCk7XG4gIH1cblxuICBpbmZvKGxvZ2dlciwgbWVzc2FnZSwgLi4ucmVzdCl7XG4gICAgY29uc29sZS5pbmZvKGBJTkZPIFske2xvZ2dlci5pZH1dICR7bWVzc2FnZX1gLCAuLi5yZXN0KTtcbiAgfVxuXG4gIHdhcm4obG9nZ2VyLCBtZXNzYWdlLCAuLi5yZXN0KXtcbiAgICBjb25zb2xlLndhcm4oYFdBUk4gWyR7bG9nZ2VyLmlkfV0gJHttZXNzYWdlfWAsIC4uLnJlc3QpO1xuICB9XG5cbiAgZXJyb3IobG9nZ2VyLCBtZXNzYWdlLCAuLi5yZXN0KXtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUiBbJHtsb2dnZXIuaWR9XSAke21lc3NhZ2V9YCwgLi4ucmVzdCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==