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

                  return context$2$0.abrupt('return', this.pubmed);

                case 8:
                  context$2$0.prev = 8;
                  context$2$0.t0 = context$2$0['catch'](0);

                  logger.error('GET Pubmed error: ', context$2$0.t0);

                case 11:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[0, 8]]);
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

            this.pubmed.bel.authors = this.pubmed.authorList.author.map(function (obj) {
              return obj.fullName;
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9QdWJtZWRTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7bUZBSUksTUFBTSxFQUdHLGFBQWE7Ozs7Ozs7Ozs7aUNBUGxCLE1BQU07cUNBR04sVUFBVTs7aUJBRlYsR0FBRzs7Ozs7QUFHUCxZQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0FBRzlCLG1CQUFhO0FBRWIsaUJBRkEsYUFBYSxDQUVaLEdBQUcsRUFBRTs7O0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjs7cUJBTFUsYUFBYTs7aUJBT1QsbUJBQUMsRUFBRTs7Ozs7O21EQUdNLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7O0FBQTFDLHNCQUFJLENBQUMsTUFBTTs7QUFHWCxzQkFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQUMsd0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzttQkFBQzs7c0RBR2pDLElBQUksQ0FBQyxNQUFNOzs7Ozs7QUFHbEIsd0JBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLGlCQUFNLENBQUM7Ozs7Ozs7V0FFM0M7OztpQkFFWSx5QkFBRztBQUNkLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsRUFBQyxDQUFDOztBQUV4RyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFDNUUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsV0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsTUFBRyxDQUFDO0FBQy9FLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLFVBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxBQUFFLENBQUM7QUFDbEUsZ0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ2pDLGtCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLFVBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxNQUFHLENBQUM7YUFDbkU7QUFDRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxZQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxBQUFFLENBQUM7O0FBSTFELGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUFDLHFCQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFBQyxDQUFDLENBQUM7V0FFNUY7Ozs2QkF0Q1UsYUFBYTtBQUFiLHFCQUFhLEdBRHpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDQyxhQUFhLEtBQWIsYUFBYTtlQUFiLGFBQWEiLCJmaWxlIjoicmVzb3VyY2VzL1B1Ym1lZFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtBcGl9IGZyb20gJy4vYXBpJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ3B1Ym1lZCcpO1xuXG5AaW5qZWN0KEFwaSlcbmV4cG9ydCBjbGFzcyBQdWJtZWRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihhcGkpIHtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnB1Ym1lZCA9IHt9O1xuICB9XG5cbiAgYXN5bmMgZ2V0UHVibWVkKGlkKSB7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLmFwaS5nZXRQdWJtZWQoaWQpO1xuXG4gICAgICAvLyBmaWx0ZXIgYW5kIGVuaGFuY2UgUHViTWVkIG9iamVjdFxuICAgICAgaWYgKHRoaXMucHVibWVkKSB7dGhpcy5lbmhhbmNlUHVibWVkKCk7fVxuXG4gICAgICAvLyBsb2dnZXIuZGVidWcoYFB1Yk1lZCBJRDogJHtpZH0gIFB1Ym1lZDogJHt0aGlzLnB1Ym1lZH1gKTtcbiAgICAgIHJldHVybiB0aGlzLnB1Ym1lZDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgUHVibWVkIGVycm9yOiAnLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGVuaGFuY2VQdWJtZWQoKSB7XG4gICAgdGhpcy5wdWJtZWQuYmVsID0geydtaXNtYXRjaCc6IHsnZGF0ZSc6IGZhbHNlLCAncmVmU3RyaW5nJzogZmFsc2UsICdhdXRob3JzJzogZmFsc2UsICdjb21tZW50JzogZmFsc2V9fTtcbiAgICAvLyBBZGQgcmVmZXJlbmNlIHN0cmluZyAtIGUuZy4gSiBMaXBpZCBSZXMgMjAwMiBKYW4gNDMoMSkgMi0xMlxuICAgIHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcgPSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5qb3VybmFsLmlzb2FiYnJldmlhdGlvbjtcbiAgICB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nICs9IGAsICR7dGhpcy5wdWJtZWQuam91cm5hbEluZm8uZGF0ZU9mUHVibGljYXRpb259LGA7XG4gICAgdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZyArPSBgICR7dGhpcy5wdWJtZWQuam91cm5hbEluZm8udm9sdW1lfWA7XG4gICAgaWYgKHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLmlzc3VlKSB7XG4gICAgICB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nICs9IGAoJHt0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5pc3N1ZX0pYDtcbiAgICB9XG4gICAgdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZyArPSBgIHA6JHt0aGlzLnB1Ym1lZC5wYWdlSW5mb31gO1xuXG4gICAgLy8gQWRqdXN0IGF1dGhvcnMgc3RyaW5nIHRvIHRoZSBCRUwgRXZpZGVuY2UgZm9ybWF0IC0gY29udmVydCAnLCcgdG8gJ3wnXG4gICAgLy8gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnMgPSB0aGlzLnB1Ym1lZC5hdXRob3JTdHJpbmcucmVwbGFjZSgvLC9nICwgJ3wnKS5yZXBsYWNlKC9cXC4kLywgJycpOyAgb2xkIHZlcnNpb24gLSBhdXRob3JzIGluIEJFTCBFdmlkZW5jZSBpcyBub3cgYW4gYXJyYXlcbiAgICB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycyA9IHRoaXMucHVibWVkLmF1dGhvckxpc3QuYXV0aG9yLm1hcChvYmogPT4ge3JldHVybiBvYmouZnVsbE5hbWU7fSk7XG5cbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=