System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/object/values', 'aurelia-framework', './resources/api', './value_converters/value_converters.js'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, _Object$keys, _Object$values, inject, LogManager, Api, SortValueConverter, logger, Search, StringifyValueConverter, KeysValueConverter, ValuesValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator['default'];
    }, function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys['default'];
    }, function (_babelRuntimeCoreJsObjectValues) {
      _Object$values = _babelRuntimeCoreJsObjectValues['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_resourcesApi) {
      Api = _resourcesApi.Api;
    }, function (_value_convertersValue_convertersJs) {
      SortValueConverter = _value_convertersValue_convertersJs.SortValueConverter;
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('search');

      Search = (function () {
        function Search(api) {
          _classCallCheck(this, _Search);

          this.api = api;
          this.results = null;
          this.facet_type = null;
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

      StringifyValueConverter = (function () {
        function StringifyValueConverter() {
          _classCallCheck(this, StringifyValueConverter);
        }

        _createClass(StringifyValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            if (value === null) return 'null';
            if (value === undefined) return 'undefined';
            return JSON.stringify(value, null, 2);
          }
        }]);

        return StringifyValueConverter;
      })();

      _export('StringifyValueConverter', StringifyValueConverter);

      KeysValueConverter = (function () {
        function KeysValueConverter() {
          _classCallCheck(this, KeysValueConverter);
        }

        _createClass(KeysValueConverter, [{
          key: 'toView',
          value: function toView(object) {
            logger.debug('Keys: ', _Object$keys(object));
            var arr = _Object$keys(object);
            return arr;
          }
        }]);

        return KeysValueConverter;
      })();

      _export('KeysValueConverter', KeysValueConverter);

      ValuesValueConverter = (function () {
        function ValuesValueConverter() {
          _classCallCheck(this, ValuesValueConverter);
        }

        _createClass(ValuesValueConverter, [{
          key: 'toView',
          value: function toView(object) {
            logger.debug('Keys: ', _Object$values(object));
            return _Object$keys(object);
          }
        }]);

        return ValuesValueConverter;
      })();

      _export('ValuesValueConverter', ValuesValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3FJQUtJLE1BQU0sRUFHRyxNQUFNLEVBMkNOLHVCQUF1QixFQWN2QixrQkFBa0IsRUFrQmxCLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7aUNBbkZ6QixNQUFNO3FDQUlOLFVBQVU7OzBCQUhWLEdBQUc7OytEQUNILGtCQUFrQjs7Ozs7QUFHdEIsWUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDOztBQUc5QixZQUFNO0FBRU4saUJBRkEsTUFBTSxDQUVMLEdBQUcsRUFBRTs7O0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixjQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4Qjs7cUJBTlUsTUFBTTs7aUJBUUg7Ozs7OzttREFJVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTs7O0FBQXRDLHNCQUFJLENBQUMsT0FBTzs7QUFDWix5QkFBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFELHlCQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7O0FBR3BELHlCQUFPLENBQUMsR0FBRyxnQkFBSyxDQUFDOzs7Ozs7O1dBRXBCOzs7aUJBZ0JRLG1CQUFDLE1BQU0sRUFBRTtBQUNoQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1dBQy9COzs7c0JBckNVLE1BQU07QUFBTixjQUFNLEdBRGxCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDQyxNQUFNLEtBQU4sTUFBTTtlQUFOLE1BQU07Ozs7O0FBMkNOLDZCQUF1QjtpQkFBdkIsdUJBQXVCO2dDQUF2Qix1QkFBdUI7OztxQkFBdkIsdUJBQXVCOztpQkFDNUIsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osZ0JBQUksS0FBSyxLQUFLLElBQUksRUFDaEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsZ0JBQUksS0FBSyxLQUFLLFNBQVMsRUFDckIsT0FBTyxXQUFXLENBQUM7QUFDckIsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3ZDOzs7ZUFQVSx1QkFBdUI7Ozs7O0FBY3ZCLHdCQUFrQjtpQkFBbEIsa0JBQWtCO2dDQUFsQixrQkFBa0I7OztxQkFBbEIsa0JBQWtCOztpQkFRdkIsZ0JBQUMsTUFBTSxFQUFDO0FBQ1osa0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGFBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QyxnQkFBSSxHQUFHLEdBQUcsYUFBWSxNQUFNLENBQUMsQ0FBQztBQUM5QixtQkFBTyxHQUFHLENBQUM7V0FDWjs7O2VBWlUsa0JBQWtCOzs7OztBQWtCbEIsMEJBQW9CO2lCQUFwQixvQkFBb0I7Z0NBQXBCLG9CQUFvQjs7O3FCQUFwQixvQkFBb0I7O2lCQVF6QixnQkFBQyxNQUFNLEVBQUM7QUFDWixrQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsZUFBYyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzlDLG1CQUFPLGFBQVksTUFBTSxDQUFDLENBQUM7V0FDNUI7OztlQVhVLG9CQUFvQiIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtBcGl9IGZyb20gJy4vcmVzb3VyY2VzL2FwaSc7XG5pbXBvcnQge1NvcnRWYWx1ZUNvbnZlcnRlcn0gZnJvbSAnLi92YWx1ZV9jb252ZXJ0ZXJzL3ZhbHVlX2NvbnZlcnRlcnMuanMnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignc2VhcmNoJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICB0aGlzLmZhY2V0X3R5cGUgPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWN0aXZhdGUoKSB7XG5cbiAgICAvLyBHZXQgaW5pdGlhbCBzZWFyY2ggcmVzdWx0c1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBhd2FpdCB0aGlzLmFwaS5zZWFyY2goKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIHJlc3VsdHM6ICVPXCIsIHRoaXMucmVzdWx0cy5ldmlkZW5jZXMpO1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggZmFjZXRzOiBcIiwgdGhpcy5yZXN1bHRzLmZhY2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICB9XG4vL1xuLy8gIGdldCBmYWNldF92YWx1ZXMoKSB7XG4vLyAgICBsZXQgZmFjZXRfdmFsdWVzID0gW107XG4vL1xuLy8gICAgZm9yIChsZXQga2V5IG9mIHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXSkge1xuLy8gICAgICBjb3VudCA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiY291bnRcIl07XG4vLyAgICAgIGZpbHRlciA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiZmlsdGVyXCJdO1xuLy9cbi8vICAgICAgZmFjZXRfdmFsdWVzLmFwcGVuZCh7XCJrZXlcIjoga2V5LCBcImNvdW50XCI6IGNvdW50LCBcImZpbHRlclwiOiBmaWx0ZXJ9KTtcbi8vICAgIH1cbi8vICAgIGxvZ2dlci5kZWJ1ZyhmYWNldF92YWx1ZXMpO1xuLy8gICAgcmV0dXJuIGZhY2V0X3ZhbHVlcztcbi8vICB9XG5cbiAgLy8gVXNlZCBmb3IgZGVidWdnaW5nXG4gIHN0cmluZ2lmeShvYmplY3QpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgfVxufVxuXG4vKipcbiAqIFN0cmluZ2lmeSB2YWx1ZVxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5naWZ5VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMik7XG4gIH1cbn1cblxuXG4vKipcbiAqIEV4dHJhY3Qga2V5cyBmcm9tIG9iamVjdCBmb3IgdXNlIGluIHJlcGVhdC5mb3IgbG9vcFxuICovXG5leHBvcnQgY2xhc3MgS2V5c1ZhbHVlQ29udmVydGVyIHtcblxuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBleHRyYWN0IGtleXMgZnJvbVxuICAgKiBAcmV0dXJuIHthcnJheX0gbGlzdCBvZiBrZXlzXG4gICAqL1xuICB0b1ZpZXcob2JqZWN0KXtcbiAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgIGxldCBhcnIgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlc1ZhbHVlQ29udmVydGVyIHtcblxuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBleHRyYWN0IGtleXMgZnJvbVxuICAgKiBAcmV0dXJuIHthcnJheX0gbGlzdCBvZiBrZXlzXG4gICAqL1xuICB0b1ZpZXcob2JqZWN0KXtcbiAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC52YWx1ZXMob2JqZWN0KSk7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==