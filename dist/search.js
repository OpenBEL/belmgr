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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QkFBa0IiLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtTb3J0VmFsdWVDb252ZXJ0ZXJ9IGZyb20gJy4vdmFsdWVDb252ZXJ0ZXJzL3ZhbHVlQ29udmVydGVycy5qcyc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdzZWFyY2gnKTtcblxuQGluamVjdChBcGkpXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcblxuICBjb25zdHJ1Y3RvcihhcGkpIHtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0ZWRGYWNldHMgPSB7fTtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gbnVsbDtcbiAgICB0aGlzLnNlYXJjaFN0YXJ0ID0gMDtcbiAgICBpZiAoISBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmVsTWdyU2VhcmNoU2l6ZScpKSB7XG4gICAgICB0aGlzLnNlYXJjaFNpemUgPSBcIjEwXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZWFyY2hTaXplID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JlbE1nclNlYXJjaFNpemUnKTtcbiAgICB9XG4gICAgdGhpcy5zZWFyY2hGYWNldGVkID0gMTtcblxuICAgIHRoaXMuZXZpZGVuY2VzID0gW107XG4gICAgdGhpcy5mYWNldFNldHMgPSB7fTtcbiAgfVxuXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgLy8gR2V0IGluaXRpYWwgc2VhcmNoIHJlc3VsdHNcbiAgICB0aGlzLnNlYXJjaCgpO1xuXG4gIH1cblxuICBhc3luYyBzZWFyY2goKSB7XG4vLyAgICBsb2dnZXIuZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZEZhY2V0cywgbnVsbCwgMikpO1xuLy8gICAgbG9nZ2VyLmRlYnVnKCdTZWFyY2ggdGVybXM6ICcsIHRoaXMuc2VhcmNoVGVybXMpO1xuICAgIGxldCBmaWx0ZXJzID0gW107IC8vIGZpbHRlcnMgdG8gc2VuZCB0byBhcGkuc2VhcmNoXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGYWNldHMpIHtcbiAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZEZhY2V0cyk7XG4gICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZXRzW2tleV0pIHtcbiAgICAgICAgICBmaWx0ZXJzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtcykge1xuICAgICAgZmlsdGVycy5wdXNoKGB7XCJjYXRlZ29yeVwiOlwiZnRzXCIsXCJuYW1lXCI6XCJzZWFyY2hcIixcInZhbHVlXCI6XCIke3RoaXMuc2VhcmNoVGVybXN9XCJzdWV9YCk7XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZygnRmlsdGVyczogJywgZmlsdGVycyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IGF3YWl0IHRoaXMuYXBpLnNlYXJjaCh0aGlzLnNlYXJjaFN0YXJ0LCB0aGlzLnNlYXJjaFNpemUsIHRoaXMuc2VhcmNoRmFjZXRlZCwgZmlsdGVycyk7XG4gICAgICB0aGlzLmV2aWRlbmNlcyA9ICB0aGlzLnJlc3VsdHMuZXZpZGVuY2VzO1xuICAgICAgdGhpcy5mYWNldFNldHMgPSB0aGlzLnJlc3VsdHMuZmFjZXRzO1xuXG4gICAgICBsb2dnZXIuZGVidWcoXCJTZWFyY2ggcmVzdWx0czogXCIsIHRoaXMuZXZpZGVuY2VzKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNlYXJjaCBmYWNldHM6IFwiLCB0aGlzLmZhY2V0U2V0cyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignU2VhcmNoIHJlc3VsdCBlcnJvcjogJywgZXJyKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlclByZXZpb3VzID0gdGhpcy5wYWdlck5leHQgPSAnJztcbiAgICBpZiAodGhpcy5zZWFyY2hTdGFydCA9PT0gMCkge3RoaXMucGFnZXJQcmV2aW91cyA9ICdkaXNhYmxlZCc7fVxuICAgIHRoaXMuc2VhcmNoUmVzdWx0c1JhbmdlID0gYCR7dGhpcy5zZWFyY2hTdGFydCArIDF9IC0gJHtOdW1iZXIodGhpcy5zZWFyY2hTdGFydCkgKyBOdW1iZXIodGhpcy5zZWFyY2hTaXplKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgU2VhcmNoIHJlc3VsdHMgc2l6ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBzYXZlU2VhcmNoU2l6ZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmVsTWdyU2VhcmNoU2l6ZScsIHRoaXMuc2VhcmNoU2l6ZS50b1N0cmluZygpKTtcbiAgICB0aGlzLnNlYXJjaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cbiAgICovXG4gIHBhZ2VTZWFyY2hSZXN1bHRzKGRpcmVjdGlvbikge1xuICAgIHRoaXMuc2VhcmNoU3RhcnQgKz0gTnVtYmVyKHRoaXMuc2VhcmNoU2l6ZSkgKiBkaXJlY3Rpb247XG4gICAgdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgRXZpZGVuY2UgSUQgZnJvbSBzZWxmIGxpbmsgaHJlZiBpbiBldmlkZW5jZSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcmV0dXJucyBldmlkZW5jZUlEXG4gICAqL1xuICBnZXRFdmlkZW5jZUlkKHVybCkge1xuICAgIGxldCBtYXRjaGVzID0gdXJsLm1hdGNoKC9cXC8oXFx3Kz8pJC8pO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZygnTWF0Y2hlczogJywgbWF0Y2hlc1sxXSk7XG4gICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IFNwZWNpZXMgZnJvbSBFdmlkZW5jZSBFeHBlcmltZW50IENvbnRleHRcbiAgICogQHBhcmFtIGV2aWRlbmNlXG4gICAqIEByZXR1cm5zICdHZW51cyBzcGVjaWVzJ1xuICAgKi9cblxuICAvLyBnZXRTcGVjaWVzKGV2aWRlbmNlKSB7XG4gIC8vICAgbGV0IGRlZmF1bHRfdmFsID0gJ1Vua25vd24nO1xuICAvLyAgIGxldCBpdGVtID0gZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0LmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdOY2JpIFRheG9ub215Jyk7XG4gIC8vICAgaWYgKGl0ZW0pIHtcbiAgLy8gICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gZGVmYXVsdF92YWw7XG4gIC8vIH1cblxuICBnZXRTcGVjaWVzKGV2aWRlbmNlKSB7XG4gICAgbGV0IG9yZ2FuaXNtcyA9IHtcbiAgICAgIFwiTXVzIG11c2N1bHVzXCI6IFwibW91c2UtaWNvblwiLFxuICAgICAgXCJSYXR0dXMgbm9ydmVnaWN1c1wiOiBcInJhdC1pY29uXCIsXG4gICAgICBcIkhvbW8gc2FwaWVuc1wiOiBcImh1bWFuLWljb25cIixcbiAgICAgIFwiVW5rbm93blwiOiBcInVua25vd24taWNvblwiICBcbiAgICB9XG4gICAgbGV0IGl0ZW0gPSBldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQuZmluZCh4ID0+IHgubmFtZSA9PT0gJ05jYmkgVGF4b25vbXknKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG9yZ2FuaXNtc1tpdGVtLnZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIG9yZ2FuaXNtcy5Vbmtub3duO1xuICB9XG5cblxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYXJyYXkgb2YgZXhwZXJpbWVudF9jb250ZXh0IHZhbHVlcyB3aXRob3V0IHRoZSBOY2JpIFRheG9ub215IGl0ZW1cbiAgICogQHBhcmFtIGV2aWRlbmNlXG4gICAqIEByZXR1cm5zIGFycmF5IG9mIGV4cGVyaW1lbnRfY29udGV4dCB2YWx1ZXNcbiAgICovXG4gIGdldEV4cGVyaW1lbnRDb250ZXh0SXRlbXMoZXZpZGVuY2UpIHtcbiAgICBsZXQgaXRlbXMgPSBldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQuZmlsdGVyKHggPT4geC5uYW1lICE9PSAnTmNiaSBUYXhvbm9teScpLm1hcCh4ID0+IGAke3gubmFtZX06OiR7eC52YWx1ZX1gKTtcbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxufVxuXG4vKipcbiAqIFN0cmluZ2lmeSB2YWx1ZVxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5naWZ5VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMik7XG4gIH1cbn1cblxuXG4vKipcbiAqIEV4dHJhY3Qga2V5cyBmcm9tIG9iamVjdCBmb3IgdXNlIGluIHJlcGVhdC5mb3IgbG9vcFxuICovXG5leHBvcnQgY2xhc3MgS2V5c1ZhbHVlQ29udmVydGVyIHtcblxuICAvKipcbiAgICogVG8gVmlldyBtZXRob2RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0byBleHRyYWN0IGtleXMgZnJvbVxuICAgKiBAcmV0dXJuIHthcnJheX0gbGlzdCBvZiBrZXlzXG4gICAqL1xuICB0b1ZpZXcob2JqZWN0KXtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnS2V5czogJywgT2JqZWN0LmtleXMob2JqZWN0KSk7XG4gICAgICBsZXQgYXJyID0gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9