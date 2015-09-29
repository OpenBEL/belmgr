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
                    filters.push('{"category":"fts","name":"search","value":"' + this.searchTerms + '"sue}');
                  }
                  logger.debug('Filters: ', filters);
                  context$2$0.prev = 24;
                  context$2$0.next = 27;
                  return _regeneratorRuntime.awrap(this.api.search(this.searchStart, this.searchSize, this.searchFaceted, filters));

                case 27:
                  this.results = context$2$0.sent;

                  this.evidences = this.results.evidences;
                  this.facetSets = this.results.facets;
                  this.search_metadata = this.results.metadata;

                  logger.debug("Search results: ", this.evidences);
                  logger.debug("Search facets: ", this.facetSets);
                  context$2$0.next = 38;
                  break;

                case 35:
                  context$2$0.prev = 35;
                  context$2$0.t1 = context$2$0['catch'](24);

                  logger.error('Search result error: ', context$2$0.t1);

                case 38:
                  this.pagerPrevious = this.pagerNext = '';
                  if (this.searchStart === 0) {
                    this.pagerPrevious = 'disabled';
                  }
                  this.searchResultsRange = this.searchStart + 1 + ' - ' + (Number(this.searchStart) + Number(this.searchSize));

                case 41:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[6, 10, 14, 22], [15,, 17, 21], [24, 35]]);
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
        }, {
          key: 'getSpecies',
          value: function getSpecies(item) {
            var organisms = {
              "Mus musculus": "mouse-icon",
              "10090": "mouse-icon",
              "Rattus norvegicus": "rat-icon",
              "10116": "rat-icon",
              "Homo sapiens": "human-icon",
              "9606": "human-icon",
              "Unknown": "unknown-icon"
            };
            var result = item.evidence.experiment_context.find(function (x) {
              return x.name === 'Species';
            });
            if (result) {
              return organisms[result.value];
            }
            return organisms.Unknown;
          }
        }, {
          key: 'getExperimentContextItems',
          value: function getExperimentContextItems(evidence) {
            var items = evidence.experiment_context.filter(function (x) {
              return x.name !== 'Ncbi Taxonomy';
            }).map(function (x) {
              return x.name + '::' + x.value;
            });
            return items;
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

      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QU0sQ0FBQyxDQUFDLENBQUM7QUFDNUMsa0JBQUksR0FBRyxHQUFHLGFBQVksTUFBTSxDQUFDLENBQUM7QUFDOUIscUJBQU8sR0FBRyxDQUFDO2FBQ1osTUFDSTtBQUNILHFCQUFPLEVBQUUsQ0FBQzthQUNYO1dBQ0Y7OztlQWpCVSxrQkFBa0I7Ozs7O0FBcUIvQixPQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVU7QUFDeEIsU0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDMUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7U29ydFZhbHVlQ29udmVydGVyfSBmcm9tICcuL3ZhbHVlQ29udmVydGVycy92YWx1ZUNvbnZlcnRlcnMuanMnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignc2VhcmNoJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkRmFjZXRzID0ge307XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IG51bGw7XG4gICAgdGhpcy5zZWFyY2hTdGFydCA9IDA7XG4gICAgaWYgKCEgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JlbE1nclNlYXJjaFNpemUnKSkge1xuICAgICAgdGhpcy5zZWFyY2hTaXplID0gXCIxMFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoU2l6ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZWxNZ3JTZWFyY2hTaXplJyk7XG4gICAgfVxuICAgIHRoaXMuc2VhcmNoRmFjZXRlZCA9IDE7XG5cbiAgICB0aGlzLmV2aWRlbmNlcyA9IFtdO1xuICAgIHRoaXMuZmFjZXRTZXRzID0ge307XG4gIH1cblxuXG4gIGFjdGl2YXRlKCkge1xuICAgIC8vIEdldCBpbml0aWFsIHNlYXJjaCByZXN1bHRzXG4gICAgdGhpcy5zZWFyY2goKTtcblxuICB9XG5cbiAgYXN5bmMgc2VhcmNoKCkge1xuLy8gICAgbG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRGYWNldHMsIG51bGwsIDIpKTtcbi8vICAgIGxvZ2dlci5kZWJ1ZygnU2VhcmNoIHRlcm1zOiAnLCB0aGlzLnNlYXJjaFRlcm1zKTtcbiAgICBsZXQgZmlsdGVycyA9IFtdOyAvLyBmaWx0ZXJzIHRvIHNlbmQgdG8gYXBpLnNlYXJjaFxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZXRzKSB7XG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRGYWNldHMpO1xuICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEZhY2V0c1trZXldKSB7XG4gICAgICAgICAgZmlsdGVycy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybXMpIHtcbiAgICAgIGZpbHRlcnMucHVzaChge1wiY2F0ZWdvcnlcIjpcImZ0c1wiLFwibmFtZVwiOlwic2VhcmNoXCIsXCJ2YWx1ZVwiOlwiJHt0aGlzLnNlYXJjaFRlcm1zfVwic3VlfWApO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoJ0ZpbHRlcnM6ICcsIGZpbHRlcnMpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBhd2FpdCB0aGlzLmFwaS5zZWFyY2godGhpcy5zZWFyY2hTdGFydCwgdGhpcy5zZWFyY2hTaXplLCB0aGlzLnNlYXJjaEZhY2V0ZWQsIGZpbHRlcnMpO1xuICAgICAgdGhpcy5ldmlkZW5jZXMgPSAgdGhpcy5yZXN1bHRzLmV2aWRlbmNlcztcbiAgICAgIHRoaXMuZmFjZXRTZXRzID0gdGhpcy5yZXN1bHRzLmZhY2V0cztcbiAgICAgIHRoaXMuc2VhcmNoX21ldGFkYXRhID0gdGhpcy5yZXN1bHRzLm1ldGFkYXRhO1xuXG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggcmVzdWx0czogXCIsIHRoaXMuZXZpZGVuY2VzKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNlYXJjaCBmYWNldHM6IFwiLCB0aGlzLmZhY2V0U2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignU2VhcmNoIHJlc3VsdCBlcnJvcjogJywgZXJyKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlclByZXZpb3VzID0gdGhpcy5wYWdlck5leHQgPSAnJztcbiAgICBpZiAodGhpcy5zZWFyY2hTdGFydCA9PT0gMCkge3RoaXMucGFnZXJQcmV2aW91cyA9ICdkaXNhYmxlZCc7fVxuICAgIHRoaXMuc2VhcmNoUmVzdWx0c1JhbmdlID0gYCR7dGhpcy5zZWFyY2hTdGFydCArIDF9IC0gJHtOdW1iZXIodGhpcy5zZWFyY2hTdGFydCkgKyBOdW1iZXIodGhpcy5zZWFyY2hTaXplKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgU2VhcmNoIHJlc3VsdHMgc2l6ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBzYXZlU2VhcmNoU2l6ZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmVsTWdyU2VhcmNoU2l6ZScsIHRoaXMuc2VhcmNoU2l6ZS50b1N0cmluZygpKTtcbiAgICB0aGlzLnNlYXJjaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cbiAgICovXG4gIHBhZ2VTZWFyY2hSZXN1bHRzKGRpcmVjdGlvbikge1xuICAgIHRoaXMuc2VhcmNoU3RhcnQgKz0gTnVtYmVyKHRoaXMuc2VhcmNoU2l6ZSkgKiBkaXJlY3Rpb247XG4gICAgdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgRXZpZGVuY2UgSUQgZnJvbSBzZWxmIGxpbmsgaHJlZiBpbiBldmlkZW5jZSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcmV0dXJucyBldmlkZW5jZUlEXG4gICAqL1xuICBnZXRFdmlkZW5jZUlkKHVybCkge1xuICAgIGxldCBtYXRjaGVzID0gdXJsLm1hdGNoKC9cXC8oXFx3Kz8pJC8pO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZygnTWF0Y2hlczogJywgbWF0Y2hlc1sxXSk7XG4gICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IFNwZWNpZXMgZnJvbSBFdmlkZW5jZSBFeHBlcmltZW50IENvbnRleHRcbiAgICogQHBhcmFtIGV2aWRlbmNlXG4gICAqIEByZXR1cm5zICdHZW51cyBzcGVjaWVzJ1xuICAgKi9cblxuICAvLyBnZXRTcGVjaWVzKGV2aWRlbmNlKSB7XG4gIC8vICAgbGV0IGRlZmF1bHRfdmFsID0gJ1Vua25vd24nO1xuICAvLyAgIGxldCBpdGVtID0gZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0LmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdOY2JpIFRheG9ub215Jyk7XG4gIC8vICAgaWYgKGl0ZW0pIHtcbiAgLy8gICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gZGVmYXVsdF92YWw7XG4gIC8vIH1cblxuICBnZXRTcGVjaWVzKGl0ZW0pIHtcbiAgICBsZXQgb3JnYW5pc21zID0ge1xuICAgICAgXCJNdXMgbXVzY3VsdXNcIjogXCJtb3VzZS1pY29uXCIsXG4gICAgICBcIjEwMDkwXCI6IFwibW91c2UtaWNvblwiLFxuICAgICAgXCJSYXR0dXMgbm9ydmVnaWN1c1wiOiBcInJhdC1pY29uXCIsXG4gICAgICBcIjEwMTE2XCI6IFwicmF0LWljb25cIixcbiAgICAgIFwiSG9tbyBzYXBpZW5zXCI6IFwiaHVtYW4taWNvblwiLFxuICAgICAgXCI5NjA2XCI6IFwiaHVtYW4taWNvblwiLFxuICAgICAgXCJVbmtub3duXCI6IFwidW5rbm93bi1pY29uXCJcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IGl0ZW0uZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0LmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdTcGVjaWVzJyk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIG9yZ2FuaXNtc1tyZXN1bHQudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3JnYW5pc21zLlVua25vd247XG4gIH1cblxuXG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhcnJheSBvZiBleHBlcmltZW50X2NvbnRleHQgdmFsdWVzIHdpdGhvdXQgdGhlIE5jYmkgVGF4b25vbXkgaXRlbVxuICAgKiBAcGFyYW0gZXZpZGVuY2VcbiAgICogQHJldHVybnMgYXJyYXkgb2YgZXhwZXJpbWVudF9jb250ZXh0IHZhbHVlc1xuICAgKi9cbiAgZ2V0RXhwZXJpbWVudENvbnRleHRJdGVtcyhldmlkZW5jZSkge1xuICAgIGxldCBpdGVtcyA9IGV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dC5maWx0ZXIoeCA9PiB4Lm5hbWUgIT09ICdOY2JpIFRheG9ub215JykubWFwKHggPT4gYCR7eC5uYW1lfTo6JHt4LnZhbHVlfWApO1xuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG59XG5cbi8qKlxuICogU3RyaW5naWZ5IHZhbHVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdpZnlWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAyKTtcbiAgfVxufVxuXG5cbi8qKlxuICogRXh0cmFjdCBrZXlzIGZyb20gb2JqZWN0IGZvciB1c2UgaW4gcmVwZWF0LmZvciBsb29wXG4gKi9cbmV4cG9ydCBjbGFzcyBLZXlzVmFsdWVDb252ZXJ0ZXIge1xuXG4gIC8qKlxuICAgKiBUbyBWaWV3IG1ldGhvZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IHRvIGV4dHJhY3Qga2V5cyBmcm9tXG4gICAqIEByZXR1cm4ge2FycmF5fSBsaXN0IG9mIGtleXNcbiAgICovXG4gIHRvVmlldyhvYmplY3Qpe1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdLZXlzOiAnLCBPYmplY3Qua2V5cyhvYmplY3QpKTtcbiAgICAgIGxldCBhcnIgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==