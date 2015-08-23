System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/keys', 'aurelia-framework', './resources/api', './valueconverters/sort.js'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, _Object$keys, inject, LogManager, Api, SortValueConverter, logger, Search, KeysValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator['default'];
    }, function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_resourcesApi) {
      Api = _resourcesApi.Api;
    }, function (_valueconvertersSortJs) {
      SortValueConverter = _valueconvertersSortJs.SortValueConverter;
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('search');

      Search = (function () {
        function Search(api) {
          _classCallCheck(this, _Search);

          this.api = api;
          this.results = null;
        }

        _createClass(Search, [{
          key: 'activate',
          value: function activate() {
            return _regeneratorRuntime.async(function activate$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.prev = 0;
                  context$2$0.next = 3;
                  return _regeneratorRuntime.awrap(this.api.search());

                case 3:
                  this.results = context$2$0.sent;

                  console.log("Search results: %O", this.results.evidences);
                  console.log("Search facets: ", this.results.facets);
                  context$2$0.next = 11;
                  break;

                case 8:
                  context$2$0.prev = 8;
                  context$2$0.t0 = context$2$0['catch'](0);

                  console.log(context$2$0.t0);

                case 11:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[0, 8]]);
          }
        }, {
          key: 'stringify',
          value: function stringify(object) {
            return JSON.stringify(object);
          }
        }]);

        var _Search = Search;
        Search = inject(Api)(Search) || Search;
        return Search;
      })();

      _export('Search', Search);

      KeysValueConverter = (function () {
        function KeysValueConverter() {
          _classCallCheck(this, KeysValueConverter);
        }

        _createClass(KeysValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            logger.debug('Keys: ', _Object$keys(value));
            return _Object$keys(value);
          }
        }]);

        return KeysValueConverter;
      })();

      _export('KeysValueConverter', KeysValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3FIQUtJLE1BQU0sRUFHRyxNQUFNLEVBaUNOLGtCQUFrQjs7Ozs7Ozs7Ozs7O2lDQXpDdkIsTUFBTTtxQ0FJTixVQUFVOzswQkFIVixHQUFHOztrREFDSCxrQkFBa0I7Ozs7O0FBR3RCLFlBQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7QUFHOUIsWUFBTTtBQUVOLGlCQUZBLE1BQU0sQ0FFTCxHQUFHLEVBQUU7OztBQUNmLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsY0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7O3FCQUxVLE1BQU07O2lCQU1GOzs7Ozs7bURBSVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7OztBQUF0QyxzQkFBSSxDQUFDLE9BQU87O0FBQ1oseUJBQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRCx5QkFBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7OztBQUdwRCx5QkFBTyxDQUFDLEdBQUcsZ0JBQUssQ0FBQzs7Ozs7OztXQUVwQjs7O2lCQUdRLG1CQUFDLE1BQU0sRUFBRTtBQUNoQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1dBQy9COzs7c0JBdEJVLE1BQU07QUFBTixjQUFNLEdBRGxCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDQyxNQUFNLEtBQU4sTUFBTTtlQUFOLE1BQU07Ozs7O0FBaUNOLHdCQUFrQjtpQkFBbEIsa0JBQWtCO2dDQUFsQixrQkFBa0I7OztxQkFBbEIsa0JBQWtCOztpQkFDdkIsZ0JBQUMsS0FBSyxFQUFDO0FBQ1gsa0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGFBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMzQyxtQkFBTyxhQUFZLEtBQUssQ0FBQyxDQUFDO1dBQzNCOzs7ZUFKVSxrQkFBa0IiLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtTb3J0VmFsdWVDb252ZXJ0ZXJ9IGZyb20gJy4vdmFsdWVjb252ZXJ0ZXJzL3NvcnQuanMnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignc2VhcmNoJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgfVxuICBhc3luYyBhY3RpdmF0ZSAoKSB7XG5cbiAgICAvLyBHZXQgaW5pdGlhbCBzZWFyY2ggcmVzdWx0c1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBhd2FpdCB0aGlzLmFwaS5zZWFyY2goKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIHJlc3VsdHM6ICVPXCIsIHRoaXMucmVzdWx0cy5ldmlkZW5jZXMpO1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggZmFjZXRzOiBcIiwgdGhpcy5yZXN1bHRzLmZhY2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICB9XG5cbiAgLy8gVXNlZCBmb3IgZGVidWdnaW5nXG4gIHN0cmluZ2lmeShvYmplY3QpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgfVxuXG4vLyAgZmFjZXRfbGlzdCA9IFtcbi8vICAgIHsnbmFtZSc6ICdzdGF0dXMnLCAndGl0bGUnOiAnU3RhdHVzJ30sXG4vLyAgICB7J25hbWUnOiAnb3JnYW5pc21zJywgJ3RpdGxlJzogJ09yZ2FuaXNtcyd9LFxuLy8gICAgeyduYW1lJzogJ3Rpc3N1ZScsICd0aXRsZSc6ICdUaXNzdWVzJ30sXG4vLyAgICB7J25hbWUnOiAnZW5kcG9pbnQnLCAndGl0bGUnOiAnU3R1ZHkgRW5kcG9pbnRzJ31cbi8vICBdO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBLZXlzVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUpe1xuICAgIGxvZ2dlci5kZWJ1ZygnS2V5czogJywgT2JqZWN0LmtleXModmFsdWUpKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpO1xuICB9XG59XG5cbi8vZXhwb3J0IGNsYXNzIFN0cmluZ2lmeVZhbHVlQ29udmVydGVyIHtcbi8vICB0b1ZpZXcodmFsdWUpe1xuLy8gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbi8vICB9XG4vL31cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==