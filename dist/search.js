System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/get-iterator', 'aurelia-framework', './resources/api', './value_converters/value_converters.js'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, _Object$keys, _getIterator, inject, LogManager, Api, SortValueConverter, logger, Search, StringifyValueConverter, KeysValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator['default'];
    }, function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys['default'];
    }, function (_babelRuntimeCoreJsGetIterator) {
      _getIterator = _babelRuntimeCoreJsGetIterator['default'];
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
          this.selected_facets = {};
          this.search_terms = null;
          this.search_start = 0;
          this.search_size = 10;
          this.search_faceted = 1;
        }

        _createClass(Search, [{
          key: 'activate',
          value: function activate() {
            return _regeneratorRuntime.async(function activate$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.prev = 0;
                  context$2$0.next = 3;
                  return _regeneratorRuntime.awrap(this.api.search(this.search_start, this.search_size, this.search_faceted));

                case 3:
                  this.results = context$2$0.sent;

                  logger.debug("Search results: %O", this.results.evidences);
                  logger.debug("Search facets: ", this.results.facets);
                  context$2$0.next = 11;
                  break;

                case 8:
                  context$2$0.prev = 8;
                  context$2$0.t0 = context$2$0['catch'](0);

                  logger.error('Search result error: ', context$2$0.t0);

                case 11:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[0, 8]]);
          }
        }, {
          key: 'search',
          value: function search() {
            var filters, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

            return _regeneratorRuntime.async(function search$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  filters = [];

                  if (!this.selected_facets) {
                    context$2$0.next = 22;
                    break;
                  }

                  keys = _Object$keys(this.selected_facets);
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$2$0.prev = 6;

                  for (_iterator = _getIterator(keys); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    key = _step.value;

                    if (this.selected_facets[key]) {
                      filters.push(key);
                    }
                  }
                  context$2$0.next = 14;
                  break;

                case 10:
                  context$2$0.prev = 10;
                  context$2$0.t0 = context$2$0['catch'](6);
                  _didIteratorError = true;
                  _iteratorError = context$2$0.t0;

                case 14:
                  context$2$0.prev = 14;
                  context$2$0.prev = 15;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 17:
                  context$2$0.prev = 17;

                  if (!_didIteratorError) {
                    context$2$0.next = 20;
                    break;
                  }

                  throw _iteratorError;

                case 20:
                  return context$2$0.finish(17);

                case 21:
                  return context$2$0.finish(14);

                case 22:
                  if (this.search_terms) {
                    filters.push('{"category": "fts", "name": "search", "value": "' + this.search_terms + '" }');
                  }
                  logger.debug('Filters: ', filters);
                  context$2$0.prev = 24;
                  context$2$0.next = 27;
                  return _regeneratorRuntime.awrap(this.api.search(this.search_start, this.search_size, this.search_faceted, filters));

                case 27:
                  this.results = context$2$0.sent;

                  logger.debug("Search results: %O", this.results.evidences);
                  logger.debug("Search facets: ", this.results.facets);
                  context$2$0.next = 35;
                  break;

                case 32:
                  context$2$0.prev = 32;
                  context$2$0.t1 = context$2$0['catch'](24);

                  logger.error('Search result error: ', context$2$0.t1);

                case 35:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[6, 10, 14, 22], [15,, 17, 21], [24, 32]]);
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
            if (typeof object === 'object') {
              logger.debug('Keys: ', _Object$keys(object));
              var arr = _Object$keys(object);
              return arr;
            } else {
              return [];
            }
          }
        }]);

        return KeysValueConverter;
      })();

      _export('KeysValueConverter', KeysValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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O3FCQUF2Qix1QkFBdUI7O2lCQUM1QixnQkFBQyxLQUFLLEVBQUU7QUFDWixnQkFBSSxLQUFLLEtBQUssSUFBSSxFQUNoQixPQUFPLE1BQU0sQ0FBQztBQUNoQixnQkFBSSxLQUFLLEtBQUssU0FBUyxFQUNyQixPQUFPLFdBQVcsQ0FBQztBQUNyQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDdkM7OztlQVBVLHVCQUF1Qjs7Ozs7QUFjdkIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQVF2QixnQkFBQyxNQUFNLEVBQUM7QUFDWixnQkFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsb0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGFBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QyxrQkFBSSxHQUFHLEdBQUcsYUFBWSxNQUFNLENBQUMsQ0FBQztBQUM5QixxQkFBTyxHQUFHLENBQUM7YUFDWixNQUNJO0FBQ0gscUJBQU8sRUFBRSxDQUFDO2FBQ1g7V0FDRjs7O2VBakJVLGtCQUFrQiIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtBcGl9IGZyb20gJy4vcmVzb3VyY2VzL2FwaSc7XG5pbXBvcnQge1NvcnRWYWx1ZUNvbnZlcnRlcn0gZnJvbSAnLi92YWx1ZV9jb252ZXJ0ZXJzL3ZhbHVlX2NvbnZlcnRlcnMuanMnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignc2VhcmNoJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkX2ZhY2V0cyA9IHt9O1xuICAgIHRoaXMuc2VhcmNoX3Rlcm1zID0gbnVsbDtcbiAgICB0aGlzLnNlYXJjaF9zdGFydCA9IDA7XG4gICAgdGhpcy5zZWFyY2hfc2l6ZSA9IDEwO1xuICAgIHRoaXMuc2VhcmNoX2ZhY2V0ZWQgPSAxO1xuICB9XG5cblxuICBhc3luYyBhY3RpdmF0ZSgpIHtcblxuICAgIC8vIEdldCBpbml0aWFsIHNlYXJjaCByZXN1bHRzXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGF3YWl0IHRoaXMuYXBpLnNlYXJjaCh0aGlzLnNlYXJjaF9zdGFydCwgdGhpcy5zZWFyY2hfc2l6ZSwgdGhpcy5zZWFyY2hfZmFjZXRlZCk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggcmVzdWx0czogJU9cIiwgdGhpcy5yZXN1bHRzLmV2aWRlbmNlcyk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggZmFjZXRzOiBcIiwgdGhpcy5yZXN1bHRzLmZhY2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignU2VhcmNoIHJlc3VsdCBlcnJvcjogJywgZXJyKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0aW5nIHB1Ym1lZCBxdWVyaWVzXG4vLyAgICB0aGlzLmFwaS5nZXRQdWJtZWQoJzE5NDU1MDAnKVxuLy8gICAgICAudGhlbihyZXN1bHRzID0+IGxvZ2dlci5kZWJ1ZygnUHVibWVkIHJlc3VsdHM6ICcsIHJlc3VsdHMpKVxuLy8gICAgICAuY2F0Y2gocmVhc29uID0+IGxvZ2dlci5lcnJvcihgUHVibWVkIEVycm9yOiAke3JlYXNvbn1gKSk7XG4gIH1cblxuICBhc3luYyBzZWFyY2goKSB7XG4vLyAgICBsb2dnZXIuZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZF9mYWNldHMsIG51bGwsIDIpKTtcbi8vICAgIGxvZ2dlci5kZWJ1ZygnU2VhcmNoIHRlcm1zOiAnLCB0aGlzLnNlYXJjaF90ZXJtcyk7XG4gICAgbGV0IGZpbHRlcnMgPSBbXTsgLy8gZmlsdGVycyB0byBzZW5kIHRvIGFwaS5zZWFyY2hcbiAgICBpZiAodGhpcy5zZWxlY3RlZF9mYWNldHMpIHtcbiAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZF9mYWNldHMpO1xuICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZF9mYWNldHNba2V5XSkge1xuICAgICAgICAgIGZpbHRlcnMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNlYXJjaF90ZXJtcykge1xuICAgICAgZmlsdGVycy5wdXNoKGB7XCJjYXRlZ29yeVwiOiBcImZ0c1wiLCBcIm5hbWVcIjogXCJzZWFyY2hcIiwgXCJ2YWx1ZVwiOiBcIiR7dGhpcy5zZWFyY2hfdGVybXN9XCIgfWApO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoJ0ZpbHRlcnM6ICcsIGZpbHRlcnMpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBhd2FpdCB0aGlzLmFwaS5zZWFyY2godGhpcy5zZWFyY2hfc3RhcnQsIHRoaXMuc2VhcmNoX3NpemUsIHRoaXMuc2VhcmNoX2ZhY2V0ZWQsIGZpbHRlcnMpO1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoIHJlc3VsdHM6ICVPXCIsIHRoaXMucmVzdWx0cy5ldmlkZW5jZXMpO1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoIGZhY2V0czogXCIsIHRoaXMucmVzdWx0cy5mYWNldHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ1NlYXJjaCByZXN1bHQgZXJyb3I6ICcsIGVycik7XG4gICAgfVxuICB9XG4vL1xuLy8gIGdldCBmYWNldF92YWx1ZXMoKSB7XG4vLyAgICBsZXQgZmFjZXRfdmFsdWVzID0gW107XG4vL1xuLy8gICAgZm9yIChsZXQga2V5IG9mIHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXSkge1xuLy8gICAgICBjb3VudCA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiY291bnRcIl07XG4vLyAgICAgIGZpbHRlciA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiZmlsdGVyXCJdO1xuLy9cbi8vICAgICAgZmFjZXRfdmFsdWVzLmFwcGVuZCh7XCJrZXlcIjoga2V5LCBcImNvdW50XCI6IGNvdW50LCBcImZpbHRlclwiOiBmaWx0ZXJ9KTtcbi8vICAgIH1cbi8vICAgIGxvZ2dlci5kZWJ1ZyhmYWNldF92YWx1ZXMpO1xuLy8gICAgcmV0dXJuIGZhY2V0X3ZhbHVlcztcbi8vICB9XG5cbn1cblxuLyoqXG4gKiBTdHJpbmdpZnkgdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ2lmeVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpO1xuICB9XG59XG5cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG5cbiAgLyoqXG4gICAqIFRvIFZpZXcgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gZXh0cmFjdCBrZXlzIGZyb21cbiAgICogQHJldHVybiB7YXJyYXl9IGxpc3Qgb2Yga2V5c1xuICAgKi9cbiAgdG9WaWV3KG9iamVjdCl7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgICAgbGV0IGFyciA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==