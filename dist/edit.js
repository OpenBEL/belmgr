System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', 'aurelia-router', './resources/api', './relationsList', './resources/PubmedService'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, activationStrategy, Api, relationsList, PubmedService, logger, Edit, PipeDelimValueConverter, ObjectToStringValueConverter;

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
    }, function (_aureliaRouter) {
      activationStrategy = _aureliaRouter.activationStrategy;
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
        _createClass(Edit, [{
          key: 'determineActivationStrategy',
          value: function determineActivationStrategy() {
            return activationStrategy.replace;
          }
        }]);

        function Edit(Api, PubmedService) {
          _classCallCheck(this, _Edit);

          this.api = Api;
          this.pubmedService = PubmedService;
          this.evidenceId = null;
          this.citationId = null;
          this.evidence = {};
          this.annotations = [];
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
                    context$2$0.next = 30;
                    break;
                  }

                  logger.debug('ID: ', params.id);
                  this.evidenceId = params.id;

                  context$2$0.prev = 4;
                  context$2$0.next = 7;
                  return _regeneratorRuntime.awrap(this.api.getBelEvidence(this.evidenceId));

                case 7:
                  this.data = context$2$0.sent;

                  this.evidence = this.data.evidence[0];
                  context$2$0.next = 11;
                  return _regeneratorRuntime.awrap(this.api.getBelComponents(this.evidence.bel_statement));

                case 11:
                  this.belComponents = context$2$0.sent;

                  this.citationId = this.evidence.citation.id;

                  logger.debug('BC: ', this.belComponents);
                  context$2$0.next = 16;
                  return _regeneratorRuntime.awrap(this.getPubmed());

                case 16:
                  logger.debug('Evidence: ', this.evidence);
                  logger.debug('PubmedAwait: ', this.pubmed);
                  this.annotations = this.evidence.experiment_context;

                  this.annotations.push({ 'name': '', 'value': '' });

                  context$2$0.next = 22;
                  return _regeneratorRuntime.awrap(this.api.getBelAnnotations());

                case 22:
                  this.annotationList = context$2$0.sent;

                  logger.debug("BEL Annotations", this.annotations);
                  logger.debug('AnnoList: ', this.annotationList);
                  context$2$0.next = 30;
                  break;

                case 27:
                  context$2$0.prev = 27;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 30:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 27]]);
          }
        }, {
          key: 'refreshEvidenceObjBinding',
          value: function refreshEvidenceObjBinding() {
            var temp = this.evidence;
            this.evidence = {};
            this.evidence = temp;
          }
        }, {
          key: 'removeBlankAnnotations',
          value: function removeBlankAnnotations(obj) {
            if (obj.value) {
              return true;
            } else {
              return false;
            }
          }
        }, {
          key: 'submit',
          value: function submit() {
            this.evidence.bel_statement = this.belComponents.subject + ' ' + this.belComponents.relationship + ' ' + this.belComponents.object;
            this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
            this.evidence.citation.id = this.citationId;
            this.data.evidence[0] = this.evidence;
            logger.debug('Submit evidence', JSON.stringify(this.data, null, 2));
            this.api.loadBelEvidence(this.evidence, this.evidenceId);
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
                  if (!(this.citationId && this.evidence.citation.type === 'PubMed')) {
                    context$2$0.next = 12;
                    break;
                  }

                  context$2$0.prev = 1;
                  context$2$0.next = 4;
                  return _regeneratorRuntime.awrap(this.pubmedService.getPubmed(this.citationId));

                case 4:
                  this.pubmed = context$2$0.sent;

                  if (this.pubmed) {
                    this.citationPubmedChecks();
                  } else {
                    this.evidence.citation = {};
                  }

                  this.refreshEvidenceObjBinding();
                  context$2$0.next = 12;
                  break;

                case 9:
                  context$2$0.prev = 9;
                  context$2$0.t0 = context$2$0['catch'](1);

                  logger.error('GET Pubmed error: ', context$2$0.t0);

                case 12:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[1, 9]]);
          }
        }, {
          key: 'removeAnnotation',
          value: function removeAnnotation(idx) {
            this.annotations.splice(idx, 1);
          }
        }, {
          key: 'addBlankAnnotation',
          value: function addBlankAnnotation(idx, event) {
            if (this.annotations[this.annotations.length - 1]) {
              this.annotations.push({ 'name': '', 'value': '' });
            }
          }
        }, {
          key: 'replaceCitationDate',
          value: function replaceCitationDate(newval) {
            this.evidence.citation.date = newval;
            this.pubmed.bel.mismatch.date = false;
            this.refreshEvidenceObjBinding();
          }
        }, {
          key: 'replaceCitationName',
          value: function replaceCitationName(newval) {
            this.evidence.citation.name = newval;
            this.pubmed.bel.mismatch.refString = false;
            this.refreshEvidenceObjBinding();
          }
        }, {
          key: 'replaceCitationAuthors',
          value: function replaceCitationAuthors(newval) {
            this.evidence.citation.authors = newval;
            this.pubmed.bel.mismatch.authors = false;
            this.refreshEvidenceObjBinding();
          }
        }]);

        var _Edit = Edit;
        Edit = inject(Api, PubmedService)(Edit) || Edit;
        return Edit;
      })();

      _export('Edit', Edit);

      PipeDelimValueConverter = (function () {
        function PipeDelimValueConverter() {
          _classCallCheck(this, PipeDelimValueConverter);
        }

        _createClass(PipeDelimValueConverter, [{
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
              logger.debug('Pipe-fromView: ', text);
            }
            return text;
          }
        }]);

        return PipeDelimValueConverter;
      })();

      _export('PipeDelimValueConverter', PipeDelimValueConverter);

      ObjectToStringValueConverter = (function () {
        function ObjectToStringValueConverter() {
          _classCallCheck(this, ObjectToStringValueConverter);
        }

        _createClass(ObjectToStringValueConverter, [{
          key: 'toView',
          value: function toView(object) {
            logger.debug('Here in Object to string converter');
            return JSON.stringify(object, null, 2);
          }
        }]);

        return ObjectToStringValueConverter;
      })();

      _export('ObjectToStringValueConverter', ObjectToStringValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QztBQUNELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7ZUFkVSx1QkFBdUI7Ozs7O0FBcUJ2QixrQ0FBNEI7aUJBQTVCLDRCQUE0QjtnQ0FBNUIsNEJBQTRCOzs7cUJBQTVCLDRCQUE0Qjs7aUJBQ2pDLGdCQUFDLE1BQU0sRUFBRTtBQUNiLGtCQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDbkQsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3hDOzs7ZUFKVSw0QkFBNEIiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2FjdGl2YXRpb25TdHJhdGVneX0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7cmVsYXRpb25zTGlzdH0gZnJvbSAnLi9yZWxhdGlvbnNMaXN0JztcbmltcG9ydCB7UHVibWVkU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZXMvUHVibWVkU2VydmljZSc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGksIFB1Ym1lZFNlcnZpY2UpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgLy8gTmVlZGVkIHRvIGFsbG93IE5ldyBCRUwgbWVudSBpdGVtIHRvIHJlZnJlc2ggdGhlIGZvcm1cbiAgZGV0ZXJtaW5lQWN0aXZhdGlvblN0cmF0ZWd5KCl7XG4gICAgcmV0dXJuIGFjdGl2YXRpb25TdHJhdGVneS5yZXBsYWNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQXBpLCBQdWJtZWRTZXJ2aWNlKSB7XG4gICAgdGhpcy5hcGkgPSBBcGk7XG4gICAgdGhpcy5wdWJtZWRTZXJ2aWNlID0gUHVibWVkU2VydmljZTtcbiAgICB0aGlzLmV2aWRlbmNlSWQgPSBudWxsO1xuICAgIHRoaXMuY2l0YXRpb25JZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFjdGl2YXRlKHBhcmFtcykge1xuXG4gICAgbG9nZ2VyLmRlYnVnKCdSZWxhdGlvbiBMaXN0OiAnLCByZWxhdGlvbnNMaXN0KTtcblxuICAgIGlmIChwYXJhbXMuaWQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnSUQ6ICcsIHBhcmFtcy5pZCk7XG4gICAgICB0aGlzLmV2aWRlbmNlSWQgPSBwYXJhbXMuaWQ7XG5cbiAgICAgIC8vIEdldCBCRUwgRXZpZGVuY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UgPSB0aGlzLmRhdGEuZXZpZGVuY2VbMF07XG4gICAgICAgIHRoaXMuYmVsQ29tcG9uZW50cyA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbENvbXBvbmVudHModGhpcy5ldmlkZW5jZS5iZWxfc3RhdGVtZW50KTtcblxuICAgICAgICB0aGlzLmNpdGF0aW9uSWQgPSB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmlkO1xuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQkM6ICcsIHRoaXMuYmVsQ29tcG9uZW50cyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0UHVibWVkKCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnRXZpZGVuY2U6ICcsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ1B1Ym1lZEF3YWl0OiAnLCB0aGlzLnB1Ym1lZCk7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbnMgPSB0aGlzLmV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dDtcblxuICAgICAgICAvLyBBZGRpbmcgYmxhbmsgaW5wdXQgZmllbGQgdG8gYWxsb3cgYWRkaW5nIG5ldyBBbm5vdGF0aW9uc1xuICAgICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goeyduYW1lJzogJycsICd2YWx1ZSc6ICcnfSk7XG5cbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uTGlzdCA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEFubm90YXRpb25zKCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIkJFTCBBbm5vdGF0aW9uc1wiLCB0aGlzLmFubm90YXRpb25zKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdBbm5vTGlzdDogJywgdGhpcy5hbm5vdGF0aW9uTGlzdCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIEJFTCBFdmlkZW5jZSBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgdGhlIGV2aWRlbmNlIG9iamVjdCB0byBiZSByZWNyZWF0ZWQgZm9yIGZvcmNlIGFuIHVwZGF0ZSBvZiB0aGUgbmVzdGVkXG4gICAqIG9iamVjdCBiaW5kaW5nIGluIHRoZSBWaWV3XG4gICAqL1xuICByZWZyZXNoRXZpZGVuY2VPYmpCaW5kaW5nICgpIHtcbiAgICBsZXQgdGVtcCA9IHRoaXMuZXZpZGVuY2U7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuZXZpZGVuY2UgPSB0ZW1wO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBibGFuayBhbm5vdGF0aW9ucyAoYWRkZWQgdG8gdGhlIGVuZCAtIG9yIGp1c3QgYW5ub3RhdGlvbnMgd2l0aCBlbXB0eSB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHJlbW92ZUJsYW5rQW5ub3RhdGlvbnMob2JqKSB7XG4gICAgaWYgKG9iai52YWx1ZSkge3JldHVybiB0cnVlO31cbiAgICBlbHNlIHtyZXR1cm4gZmFsc2U7fVxuICB9XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBCRUwgRXZpZGVuY2UgdG8gQVBJXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3VibWl0KCkge1xuICAgIHRoaXMuZXZpZGVuY2UuYmVsX3N0YXRlbWVudCA9IGAke3RoaXMuYmVsQ29tcG9uZW50cy5zdWJqZWN0fSAke3RoaXMuYmVsQ29tcG9uZW50cy5yZWxhdGlvbnNoaXB9ICR7dGhpcy5iZWxDb21wb25lbnRzLm9iamVjdH1gO1xuICAgIHRoaXMuZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0ID0gdGhpcy5hbm5vdGF0aW9ucy5maWx0ZXIodGhpcy5yZW1vdmVCbGFua0Fubm90YXRpb25zKTtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmlkID0gdGhpcy5jaXRhdGlvbklkO1xuICAgIHRoaXMuZGF0YS5ldmlkZW5jZVswXSA9IHRoaXMuZXZpZGVuY2U7XG4gICAgbG9nZ2VyLmRlYnVnKCdTdWJtaXQgZXZpZGVuY2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEsbnVsbCwyKSk7XG4gICAgdGhpcy5hcGkubG9hZEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2UsIHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgZm9yIGNpdGF0aW9uIGluZm9ybWF0aW9uIG1pc21hdGNoIG9yIG1pc3NpbmcgaW5mb3JtYXRpb24gZm9yIFB1Ym1lZCBlbnRyaWVzXG4gICAqXG4gICAqIEFkZCBQdWJtZWQgZGF0YSB0byBldmlkZW5jZS5jaXRhdGlvbiBpZiBldmlkZW5jZS5jaXRhdGlvbiBpbmZvcm1hdGlvbiBpcyBtaXNzaW5nXG4gICAqL1xuICBjaXRhdGlvblB1Ym1lZENoZWNrcygpIHtcbiAgICBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi50eXBlID09PSAnUHViTWVkJykge1xuICAgICAgLy8gQ2hlY2sgZGF0ZVxuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlID0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8ucHJpbnRQdWJsaWNhdGlvbkRhdGU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgIT09IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5kYXRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGF1dGhvcnNcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IHRoaXMucHVibWVkLmJlbC5hdXRob3JzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzICE9PSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayByZWZTdHJpbmdcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSA9IHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmc7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgIT09IHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLnJlZlN0cmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UHVibWVkKCkge1xuICAgIC8vIEdldCBQdWJtZWRcbiAgICBpZiAodGhpcy5jaXRhdGlvbklkICYmIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucHVibWVkID0gYXdhaXQgdGhpcy5wdWJtZWRTZXJ2aWNlLmdldFB1Ym1lZCh0aGlzLmNpdGF0aW9uSWQpO1xuICAgICAgICBpZiAodGhpcy5wdWJtZWQpIHt0aGlzLmNpdGF0aW9uUHVibWVkQ2hlY2tzKCk7fVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgUHVibWVkIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvdyBkZWxldGlvbiBvZiBFdmlkZW5jZSBBbm5vdGF0aW9ucy9FeHBlcmltZW50IENvbnRleHRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKi9cbiAgcmVtb3ZlQW5ub3RhdGlvbihpZHgpIHtcbiAgICB0aGlzLmFubm90YXRpb25zLnNwbGljZShpZHgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBibGFuayBhbm5vdGF0aW9uIHRvIGVuZCBvZiBBbm5vdGF0aW9uIGlucHV0IGFsbEZpZWxkc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgYWRkQmxhbmtBbm5vdGF0aW9uKGlkeCwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1t0aGlzLmFubm90YXRpb25zLmxlbmd0aCAtIDFdKSB7XG4gICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goeyduYW1lJzogJycsICd2YWx1ZSc6ICcnfSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBUb2RvOiBjb252ZXJ0IHJlcGxhY2UqIG1ldGhvZHMgd2l0aCBnZXR0ZXIvc2V0dGVycyBhZnRlciBtYWtpbmcgc3VyZSB0aGV5IHdpbGwgdXBkYXRlIHRoZSBWaWV3IGNvcnJlY3RseVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGV2aWRlbmNlIGNpdGF0aW9uIGRhdGUgd2l0aCBuZXd2YWxcbiAgICogQHBhcmFtIG5ld3ZhbFxuICAgKi9cbiAgcmVwbGFjZUNpdGF0aW9uRGF0ZShuZXd2YWwpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgPSBuZXd2YWw7XG4gICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGV2aWRlbmNlIGNpdGF0aW9uIGRhdGUgd2l0aCBuZXd2YWxcbiAgICogQHBhcmFtIG5ld3ZhbFxuICAgKi9cbiAgcmVwbGFjZUNpdGF0aW9uTmFtZShuZXd2YWwpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSBuZXd2YWw7XG4gICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLnJlZlN0cmluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgZXZpZGVuY2UgY2l0YXRpb24gZGF0ZSB3aXRoIG5ld3ZhbFxuICAgKiBAcGFyYW0gbmV3dmFsXG4gICAqL1xuICByZXBsYWNlQ2l0YXRpb25BdXRob3JzKG5ld3ZhbCkge1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IG5ld3ZhbDtcbiAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IGZhbHNlO1xuICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICB9XG5cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGF1dGhvcnMgZGVsaW1pdGVkIGJ5ICc7JyBpbiB3ZWJwYWdlIHRvICd8JyBmb3Igc3RvcmFnZVxuICovXG5leHBvcnQgY2xhc3MgUGlwZURlbGltVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHwvZywgJzsnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBmcm9tVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcOy9nLCAnfCcpO1xuICAgICAgbG9nZ2VyLmRlYnVnKCdQaXBlLWZyb21WaWV3OiAnLCB0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IE9iamVjdCB0byBwcmV0dHktcHJpbnRlZCBKU09OIHN0cmluZyB0byBpbnNlcnQgaW50byB0aGUgVklFV1xuICogQGV4YW1wbGUgSW5zZXJ0IGludG8gdGhlIFZpZXc6IDxwcmU+JHtvYmplY3QgfCBvYmplY3RUb1N0cmluZ308L3ByZT5cbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFRvU3RyaW5nVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcob2JqZWN0KSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdIZXJlIGluIE9iamVjdCB0byBzdHJpbmcgY29udmVydGVyJyk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgbnVsbCwgMik7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==