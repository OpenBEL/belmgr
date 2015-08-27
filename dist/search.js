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
        }, {
          key: 'get_evidence_id',
          value: function get_evidence_id(url) {
            var matches = url.match(/\/(\w+?)$/);
            logger.debug('Matches: ', matches[1]);
            return matches[1];
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
//# sourceMappingURL=data:application/json;base64,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QyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLG1CQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNuQjs7O3NCQTdEVSxNQUFNO0FBQU4sY0FBTSxHQURsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ0MsTUFBTSxLQUFOLE1BQU07ZUFBTixNQUFNOzs7OztBQXFGTiw2QkFBdUI7aUJBQXZCLHVCQUF1QjtnQ0FBdkIsdUJBQXVCOzs7cUJBQXZCLHVCQUF1Qjs7aUJBQzVCLGdCQUFDLEtBQUssRUFBRTtBQUNaLGdCQUFJLEtBQUssS0FBSyxJQUFJLEVBQ2hCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLGdCQUFJLEtBQUssS0FBSyxTQUFTLEVBQ3JCLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztXQUN2Qzs7O2VBUFUsdUJBQXVCOzs7OztBQWN2Qix3QkFBa0I7aUJBQWxCLGtCQUFrQjtnQ0FBbEIsa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7aUJBUXZCLGdCQUFDLE1BQU0sRUFBQztBQUNaLGdCQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUM5QixvQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsYUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVDLGtCQUFJLEdBQUcsR0FBRyxhQUFZLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLHFCQUFPLEdBQUcsQ0FBQzthQUNaLE1BQ0k7QUFDSCxxQkFBTyxFQUFFLENBQUM7YUFDWDtXQUNGOzs7ZUFqQlUsa0JBQWtCIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7U29ydFZhbHVlQ29udmVydGVyfSBmcm9tICcuL3ZhbHVlX2NvbnZlcnRlcnMvdmFsdWVfY29udmVydGVycy5qcyc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdzZWFyY2gnKTtcblxuQGluamVjdChBcGkpXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcblxuICBjb25zdHJ1Y3RvcihhcGkpIHtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRfZmFjZXRzID0ge307XG4gICAgdGhpcy5zZWFyY2hfdGVybXMgPSBudWxsO1xuICAgIHRoaXMuc2VhcmNoX3N0YXJ0ID0gMDtcbiAgICB0aGlzLnNlYXJjaF9zaXplID0gMTA7XG4gICAgdGhpcy5zZWFyY2hfZmFjZXRlZCA9IDE7XG4gIH1cblxuXG4gIGFzeW5jIGFjdGl2YXRlKCkge1xuXG4gICAgLy8gR2V0IGluaXRpYWwgc2VhcmNoIHJlc3VsdHNcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXN1bHRzID0gYXdhaXQgdGhpcy5hcGkuc2VhcmNoKHRoaXMuc2VhcmNoX3N0YXJ0LCB0aGlzLnNlYXJjaF9zaXplLCB0aGlzLnNlYXJjaF9mYWNldGVkKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNlYXJjaCByZXN1bHRzOiAlT1wiLCB0aGlzLnJlc3VsdHMuZXZpZGVuY2VzKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNlYXJjaCBmYWNldHM6IFwiLCB0aGlzLnJlc3VsdHMuZmFjZXRzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdTZWFyY2ggcmVzdWx0IGVycm9yOiAnLCBlcnIpO1xuICAgIH1cblxuICAgIC8vIFRlc3RpbmcgcHVibWVkIHF1ZXJpZXNcbi8vICAgIHRoaXMuYXBpLmdldFB1Ym1lZCgnMTk0NTUwMCcpXG4vLyAgICAgIC50aGVuKHJlc3VsdHMgPT4gbG9nZ2VyLmRlYnVnKCdQdWJtZWQgcmVzdWx0czogJywgcmVzdWx0cykpXG4vLyAgICAgIC5jYXRjaChyZWFzb24gPT4gbG9nZ2VyLmVycm9yKGBQdWJtZWQgRXJyb3I6ICR7cmVhc29ufWApKTtcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaCgpIHtcbi8vICAgIGxvZ2dlci5kZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkX2ZhY2V0cywgbnVsbCwgMikpO1xuLy8gICAgbG9nZ2VyLmRlYnVnKCdTZWFyY2ggdGVybXM6ICcsIHRoaXMuc2VhcmNoX3Rlcm1zKTtcbiAgICBsZXQgZmlsdGVycyA9IFtdOyAvLyBmaWx0ZXJzIHRvIHNlbmQgdG8gYXBpLnNlYXJjaFxuICAgIGlmICh0aGlzLnNlbGVjdGVkX2ZhY2V0cykge1xuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkX2ZhY2V0cyk7XG4gICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkX2ZhY2V0c1trZXldKSB7XG4gICAgICAgICAgZmlsdGVycy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2VhcmNoX3Rlcm1zKSB7XG4gICAgICBmaWx0ZXJzLnB1c2goYHtcImNhdGVnb3J5XCI6IFwiZnRzXCIsIFwibmFtZVwiOiBcInNlYXJjaFwiLCBcInZhbHVlXCI6IFwiJHt0aGlzLnNlYXJjaF90ZXJtc31cIiB9YCk7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZygnRmlsdGVyczogJywgZmlsdGVycyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGF3YWl0IHRoaXMuYXBpLnNlYXJjaCh0aGlzLnNlYXJjaF9zdGFydCwgdGhpcy5zZWFyY2hfc2l6ZSwgdGhpcy5zZWFyY2hfZmFjZXRlZCwgZmlsdGVycyk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggcmVzdWx0czogJU9cIiwgdGhpcy5yZXN1bHRzLmV2aWRlbmNlcyk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggZmFjZXRzOiBcIiwgdGhpcy5yZXN1bHRzLmZhY2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignU2VhcmNoIHJlc3VsdCBlcnJvcjogJywgZXJyKTtcbiAgICB9XG4gIH1cblxuICBnZXRfZXZpZGVuY2VfaWQodXJsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSB1cmwubWF0Y2goL1xcLyhcXHcrPykkLyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdNYXRjaGVzOiAnLCBtYXRjaGVzWzFdKTtcbiAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgfVxuXG4vLyAgdXJpX2VuY29kZSh1cmkpIHtcbi8vICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodXJpKTtcbi8vICB9XG4vL1xuLy8gIGdldCBmYWNldF92YWx1ZXMoKSB7XG4vLyAgICBsZXQgZmFjZXRfdmFsdWVzID0gW107XG4vL1xuLy8gICAgZm9yIChsZXQga2V5IG9mIHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXSkge1xuLy8gICAgICBjb3VudCA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiY291bnRcIl07XG4vLyAgICAgIGZpbHRlciA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiZmlsdGVyXCJdO1xuLy9cbi8vICAgICAgZmFjZXRfdmFsdWVzLmFwcGVuZCh7XCJrZXlcIjoga2V5LCBcImNvdW50XCI6IGNvdW50LCBcImZpbHRlclwiOiBmaWx0ZXJ9KTtcbi8vICAgIH1cbi8vICAgIGxvZ2dlci5kZWJ1ZyhmYWNldF92YWx1ZXMpO1xuLy8gICAgcmV0dXJuIGZhY2V0X3ZhbHVlcztcbi8vICB9XG5cbn1cblxuLyoqXG4gKiBTdHJpbmdpZnkgdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ2lmeVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpO1xuICB9XG59XG5cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG5cbiAgLyoqXG4gICAqIFRvIFZpZXcgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gZXh0cmFjdCBrZXlzIGZyb21cbiAgICogQHJldHVybiB7YXJyYXl9IGxpc3Qgb2Yga2V5c1xuICAgKi9cbiAgdG9WaWV3KG9iamVjdCl7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgICAgbGV0IGFyciA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==