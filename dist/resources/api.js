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

          this.client = new HttpClient();
          this.client.configure(function (config) {
            config.withDefaults({
              headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'Fetch'
              }
            }).rejectErrorResponses().withInterceptor({
              request: function request(_request) {
                logger.debug('Requesting ' + _request.method + ' ' + _request.url);
                return _request;
              },
              response: function response(_response) {
                logger.debug('Received ' + _response.status + ' ' + _response.url);
                return _response;
              }
            });
          });

          this.apiClient = new HttpClient();

          this.apiClient.configure(function (config) {
            config.withBaseUrl(baseUrl).withDefaults({
              headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'Fetch'
              }
            }).rejectErrorResponses().withInterceptor({
              request: function request(_request2) {
                logger.debug('Requesting ' + _request2.method + ' ' + _request2.url);
                return _request2;
              },
              response: function response(_response2) {
                logger.debug('Received ' + _response2.status + ' ' + _response2.url);
                return _response2;
              }
            });
          });

          this.pubmedClient = new HttpClient();
          this.pubmedClient.configure(function (config) {
            config.withBaseUrl(pubmedBaseUrl).withDefaults({
              headers: {
                'Accept': 'application/json'
              }
            }).rejectErrorResponses().withInterceptor({
              request: function request(_request3) {
                logger.debug('Requesting ' + _request3.method + ' ' + _request3.url);
                return _request3;
              },
              response: function response(_response3) {
                logger.debug('Received ' + _response3.status + ' ' + _response3.url);
                return _response3;
              }
            });
          });
        }

        _createClass(Api, [{
          key: 'processFacets',
          value: function processFacets(facets) {
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

            return this.apiClient.fetch(getstring).then(function (response) {
              return response.json();
            }).then(function (data) {
              var new_data = {};
              new_data['evidences'] = data.evidence;
              new_data['facets'] = _this.processFacets(data.facets);
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
          key: 'getBelEvidence',
          value: function getBelEvidence(id) {
            return this.apiClient.fetch('/evidence/' + id).then(function (response) {
              return response.json();
            }).then(function (data) {
              return data['evidence'][0];
            })['catch'](function (reason) {
              logger.error('GET BEL Evidence Error: ' + reason);
            });
          }
        }, {
          key: 'loadBelEvidence',
          value: function loadBelEvidence(id, evidence) {
            if (id) {
              return this.apiClient.fetch('/evidence/' + id, {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(evidence)
              }).then(function (response) {
                return response.json();
              })['catch'](function (reason) {
                logger.error('POST BEL Evidence Error: ' + reason);
              });
            } else {
              return this.apiClient.fetch('/evidence/' + id, {
                method: 'put',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(evidence)
              }).then(function (response) {
                return response.json();
              })['catch'](function (reason) {
                logger.error('PUT BEL Evidence Error: ' + reason);
              });
            }
          }
        }, {
          key: 'getBelComponents',
          value: function getBelComponents(belStatement) {
            return this.apiClient.fetch('/expressions/' + belStatement + '/components').then(function (response) {
              return response.json();
            }).then(function (data) {
              return data['expression_components'];
            })['catch'](function (reason) {
              logger.error('GET BEL Components Error: ' + reason);
            });
          }
        }, {
          key: 'getPubmed',
          value: function getPubmed(id) {
            var getstring = '/resulttype=core&format=json&query=ext_id:' + id + ' src:med';

            return this.pubmedClient.fetch(getstring).then(function (response) {
              return response.json();
            }).then(function (data) {
              return data.resultList.result[0];
            })['catch'](function (reason) {
              logger.error('GET Pubmed Error: ' + reason);
            });
          }
        }, {
          key: 'getBelRelations',
          value: function getBelRelations() {
            return this.apiClient.fetch('/annotations').then(function (response) {
              return response.json();
            }).then(function (data) {
              logger.debug('GET BEL Annotations: ', data);
              return data;
            })['catch'](function (reason) {
              logger.error('GET BEL Annotations Error: ' + reason);
            });
          }
        }, {
          key: 'getBelAnnotations',
          value: function getBelAnnotations() {
            return this.apiClient.fetch('/annotations').then(function (response) {
              return response.json();
            }).then(function (data) {
              logger.debug('GET BEL Annotations: ', data);
              return data['annotations'];
            })['catch'](function (reason) {
              logger.error('GET BEL Annotations Error: ' + reason);
            });
          }
        }]);

        return Api;
      })();

      _export('Api', Api);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsVUFBQSxRQUFRO3FCQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7YUFBQSxDQUFDLENBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNOLG9CQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLHFCQUFPLElBQUksQ0FBQzthQUNiLENBQUMsU0FDRixDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQUMsb0JBQU0sQ0FBQyxLQUFLLGlDQUErQixNQUFNLENBQUcsQ0FBQTthQUFDLENBQUMsQ0FBQztXQUNuRjs7O2lCQUdnQiw2QkFBRztBQUNsQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FDeEMsSUFBSSxDQUFDLFVBQUEsUUFBUTtxQkFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQUEsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDSyxvQkFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QyxxQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdkMsQ0FBQyxTQUNGLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFBQyxvQkFBTSxDQUFDLEtBQUssaUNBQStCLE1BQU0sQ0FBRyxDQUFBO2FBQUMsQ0FBQyxDQUFDO1dBQ25GOzs7ZUE1UFUsR0FBRyIsImZpbGUiOiJyZXNvdXJjZXMvQXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2FwaScpO1xuXG5sZXQgYmFzZVVybCA9ICdodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2FwaSc7XG5sZXQgcGFyc2UgPSBtZXNzYWdlID0+IEpTT04ucGFyc2UobWVzc2FnZS5yZXNwb25zZSk7XG5cbi8vIGh0dHA6Ly9ldXJvcGVwbWMub3JnL1Jlc3RmdWxXZWJTZXJ2aWNlI3NlYXJjaFxuLy8gaHR0cDovL3d3dy5lYmkuYWMudWsvZXVyb3BlcG1jL3dlYnNlcnZpY2VzL3Jlc3Qvc2VhcmNoL3Jlc3VsdHR5cGU9Y29yZSZmb3JtYXQ9anNvbiZxdWVyeT1zcmM6bWVkIGV4dF9pZDoxOTQ1NTAwXG4vLyBodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2V1cm9wZXBtYy93ZWJzZXJ2aWNlcy9yZXN0L3NlYXJjaC9yZXN1bHR0eXBlPWNvcmUmZm9ybWF0PWpzb24mcXVlcnk9c3JjOm1lZCAgLy8gcHJveGllZCB0byByZW1vdmUgQ09SUyBpc3N1ZVxuLy8gaHR0cDovL25leHQuYmVsZnJhbWV3b3JrLm9yZy9ldXJvcGVwbWMvd2Vic2VydmljZXMvcmVzdC9zZWFyY2gvcmVzdWx0dHlwZT1jb3JlJmZvcm1hdD1qc29uJnF1ZXJ5PXNyYzptZWQgZXh0X2lkOjE5NDU1MDBcbi8vIFVzaW5nIHRoaXMgdGVjaG5pcXVlIHRvIHByb3h5IGh0dHA6Ly9vc2thcmhhbmUuY29tL2F2b2lkLWNvcnMtd2l0aC1uZ2lueC1wcm94eV9wYXNzXG5sZXQgcHVibWVkQmFzZVVybCA9ICdodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2V1cm9wZXBtYy93ZWJzZXJ2aWNlcy9yZXN0L3NlYXJjaCc7XG5cbmV4cG9ydCBjbGFzcyBBcGkge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIFNpbXBsZSBBUEkgQ2xpZW50IC0gbm90IHByZWNvbmZpZ3VyZWQgd2l0aCBCYXNlVXJsXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIHRoaXMuY2xpZW50LmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnICAgICAgICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnRmV0Y2gnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVqZWN0RXJyb3JSZXNwb25zZXMoKVxuICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcbiAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7IC8vIHlvdSBjYW4gcmV0dXJuIGEgbW9kaWZpZWQgUmVxdWVzdCwgb3IgeW91IGNhbiBzaG9ydC1jaXJjdWl0IHRoZSByZXF1ZXN0IGJ5IHJldHVybmluZyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXNwb25zZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBPcGVuQkVMIEFQSSBDbGllbnQgLSBwcmVjb25maWd1cmVkIHdpdGggQmFzZVVybFxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICAvLyB0aGlzLmFwaUNsaWVudC5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLmFwaUNsaWVudC5jb25maWd1cmUoY29uZmlnID0+IHtcbiAgICAgIGNvbmZpZ1xuICAgICAgICAud2l0aEJhc2VVcmwoYmFzZVVybClcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCcgICAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWplY3RFcnJvclJlc3BvbnNlcygpXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXF1ZXN0LCBvciB5b3UgY2FuIHNob3J0LWNpcmN1aXQgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNwb25zZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlOyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFB1Ym1lZCBBUEkgQ2xpZW50IC0gcHJlY29uZmlndXJlZCB3aXRoIEJhc2VVcmxcbiAgICB0aGlzLnB1Ym1lZENsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgdGhpcy5wdWJtZWRDbGllbnQuY29uZmlndXJlKGNvbmZpZyA9PiB7XG4gICAgICBjb25maWdcbiAgICAgICAgLndpdGhCYXNlVXJsKHB1Ym1lZEJhc2VVcmwpXG4gICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnICAgICAgICAgIDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVqZWN0RXJyb3JSZXNwb25zZXMoKVxuICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcbiAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7IC8vIHlvdSBjYW4gcmV0dXJuIGEgbW9kaWZpZWQgUmVxdWVzdCwgb3IgeW91IGNhbiBzaG9ydC1jaXJjdWl0IHRoZSByZXF1ZXN0IGJ5IHJldHVybmluZyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzcG9uc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXNwb25zZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiA8cD5Qcm9jZXNzIGZhY2V0cyBmcm9tIHNlYXJjaDwvcD5cbiAgICogPHA+VGhpcyByZW1vdmVzIHRoZSBmYWNldHMgdGhhdCB3b24ndCBiZSB1c2VkIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlXG4gICAqICAgIGFuZCByZW9yZ2FuaXplcyBpdCBmb3IgcHJlc2VudGF0aW9uIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlLlxuICAgKiA8L3A+XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmYWNldHMgLSBmYWNldHMgcmV0dXJuZWQgYnkgQkVMIEFQSSBmcm9tIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBmYWNldHMgLSBmYWNldHMgYWZ0ZXIgcHJvY2Vzc2luZyB0byBiZSB1c2VkIGluIHdlYiBwYWdlXG4gICAqICovXG4gIHByb2Nlc3NGYWNldHMoZmFjZXRzKSB7XG4gICAgbGV0IG5ld19mYWNldHMgPSB7fTtcblxuICAgIGZvciAobGV0IGZhY2V0IG9mIGZhY2V0cykge1xuICAgICAgLy8gbG9nZ2VyLmRlYnVnKFwiRmFjZXQ6IFwiLCBmYWNldCk7XG4gICAgICBpZiAoZmFjZXQuY2F0ZWdvcnkgPT09ICdleHBlcmltZW50X2NvbnRleHQnIHx8IGZhY2V0Lm5hbWUgPT09ICdTdGF0dXMnKSB7XG4gICAgICAgIC8vIGxvZ2dlci5kZWJ1ZyhcIlN0YXR1cyBGYWNldDogXCIsIGZhY2V0KTtcbiAgICAgICAgbmV3X2ZhY2V0c1tmYWNldC5uYW1lXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBmYWNldC52YWx1ZXMpIHtcbiAgICAgICAgICBsZXQgbmFtZSA9IHZhbHVlW1widmFsdWVcIl07XG4gICAgICAgICAgbmV3X2ZhY2V0c1tmYWNldC5uYW1lXS5wdXNoKHtcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdjb3VudCcgOiB2YWx1ZS5jb3VudCxcbiAgICAgICAgICAgICdmaWx0ZXInIDogdmFsdWUuZmlsdGVyXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3X2ZhY2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIEJFTE1nciBkYXRhYmFzZSBhbmQgcmV0dXJuIHdlYnNpdGUgcmVhZHkgcmVzdWx0c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVyIC0gc2VhcmNoIHN0cmluZ1xuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHN0YXJ0IC0gcmVzdWx0IHBhZ2Ugc3RhcnRpbmcgcG9pbnQgKGRlZmF1bHQgPSAwKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHNpemUgLSBudW1iZXIgb2YgcmVzdWx0cyByZXR1cm5lZCAoZGVmYXVsdCA9IDEwKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGZhY2V0ZWQgLSBmYWNldCByZXN1bHRzIGlmIGVxdWFscyAxIChkZWZhdWx0ID0gMSlcbiAgICogQHJldHVybiB7UHJvbWlzZX0gZGF0YSAtIHByb2Nlc3NlZCBzZWFyY2ggcmVzdWx0cyByZWFkeSB0byBkaXNwbGF5IG9uIHRoZSBzZWFyY2ggcmVzdWx0cyB3ZWIgcGFnZVxuICAgKiAqL1xuICBzZWFyY2goc3RhcnQgPSAwLCBzaXplID0gMTAsIGZhY2V0ZWQgPSBcInllc1wiLCBmaWx0ZXJzKSB7XG4gICAgbGV0IG1heF92YWx1ZXNfcGVyX2ZhY2V0ID0gMjA7XG4gICAgbGV0IGdldHN0cmluZyA9IGAvZXZpZGVuY2U/c3RhcnQ9JHtzdGFydH0mc2l6ZT0ke3NpemV9JmZhY2V0ZWQ9JHtmYWNldGVkfSZtYXhfdmFsdWVzX3Blcl9mYWNldD0ke21heF92YWx1ZXNfcGVyX2ZhY2V0fWA7XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIGZvciAobGV0IGZpbHRlciBvZiBmaWx0ZXJzKSB7XG4gICAgICAgIGdldHN0cmluZyArPSBgJmZpbHRlcj0ke2ZpbHRlcn1gO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ0ZpbHRlcnMyOiAnLCBmaWx0ZXJzKTtcbiAgICAvLyBsb2dnZXIuZGVidWcoJ0dldHN0cmluZzogJywgZ2V0c3RyaW5nKTtcblxuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaChnZXRzdHJpbmcpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgbGV0IG5ld19kYXRhID0ge307XG4gICAgICAgICAgICAgIG5ld19kYXRhWydldmlkZW5jZXMnXSA9IGRhdGEuZXZpZGVuY2U7XG4gICAgICAgICAgICAgIG5ld19kYXRhWydmYWNldHMnXSA9IHRoaXMucHJvY2Vzc0ZhY2V0cyhkYXRhLmZhY2V0cyk7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnTmV3IERhdGE6ICcsIG5ld19kYXRhKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld19kYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbi5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcImV2aWRlbmNlc1wiOiBudWxsLCBcImZhY2V0c1wiOiB7fX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFwiU2VhcmNoIEFQSSBFcnJvcjogXCIsIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBCRUwgRXZpZGVuY2UgZnJvbSBBUEkgU2VydmljZVxuICAgKlxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgZXZpZGVuY2Ugb2JqZWN0XG4gICAqL1xuICBnZXRCZWxFdmlkZW5jZShpZCkge1xuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaChgL2V2aWRlbmNlLyR7aWR9YClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdCRUwgRXZpZGVuY2U6ICcsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbJ2V2aWRlbmNlJ11bMF07XG4gICAgICAgICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbikge2xvZ2dlci5lcnJvcihgR0VUIEJFTCBFdmlkZW5jZSBFcnJvcjogJHtyZWFzb259YCl9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgQkVMIEV2aWRlbmNlIChQT1NUIG9yIFBVVClcbiAgICpcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBldmlkZW5jZVxuICAgKi9cbiAgbG9hZEJlbEV2aWRlbmNlKGlkLCBldmlkZW5jZSkge1xuICAgIGlmIChpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKGAvZXZpZGVuY2UvJHtpZH1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2aWRlbmNlKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7bG9nZ2VyLmVycm9yKGBQT1NUIEJFTCBFdmlkZW5jZSBFcnJvcjogJHtyZWFzb259YCl9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQuZmV0Y2goYC9ldmlkZW5jZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmlkZW5jZSlcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtsb2dnZXIuZXJyb3IoYFBVVCBCRUwgRXZpZGVuY2UgRXJyb3I6ICR7cmVhc29ufWApfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBCRUwgY29tcG9uZW50cyAoc3ViamVjdCwgcmVsYXRpb24sIG9iamVjdCkgZnJvbSBhIEJFTCBzdGF0ZW1lbnRcbiAgICogQHBhcmFtIGJlbFN0YXRlbWVudFxuICAgKiBAcmV0dXJucyB7XCJzdWJqZWN0XCI6IFwiXCIsIFwicmVsYXRpb25zaGlwXCI6IFwiXCIsIFwib2JqZWN0XCI6IFwiXCJ9XG4gICAqL1xuICBnZXRCZWxDb21wb25lbnRzKGJlbFN0YXRlbWVudCkge1xuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaChgL2V4cHJlc3Npb25zLyR7YmVsU3RhdGVtZW50fS9jb21wb25lbnRzYClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ0JFTCBFdmlkZW5jZTogJywgZGF0YSk7XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhWydleHByZXNzaW9uX2NvbXBvbmVudHMnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7bG9nZ2VyLmVycm9yKGBHRVQgQkVMIENvbXBvbmVudHMgRXJyb3I6ICR7cmVhc29ufWApfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFB1Ym1lZCBkb2N1bWVudCBpbmZvcm1hdGlvbiAtIGUuZy4gdGl0bGUsIGFic3RyYWN0LCBldGMuXG4gICAqXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFB1Ym1lZChpZCkge1xuICAgIGxldCBnZXRzdHJpbmcgPSBgL3Jlc3VsdHR5cGU9Y29yZSZmb3JtYXQ9anNvbiZxdWVyeT1leHRfaWQ6JHtpZH0gc3JjOm1lZGA7XG5cbiAgICByZXR1cm4gdGhpcy5wdWJtZWRDbGllbnQuZmV0Y2goZ2V0c3RyaW5nKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKCdQdWJtZWQ6ICcsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEucmVzdWx0TGlzdC5yZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7bG9nZ2VyLmVycm9yKGBHRVQgUHVibWVkIEVycm9yOiAke3JlYXNvbn1gKX0pO1xuICB9XG5cbiAgLy8gR2V0IGxpc3Qgb2YgYWxsIEJFTCBSZWxhdGlvbnNcbiAgZ2V0QmVsUmVsYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaCgnL2Fubm90YXRpb25zJylcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0dFVCBCRUwgQW5ub3RhdGlvbnM6ICcsIGRhdGEpO1xuICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7bG9nZ2VyLmVycm9yKGBHRVQgQkVMIEFubm90YXRpb25zIEVycm9yOiAke3JlYXNvbn1gKX0pO1xuICB9XG5cbiAgLy8gR2V0IGxpc3Qgb2YgYWxsIEJFTCBBbm5vdGF0aW9uIFJlc291cmNlc1xuICBnZXRCZWxBbm5vdGF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQuZmV0Y2goJy9hbm5vdGF0aW9ucycpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0dFVCBCRUwgQW5ub3RhdGlvbnM6ICcsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhWydhbm5vdGF0aW9ucyddO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihyZWFzb24pIHtsb2dnZXIuZXJyb3IoYEdFVCBCRUwgQW5ub3RhdGlvbnMgRXJyb3I6ICR7cmVhc29ufWApfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==