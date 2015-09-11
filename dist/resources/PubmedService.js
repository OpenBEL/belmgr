System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', './api'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, Api, logger, PubmedService;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_api) {
      Api = _api.Api;
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('pubmed');

      PubmedService = (function () {
        function PubmedService(api) {
          _classCallCheck(this, _PubmedService);

          this.api = api;
          this.pubmed = {};
        }

        _createClass(PubmedService, [{
          key: 'getPubmed',
          value: function getPubmed(id) {
            return _regeneratorRuntime.async(function getPubmed$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.prev = 0;
                  context$2$0.next = 3;
                  return _regeneratorRuntime.awrap(this.api.getPubmed(id));

                case 3:
                  this.pubmed = context$2$0.sent;

                  if (this.pubmed) {
                    this.enhancePubmed();
                  }

                  logger.debug('PubMed ID: ' + id + '  Pubmed: ' + this.pubmed);
                  return context$2$0.abrupt('return', this.pubmed);

                case 9:
                  context$2$0.prev = 9;
                  context$2$0.t0 = context$2$0['catch'](0);

                  logger.error('GET Pubmed error: ', context$2$0.t0);

                case 12:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[0, 9]]);
          }
        }, {
          key: 'enhancePubmed',
          value: function enhancePubmed() {
            this.pubmed.bel = { 'mismatch': { 'date': false, 'refString': false, 'authors': false, 'comment': false } };

            this.pubmed.bel.refString = this.pubmed.journalInfo.journal.isoabbreviation;
            this.pubmed.bel.refString += ', ' + this.pubmed.journalInfo.dateOfPublication + ',';
            this.pubmed.bel.refString += ' ' + this.pubmed.journalInfo.volume;
            if (this.pubmed.journalInfo.issue) {
              this.pubmed.bel.refString += '(' + this.pubmed.journalInfo.issue + ')';
            }
            this.pubmed.bel.refString += ' p:' + this.pubmed.pageInfo;

            this.pubmed.bel.authors = this.pubmed.authorString.replace(/,/g, '|').replace(/\.$/, '');
          }
        }]);

        var _PubmedService = PubmedService;
        PubmedService = inject(Api)(PubmedService) || PubmedService;
        return PubmedService;
      })();

      _export('PubmedService', PubmedService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9QdWJtZWRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7bUZBSUksTUFBTSxFQUdHLGFBQWE7Ozs7Ozs7Ozs7aUNBUGxCLE1BQU07cUNBR04sVUFBVTs7aUJBRlYsR0FBRzs7Ozs7QUFHUCxZQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0FBRzlCLG1CQUFhO0FBRWIsaUJBRkEsYUFBYSxDQUVaLEdBQUcsRUFBRTs7O0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjs7cUJBTFUsYUFBYTs7aUJBT1QsbUJBQUMsRUFBRTs7Ozs7O21EQUdNLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7O0FBQTFDLHNCQUFJLENBQUMsTUFBTTs7QUFHWCxzQkFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQUMsd0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzttQkFBQzs7QUFFeEMsd0JBQU0sQ0FBQyxLQUFLLGlCQUFlLEVBQUUsa0JBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBRyxDQUFDO3NEQUNsRCxJQUFJLENBQUMsTUFBTTs7Ozs7O0FBR2xCLHdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixpQkFBTSxDQUFDOzs7Ozs7O1dBRzNDOzs7aUJBRVkseUJBQUc7QUFDZCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLEVBQUMsQ0FBQzs7QUFFeEcsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQzVFLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLFdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLE1BQUcsQ0FBQztBQUMvRSxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxVQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQUFBRSxDQUFDO0FBQ2xFLGdCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUNqQyxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxVQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssTUFBRyxDQUFDO2FBQ25FO0FBQ0QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsWUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQUFBRSxDQUFDOztBQUcxRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztXQUMzRjs7OzZCQXJDVSxhQUFhO0FBQWIscUJBQWEsR0FEekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNDLGFBQWEsS0FBYixhQUFhO2VBQWIsYUFBYSIsImZpbGUiOiJyZXNvdXJjZXMvUHVibWVkU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwaX0gZnJvbSAnLi9hcGknO1xuXG5pbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmxldCBsb2dnZXIgPSBMb2dNYW5hZ2VyLmdldExvZ2dlcigncHVibWVkJyk7XG5cbkBpbmplY3QoQXBpKVxuZXhwb3J0IGNsYXNzIFB1Ym1lZFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGFwaSkge1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucHVibWVkID0ge307XG4gIH1cblxuICBhc3luYyBnZXRQdWJtZWQoaWQpIHtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLnB1Ym1lZCA9IGF3YWl0IHRoaXMuYXBpLmdldFB1Ym1lZChpZCk7XG5cbiAgICAgIC8vIGZpbHRlciBhbmQgZW5oYW5jZSBQdWJNZWQgb2JqZWN0XG4gICAgICBpZiAodGhpcy5wdWJtZWQpIHt0aGlzLmVuaGFuY2VQdWJtZWQoKTt9XG5cbiAgICAgIGxvZ2dlci5kZWJ1ZyhgUHViTWVkIElEOiAke2lkfSAgUHVibWVkOiAke3RoaXMucHVibWVkfWApO1xuICAgICAgcmV0dXJuIHRoaXMucHVibWVkO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBQdWJtZWQgZXJyb3I6ICcsIGVycik7XG4gICAgfVxuXG4gIH1cblxuICBlbmhhbmNlUHVibWVkKCkge1xuICAgIHRoaXMucHVibWVkLmJlbCA9IHsnbWlzbWF0Y2gnOiB7J2RhdGUnOiBmYWxzZSwgJ3JlZlN0cmluZyc6IGZhbHNlLCAnYXV0aG9ycyc6IGZhbHNlLCAnY29tbWVudCc6IGZhbHNlfX07XG4gICAgLy8gQWRkIHJlZmVyZW5jZSBzdHJpbmcgLSBlLmcuIEogTGlwaWQgUmVzIDIwMDIgSmFuIDQzKDEpIDItMTJcbiAgICB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nID0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8uam91cm5hbC5pc29hYmJyZXZpYXRpb247XG4gICAgdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZyArPSBgLCAke3RoaXMucHVibWVkLmpvdXJuYWxJbmZvLmRhdGVPZlB1YmxpY2F0aW9ufSxgO1xuICAgIHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcgKz0gYCAke3RoaXMucHVibWVkLmpvdXJuYWxJbmZvLnZvbHVtZX1gO1xuICAgIGlmICh0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5pc3N1ZSkge1xuICAgICAgdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZyArPSBgKCR7dGhpcy5wdWJtZWQuam91cm5hbEluZm8uaXNzdWV9KWA7XG4gICAgfVxuICAgIHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcgKz0gYCBwOiR7dGhpcy5wdWJtZWQucGFnZUluZm99YDtcblxuICAgIC8vIEFkanVzdCBhdXRob3JzIHN0cmluZyB0byB0aGUgQkVMIEV2aWRlbmNlIGZvcm1hdCAtIGNvbnZlcnQgJywnIHRvICd8J1xuICAgIHRoaXMucHVibWVkLmJlbC5hdXRob3JzID0gdGhpcy5wdWJtZWQuYXV0aG9yU3RyaW5nLnJlcGxhY2UoLywvZyAsICd8JykucmVwbGFjZSgvXFwuJC8sICcnKTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=