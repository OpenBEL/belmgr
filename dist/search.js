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
        }, {
          key: 'getSpecies',
          value: function getSpecies(evidence) {
            var organisms = {
              "Mus musculus": "mouse-icon",
              "Rattus norvegicus": "rat-icon",
              "Homo sapiens": "human-icon",
              "Unknown": "unknown-icon"
            };
            var item = evidence.experiment_context.find(function (x) {
              return x.name === 'Ncbi Taxonomy';
            });
            if (item) {
              return organisms[item.value];
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
//# sourceMappingURL=data:application/json;base64,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QkFBa0I7Ozs7O0FBcUIvQixPQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVU7QUFDeEIsU0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7T0FDMUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7U29ydFZhbHVlQ29udmVydGVyfSBmcm9tICcuL3ZhbHVlQ29udmVydGVycy92YWx1ZUNvbnZlcnRlcnMuanMnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignc2VhcmNoJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXN1bHRzID0gbnVsbDtcbiAgICB0aGlzLnNlbGVjdGVkRmFjZXRzID0ge307XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IG51bGw7XG4gICAgdGhpcy5zZWFyY2hTdGFydCA9IDA7XG4gICAgaWYgKCEgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JlbE1nclNlYXJjaFNpemUnKSkge1xuICAgICAgdGhpcy5zZWFyY2hTaXplID0gXCIxMFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoU2l6ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZWxNZ3JTZWFyY2hTaXplJyk7XG4gICAgfVxuICAgIHRoaXMuc2VhcmNoRmFjZXRlZCA9IDE7XG5cbiAgICB0aGlzLmV2aWRlbmNlcyA9IFtdO1xuICAgIHRoaXMuZmFjZXRTZXRzID0ge307XG4gIH1cblxuXG4gIGFjdGl2YXRlKCkge1xuICAgIC8vIEdldCBpbml0aWFsIHNlYXJjaCByZXN1bHRzXG4gICAgdGhpcy5zZWFyY2goKTtcblxuICB9XG5cbiAgYXN5bmMgc2VhcmNoKCkge1xuLy8gICAgbG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRGYWNldHMsIG51bGwsIDIpKTtcbi8vICAgIGxvZ2dlci5kZWJ1ZygnU2VhcmNoIHRlcm1zOiAnLCB0aGlzLnNlYXJjaFRlcm1zKTtcbiAgICBsZXQgZmlsdGVycyA9IFtdOyAvLyBmaWx0ZXJzIHRvIHNlbmQgdG8gYXBpLnNlYXJjaFxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZXRzKSB7XG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRGYWNldHMpO1xuICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEZhY2V0c1trZXldKSB7XG4gICAgICAgICAgZmlsdGVycy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybXMpIHtcbiAgICAgIGZpbHRlcnMucHVzaChge1wiY2F0ZWdvcnlcIjpcImZ0c1wiLFwibmFtZVwiOlwic2VhcmNoXCIsXCJ2YWx1ZVwiOlwiJHt0aGlzLnNlYXJjaFRlcm1zfVwic3VlfWApO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoJ0ZpbHRlcnM6ICcsIGZpbHRlcnMpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBhd2FpdCB0aGlzLmFwaS5zZWFyY2godGhpcy5zZWFyY2hTdGFydCwgdGhpcy5zZWFyY2hTaXplLCB0aGlzLnNlYXJjaEZhY2V0ZWQsIGZpbHRlcnMpO1xuICAgICAgdGhpcy5ldmlkZW5jZXMgPSAgdGhpcy5yZXN1bHRzLmV2aWRlbmNlcztcbiAgICAgIHRoaXMuZmFjZXRTZXRzID0gdGhpcy5yZXN1bHRzLmZhY2V0cztcblxuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoIHJlc3VsdHM6IFwiLCB0aGlzLmV2aWRlbmNlcyk7XG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggZmFjZXRzOiBcIiwgdGhpcy5mYWNldFNldHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ1NlYXJjaCByZXN1bHQgZXJyb3I6ICcsIGVycik7XG4gICAgfVxuICAgIHRoaXMucGFnZXJQcmV2aW91cyA9IHRoaXMucGFnZXJOZXh0ID0gJyc7XG4gICAgaWYgKHRoaXMuc2VhcmNoU3RhcnQgPT09IDApIHt0aGlzLnBhZ2VyUHJldmlvdXMgPSAnZGlzYWJsZWQnO31cbiAgICB0aGlzLnNlYXJjaFJlc3VsdHNSYW5nZSA9IGAke3RoaXMuc2VhcmNoU3RhcnQgKyAxfSAtICR7TnVtYmVyKHRoaXMuc2VhcmNoU3RhcnQpICsgTnVtYmVyKHRoaXMuc2VhcmNoU2l6ZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIFNlYXJjaCByZXN1bHRzIHNpemUgaW4gbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgc2F2ZVNlYXJjaFNpemUoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2JlbE1nclNlYXJjaFNpemUnLCB0aGlzLnNlYXJjaFNpemUudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXG4gICAqL1xuICBwYWdlU2VhcmNoUmVzdWx0cyhkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnNlYXJjaFN0YXJ0ICs9IE51bWJlcih0aGlzLnNlYXJjaFNpemUpICogZGlyZWN0aW9uO1xuICAgIHRoaXMuc2VhcmNoKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEV2aWRlbmNlIElEIGZyb20gc2VsZiBsaW5rIGhyZWYgaW4gZXZpZGVuY2Ugb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHJldHVybnMgZXZpZGVuY2VJRFxuICAgKi9cbiAgZ2V0RXZpZGVuY2VJZCh1cmwpIHtcbiAgICBsZXQgbWF0Y2hlcyA9IHVybC5tYXRjaCgvXFwvKFxcdys/KSQvKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoJ01hdGNoZXM6ICcsIG1hdGNoZXNbMV0pO1xuICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBTcGVjaWVzIGZyb20gRXZpZGVuY2UgRXhwZXJpbWVudCBDb250ZXh0XG4gICAqIEBwYXJhbSBldmlkZW5jZVxuICAgKiBAcmV0dXJucyAnR2VudXMgc3BlY2llcydcbiAgICovXG5cbiAgLy8gZ2V0U3BlY2llcyhldmlkZW5jZSkge1xuICAvLyAgIGxldCBkZWZhdWx0X3ZhbCA9ICdVbmtub3duJztcbiAgLy8gICBsZXQgaXRlbSA9IGV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dC5maW5kKHggPT4geC5uYW1lID09PSAnTmNiaSBUYXhvbm9teScpO1xuICAvLyAgIGlmIChpdGVtKSB7XG4gIC8vICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIGRlZmF1bHRfdmFsO1xuICAvLyB9XG5cbiAgZ2V0U3BlY2llcyhldmlkZW5jZSkge1xuICAgIGxldCBvcmdhbmlzbXMgPSB7XG4gICAgICBcIk11cyBtdXNjdWx1c1wiOiBcIm1vdXNlLWljb25cIixcbiAgICAgIFwiUmF0dHVzIG5vcnZlZ2ljdXNcIjogXCJyYXQtaWNvblwiLFxuICAgICAgXCJIb21vIHNhcGllbnNcIjogXCJodW1hbi1pY29uXCIsXG4gICAgICBcIlVua25vd25cIjogXCJ1bmtub3duLWljb25cIiAgXG4gICAgfVxuICAgIGxldCBpdGVtID0gZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0LmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdOY2JpIFRheG9ub215Jyk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHJldHVybiBvcmdhbmlzbXNbaXRlbS52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBvcmdhbmlzbXMuVW5rbm93bjtcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFycmF5IG9mIGV4cGVyaW1lbnRfY29udGV4dCB2YWx1ZXMgd2l0aG91dCB0aGUgTmNiaSBUYXhvbm9teSBpdGVtXG4gICAqIEBwYXJhbSBldmlkZW5jZVxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBleHBlcmltZW50X2NvbnRleHQgdmFsdWVzXG4gICAqL1xuICBnZXRFeHBlcmltZW50Q29udGV4dEl0ZW1zKGV2aWRlbmNlKSB7XG4gICAgbGV0IGl0ZW1zID0gZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0LmZpbHRlcih4ID0+IHgubmFtZSAhPT0gJ05jYmkgVGF4b25vbXknKS5tYXAoeCA9PiBgJHt4Lm5hbWV9Ojoke3gudmFsdWV9YCk7XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbn1cblxuLyoqXG4gKiBTdHJpbmdpZnkgdmFsdWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ2lmeVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpO1xuICB9XG59XG5cblxuLyoqXG4gKiBFeHRyYWN0IGtleXMgZnJvbSBvYmplY3QgZm9yIHVzZSBpbiByZXBlYXQuZm9yIGxvb3BcbiAqL1xuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG5cbiAgLyoqXG4gICAqIFRvIFZpZXcgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gZXh0cmFjdCBrZXlzIGZyb21cbiAgICogQHJldHVybiB7YXJyYXl9IGxpc3Qgb2Yga2V5c1xuICAgKi9cbiAgdG9WaWV3KG9iamVjdCl7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0tleXM6ICcsIE9iamVjdC5rZXlzKG9iamVjdCkpO1xuICAgICAgbGV0IGFyciA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbn1cblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7IFxufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==