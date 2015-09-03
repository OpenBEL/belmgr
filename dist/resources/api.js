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

            var max_values_per_facet = 10;
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

            logger.debug('Getstring: ', getstring);

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
//# sourceMappingURL=data:application/json;base64,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bUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQ3hDLElBQUksQ0FBQyxVQUFBLFFBQVE7cUJBQUksUUFBUSxDQUFDLElBQUksRUFBRTthQUFBLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ04sb0JBQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUMscUJBQU8sSUFBSSxDQUFDO2FBQ2IsQ0FBQyxTQUNGLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFBQyxvQkFBTSxDQUFDLEtBQUssaUNBQStCLE1BQU0sQ0FBRyxDQUFBO2FBQUMsQ0FBQyxDQUFDO1dBQ25GOzs7aUJBR2dCLDZCQUFHO0FBQ2xCLG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUN4QyxJQUFJLENBQUMsVUFBQSxRQUFRO3FCQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7YUFBQSxDQUFDLENBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNLLG9CQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLHFCQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN2QyxDQUFDLFNBQ0YsQ0FBQyxVQUFTLE1BQU0sRUFBRTtBQUFDLG9CQUFNLENBQUMsS0FBSyxpQ0FBK0IsTUFBTSxDQUFHLENBQUE7YUFBQyxDQUFDLENBQUM7V0FDbkY7OztlQTVQVSxHQUFHIiwiZmlsZSI6InJlc291cmNlcy9hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XG5pbXBvcnQgJ2ZldGNoJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcignYXBpJyk7XG5cbmxldCBiYXNlVXJsID0gJ2h0dHA6Ly9uZXh0LmJlbGZyYW1ld29yay5vcmcvYXBpJztcbmxldCBwYXJzZSA9IG1lc3NhZ2UgPT4gSlNPTi5wYXJzZShtZXNzYWdlLnJlc3BvbnNlKTtcblxuLy8gaHR0cDovL2V1cm9wZXBtYy5vcmcvUmVzdGZ1bFdlYlNlcnZpY2Ujc2VhcmNoXG4vLyBodHRwOi8vd3d3LmViaS5hYy51ay9ldXJvcGVwbWMvd2Vic2VydmljZXMvcmVzdC9zZWFyY2gvcmVzdWx0dHlwZT1jb3JlJmZvcm1hdD1qc29uJnF1ZXJ5PXNyYzptZWQgZXh0X2lkOjE5NDU1MDBcbi8vIGh0dHA6Ly9uZXh0LmJlbGZyYW1ld29yay5vcmcvZXVyb3BlcG1jL3dlYnNlcnZpY2VzL3Jlc3Qvc2VhcmNoL3Jlc3VsdHR5cGU9Y29yZSZmb3JtYXQ9anNvbiZxdWVyeT1zcmM6bWVkICAvLyBwcm94aWVkIHRvIHJlbW92ZSBDT1JTIGlzc3VlXG4vLyBodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2V1cm9wZXBtYy93ZWJzZXJ2aWNlcy9yZXN0L3NlYXJjaC9yZXN1bHR0eXBlPWNvcmUmZm9ybWF0PWpzb24mcXVlcnk9c3JjOm1lZCBleHRfaWQ6MTk0NTUwMFxuLy8gVXNpbmcgdGhpcyB0ZWNobmlxdWUgdG8gcHJveHkgaHR0cDovL29za2FyaGFuZS5jb20vYXZvaWQtY29ycy13aXRoLW5naW54LXByb3h5X3Bhc3NcbmxldCBwdWJtZWRCYXNlVXJsID0gJ2h0dHA6Ly9uZXh0LmJlbGZyYW1ld29yay5vcmcvZXVyb3BlcG1jL3dlYnNlcnZpY2VzL3Jlc3Qvc2VhcmNoJztcblxuZXhwb3J0IGNsYXNzIEFwaSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gU2ltcGxlIEFQSSBDbGllbnQgLSBub3QgcHJlY29uZmlndXJlZCB3aXRoIEJhc2VVcmxcbiAgICB0aGlzLmNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgdGhpcy5jbGllbnQuY29uZmlndXJlKGNvbmZpZyA9PiB7XG4gICAgICBjb25maWdcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCcgICAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWplY3RFcnJvclJlc3BvbnNlcygpXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXF1ZXN0LCBvciB5b3UgY2FuIHNob3J0LWNpcmN1aXQgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNwb25zZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlOyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE9wZW5CRUwgQVBJIENsaWVudCAtIHByZWNvbmZpZ3VyZWQgd2l0aCBCYXNlVXJsXG4gICAgdGhpcy5hcGlDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIC8vIHRoaXMuYXBpQ2xpZW50LmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIHRoaXMuYXBpQ2xpZW50LmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgY29uZmlnXG4gICAgICAgIC53aXRoQmFzZVVybChiYXNlVXJsKVxuICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JyAgICAgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlamVjdEVycm9yUmVzcG9uc2VzKClcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0OyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlcXVlc3QsIG9yIHlvdSBjYW4gc2hvcnQtY2lyY3VpdCB0aGUgcmVxdWVzdCBieSByZXR1cm5pbmcgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZWNlaXZlZCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS51cmx9YCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7IC8vIHlvdSBjYW4gcmV0dXJuIGEgbW9kaWZpZWQgUmVzcG9uc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUHVibWVkIEFQSSBDbGllbnQgLSBwcmVjb25maWd1cmVkIHdpdGggQmFzZVVybFxuICAgIHRoaXMucHVibWVkQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB0aGlzLnB1Ym1lZENsaWVudC5jb25maWd1cmUoY29uZmlnID0+IHtcbiAgICAgIGNvbmZpZ1xuICAgICAgICAud2l0aEJhc2VVcmwocHVibWVkQmFzZVVybClcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCcgICAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWplY3RFcnJvclJlc3BvbnNlcygpXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXF1ZXN0LCBvciB5b3UgY2FuIHNob3J0LWNpcmN1aXQgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNwb25zZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlOyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlc3BvbnNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIDxwPlByb2Nlc3MgZmFjZXRzIGZyb20gc2VhcmNoPC9wPlxuICAgKiA8cD5UaGlzIHJlbW92ZXMgdGhlIGZhY2V0cyB0aGF0IHdvbid0IGJlIHVzZWQgaW4gdGhlIHNlYXJjaCByZXN1bHRzIHBhZ2VcbiAgICogICAgYW5kIHJlb3JnYW5pemVzIGl0IGZvciBwcmVzZW50YXRpb24gaW4gdGhlIHNlYXJjaCByZXN1bHRzIHBhZ2UuXG4gICAqIDwvcD5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGZhY2V0cyAtIGZhY2V0cyByZXR1cm5lZCBieSBCRUwgQVBJIGZyb20gc2VhcmNoXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGZhY2V0cyAtIGZhY2V0cyBhZnRlciBwcm9jZXNzaW5nIHRvIGJlIHVzZWQgaW4gd2ViIHBhZ2VcbiAgICogKi9cbiAgcHJvY2Vzc0ZhY2V0cyhmYWNldHMpIHtcbiAgICBsZXQgbmV3X2ZhY2V0cyA9IHt9O1xuXG4gICAgZm9yIChsZXQgZmFjZXQgb2YgZmFjZXRzKSB7XG4gICAgICAvLyBsb2dnZXIuZGVidWcoXCJGYWNldDogXCIsIGZhY2V0KTtcbiAgICAgIGlmIChmYWNldC5jYXRlZ29yeSA9PT0gJ2V4cGVyaW1lbnRfY29udGV4dCcgfHwgZmFjZXQubmFtZSA9PT0gJ1N0YXR1cycpIHtcbiAgICAgICAgLy8gbG9nZ2VyLmRlYnVnKFwiU3RhdHVzIEZhY2V0OiBcIiwgZmFjZXQpO1xuICAgICAgICBuZXdfZmFjZXRzW2ZhY2V0Lm5hbWVdID0gW107XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGZhY2V0LnZhbHVlcykge1xuICAgICAgICAgIGxldCBuYW1lID0gdmFsdWVbXCJ2YWx1ZVwiXTtcbiAgICAgICAgICBuZXdfZmFjZXRzW2ZhY2V0Lm5hbWVdLnB1c2goe1xuICAgICAgICAgICAgJ25hbWUnOiBuYW1lLFxuICAgICAgICAgICAgJ2NvdW50JyA6IHZhbHVlLmNvdW50LFxuICAgICAgICAgICAgJ2ZpbHRlcicgOiB2YWx1ZS5maWx0ZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdfZmFjZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgQkVMTWdyIGRhdGFiYXNlIGFuZCByZXR1cm4gd2Vic2l0ZSByZWFkeSByZXN1bHRzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXIgLSBzZWFyY2ggc3RyaW5nXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gc3RhcnQgLSByZXN1bHQgcGFnZSBzdGFydGluZyBwb2ludCAoZGVmYXVsdCA9IDApXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gc2l6ZSAtIG51bWJlciBvZiByZXN1bHRzIHJldHVybmVkIChkZWZhdWx0ID0gMTApXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gZmFjZXRlZCAtIGZhY2V0IHJlc3VsdHMgaWYgZXF1YWxzIDEgKGRlZmF1bHQgPSAxKVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBkYXRhIC0gcHJvY2Vzc2VkIHNlYXJjaCByZXN1bHRzIHJlYWR5IHRvIGRpc3BsYXkgb24gdGhlIHNlYXJjaCByZXN1bHRzIHdlYiBwYWdlXG4gICAqICovXG4gIHNlYXJjaChzdGFydCA9IDAsIHNpemUgPSAxMCwgZmFjZXRlZCA9IFwieWVzXCIsIGZpbHRlcnMpIHtcbiAgICBsZXQgbWF4X3ZhbHVlc19wZXJfZmFjZXQgPSAxMDtcbiAgICBsZXQgZ2V0c3RyaW5nID0gYC9ldmlkZW5jZT9zdGFydD0ke3N0YXJ0fSZzaXplPSR7c2l6ZX0mZmFjZXRlZD0ke2ZhY2V0ZWR9Jm1heF92YWx1ZXNfcGVyX2ZhY2V0PSR7bWF4X3ZhbHVlc19wZXJfZmFjZXR9YDtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgZm9yIChsZXQgZmlsdGVyIG9mIGZpbHRlcnMpIHtcbiAgICAgICAgZ2V0c3RyaW5nICs9IGAmZmlsdGVyPSR7ZmlsdGVyfWA7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGxvZ2dlci5kZWJ1ZygnRmlsdGVyczI6ICcsIGZpbHRlcnMpO1xuICAgIGxvZ2dlci5kZWJ1ZygnR2V0c3RyaW5nOiAnLCBnZXRzdHJpbmcpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKGdldHN0cmluZylcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBsZXQgbmV3X2RhdGEgPSB7fTtcbiAgICAgICAgICAgICAgbmV3X2RhdGFbJ2V2aWRlbmNlcyddID0gZGF0YS5ldmlkZW5jZTtcbiAgICAgICAgICAgICAgbmV3X2RhdGFbJ2ZhY2V0cyddID0gdGhpcy5wcm9jZXNzRmFjZXRzKGRhdGEuZmFjZXRzKTtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdOZXcgRGF0YTogJywgbmV3X2RhdGEpO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3X2RhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1wiZXZpZGVuY2VzXCI6IG51bGwsIFwiZmFjZXRzXCI6IHt9fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoXCJTZWFyY2ggQVBJIEVycm9yOiBcIiwgcmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IEJFTCBFdmlkZW5jZSBmcm9tIEFQSSBTZXJ2aWNlXG4gICAqXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyBldmlkZW5jZSBvYmplY3RcbiAgICovXG4gIGdldEJlbEV2aWRlbmNlKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKGAvZXZpZGVuY2UvJHtpZH1gKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ0JFTCBFdmlkZW5jZTogJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVsnZXZpZGVuY2UnXVswXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7bG9nZ2VyLmVycm9yKGBHRVQgQkVMIEV2aWRlbmNlIEVycm9yOiAke3JlYXNvbn1gKX0pO1xuXG4gIH1cblxuICAvKipcbiAgICogTG9hZCBCRUwgRXZpZGVuY2UgKFBPU1Qgb3IgUFVUKVxuICAgKlxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGV2aWRlbmNlXG4gICAqL1xuICBsb2FkQmVsRXZpZGVuY2UoaWQsIGV2aWRlbmNlKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQuZmV0Y2goYC9ldmlkZW5jZS8ke2lkfWAsIHtcbiAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZpZGVuY2UpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtsb2dnZXIuZXJyb3IoYFBPU1QgQkVMIEV2aWRlbmNlIEVycm9yOiAke3JlYXNvbn1gKX0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaChgL2V2aWRlbmNlLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2aWRlbmNlKVxuICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge2xvZ2dlci5lcnJvcihgUFVUIEJFTCBFdmlkZW5jZSBFcnJvcjogJHtyZWFzb259YCl9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IEJFTCBjb21wb25lbnRzIChzdWJqZWN0LCByZWxhdGlvbiwgb2JqZWN0KSBmcm9tIGEgQkVMIHN0YXRlbWVudFxuICAgKiBAcGFyYW0gYmVsU3RhdGVtZW50XG4gICAqIEByZXR1cm5zIHtcInN1YmplY3RcIjogXCJcIiwgXCJyZWxhdGlvbnNoaXBcIjogXCJcIiwgXCJvYmplY3RcIjogXCJcIn1cbiAgICovXG4gIGdldEJlbENvbXBvbmVudHMoYmVsU3RhdGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKGAvZXhwcmVzc2lvbnMvJHtiZWxTdGF0ZW1lbnR9L2NvbXBvbmVudHNgKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnQkVMIEV2aWRlbmNlOiAnLCBkYXRhKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbJ2V4cHJlc3Npb25fY29tcG9uZW50cyddO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihyZWFzb24pIHtsb2dnZXIuZXJyb3IoYEdFVCBCRUwgQ29tcG9uZW50cyBFcnJvcjogJHtyZWFzb259YCl9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgUHVibWVkIGRvY3VtZW50IGluZm9ybWF0aW9uIC0gZS5nLiB0aXRsZSwgYWJzdHJhY3QsIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0UHVibWVkKGlkKSB7XG4gICAgbGV0IGdldHN0cmluZyA9IGAvcmVzdWx0dHlwZT1jb3JlJmZvcm1hdD1qc29uJnF1ZXJ5PWV4dF9pZDoke2lkfSBzcmM6bWVkYDtcblxuICAgIHJldHVybiB0aGlzLnB1Ym1lZENsaWVudC5mZXRjaChnZXRzdHJpbmcpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2dnZXIuZGVidWcoJ1B1Ym1lZDogJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHRMaXN0LnJlc3VsdFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihyZWFzb24pIHtsb2dnZXIuZXJyb3IoYEdFVCBQdWJtZWQgRXJyb3I6ICR7cmVhc29ufWApfSk7XG4gIH1cblxuICAvLyBHZXQgbGlzdCBvZiBhbGwgQkVMIFJlbGF0aW9uc1xuICBnZXRCZWxSZWxhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpQ2xpZW50LmZldGNoKCcvYW5ub3RhdGlvbnMnKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnR0VUIEJFTCBBbm5vdGF0aW9uczogJywgZGF0YSk7XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihyZWFzb24pIHtsb2dnZXIuZXJyb3IoYEdFVCBCRUwgQW5ub3RhdGlvbnMgRXJyb3I6ICR7cmVhc29ufWApfSk7XG4gIH1cblxuICAvLyBHZXQgbGlzdCBvZiBhbGwgQkVMIEFubm90YXRpb24gUmVzb3VyY2VzXG4gIGdldEJlbEFubm90YXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmFwaUNsaWVudC5mZXRjaCgnL2Fubm90YXRpb25zJylcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnR0VUIEJFTCBBbm5vdGF0aW9uczogJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbJ2Fubm90YXRpb25zJ107XG4gICAgICAgICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbikge2xvZ2dlci5lcnJvcihgR0VUIEJFTCBBbm5vdGF0aW9ucyBFcnJvcjogJHtyZWFzb259YCl9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9