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

      pubmedBaseUrl = 'http://www.ebi.ac.uk/europepmc/webservices/rest/search';

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
                  new_facets[facet.name] = {};
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = _getIterator(facet.values), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var value = _step2.value;

                      var _name = value["value"];
                      new_facets[facet.name][_name] = {
                        'count': value.count,
                        'filter': value.filter
                      };
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
          value: function search() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            var _this = this;

            var size = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
            var faceted = arguments.length <= 2 || arguments[2] === undefined ? "yes" : arguments[2];

            var max_values_per_facet = 20;
            var getstring = '/evidence?start=' + start + '&size=' + size + '&faceted=' + faceted + '&max_values_per_facet=' + max_values_per_facet;

            return this.apiClient.fetch(getstring).then(function (response) {
              return response.json();
            }).then(function (data) {
              var new_data = {};
              new_data['evidences'] = data.evidence;
              new_data['facets'] = _this.process_facets(data.facets);
              return new_data;
            })['catch'](function (reason) {
              console.log('Search Error: ' + reason);
            });
          }
        }]);

        return Api;
      })();

      _export('Api', Api);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LENBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNOLGtCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsc0JBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3RDLHNCQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBSyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RELHFCQUFPLFFBQVEsQ0FBQzthQUNqQixDQUFDLFNBQ0YsQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUNoQixxQkFBTyxDQUFDLEdBQUcsb0JBQWtCLE1BQU0sQ0FBRyxDQUFBO2FBQ3ZDLENBQUMsQ0FBQztXQUNiOzs7ZUF6RlUsR0FBRyIsImZpbGUiOiJyZXNvdXJjZXMvYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0ICdmZXRjaCc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2FwaScpO1xuXG5sZXQgYmFzZVVybCA9ICdodHRwOi8vbmV4dC5iZWxmcmFtZXdvcmsub3JnL2FwaSc7XG5sZXQgcGFyc2UgPSBtZXNzYWdlID0+IEpTT04ucGFyc2UobWVzc2FnZS5yZXNwb25zZSk7XG5cbi8vIGh0dHA6Ly9ldXJvcGVwbWMub3JnL1Jlc3RmdWxXZWJTZXJ2aWNlI3NlYXJjaFxuLy8gaHR0cDovL3d3dy5lYmkuYWMudWsvZXVyb3BlcG1jL3dlYnNlcnZpY2VzL3Jlc3Qvc2VhcmNoL3Jlc3VsdHR5cGU9Y29yZSZmb3JtYXQ9anNvbiZxdWVyeT1zcmM6bWVkIGV4dF9pZDoxOTQ1NTAwXG5sZXQgcHVibWVkQmFzZVVybCA9ICdodHRwOi8vd3d3LmViaS5hYy51ay9ldXJvcGVwbWMvd2Vic2VydmljZXMvcmVzdC9zZWFyY2gnO1xuXG5leHBvcnQgY2xhc3MgQXBpIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICAvLyB0aGlzLmFwaUNsaWVudC5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB0aGlzLmFwaUNsaWVudC5jb25maWd1cmUoY29uZmlnID0+IHtcbiAgICAgIGNvbmZpZ1xuICAgICAgICAud2l0aEJhc2VVcmwoYmFzZVVybClcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCcgICAgICAgICAgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWplY3RFcnJvclJlc3BvbnNlcygpXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0OyAvLyB5b3UgY2FuIHJldHVybiBhIG1vZGlmaWVkIFJlcXVlc3QsIG9yIHlvdSBjYW4gc2hvcnQtY2lyY3VpdCB0aGUgcmVxdWVzdCBieSByZXR1cm5pbmcgYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTsgLy8geW91IGNhbiByZXR1cm4gYSBtb2RpZmllZCBSZXNwb25zZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbi8vICAgIHRoaXMucHVibWVkQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcbi8vICAgIHRoaXMucHVibWVkQ2xpZW50LmJhc2VVcmwgPSBwdWJtZWRCYXNlVXJsO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiA8cD5Qcm9jZXNzIGZhY2V0cyBmcm9tIHNlYXJjaDwvcD5cbiAgICogPHA+VGhpcyByZW1vdmVzIHRoZSBmYWNldHMgdGhhdCB3b24ndCBiZSB1c2VkIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlXG4gICAqICAgIGFuZCByZW9yZ2FuaXplcyBpdCBmb3IgcHJlc2VudGF0aW9uIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlLlxuICAgKiA8L3A+XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmYWNldHMgLSBmYWNldHMgcmV0dXJuZWQgYnkgQkVMIEFQSSBmcm9tIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBmYWNldHMgLSBmYWNldHMgYWZ0ZXIgcHJvY2Vzc2luZyB0byBiZSB1c2VkIGluIHdlYiBwYWdlXG4gICAqICovXG4gIHByb2Nlc3NfZmFjZXRzKGZhY2V0cykge1xuICAgIGxldCBuZXdfZmFjZXRzID0ge307XG5cbiAgICBmb3IgKGxldCBmYWNldCBvZiBmYWNldHMpIHtcbiAgICAgIC8vIGxvZ2dlci5kZWJ1ZyhcIkZhY2V0OiBcIiwgZmFjZXQpO1xuICAgICAgaWYgKGZhY2V0LmNhdGVnb3J5ID09PSAnZXhwZXJpbWVudF9jb250ZXh0JyB8fCBmYWNldC5uYW1lID09PSAnU3RhdHVzJykge1xuICAgICAgICAvLyBsb2dnZXIuZGVidWcoXCJTdGF0dXMgRmFjZXQ6IFwiLCBmYWNldCk7XG4gICAgICAgIG5ld19mYWNldHNbZmFjZXQubmFtZV0gPSB7fTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgZmFjZXQudmFsdWVzKSB7XG4gICAgICAgICAgbGV0IG5hbWUgPSB2YWx1ZVtcInZhbHVlXCJdO1xuICAgICAgICAgIG5ld19mYWNldHNbZmFjZXQubmFtZV1bbmFtZV0gPSB7XG4gICAgICAgICAgICAnY291bnQnIDogdmFsdWUuY291bnQsXG4gICAgICAgICAgICAnZmlsdGVyJyA6IHZhbHVlLmZpbHRlclxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3X2ZhY2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIEJFTE1nciBkYXRhYmFzZSBhbmQgcmV0dXJuIHdlYnNpdGUgcmVhZHkgcmVzdWx0c1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVyIC0gc2VhcmNoIHN0cmluZ1xuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHN0YXJ0IC0gcmVzdWx0IHBhZ2Ugc3RhcnRpbmcgcG9pbnQgKGRlZmF1bHQgPSAwKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHNpemUgLSBudW1iZXIgb2YgcmVzdWx0cyByZXR1cm5lZCAoZGVmYXVsdCA9IDEwKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGZhY2V0ZWQgLSBmYWNldCByZXN1bHRzIGlmIGVxdWFscyAxIChkZWZhdWx0ID0gMSlcbiAgICogQHJldHVybiB7UHJvbWlzZX0gZGF0YSAtIHByb2Nlc3NlZCBzZWFyY2ggcmVzdWx0cyByZWFkeSB0byBkaXNwbGF5IG9uIHRoZSBzZWFyY2ggcmVzdWx0cyB3ZWIgcGFnZVxuICAgKiAqL1xuICBzZWFyY2goc3RhcnQgPSAwLCBzaXplID0gMTAsIGZhY2V0ZWQgPSBcInllc1wiKSB7XG4gICAgbGV0IG1heF92YWx1ZXNfcGVyX2ZhY2V0ID0gMjA7XG4gICAgbGV0IGdldHN0cmluZyA9IGAvZXZpZGVuY2U/c3RhcnQ9JHtzdGFydH0mc2l6ZT0ke3NpemV9JmZhY2V0ZWQ9JHtmYWNldGVkfSZtYXhfdmFsdWVzX3Blcl9mYWNldD0ke21heF92YWx1ZXNfcGVyX2ZhY2V0fWA7XG5cbiAgICByZXR1cm4gdGhpcy5hcGlDbGllbnQuZmV0Y2goZ2V0c3RyaW5nKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGxldCBuZXdfZGF0YSA9IHt9O1xuICAgICAgICAgICAgICBuZXdfZGF0YVsnZXZpZGVuY2VzJ10gPSBkYXRhLmV2aWRlbmNlO1xuICAgICAgICAgICAgICBuZXdfZGF0YVsnZmFjZXRzJ10gPSB0aGlzLnByb2Nlc3NfZmFjZXRzKGRhdGEuZmFjZXRzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ld19kYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2VhcmNoIEVycm9yOiAke3JlYXNvbn1gKVxuICAgICAgICAgICAgIH0pO1xuICB9XG5cbi8vICBnZXRQdWJtZWQoaWQpIHtcbi8vICAgIGxldCBnZXRzdHJpbmcgPSBgL3Jlc3VsdHR5cGU9Y29yZSZmb3JtYXQ9anNvbiZxdWVyeT1zcmM6bWVkIGV4dF9pZDoke2lkfWA7XG4vLyAgICBsZXQgcmVzdWx0cyA9IHt9O1xuLy8gICAgcmV0dXJuIHRoaXMucHVibWVkQ2xpZW50LmZldGNoKGdldHN0cmluZylcbi8vICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgICAuY2F0Y2goZnVuY3Rpb24ocmVhc29uKSB7Y29uc29sZS5sb2coYGdldFB1Ym1lZCBFcnJvcjogJHtyZWFzb259YCl9KTtcbi8vICB9XG4vLyAgICAgIHRoaXMuYXBpLmdldFB1Ym1lZCgnMTk0NTUwMCcpXG4vLyAgICAgICAgLnRoZW4ocmVzdWx0cyA9PiBjb25zb2xlLmxvZyhyZXN1bHRzKSlcbi8vICAgICAgICAuY2F0Y2gocmVhc29uID0+IGNvbnNvbGUubG9nKGBQdWJtZWQgRXJyb3I6ICR7cmVhc29ufWApKTtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9