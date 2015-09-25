System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', 'aurelia-router', './resources/api', './relationsList', './resources/PubmedService', 'editperson', 'aurelia-dialog'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, activationStrategy, Api, relationsList, PubmedService, EditPerson, DialogService, logger, Edit, PipeDelimValueConverter, StringToArrayValueConverter, ObjectToStringValueConverter, Welcome;

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
    }, function (_editperson) {
      EditPerson = _editperson.EditPerson;
    }, function (_aureliaDialog) {
      DialogService = _aureliaDialog.DialogService;
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
                    context$2$0.next = 31;
                    break;
                  }

                  logger.debug('ID: ', params.id);
                  this.evidenceId = params.id;

                  context$2$0.prev = 4;
                  context$2$0.next = 7;
                  return _regeneratorRuntime.awrap(this.api.getBelEvidence(this.evidenceId));

                case 7:
                  this.data = context$2$0.sent;

                  this.evidence = this.data.evidence;
                  logger.info('BEL Statement: ', this.evidence);
                  context$2$0.next = 12;
                  return _regeneratorRuntime.awrap(this.api.getBelComponents(this.evidence.bel_statement));

                case 12:
                  this.belComponents = context$2$0.sent;

                  this.citationId = this.evidence.citation.id;

                  logger.debug('BC: ', this.belComponents);
                  context$2$0.next = 17;
                  return _regeneratorRuntime.awrap(this.getPubmed());

                case 17:
                  logger.debug('Evidence: ', this.evidence);
                  logger.debug('PubmedAwait: ', this.pubmed);
                  this.annotations = this.evidence.experiment_context;

                  this.annotations.push({ 'name': '', 'value': '' });

                  context$2$0.next = 23;
                  return _regeneratorRuntime.awrap(this.api.getBelAnnotations());

                case 23:
                  this.annotationList = context$2$0.sent;

                  logger.debug("BEL Annotations", this.annotations);
                  logger.debug('AnnoList: ', this.annotationList);
                  context$2$0.next = 31;
                  break;

                case 28:
                  context$2$0.prev = 28;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 31:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 28]]);
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

      StringToArrayValueConverter = (function () {
        function StringToArrayValueConverter() {
          _classCallCheck(this, StringToArrayValueConverter);
        }

        _createClass(StringToArrayValueConverter, [{
          key: 'toView',
          value: function toView(array) {
            var text = "";
            if (array) {
              text = array.join('; ');
            }
            return text;
          }
        }, {
          key: 'fromView',
          value: function fromView(text) {
            var array = [];
            if (text) {
              array = text.split('; ');
            }
            return array;
          }
        }]);

        return StringToArrayValueConverter;
      })();

      _export('StringToArrayValueConverter', StringToArrayValueConverter);

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

      Welcome = (function () {
        _createClass(Welcome, null, [{
          key: 'inject',
          value: [DialogService],
          enumerable: true
        }]);

        function Welcome(dialogService) {
          _classCallCheck(this, Welcome);

          this.person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };

          this.dialogService = dialogService;
        }

        _createClass(Welcome, [{
          key: 'submit',
          value: function submit() {
            this.dialogService.open({ viewModel: EditPerson, model: this.person }).then(function (response) {
              if (!response.wasCancelled) {
                console.log('good');
              } else {
                console.log('bad');
              }
              console.log(response.output);
            });
          }
        }]);

        return Welcome;
      })();

      _export('Welcome', Welcome);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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RUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTs7QUFGbkUsY0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7U0FDcEM7O3FCQUpVLE9BQU87O2lCQU1aLGtCQUFFO0FBQ04sZ0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQ3JGLGtCQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtBQUMxQix1QkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztlQUNyQixNQUFNO0FBQ0wsdUJBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7ZUFDcEI7QUFDRCxxQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1dBQ0o7OztlQWZVLE9BQU8iLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2FjdGl2YXRpb25TdHJhdGVneX0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7cmVsYXRpb25zTGlzdH0gZnJvbSAnLi9yZWxhdGlvbnNMaXN0JztcbmltcG9ydCB7UHVibWVkU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZXMvUHVibWVkU2VydmljZSc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGksIFB1Ym1lZFNlcnZpY2UpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgLy8gTmVlZGVkIHRvIGFsbG93IE5ldyBCRUwgbWVudSBpdGVtIHRvIHJlZnJlc2ggdGhlIGZvcm1cbiAgZGV0ZXJtaW5lQWN0aXZhdGlvblN0cmF0ZWd5KCl7XG4gICAgcmV0dXJuIGFjdGl2YXRpb25TdHJhdGVneS5yZXBsYWNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQXBpLCBQdWJtZWRTZXJ2aWNlKSB7XG4gICAgdGhpcy5hcGkgPSBBcGk7XG4gICAgdGhpcy5wdWJtZWRTZXJ2aWNlID0gUHVibWVkU2VydmljZTtcbiAgICB0aGlzLmV2aWRlbmNlSWQgPSBudWxsO1xuICAgIHRoaXMuY2l0YXRpb25JZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFjdGl2YXRlKHBhcmFtcykge1xuXG4gICAgbG9nZ2VyLmRlYnVnKCdSZWxhdGlvbiBMaXN0OiAnLCByZWxhdGlvbnNMaXN0KTtcblxuICAgIGlmIChwYXJhbXMuaWQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnSUQ6ICcsIHBhcmFtcy5pZCk7XG4gICAgICB0aGlzLmV2aWRlbmNlSWQgPSBwYXJhbXMuaWQ7XG5cbiAgICAgIC8vIEdldCBCRUwgRXZpZGVuY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UgPSB0aGlzLmRhdGEuZXZpZGVuY2U7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdCRUwgU3RhdGVtZW50OiAnLCB0aGlzLmV2aWRlbmNlKTtcbiAgICAgICAgdGhpcy5iZWxDb21wb25lbnRzID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsQ29tcG9uZW50cyh0aGlzLmV2aWRlbmNlLmJlbF9zdGF0ZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY2l0YXRpb25JZCA9IHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQ7XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdCQzogJywgdGhpcy5iZWxDb21wb25lbnRzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRQdWJtZWQoKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdFdmlkZW5jZTogJywgdGhpcy5ldmlkZW5jZSk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnUHVibWVkQXdhaXQ6ICcsIHRoaXMucHVibWVkKTtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9ucyA9IHRoaXMuZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0O1xuXG4gICAgICAgIC8vIEFkZGluZyBibGFuayBpbnB1dCBmaWVsZCB0byBhbGxvdyBhZGRpbmcgbmV3IEFubm90YXRpb25zXG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaCh7J25hbWUnOiAnJywgJ3ZhbHVlJzogJyd9KTtcblxuICAgICAgICB0aGlzLmFubm90YXRpb25MaXN0ID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiQkVMIEFubm90YXRpb25zXCIsIHRoaXMuYW5ub3RhdGlvbnMpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0Fubm9MaXN0OiAnLCB0aGlzLmFubm90YXRpb25MaXN0KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgQkVMIEV2aWRlbmNlIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSB0aGUgZXZpZGVuY2Ugb2JqZWN0IHRvIGJlIHJlY3JlYXRlZCBmb3IgZm9yY2UgYW4gdXBkYXRlIG9mIHRoZSBuZXN0ZWRcbiAgICogb2JqZWN0IGJpbmRpbmcgaW4gdGhlIFZpZXdcbiAgICovXG4gIHJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcgKCkge1xuICAgIGxldCB0ZW1wID0gdGhpcy5ldmlkZW5jZTtcbiAgICB0aGlzLmV2aWRlbmNlID0ge307XG4gICAgdGhpcy5ldmlkZW5jZSA9IHRlbXA7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJsYW5rIGFubm90YXRpb25zIChhZGRlZCB0byB0aGUgZW5kIC0gb3IganVzdCBhbm5vdGF0aW9ucyB3aXRoIGVtcHR5IHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcmVtb3ZlQmxhbmtBbm5vdGF0aW9ucyhvYmopIHtcbiAgICBpZiAob2JqLnZhbHVlKSB7cmV0dXJuIHRydWU7fVxuICAgIGVsc2Uge3JldHVybiBmYWxzZTt9XG4gIH1cblxuICAvKipcbiAgICogU3VibWl0IEJFTCBFdmlkZW5jZSB0byBBUElcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5iZWxfc3RhdGVtZW50ID0gYCR7dGhpcy5iZWxDb21wb25lbnRzLnN1YmplY3R9ICR7dGhpcy5iZWxDb21wb25lbnRzLnJlbGF0aW9uc2hpcH0gJHt0aGlzLmJlbENvbXBvbmVudHMub2JqZWN0fWA7XG4gICAgdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQgPSB0aGlzLmFubm90YXRpb25zLmZpbHRlcih0aGlzLnJlbW92ZUJsYW5rQW5ub3RhdGlvbnMpO1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQgPSB0aGlzLmNpdGF0aW9uSWQ7XG4gICAgdGhpcy5kYXRhLmV2aWRlbmNlWzBdID0gdGhpcy5ldmlkZW5jZTtcbiAgICBsb2dnZXIuZGVidWcoJ1N1Ym1pdCBldmlkZW5jZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSxudWxsLDIpKTtcbiAgICB0aGlzLmFwaS5sb2FkQmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZSwgdGhpcy5ldmlkZW5jZUlkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgY2l0YXRpb24gaW5mb3JtYXRpb24gbWlzbWF0Y2ggb3IgbWlzc2luZyBpbmZvcm1hdGlvbiBmb3IgUHVibWVkIGVudHJpZXNcbiAgICpcbiAgICogQWRkIFB1Ym1lZCBkYXRhIHRvIGV2aWRlbmNlLmNpdGF0aW9uIGlmIGV2aWRlbmNlLmNpdGF0aW9uIGluZm9ybWF0aW9uIGlzIG1pc3NpbmdcbiAgICovXG4gIGNpdGF0aW9uUHVibWVkQ2hlY2tzKCkge1xuICAgIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLnR5cGUgPT09ICdQdWJNZWQnKSB7XG4gICAgICAvLyBDaGVjayBkYXRlXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgPSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSAhPT0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8ucHJpbnRQdWJsaWNhdGlvbkRhdGUpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmRhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgYXV0aG9yc1xuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzID0gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgIT09IHRoaXMucHVibWVkLmJlbC5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5hdXRob3JzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIHJlZlN0cmluZ1xuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lID0gdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSAhPT0gdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2gucmVmU3RyaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRQdWJtZWQoKSB7XG4gICAgLy8gR2V0IFB1Ym1lZFxuICAgIGlmICh0aGlzLmNpdGF0aW9uSWQgJiYgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi50eXBlID09PSAnUHViTWVkJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLnB1Ym1lZFNlcnZpY2UuZ2V0UHVibWVkKHRoaXMuY2l0YXRpb25JZCk7XG4gICAgICAgIGlmICh0aGlzLnB1Ym1lZCkge3RoaXMuY2l0YXRpb25QdWJtZWRDaGVja3MoKTt9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBQdWJtZWQgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93IGRlbGV0aW9uIG9mIEV2aWRlbmNlIEFubm90YXRpb25zL0V4cGVyaW1lbnQgQ29udGV4dFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqL1xuICByZW1vdmVBbm5vdGF0aW9uKGlkeCkge1xuICAgIHRoaXMuYW5ub3RhdGlvbnMuc3BsaWNlKGlkeCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGJsYW5rIGFubm90YXRpb24gdG8gZW5kIG9mIEFubm90YXRpb24gaW5wdXQgYWxsRmllbGRzXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBhZGRCbGFua0Fubm90YXRpb24oaWR4LCBldmVudCkge1xuICAgIGlmICh0aGlzLmFubm90YXRpb25zW3RoaXMuYW5ub3RhdGlvbnMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaCh7J25hbWUnOiAnJywgJ3ZhbHVlJzogJyd9KTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIFRvZG86IGNvbnZlcnQgcmVwbGFjZSogbWV0aG9kcyB3aXRoIGdldHRlci9zZXR0ZXJzIGFmdGVyIG1ha2luZyBzdXJlIHRoZXkgd2lsbCB1cGRhdGUgdGhlIFZpZXcgY29ycmVjdGx5XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgZXZpZGVuY2UgY2l0YXRpb24gZGF0ZSB3aXRoIG5ld3ZhbFxuICAgKiBAcGFyYW0gbmV3dmFsXG4gICAqL1xuICByZXBsYWNlQ2l0YXRpb25EYXRlKG5ld3ZhbCkge1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSA9IG5ld3ZhbDtcbiAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgZXZpZGVuY2UgY2l0YXRpb24gZGF0ZSB3aXRoIG5ld3ZhbFxuICAgKiBAcGFyYW0gbmV3dmFsXG4gICAqL1xuICByZXBsYWNlQ2l0YXRpb25OYW1lKG5ld3ZhbCkge1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSA9IG5ld3ZhbDtcbiAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2gucmVmU3RyaW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZWZyZXNoRXZpZGVuY2VPYmpCaW5kaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBldmlkZW5jZSBjaXRhdGlvbiBkYXRlIHdpdGggbmV3dmFsXG4gICAqIEBwYXJhbSBuZXd2YWxcbiAgICovXG4gIHJlcGxhY2VDaXRhdGlvbkF1dGhvcnMobmV3dmFsKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzID0gbmV3dmFsO1xuICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5hdXRob3JzID0gZmFsc2U7XG4gICAgdGhpcy5yZWZyZXNoRXZpZGVuY2VPYmpCaW5kaW5nKCk7XG4gIH1cblxufVxuXG4vKipcbiAqIENvbnZlcnQgYXV0aG9ycyBkZWxpbWl0ZWQgYnkgJzsnIGluIHdlYnBhZ2UgdG8gJ3wnIGZvciBzdG9yYWdlXG4gKlxuICogdXNlIGl0IGluIHRoZSBWaWV3IGFzICcgfCBwaXBlRGVsaW0nXG4gKi9cbmV4cG9ydCBjbGFzcyBQaXBlRGVsaW1WYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcfC9nLCAnOycpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGZyb21WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFw7L2csICd8Jyk7XG4gICAgICBsb2dnZXIuZGVidWcoJ1BpcGUtZnJvbVZpZXc6ICcsIHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYXV0aG9yIGFycmF5IHRvIGZyb20gdGV4dCBzdHJpbmcgZGVsaW1pdGVkIGJ5ICc7J1xuICpcbiAqIHVzZSBpdCBpbiB0aGUgVmlldyBhcyAnIHwgc3RyaW5nVG9BcnJheSdcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ1RvQXJyYXlWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhhcnJheSkge1xuICAgIGxldCB0ZXh0ID0gXCJcIjtcbiAgICBpZiAoYXJyYXkpIHtcbiAgICAgIHRleHQgPSBhcnJheS5qb2luKCc7ICcpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuICBmcm9tVmlldyh0ZXh0KSB7XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgaWYgKHRleHQpIHtcbiAgICBhcnJheSA9IHRleHQuc3BsaXQoJzsgJyk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgT2JqZWN0IHRvIHByZXR0eS1wcmludGVkIEpTT04gc3RyaW5nIHRvIGluc2VydCBpbnRvIHRoZSBWSUVXXG4gKiBAZXhhbXBsZSBJbnNlcnQgaW50byB0aGUgVmlldzogPHByZT4ke29iamVjdCB8IG9iamVjdFRvU3RyaW5nfTwvcHJlPlxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0VG9TdHJpbmdWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhvYmplY3QpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0hlcmUgaW4gT2JqZWN0IHRvIHN0cmluZyBjb252ZXJ0ZXInKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcbiAgfVxufVxuXG5cbi8vIC8vIEFVUkVMSUEgRElBTE9HIFRSWSBcbmltcG9ydCB7RWRpdFBlcnNvbn0gZnJvbSAnZWRpdHBlcnNvbic7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJ2F1cmVsaWEtZGlhbG9nJztcbmV4cG9ydCBjbGFzcyBXZWxjb21lIHtcbiAgc3RhdGljIGluamVjdCA9IFtEaWFsb2dTZXJ2aWNlXTtcbiAgY29uc3RydWN0b3IoZGlhbG9nU2VydmljZSkge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZSA9IGRpYWxvZ1NlcnZpY2U7XG4gIH1cbiAgcGVyc29uID0geyBmaXJzdE5hbWU6ICdXYWRlJywgbWlkZGxlTmFtZTogJ093ZW4nLCBsYXN0TmFtZTogJ1dhdHRzJyB9O1xuICBzdWJtaXQoKXtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3Blbih7IHZpZXdNb2RlbDogRWRpdFBlcnNvbiwgbW9kZWw6IHRoaXMucGVyc29ufSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAoIXJlc3BvbnNlLndhc0NhbmNlbGxlZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ29vZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2JhZCcpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uub3V0cHV0KTtcbiAgICB9KTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==