System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', './resources/api', './relationsList', './resources/PubmedService'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, Api, relationsList, PubmedService, logger, Edit, PipedelimValueConverter;

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
    }, function (_resourcesApi) {
      Api = _resourcesApi.Api;
    }, function (_relationsList) {
      relationsList = _relationsList.relationsList;
    }, function (_resourcesPubmedService) {
      PubmedService = _resourcesPubmedService.PubmedService;
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('edit');

      Edit = (function () {
        function Edit(Api, PubmedService) {
          _classCallCheck(this, _Edit);

          this.api = Api;
          this.pubmedService = PubmedService;

          this.evidenceId = null;
          this.evidence = {};
          this.relationsList = relationsList;

          this.pubmed = null;
        }

        _createClass(Edit, [{
          key: 'activate',
          value: function activate(params) {
            return _regeneratorRuntime.async(function activate$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:

                  logger.debug('Relation List: ', relationsList);

                  if (!params.id) {
                    context$2$0.next = 19;
                    break;
                  }

                  logger.debug('ID: ', params.id);
                  this.evidenceId = params.id;

                  context$2$0.prev = 4;
                  context$2$0.next = 7;
                  return _regeneratorRuntime.awrap(this.api.getBelEvidence(this.evidenceId));

                case 7:
                  this.evidence = context$2$0.sent;
                  context$2$0.next = 10;
                  return _regeneratorRuntime.awrap(this.api.getBelAnnotations());

                case 10:
                  this.annotationList = context$2$0.sent;

                  logger.debug("BEL Evidence", this.evidence);
                  logger.debug('AnnoList: ', this.annotationList);
                  context$2$0.next = 18;
                  break;

                case 15:
                  context$2$0.prev = 15;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 18:
                  this.getPubmed();

                case 19:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 15]]);
          }
        }, {
          key: 'submit',
          value: function submit() {
            this.api.loadBelEvidence(this.evidenceId, this.evidence);
            return true;
          }
        }, {
          key: 'citationPubmedChecks',
          value: function citationPubmedChecks() {
            if (this.evidence.citation.type === 'PubMed') {
              if (!this.evidence.citation.date) {
                this.evidence.citation.date = this.pubmed.journalInfo.printPublicationDate;
              } else if (this.evidence.citation.date !== this.pubmed.journalInfo.printPublicationDate) {
                this.pubmed.bel.mismatch.date = true;
              }

              if (!this.evidence.citation.authors) {
                this.evidence.citation.authors = this.pubmed.bel.authors;
              } else if (this.evidence.citation.authors !== this.pubmed.bel.authors) {
                this.pubmed.bel.mismatch.authors = true;
              }

              if (!this.evidence.citation.name) {
                this.evidence.citation.name = this.pubmed.bel.refString;
              } else if (this.evidence.citation.name !== this.pubmed.bel.refString) {
                this.pubmed.bel.mismatch.refString = true;
              }
            }
          }
        }, {
          key: 'getPubmed',
          value: function getPubmed() {
            return _regeneratorRuntime.async(function getPubmed$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  if (!(this.evidence.citation.type === 'PubMed' && this.evidence.citation.id)) {
                    context$2$0.next = 11;
                    break;
                  }

                  context$2$0.prev = 1;
                  context$2$0.next = 4;
                  return _regeneratorRuntime.awrap(this.pubmedService.getPubmed(this.evidence.citation.id));

                case 4:
                  this.pubmed = context$2$0.sent;
                  context$2$0.next = 10;
                  break;

                case 7:
                  context$2$0.prev = 7;
                  context$2$0.t0 = context$2$0['catch'](1);

                  logger.error('GET Pubmed error: ', context$2$0.t0);

                case 10:

                  this.citationPubmedChecks();

                case 11:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[1, 7]]);
          }
        }]);

        var _Edit = Edit;
        Edit = inject(Api, PubmedService)(Edit) || Edit;
        return Edit;
      })();

      _export('Edit', Edit);

      PipedelimValueConverter = (function () {
        function PipedelimValueConverter() {
          _classCallCheck(this, PipedelimValueConverter);
        }

        _createClass(PipedelimValueConverter, [{
          key: 'toView',
          value: function toView(text) {
            if (text) {
              text = text.replace(/\|/g, ';');
            }
            return text;
          }
        }, {
          key: 'fromView',
          value: function fromView(text) {
            if (text) {
              text = text.replace(/\;/g, '|');
            }
            return text;
          }
        }]);

        return PipedelimValueConverter;
      })();

      _export('PipedelimValueConverter', PipedelimValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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OztpQkFDNUIsZ0JBQUMsSUFBSSxFQUFFO0FBQ1gsZ0JBQUksSUFBSSxFQUFFO0FBQ1Isa0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqQztBQUNELG1CQUFPLElBQUksQ0FBQztXQUViOzs7aUJBQ08sa0JBQUMsSUFBSSxFQUFFO0FBQ2IsZ0JBQUksSUFBSSxFQUFFO0FBQ1Isa0JBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqQztBQUNELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7ZUFiVSx1QkFBdUIiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7cmVsYXRpb25zTGlzdH0gZnJvbSAnLi9yZWxhdGlvbnNMaXN0JztcbmltcG9ydCB7UHVibWVkU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZXMvUHVibWVkU2VydmljZSc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGksIFB1Ym1lZFNlcnZpY2UpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgY29uc3RydWN0b3IoQXBpLCBQdWJtZWRTZXJ2aWNlKSB7XG4gICAgdGhpcy5hcGkgPSBBcGk7XG4gICAgdGhpcy5wdWJtZWRTZXJ2aWNlID0gUHVibWVkU2VydmljZTtcblxuICAgIHRoaXMuZXZpZGVuY2VJZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMucmVsYXRpb25zTGlzdCA9IHJlbGF0aW9uc0xpc3Q7XG5cbi8vICAgIHRoaXMuYXBpLmdldEJlbEFubm90YXRpb25zKClcbi8vICAgICAgLnRoZW4oZGF0YSA9PiB7dGhpcy5hbm5vdGF0aW9uTGlzdCA9IGRhdGE7bG9nZ2VyLmRlYnVnKCdBbm5vTGlzdDogJywgdGhpcy5hbm5vdGF0aW9uTGlzdCk7fSlcbi8vICAgICAgLmNhdGNoKFxuLy8gICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge2xvZ2dlci5lcnJvcihgR0VUIEJFTCBBbm5vdGF0aW9ucyBFcnJvcjogJHtyZWFzb259YCl9XG4vLyAgICAgICk7XG5cblxuICAgIHRoaXMucHVibWVkID0gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFjdGl2YXRlKHBhcmFtcykge1xuXG4gICAgbG9nZ2VyLmRlYnVnKCdSZWxhdGlvbiBMaXN0OiAnLCByZWxhdGlvbnNMaXN0KTtcblxuICAgIGlmIChwYXJhbXMuaWQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnSUQ6ICcsIHBhcmFtcy5pZCk7XG4gICAgICB0aGlzLmV2aWRlbmNlSWQgPSBwYXJhbXMuaWQ7XG5cbiAgICAgIC8vIEdldCBCRUwgRXZpZGVuY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxFdmlkZW5jZSh0aGlzLmV2aWRlbmNlSWQpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25MaXN0ID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiQkVMIEV2aWRlbmNlXCIsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0Fubm9MaXN0OiAnLCB0aGlzLmFubm90YXRpb25MaXN0KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgQkVMIEV2aWRlbmNlIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgICAgLy8gR2V0IFB1Ym1lZFxuICAgICAgdGhpcy5nZXRQdWJtZWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3VibWl0IEJFTCBFdmlkZW5jZSB0byBBUElcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5hcGkubG9hZEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCwgdGhpcy5ldmlkZW5jZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuLy8gIGF1dGhvcnM6IFwiXCJcbi8vICBjb21tZW50OiBcIlwiXG4vLyAgZGF0ZTogXCJcIlxuLy8gIGlkOiBcIjExNzkyNzE2XCJcbi8vICBuYW1lOiBcIkogTGlwaWQgUmVzIDIwMDIgSmFuIDQzKDEpIDItMTJcIlxuLy8gIHR5cGU6IFwiUHViTWVkXCJcblxuICAvKipcbiAgICogQ2hlY2sgZm9yIGNpdGF0aW9uIGluZm9ybWF0aW9uIG1pc21hdGNoIG9yIG1pc3NpbmcgaW5mb3JtYXRpb24gZm9yIFB1Ym1lZCBlbnRyaWVzXG4gICAqXG4gICAqIEFkZCBQdWJtZWQgZGF0YSB0byBldmlkZW5jZS5jaXRhdGlvbiBpZiBldmlkZW5jZS5jaXRhdGlvbiBpbmZvcm1hdGlvbiBpcyBtaXNzaW5nXG4gICAqL1xuICBjaXRhdGlvblB1Ym1lZENoZWNrcyAoKSB7XG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIC8vIENoZWNrIGRhdGVcbiAgICAgIGlmICghIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgPSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSAhPT0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8ucHJpbnRQdWJsaWNhdGlvbkRhdGUpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmRhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgYXV0aG9yc1xuICAgICAgaWYgKCEgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IHRoaXMucHVibWVkLmJlbC5hdXRob3JzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzICE9PSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayByZWZTdHJpbmdcbiAgICAgIGlmICghIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lICE9PSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZCgpIHtcbiAgICAvLyBHZXQgUHVibWVkXG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcgJiYgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLnB1Ym1lZFNlcnZpY2UuZ2V0UHVibWVkKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBQdWJtZWQgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2l0YXRpb25QdWJtZWRDaGVja3MoKTtcbiAgICB9XG4gIH1cblxuXG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgaW4gd2VicGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVkZWxpbVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuXG4gIH1cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==