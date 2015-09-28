System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', 'aurelia-router', './resources/api', './relationsList', './resources/PubmedService', './components/dialogs/prompt', 'aurelia-dialog'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, activationStrategy, Api, relationsList, PubmedService, Prompt, DialogService, logger, Edit, PipeDelimValueConverter, StringToArrayValueConverter, ObjectToStringValueConverter;

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
    }, function (_componentsDialogsPrompt) {
      Prompt = _componentsDialogsPrompt.Prompt;
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

        function Edit(Api, PubmedService, DialogService) {
          _classCallCheck(this, _Edit);

          this.api = Api;
          this.pubmedService = PubmedService;
          this.evidenceId = null;
          this.citationId = null;
          this.evidence = {};
          this.annotations = [];
          this.relationsList = relationsList;
          this.pubmed = null;
          this.dialogService = DialogService;
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
            var _this = this;

            var prompt = 'This will update the Evidence!';
            this.dialogService.open({ viewModel: Prompt, model: prompt }).then(function (response) {
              if (!response.wasCancelled) {
                console.log('approvedPrompt');
                _this.submitUpdate;
              } else {
                console.log('cancelledPrompt');
              }
              console.log(response.output);
            });
            return true;
          }
        }, {
          key: 'submitUpdate',
          value: function submitUpdate() {
            this.evidence.bel_statement = this.belComponents.subject + ' ' + this.belComponents.relationship + ' ' + this.belComponents.object;
            this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
            this.evidence.citation.id = this.citationId;
            this.data.evidence[0] = this.evidence;
            logger.debug('Submit evidence', JSON.stringify(this.data, null, 2));
            this.api.loadBelEvidence(this.evidence, this.evidenceId);
            return true;
          }
        }, {
          key: 'submitNew',
          value: function submitNew() {
            this.evidence.bel_statement = this.belComponents.subject + ' ' + this.belComponents.relationship + ' ' + this.belComponents.object;
            this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
            this.evidence.citation.id = this.citationId;
            this.data.evidence[0] = this.evidence;
            logger.debug('Submit evidence', JSON.stringify(this.data, null, 2));
            this.api.loadBelEvidence(this.evidence);
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
        Edit = inject(Api, PubmedService, DialogService)(Edit) || Edit;
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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxDQUFDO1dBQ3hDOzs7ZUFKVSw0QkFBNEIiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2FjdGl2YXRpb25TdHJhdGVneX0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7cmVsYXRpb25zTGlzdH0gZnJvbSAnLi9yZWxhdGlvbnNMaXN0JztcbmltcG9ydCB7UHVibWVkU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZXMvUHVibWVkU2VydmljZSc7XG5cbmltcG9ydCB7UHJvbXB0fSBmcm9tICcuL2NvbXBvbmVudHMvZGlhbG9ncy9wcm9tcHQnO1xuaW1wb3J0IHtEaWFsb2dTZXJ2aWNlfSBmcm9tICdhdXJlbGlhLWRpYWxvZyc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGksIFB1Ym1lZFNlcnZpY2UsIERpYWxvZ1NlcnZpY2UpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgLy8gTmVlZGVkIHRvIGFsbG93IE5ldyBCRUwgbWVudSBpdGVtIHRvIHJlZnJlc2ggdGhlIGZvcm1cbiAgZGV0ZXJtaW5lQWN0aXZhdGlvblN0cmF0ZWd5KCl7XG4gICAgcmV0dXJuIGFjdGl2YXRpb25TdHJhdGVneS5yZXBsYWNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQXBpLCBQdWJtZWRTZXJ2aWNlLCBEaWFsb2dTZXJ2aWNlKSB7XG4gICAgdGhpcy5hcGkgPSBBcGk7XG4gICAgdGhpcy5wdWJtZWRTZXJ2aWNlID0gUHVibWVkU2VydmljZTtcbiAgICB0aGlzLmV2aWRlbmNlSWQgPSBudWxsO1xuICAgIHRoaXMuY2l0YXRpb25JZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2UgPSBEaWFsb2dTZXJ2aWNlO1xuICB9XG5cbiAgYXN5bmMgYWN0aXZhdGUocGFyYW1zKSB7XG5cbiAgICBsb2dnZXIuZGVidWcoJ1JlbGF0aW9uIExpc3Q6ICcsIHJlbGF0aW9uc0xpc3QpO1xuXG4gICAgaWYgKHBhcmFtcy5pZCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdJRDogJywgcGFyYW1zLmlkKTtcbiAgICAgIHRoaXMuZXZpZGVuY2VJZCA9IHBhcmFtcy5pZDtcblxuICAgICAgLy8gR2V0IEJFTCBFdmlkZW5jZVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5kYXRhID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkKTtcbiAgICAgICAgdGhpcy5ldmlkZW5jZSA9IHRoaXMuZGF0YS5ldmlkZW5jZTtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ0JFTCBTdGF0ZW1lbnQ6ICcsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgICB0aGlzLmJlbENvbXBvbmVudHMgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxDb21wb25lbnRzKHRoaXMuZXZpZGVuY2UuYmVsX3N0YXRlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jaXRhdGlvbklkID0gdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZDtcblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0JDOiAnLCB0aGlzLmJlbENvbXBvbmVudHMpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFB1Ym1lZCgpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0V2aWRlbmNlOiAnLCB0aGlzLmV2aWRlbmNlKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdQdWJtZWRBd2FpdDogJywgdGhpcy5wdWJtZWQpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25zID0gdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQ7XG5cbiAgICAgICAgLy8gQWRkaW5nIGJsYW5rIGlucHV0IGZpZWxkIHRvIGFsbG93IGFkZGluZyBuZXcgQW5ub3RhdGlvbnNcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuXG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkxpc3QgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxBbm5vdGF0aW9ucygpO1xuICAgICAgICBsb2dnZXIuZGVidWcoXCJCRUwgQW5ub3RhdGlvbnNcIiwgdGhpcy5hbm5vdGF0aW9ucyk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQW5ub0xpc3Q6ICcsIHRoaXMuYW5ub3RhdGlvbkxpc3QpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBCRUwgRXZpZGVuY2UgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBldmlkZW5jZSBvYmplY3QgdG8gYmUgcmVjcmVhdGVkIGZvciBmb3JjZSBhbiB1cGRhdGUgb2YgdGhlIG5lc3RlZFxuICAgKiBvYmplY3QgYmluZGluZyBpbiB0aGUgVmlld1xuICAgKi9cbiAgcmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZyAoKSB7XG4gICAgbGV0IHRlbXAgPSB0aGlzLmV2aWRlbmNlO1xuICAgIHRoaXMuZXZpZGVuY2UgPSB7fTtcbiAgICB0aGlzLmV2aWRlbmNlID0gdGVtcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmxhbmsgYW5ub3RhdGlvbnMgKGFkZGVkIHRvIHRoZSBlbmQgLSBvciBqdXN0IGFubm90YXRpb25zIHdpdGggZW1wdHkgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICByZW1vdmVCbGFua0Fubm90YXRpb25zKG9iaikge1xuICAgIGlmIChvYmoudmFsdWUpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgZWxzZSB7cmV0dXJuIGZhbHNlO31cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJtaXQgQkVMIEV2aWRlbmNlIHRvIEFQSVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cbiAgc3VibWl0KCkge1xuICAgIGxldCBwcm9tcHQgPSAnVGhpcyB3aWxsIHVwZGF0ZSB0aGUgRXZpZGVuY2UhJztcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3Blbih7IHZpZXdNb2RlbDogUHJvbXB0LCBtb2RlbDogcHJvbXB0fSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAoIXJlc3BvbnNlLndhc0NhbmNlbGxlZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYXBwcm92ZWRQcm9tcHQnKTtcbiAgICAgICAgdGhpcy5zdWJtaXRVcGRhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsbGVkUHJvbXB0Jyk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5vdXRwdXQpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3VibWl0VXBkYXRlKCkge1xuICAgIHRoaXMuZXZpZGVuY2UuYmVsX3N0YXRlbWVudCA9IGAke3RoaXMuYmVsQ29tcG9uZW50cy5zdWJqZWN0fSAke3RoaXMuYmVsQ29tcG9uZW50cy5yZWxhdGlvbnNoaXB9ICR7dGhpcy5iZWxDb21wb25lbnRzLm9iamVjdH1gO1xuICAgIHRoaXMuZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0ID0gdGhpcy5hbm5vdGF0aW9ucy5maWx0ZXIodGhpcy5yZW1vdmVCbGFua0Fubm90YXRpb25zKTtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmlkID0gdGhpcy5jaXRhdGlvbklkO1xuICAgIHRoaXMuZGF0YS5ldmlkZW5jZVswXSA9IHRoaXMuZXZpZGVuY2U7XG4gICAgbG9nZ2VyLmRlYnVnKCdTdWJtaXQgZXZpZGVuY2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEsbnVsbCwyKSk7XG4gICAgdGhpcy5hcGkubG9hZEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2UsIHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdWJtaXROZXcoKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5iZWxfc3RhdGVtZW50ID0gYCR7dGhpcy5iZWxDb21wb25lbnRzLnN1YmplY3R9ICR7dGhpcy5iZWxDb21wb25lbnRzLnJlbGF0aW9uc2hpcH0gJHt0aGlzLmJlbENvbXBvbmVudHMub2JqZWN0fWA7XG4gICAgdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQgPSB0aGlzLmFubm90YXRpb25zLmZpbHRlcih0aGlzLnJlbW92ZUJsYW5rQW5ub3RhdGlvbnMpO1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQgPSB0aGlzLmNpdGF0aW9uSWQ7XG4gICAgdGhpcy5kYXRhLmV2aWRlbmNlWzBdID0gdGhpcy5ldmlkZW5jZTtcbiAgICBsb2dnZXIuZGVidWcoJ1N1Ym1pdCBldmlkZW5jZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSxudWxsLDIpKTtcbiAgICB0aGlzLmFwaS5sb2FkQmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgZm9yIGNpdGF0aW9uIGluZm9ybWF0aW9uIG1pc21hdGNoIG9yIG1pc3NpbmcgaW5mb3JtYXRpb24gZm9yIFB1Ym1lZCBlbnRyaWVzXG4gICAqXG4gICAqIEFkZCBQdWJtZWQgZGF0YSB0byBldmlkZW5jZS5jaXRhdGlvbiBpZiBldmlkZW5jZS5jaXRhdGlvbiBpbmZvcm1hdGlvbiBpcyBtaXNzaW5nXG4gICAqL1xuICBjaXRhdGlvblB1Ym1lZENoZWNrcygpIHtcbiAgICBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi50eXBlID09PSAnUHViTWVkJykge1xuICAgICAgLy8gQ2hlY2sgZGF0ZVxuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlID0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8ucHJpbnRQdWJsaWNhdGlvbkRhdGU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgIT09IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5kYXRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGF1dGhvcnNcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IHRoaXMucHVibWVkLmJlbC5hdXRob3JzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzICE9PSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayByZWZTdHJpbmdcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSA9IHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmc7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgIT09IHRoaXMucHVibWVkLmJlbC5yZWZTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLnJlZlN0cmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UHVibWVkKCkge1xuICAgIC8vIEdldCBQdWJtZWRcbiAgICBpZiAodGhpcy5jaXRhdGlvbklkICYmIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucHVibWVkID0gYXdhaXQgdGhpcy5wdWJtZWRTZXJ2aWNlLmdldFB1Ym1lZCh0aGlzLmNpdGF0aW9uSWQpO1xuICAgICAgICBpZiAodGhpcy5wdWJtZWQpIHt0aGlzLmNpdGF0aW9uUHVibWVkQ2hlY2tzKCk7fVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgUHVibWVkIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvdyBkZWxldGlvbiBvZiBFdmlkZW5jZSBBbm5vdGF0aW9ucy9FeHBlcmltZW50IENvbnRleHRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKi9cbiAgcmVtb3ZlQW5ub3RhdGlvbihpZHgpIHtcbiAgICB0aGlzLmFubm90YXRpb25zLnNwbGljZShpZHgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBibGFuayBhbm5vdGF0aW9uIHRvIGVuZCBvZiBBbm5vdGF0aW9uIGlucHV0IGFsbEZpZWxkc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgYWRkQmxhbmtBbm5vdGF0aW9uKGlkeCwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1t0aGlzLmFubm90YXRpb25zLmxlbmd0aCAtIDFdKSB7XG4gICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goeyduYW1lJzogJycsICd2YWx1ZSc6ICcnfSk7XG4gICAgfVxuICB9XG5cblxuICAvLyBUb2RvOiBjb252ZXJ0IHJlcGxhY2UqIG1ldGhvZHMgd2l0aCBnZXR0ZXIvc2V0dGVycyBhZnRlciBtYWtpbmcgc3VyZSB0aGV5IHdpbGwgdXBkYXRlIHRoZSBWaWV3IGNvcnJlY3RseVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGV2aWRlbmNlIGNpdGF0aW9uIGRhdGUgd2l0aCBuZXd2YWxcbiAgICogQHBhcmFtIG5ld3ZhbFxuICAgKi9cbiAgcmVwbGFjZUNpdGF0aW9uRGF0ZShuZXd2YWwpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgPSBuZXd2YWw7XG4gICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGV2aWRlbmNlIGNpdGF0aW9uIGRhdGUgd2l0aCBuZXd2YWxcbiAgICogQHBhcmFtIG5ld3ZhbFxuICAgKi9cbiAgcmVwbGFjZUNpdGF0aW9uTmFtZShuZXd2YWwpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSBuZXd2YWw7XG4gICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLnJlZlN0cmluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgZXZpZGVuY2UgY2l0YXRpb24gZGF0ZSB3aXRoIG5ld3ZhbFxuICAgKiBAcGFyYW0gbmV3dmFsXG4gICAqL1xuICByZXBsYWNlQ2l0YXRpb25BdXRob3JzKG5ld3ZhbCkge1xuICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IG5ld3ZhbDtcbiAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IGZhbHNlO1xuICAgIHRoaXMucmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZygpO1xuICB9XG5cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGF1dGhvcnMgZGVsaW1pdGVkIGJ5ICc7JyBpbiB3ZWJwYWdlIHRvICd8JyBmb3Igc3RvcmFnZVxuICpcbiAqIHVzZSBpdCBpbiB0aGUgVmlldyBhcyAnIHwgcGlwZURlbGltJ1xuICovXG5leHBvcnQgY2xhc3MgUGlwZURlbGltVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHwvZywgJzsnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBmcm9tVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcOy9nLCAnfCcpO1xuICAgICAgbG9nZ2VyLmRlYnVnKCdQaXBlLWZyb21WaWV3OiAnLCB0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGF1dGhvciBhcnJheSB0byBmcm9tIHRleHQgc3RyaW5nIGRlbGltaXRlZCBieSAnOydcbiAqXG4gKiB1c2UgaXQgaW4gdGhlIFZpZXcgYXMgJyB8IHN0cmluZ1RvQXJyYXknXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdUb0FycmF5VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcoYXJyYXkpIHtcbiAgICBsZXQgdGV4dCA9IFwiXCI7XG4gICAgaWYgKGFycmF5KSB7XG4gICAgICB0ZXh0ID0gYXJyYXkuam9pbignOyAnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgYXJyYXkgPSB0ZXh0LnNwbGl0KCc7ICcpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IE9iamVjdCB0byBwcmV0dHktcHJpbnRlZCBKU09OIHN0cmluZyB0byBpbnNlcnQgaW50byB0aGUgVklFV1xuICogQGV4YW1wbGUgSW5zZXJ0IGludG8gdGhlIFZpZXc6IDxwcmU+JHtvYmplY3QgfCBvYmplY3RUb1N0cmluZ308L3ByZT5cbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFRvU3RyaW5nVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcob2JqZWN0KSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdIZXJlIGluIE9iamVjdCB0byBzdHJpbmcgY29udmVydGVyJyk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgbnVsbCwgMik7XG4gIH1cbn1cblxuLy9cbi8vLy8gQVVSRUxJQSBESUFMT0cgVFJZXG4vL2ltcG9ydCB7RWRpdFBlcnNvbn0gZnJvbSAnZWRpdHBlcnNvbic7XG4vL2ltcG9ydCB7RGlhbG9nU2VydmljZX0gZnJvbSAnYXVyZWxpYS1kaWFsb2cnO1xuLy9leHBvcnQgY2xhc3MgV2VsY29tZSB7XG4vLyAgc3RhdGljIGluamVjdCA9IFtEaWFsb2dTZXJ2aWNlXTtcbi8vICBjb25zdHJ1Y3RvcihkaWFsb2dTZXJ2aWNlKSB7XG4vLyAgICB0aGlzLmRpYWxvZ1NlcnZpY2UgPSBkaWFsb2dTZXJ2aWNlO1xuLy8gIH1cbi8vICBwZXJzb24gPSB7IGZpcnN0TmFtZTogJ1dhZGUnLCBtaWRkbGVOYW1lOiAnT3dlbicsIGxhc3ROYW1lOiAnV2F0dHMnIH07XG4vLyAgc3VibWl0KCl7XG4vLyAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3Blbih7IHZpZXdNb2RlbDogRWRpdFBlcnNvbiwgbW9kZWw6IHRoaXMucGVyc29ufSkudGhlbihyZXNwb25zZSA9PiB7XG4vLyAgICAgIGlmICghcmVzcG9uc2Uud2FzQ2FuY2VsbGVkKSB7XG4vLyAgICAgICAgY29uc29sZS5sb2coJ2dvb2QnKTtcbi8vICAgICAgfSBlbHNlIHtcbi8vICAgICAgICBjb25zb2xlLmxvZygnYmFkJyk7XG4vLyAgICAgIH1cbi8vICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uub3V0cHV0KTtcbi8vICAgIH0pO1xuLy8gIH1cbi8vfVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9