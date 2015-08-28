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

                  this.enhancePubmed();
                  logger.debug("Pubmed", this.pubmed);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9QdWJtZWRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7bUZBSUksTUFBTSxFQUdHLGFBQWE7Ozs7Ozs7Ozs7aUNBUGxCLE1BQU07cUNBR04sVUFBVTs7aUJBRlYsR0FBRzs7Ozs7QUFHUCxZQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0FBRzlCLG1CQUFhO0FBRWIsaUJBRkEsYUFBYSxDQUVaLEdBQUcsRUFBRTs7O0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjs7cUJBTFUsYUFBYTs7aUJBT1QsbUJBQUMsRUFBRTs7Ozs7O21EQUdNLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7O0FBQTFDLHNCQUFJLENBQUMsTUFBTTs7QUFDWCxzQkFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLHdCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7c0RBQzdCLElBQUksQ0FBQyxNQUFNOzs7Ozs7QUFHbEIsd0JBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLGlCQUFNLENBQUM7Ozs7Ozs7V0FHM0M7OztpQkFFWSx5QkFBRztBQUNkLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsRUFBQyxDQUFDOztBQUV4RyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFDNUUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsV0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsTUFBRyxDQUFDO0FBQy9FLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLFVBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxBQUFFLENBQUM7QUFDbEUsZ0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ2pDLGtCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLFVBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxNQUFHLENBQUM7YUFDbkU7QUFDRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxZQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxBQUFFLENBQUM7O0FBRzFELGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1dBQzNGOzs7NkJBbENVLGFBQWE7QUFBYixxQkFBYSxHQUR6QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ0MsYUFBYSxLQUFiLGFBQWE7ZUFBYixhQUFhIiwiZmlsZSI6InJlc291cmNlcy9QdWJtZWRTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL2FwaSc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdwdWJtZWQnKTtcblxuQGluamVjdChBcGkpXG5leHBvcnQgY2xhc3MgUHVibWVkU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5wdWJtZWQgPSB7fTtcbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZChpZCkge1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHVibWVkID0gYXdhaXQgdGhpcy5hcGkuZ2V0UHVibWVkKGlkKTtcbiAgICAgIHRoaXMuZW5oYW5jZVB1Ym1lZCgpOyAvLyBmaWx0ZXIgYW5kIGVuaGFuY2UgUHVibWVkIG9iamVjdFxuICAgICAgbG9nZ2VyLmRlYnVnKFwiUHVibWVkXCIsIHRoaXMucHVibWVkKTtcbiAgICAgIHJldHVybiB0aGlzLnB1Ym1lZDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgUHVibWVkIGVycm9yOiAnLCBlcnIpO1xuICAgIH1cblxuICB9XG5cbiAgZW5oYW5jZVB1Ym1lZCgpIHtcbiAgICB0aGlzLnB1Ym1lZC5iZWwgPSB7J21pc21hdGNoJzogeydkYXRlJzogZmFsc2UsICdyZWZTdHJpbmcnOiBmYWxzZSwgJ2F1dGhvcnMnOiBmYWxzZSwgJ2NvbW1lbnQnOiBmYWxzZX19O1xuICAgIC8vIEFkZCByZWZlcmVuY2Ugc3RyaW5nIC0gZS5nLiBKIExpcGlkIFJlcyAyMDAyIEphbiA0MygxKSAyLTEyXG4gICAgdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZyA9IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLmpvdXJuYWwuaXNvYWJicmV2aWF0aW9uO1xuICAgIHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcgKz0gYCwgJHt0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5kYXRlT2ZQdWJsaWNhdGlvbn0sYDtcbiAgICB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nICs9IGAgJHt0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby52b2x1bWV9YDtcbiAgICBpZiAodGhpcy5wdWJtZWQuam91cm5hbEluZm8uaXNzdWUpIHtcbiAgICAgIHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcgKz0gYCgke3RoaXMucHVibWVkLmpvdXJuYWxJbmZvLmlzc3VlfSlgO1xuICAgIH1cbiAgICB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nICs9IGAgcDoke3RoaXMucHVibWVkLnBhZ2VJbmZvfWA7XG5cbiAgICAvLyBBZGp1c3QgYXV0aG9ycyBzdHJpbmcgdG8gdGhlIEJFTCBFdmlkZW5jZSBmb3JtYXQgLSBjb252ZXJ0ICcsJyB0byAnfCdcbiAgICB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycyA9IHRoaXMucHVibWVkLmF1dGhvclN0cmluZy5yZXBsYWNlKC8sL2cgLCAnfCcpLnJlcGxhY2UoL1xcLiQvLCAnJyk7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9