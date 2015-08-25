System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/get-iterator', 'aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export) {
  var _createClass, _classCallCheck, _getIterator, inject, LogManager, HttpClient, logger, baseUrl, parse, pubmedBaseUrl, Api;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeCoreJsGetIterator) {
      _getIterator = _babelRuntimeCoreJsGetIterator['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('api');
      baseUrl = 'http://next.belframework.org/api';

      parse = function parse(message) {
        return JSON.parse(message.response);
      };

      pubmedBaseUrl = 'http://next.belframework.org/europepmc/webservices/rest/search';

      Api = (function () {
        function Api() {
          _classCallCheck(this, Api);

          this.apiClient = new HttpClient();

          this.apiClient.configure(function (config) {
            config.withBaseUrl(baseUrl).withDefaults({
              headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'Fetch'
              }
            }).rejectErrorResponses().withInterceptor({
              request: function request(_request) {
                console.log('Requesting ' + _request.method + ' ' + _request.url);
                return _request;
              },
              response: function response(_response) {
                console.log('Received ' + _response.status + ' ' + _response.url);
                return _response;
              }
            });
          });

          this.pubmedClient = new HttpClient();
          this.pubmedClient.baseUrl = pubmedBaseUrl;
        }

        _createClass(Api, [{
          key: 'process_facets',
          value: function process_facets(facets) {
            var new_facets = {};

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _getIterator(facets), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var facet = _step.value;

                if (facet.category === 'experiment_context' || facet.name === 'Status') {
                  new_facets[facet.name] = [];
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = _getIterator(facet.values), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var value = _step2.value;

                      var _name = value["value"];
                      new_facets[facet.name].push({
                        'name': _name,
                        'count': value.count,
                        'filter': value.filter
                      });
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            return new_facets;
          }
        }, {
          key: 'search',
          value: function search(start, size, faceted, filters) {
            if (start === undefined) start = 0;
            if (size === undefined) size = 10;

            var _this = this;

            if (faceted === undefined) faceted = "yes";

            var max_values_per_facet = 20;
            var getstring = '/evidence?start=' + start + '&size=' + size + '&faceted=' + faceted + '&max_values_per_facet=' + max_values_per_facet;
            if (filters) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = _getIterator(filters), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var filter = _step3.value;

                  getstring += '&filter=' + filter;
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                    _iterator3['return']();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }
            }
            logger.debug('Filters2: ', filters);
            logger.debug('Getstring: ', getstring);

            return this.apiClient.fetch(getstring).then(function (response) {
              return response.json();
            }).then(function (data) {
              var new_data = {};
              new_data['evidences'] = data.evidence;
              new_data['facets'] = _this.process_facets(data.facets);
              logger.debug('New Data: ', new_data);
              return new_data;
            })['catch'](function (reason) {
              if (reason.status === 404) {
                return { "evidences": null, "facets": {} };
              } else {
                logger.error("Search API Error: ", reason);
              }
            });
          }
        }, {
          key: 'getPubmed',
          value: function getPubmed(id) {
            var getstring = '/resulttype=core&format=json&query=src:med ext_id:' + id;
            var results = {};
            return this.pubmedClient.fetch(getstring).then(function (response) {
              return response.json();
            })['catch'](function (reason) {
              console.log('getPubmed Error: ' + reason);
            });
          }
        }]);

        return Api;
      })();

      _export('Api', Api);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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aUJBRVEsbUJBQUMsRUFBRSxFQUFFO0FBQ1osZ0JBQUksU0FBUywwREFBd0QsRUFBRSxBQUFFLENBQUM7QUFDMUUsZ0JBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixtQkFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDdEMsSUFBSSxDQUFDLFVBQUEsUUFBUTtxQkFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQUEsQ0FBQyxTQUM1QixDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQUMscUJBQU8sQ0FBQyxHQUFHLHVCQUFxQixNQUFNLENBQUcsQ0FBQTthQUFDLENBQUMsQ0FBQztXQUN4RTs7O2VBL0dVLEdBQUciLCJmaWxlIjoicmVzb3VyY2VzL2FwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCAnZmV0Y2gnO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdhcGknKTtcblxubGV0IGJhc2VVcmwgPSAnaHR0cDovL25leHQuYmVsZnJhbWV3b3JrLm9yZy9hcGknO1xubGV0IHBhcnNlID0gbWVzc2FnZSA9PiBKU09OLnBhcnNlKG1lc3NhZ2UucmVzcG9uc2UpO1xuXG4vLyBodHRwOi8vZXVyb3BlcG1jLm9yZy9SZXN0ZnVsV2ViU2VydmljZSNzZWFyY2hcbi8vIGh0dHA6Ly93d3cuZWJpLmFjLnVrL2V1cm9wZXBtYy93ZWJzZXJ2aWNlcy9yZXN0L3NlYXJjaC9yZXN1bHR0eXBlPWNvcmUmZm9ybWF0PWpzb24mcXVlcnk9c3JjOm1lZCBleHRfaWQ6MTk0NTUwMFxuLy8gaHR0cDovL25leHQuYmVsZnJhbWV3b3JrLm9yZy9ldXJvcGVwbWMvd2Vic2VydmljZXMvcmVzdC9zZWFyY2gvcmVzdWx0dHlwZT1jb3JlJmZvcm1hdD1qc29uJnF1ZXJ5PXNyYzptZWQgIC8vIHByb3hpZWQgdG8gcmVtb3ZlIENPUlMgaXNzdWVcbi8vIFVzaW5nIHRoaXMgdGVjaG5pcXVlIHRvIHByb3h5IGh0dHA6Ly9vc2thcmhhbmUuY29tL2F2b2lkLWNvcnMtd2l0aC1uZ2lueC1wcm94eV9wYXNzXG5sZXQgcHVibWVkQmFzZVVybCA9ICdodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2V1cm9wZXBtYy93ZWJzZXJ2aWNlcy9yZXN0L3NlYXJjaCc7XG5cbmV4cG9ydCBjbGFzcyBBcGkge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5hcGlDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIC8vIHRoaXMuYXBpQ2xpZW50LmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuYXBpQ2xpZW50LmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC53aXRoQmFzZVVybChiYXNlVXJsKVxuICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JyAgICAgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlamVjdEVycm9yUmVzcG9uc2VzKClcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7IC8vIHlvdSBjYW4gcmV0dXJuIGEgbW9kaWZpZWQgUmVxdWVzdCwgb3IgeW91IGNhbiBzaG9ydC1jaXJjdWl0IHRoZSByZXF1ZXN0IGJ5IHJldHVybmluZyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlOyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucHVibWVkQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB0aGlzLnB1Ym1lZENsaWVudC5iYXNlVXJsID0gcHVibWVkQmFzZVVybDtcblxuICB9XG5cblxuICAvKipcbiAgICogPHA+UHJvY2VzcyBmYWNldHMgZnJvbSBzZWFyY2g8L3A+XG4gICAqIDxwPlRoaXMgcmVtb3ZlcyB0aGUgZmFjZXRzIHRoYXQgd29uJ3QgYmUgdXNlZCBpbiB0aGUgc2VhcmNoIHJlc3VsdHMgcGFnZVxuICAgKiAgICBhbmQgcmVvcmdhbml6ZXMgaXQgZm9yIHByZXNlbnRhdGlvbiBpbiB0aGUgc2VhcmNoIHJlc3VsdHMgcGFnZS5cbiAgICogPC9wPlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZmFjZXRzIC0gZmFjZXRzIHJldHVybmVkIGJ5IEJFTCBBUEkgZnJvbSBzZWFyY2hcbiAgICogQHJldHVybnMge09iamVjdH0gZmFjZXRzIC0gZmFjZXRzIGFmdGVyIHByb2Nlc3NpbmcgdG8gYmUgdXNlZCBpbiB3ZWIgcGFnZVxuICAgKiAqL1xuICBwcm9jZXNzX2ZhY2V0cyhmYWNldHMpIHtcbiAgICBsZXQgbmV3X2ZhY2V0cyA9IHt9O1xuXG4gICAgZm9yIChsZXQgZmFjZXQgb2YgZmFjZXRzKSB7XG4gICAgICAvLyBsb2dnZXIuZGVidWcoXCJGYWNldDogXCIsIGZhY2V0KTtcbiAgICAgIGlmIChmYWNldC5jYXRlZ29yeSA9PT0gJ2V4cGVyaW1lbnRfY29udGV4dCcgfHwgZmFjZXQubmFtZSA9PT0gJ1N0YXR1cycpIHtcbiAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKFwiU3RhdHVzIEZhY2V0OiBcIiwgZmFjZXQpO1xuICAgICAgICBuZXdfZmFjZXRzW2ZhY2V0Lm5hbWVdID0gW107XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGZhY2V0LnZhbHVlcykge1xuICAgICAgICAgIGxldCBuYW1lID0gdmFsdWVbXCJ2YWx1ZVwiXTtcbiAgICAgICAgICBuZXdfZmFjZXRzW2ZhY2V0Lm5hbWVdLnB1c2goe1xuICAgICAgICAgICAgJ25hbWUnOiBuYW1lLFxuICAgICAgICAgICAgJ2NvdW50JyA6IHZhbHVlLmNvdW50LFxuICAgICAgICAgICAgJ2ZpbHRlcicgOiB2YWx1ZS5maWx0ZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdfZmFjZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgQkVMTWdyIGRhdGFiYXNlIGFuZCByZXR1cm4gd2Vic2l0ZSByZWFkeSByZXN1bHRzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXIgLSBzZWFyY2ggc3RyaW5nXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gc3RhcnQgLSByZXN1bHQgcGFnZSBzdGFydGluZyBwb2ludCAoZGVmYXVsdCA9IDApXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gc2l6ZSAtIG51bWJlciBvZiByZXN1bHRzIHJldHVybmVkIChkZWZhdWx0ID0gMTApXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gZmFjZXRlZCAtIGZhY2V0IHJlc3VsdHMgaWYgZXF1YWxzIDEgKGRlZmF1bHQgPSAxKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBkYXRhIC0gcHJvY2Vzc2VkIHNlYXJjaCByZXN1bHRzIHJlYWR5IHRvIGRpc3BsYXkgb24gdGhlIHNlYXJjaCByZXN1bHRzIHdlYiBwYWdlXG4gICAqICovXG4gIHNlYXJjaChzdGFydCA9IDAsIHNpemUgPSAxMCwgZmFjZXRlZCA9IFwieWVzXCIsIGZpbHRlcnMpIHtcbiAgICBsZXQgbWF4X3ZhbHVlc19wZXJfZmFjZXQgPSAyMDtcbiAgICBsZXQgZ2V0c3RyaW5nID0gYC9ldmlkZW5jZT9zdGFydD0ke3N0YXJ0fSZzaXplPSR7c2l6ZX0mZmFjZXRlZD0ke2ZhY2V0ZWR9Jm1heF92YWx1ZXNfcGVyX2ZhY2V0PSR7bWF4X3ZhbHVlc19wZXJfZmFjZXR9YDtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgZm9yIChsZXQgZmlsdGVyIG9mIGZpbHRlcnMpIHtcbiAgICAgICAgZ2V0c3RyaW5nICs9IGAmZmlsdGVyPSR7ZmlsdGVyfWA7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZygnRmlsdGVyczI6ICcsIGZpbHRlcnMpO1xuICAgIGxvZ2dlci5kZWJ1ZygnR2V0c3RyaW5nOiAnLCBnZXRzdHJpbmcpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKGdldHN0cmluZylcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBsZXQgbmV3X2RhdGEgPSB7fTtcbiAgICAgICAgICAgICAgbmV3X2RhdGFbJ2V2aWRlbmNlcyddID0gZGF0YS5ldmlkZW5jZTtcbiAgICAgICAgICAgICAgbmV3X2RhdGFbJ2ZhY2V0cyddID0gdGhpcy5wcm9jZXNzX2ZhY2V0cyhkYXRhLmZhY2V0cyk7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnTmV3IERhdGE6ICcsIG5ld19kYXRhKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld19kYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbi5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcImV2aWRlbmNlc1wiOiBudWxsLCBcImZhY2V0c1wiOiB7fX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFwiU2VhcmNoIEFQSSBFcnJvcjogXCIsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgZ2V0UHVibWVkKGlkKSB7XG4gICAgbGV0IGdldHN0cmluZyA9IGAvcmVzdWx0dHlwZT1jb3JlJmZvcm1hdD1qc29uJnF1ZXJ5PXNyYzptZWQgZXh0X2lkOiR7aWR9YDtcbiAgICBsZXQgcmVzdWx0cyA9IHt9O1xuICAgIHJldHVybiB0aGlzLnB1Ym1lZENsaWVudC5mZXRjaChnZXRzdHJpbmcpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7Y29uc29sZS5sb2coYGdldFB1Ym1lZCBFcnJvcjogJHtyZWFzb259YCl9KTtcbiAgfVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==