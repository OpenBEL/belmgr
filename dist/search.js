System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/get-iterator', 'aurelia-framework', './resources/api', './valueConverters/valueConverters.js'], function (_export) {
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
    }, function (_valueConvertersValueConvertersJs) {
      SortValueConverter = _valueConvertersValueConvertersJs.SortValueConverter;
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('search');

      Search = (function () {
        function Search(api) {
          _classCallCheck(this, _Search);

          this.api = api;
          this.results = null;
          this.selectedFacets = {};
          this.searchTerms = null;
          this.searchStart = 0;
          if (!localStorage.getItem('belMgrSearchSize')) {
            this.searchSize = "10";
          } else {
            this.searchSize = localStorage.getItem('belMgrSearchSize');
          }
          this.searchFaceted = 1;

          this.evidences = [];
          this.facetSets = {};
        }

        _createClass(Search, [{
          key: 'activate',
          value: function activate() {
            this.search();
          }
        }, {
          key: 'search',
          value: function search() {
            var filters, keys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

            return _regeneratorRuntime.async(function search$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  filters = [];

                  if (!this.selectedFacets) {
                    context$2$0.next = 22;
                    break;
                  }

                  keys = _Object$keys(this.selectedFacets);
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$2$0.prev = 6;

                  for (_iterator = _getIterator(keys); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    key = _step.value;

                    if (this.selectedFacets[key]) {
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
                  if (this.searchTerms) {
                    filters.push('{"category": "fts", "name": "search", "value": "' + this.searchTerms + '" }');
                  }
                  logger.debug('Filters: ', filters);
                  context$2$0.prev = 24;
                  context$2$0.next = 27;
                  return _regeneratorRuntime.awrap(this.api.search(this.searchStart, this.searchSize, this.searchFaceted, filters));

                case 27:
                  this.results = context$2$0.sent;

                  this.evidences = this.results.evidences;
                  this.facetSets = this.results.facets;

                  logger.debug("Search results: ", this.evidences);
                  logger.debug("Search facets: ", this.facetSets);
                  context$2$0.next = 37;
                  break;

                case 34:
                  context$2$0.prev = 34;
                  context$2$0.t1 = context$2$0['catch'](24);

                  logger.error('Search result error: ', context$2$0.t1);

                case 37:
                  this.pagerPrevious = this.pagerNext = '';
                  if (this.searchStart === 0) {
                    this.pagerPrevious = 'disabled';
                  }
                  this.searchResultsRange = this.searchStart + 1 + ' - ' + (Number(this.searchStart) + Number(this.searchSize));

                case 40:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[6, 10, 14, 22], [15,, 17, 21], [24, 34]]);
          }
        }, {
          key: 'saveSearchSize',
          value: function saveSearchSize() {
            localStorage.setItem('belMgrSearchSize', this.searchSize.toString());
            this.search();
          }
        }, {
          key: 'pageSearchResults',
          value: function pageSearchResults(direction) {
            this.searchStart += Number(this.searchSize) * direction;
            this.search();
          }
        }, {
          key: 'getEvidenceId',
          value: function getEvidenceId(url) {
            var matches = url.match(/\/(\w+?)$/);

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
//# sourceMappingURL=data:application/json;base64,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Ozs7QUFjdkIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQVF2QixnQkFBQyxNQUFNLEVBQUM7QUFDWixnQkFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsb0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLGFBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QyxrQkFBSSxHQUFHLEdBQUcsYUFBWSxNQUFNLENBQUMsQ0FBQztBQUM5QixxQkFBTyxHQUFHLENBQUM7YUFDWixNQUNJO0FBQ0gscUJBQU8sRUFBRSxDQUFDO2FBQ1g7V0FDRjs7O2VBakJVLGtCQUFrQiIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtBcGl9IGZyb20gJy4vcmVzb3VyY2VzL2FwaSc7XG5pbXBvcnQge1NvcnRWYWx1ZUNvbnZlcnRlcn0gZnJvbSAnLi92YWx1ZUNvbnZlcnRlcnMvdmFsdWVDb252ZXJ0ZXJzLmpzJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ3NlYXJjaCcpO1xuXG5AaW5qZWN0KEFwaSlcbmV4cG9ydCBjbGFzcyBTZWFyY2gge1xuXG4gIGNvbnN0cnVjdG9yKGFwaSkge1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucmVzdWx0cyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZEZhY2V0cyA9IHt9O1xuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBudWxsO1xuICAgIHRoaXMuc2VhcmNoU3RhcnQgPSAwO1xuICAgIGlmICghIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZWxNZ3JTZWFyY2hTaXplJykpIHtcbiAgICAgIHRoaXMuc2VhcmNoU2l6ZSA9IFwiMTBcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnNlYXJjaFNpemUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmVsTWdyU2VhcmNoU2l6ZScpO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaEZhY2V0ZWQgPSAxO1xuXG4gICAgdGhpcy5ldmlkZW5jZXMgPSBbXTtcbiAgICB0aGlzLmZhY2V0U2V0cyA9IHt9O1xuICB9XG5cblxuICBhY3RpdmF0ZSgpIHtcbiAgICAvLyBHZXQgaW5pdGlhbCBzZWFyY2ggcmVzdWx0c1xuICAgIHRoaXMuc2VhcmNoKCk7XG5cbiAgfVxuXG4gIGFzeW5jIHNlYXJjaCgpIHtcbi8vICAgIGxvZ2dlci5kZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkRmFjZXRzLCBudWxsLCAyKSk7XG4vLyAgICBsb2dnZXIuZGVidWcoJ1NlYXJjaCB0ZXJtczogJywgdGhpcy5zZWFyY2hUZXJtcyk7XG4gICAgbGV0IGZpbHRlcnMgPSBbXTsgLy8gZmlsdGVycyB0byBzZW5kIHRvIGFwaS5zZWFyY2hcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZhY2V0cykge1xuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkRmFjZXRzKTtcbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRGYWNldHNba2V5XSkge1xuICAgICAgICAgIGZpbHRlcnMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNlYXJjaFRlcm1zKSB7XG4gICAgICBmaWx0ZXJzLnB1c2goYHtcImNhdGVnb3J5XCI6IFwiZnRzXCIsIFwibmFtZVwiOiBcInNlYXJjaFwiLCBcInZhbHVlXCI6IFwiJHt0aGlzLnNlYXJjaFRlcm1zfVwiIH1gKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKCdGaWx0ZXJzOiAnLCBmaWx0ZXJzKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5yZXN1bHRzID0gYXdhaXQgdGhpcy5hcGkuc2VhcmNoKHRoaXMuc2VhcmNoU3RhcnQsIHRoaXMuc2VhcmNoU2l6ZSwgdGhpcy5zZWFyY2hGYWNldGVkLCBmaWx0ZXJzKTtcbiAgICAgIHRoaXMuZXZpZGVuY2VzID0gIHRoaXMucmVzdWx0cy5ldmlkZW5jZXM7XG4gICAgICB0aGlzLmZhY2V0U2V0cyA9IHRoaXMucmVzdWx0cy5mYWNldHM7XG5cbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNlYXJjaCByZXN1bHRzOiBcIiwgdGhpcy5ldmlkZW5jZXMpO1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoIGZhY2V0czogXCIsIHRoaXMuZmFjZXRTZXRzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdTZWFyY2ggcmVzdWx0IGVycm9yOiAnLCBlcnIpO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VyUHJldmlvdXMgPSB0aGlzLnBhZ2VyTmV4dCA9ICcnO1xuICAgIGlmICh0aGlzLnNlYXJjaFN0YXJ0ID09PSAwKSB7dGhpcy5wYWdlclByZXZpb3VzID0gJ2Rpc2FibGVkJzt9XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzUmFuZ2UgPSBgJHt0aGlzLnNlYXJjaFN0YXJ0ICsgMX0gLSAke051bWJlcih0aGlzLnNlYXJjaFN0YXJ0KSArIE51bWJlcih0aGlzLnNlYXJjaFNpemUpfWA7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBTZWFyY2ggcmVzdWx0cyBzaXplIGluIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIHNhdmVTZWFyY2hTaXplKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZWxNZ3JTZWFyY2hTaXplJywgdGhpcy5zZWFyY2hTaXplLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuc2VhcmNoKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGRpcmVjdGlvblxuICAgKi9cbiAgcGFnZVNlYXJjaFJlc3VsdHMoZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5zZWFyY2hTdGFydCArPSBOdW1iZXIodGhpcy5zZWFyY2hTaXplKSAqIGRpcmVjdGlvbjtcbiAgICB0aGlzLnNlYXJjaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBFdmlkZW5jZSBJRCBmcm9tIHNlbGYgbGluayBocmVmIGluIGV2aWRlbmNlIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEByZXR1cm5zIGV2aWRlbmNlSURcbiAgICovXG4gIGdldEV2aWRlbmNlSWQodXJsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSB1cmwubWF0Y2goL1xcLyhcXHcrPykkLyk7XG4gICAgLy8gbG9nZ2VyLmRlYnVnKCdNYXRjaGVzOiAnLCBtYXRjaGVzWzFdKTtcbiAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgfVxuXG4vLyAgdXJpX2VuY29kZSh1cmkpIHtcbi8vICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodXJpKTtcbi8vICB9XG4vL1xuLy8gIGdldCBmYWNldF92YWx1ZXMoKSB7XG4vLyAgICBsZXQgZmFjZXRfdmFsdWVzID0gW107XG4vL1xuLy8gICAgZm9yIChsZXQga2V5IG9mIHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXSkge1xuLy8gICAgICBjb3VudCA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiY291bnRcIl07XG4vLyAgICAgIGZpbHRlciA9IHRoaXMucmVzdWx0cy5mYWNldHNbdGhpcy5mYWNldF90eXBlXVtrZXldW1wiZmlsdGVyXCJdO1xuLy9cbi8vICAgICAgZmFjZXRfdmFsdWVzLmFwcGVuZCh7XCJrZXlcIjoga2V5LCBcImNvdW50XCI6IGNvdW50LCBcImZpbHRlclwiOiBmaWx0ZXJ9KTtcbi8vICAgIH1cbi8vICAgIGxvZ2dlci5kZWJ1ZyhmYWNldF92YWx1ZXMpO1xuLy8gICAgcmV0dXJuIGZhY2V0X3ZhbHVlcztcbi8vICB9XG5cbn1cblxuLyoqXG4gKiBTdHJpbmdpZnkgdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ2lmeVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpO1xuICB9XG59XG5cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG5cbiAgLyoqXG4gICAqIFRvIFZpZXcgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gZXh0cmFjdCBrZXlzIGZyb21cbiAgICogQHJldHVybiB7YXJyYXl9IGxpc3Qgb2Yga2V5c1xuICAgKi9cbiAgdG9WaWV3KG9iamVjdCl7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgICAgbGV0IGFyciA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==