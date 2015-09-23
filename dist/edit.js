System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', 'aurelia-router', './resources/api', './relationsList', './resources/PubmedService'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, activationStrategy, Api, relationsList, PubmedService, logger, Edit, PipeDelimValueConverter, StringToArrayValueConverter, ObjectToStringValueConverter;

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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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SSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEMsb0JBQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkM7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2VBZFUsdUJBQXVCOzs7OztBQXNCdkIsaUNBQTJCO2lCQUEzQiwyQkFBMkI7Z0NBQTNCLDJCQUEyQjs7O3FCQUEzQiwyQkFBMkI7O2lCQUNoQyxnQkFBQyxLQUFLLEVBQUU7QUFDWixnQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsZ0JBQUksS0FBSyxFQUFFO0FBQ1Qsa0JBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFDTyxrQkFBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsZ0JBQUksSUFBSSxFQUFFO0FBQ1YsbUJBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO0FBQ0QsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7OztlQWRVLDJCQUEyQjs7Ozs7QUFxQjNCLGtDQUE0QjtpQkFBNUIsNEJBQTRCO2dDQUE1Qiw0QkFBNEI7OztxQkFBNUIsNEJBQTRCOztpQkFDakMsZ0JBQUMsTUFBTSxFQUFFO0FBQ2Isa0JBQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNuRCxtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDeEM7OztlQUpVLDRCQUE0QiIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7YWN0aXZhdGlvblN0cmF0ZWd5fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtyZWxhdGlvbnNMaXN0fSBmcm9tICcuL3JlbGF0aW9uc0xpc3QnO1xuaW1wb3J0IHtQdWJtZWRTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlcy9QdWJtZWRTZXJ2aWNlJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2VkaXQnKTtcblxuXG5AaW5qZWN0KEFwaSwgUHVibWVkU2VydmljZSlcbmV4cG9ydCBjbGFzcyBFZGl0IHtcblxuICAvLyBOZWVkZWQgdG8gYWxsb3cgTmV3IEJFTCBtZW51IGl0ZW0gdG8gcmVmcmVzaCB0aGUgZm9ybVxuICBkZXRlcm1pbmVBY3RpdmF0aW9uU3RyYXRlZ3koKXtcbiAgICByZXR1cm4gYWN0aXZhdGlvblN0cmF0ZWd5LnJlcGxhY2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihBcGksIFB1Ym1lZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFwaSA9IEFwaTtcbiAgICB0aGlzLnB1Ym1lZFNlcnZpY2UgPSBQdWJtZWRTZXJ2aWNlO1xuICAgIHRoaXMuZXZpZGVuY2VJZCA9IG51bGw7XG4gICAgdGhpcy5jaXRhdGlvbklkID0gbnVsbDtcbiAgICB0aGlzLmV2aWRlbmNlID0ge307XG4gICAgdGhpcy5hbm5vdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMucmVsYXRpb25zTGlzdCA9IHJlbGF0aW9uc0xpc3Q7XG4gICAgdGhpcy5wdWJtZWQgPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgYWN0aXZhdGUocGFyYW1zKSB7XG5cbiAgICBsb2dnZXIuZGVidWcoJ1JlbGF0aW9uIExpc3Q6ICcsIHJlbGF0aW9uc0xpc3QpO1xuXG4gICAgaWYgKHBhcmFtcy5pZCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdJRDogJywgcGFyYW1zLmlkKTtcbiAgICAgIHRoaXMuZXZpZGVuY2VJZCA9IHBhcmFtcy5pZDtcblxuICAgICAgLy8gR2V0IEJFTCBFdmlkZW5jZVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5kYXRhID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkKTtcbiAgICAgICAgdGhpcy5ldmlkZW5jZSA9IHRoaXMuZGF0YS5ldmlkZW5jZTtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ0JFTCBTdGF0ZW1lbnQ6ICcsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgICB0aGlzLmJlbENvbXBvbmVudHMgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxDb21wb25lbnRzKHRoaXMuZXZpZGVuY2UuYmVsX3N0YXRlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jaXRhdGlvbklkID0gdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZDtcblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0JDOiAnLCB0aGlzLmJlbENvbXBvbmVudHMpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFB1Ym1lZCgpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0V2aWRlbmNlOiAnLCB0aGlzLmV2aWRlbmNlKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdQdWJtZWRBd2FpdDogJywgdGhpcy5wdWJtZWQpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25zID0gdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQ7XG5cbiAgICAgICAgLy8gQWRkaW5nIGJsYW5rIGlucHV0IGZpZWxkIHRvIGFsbG93IGFkZGluZyBuZXcgQW5ub3RhdGlvbnNcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuXG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkxpc3QgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxBbm5vdGF0aW9ucygpO1xuICAgICAgICBsb2dnZXIuZGVidWcoXCJCRUwgQW5ub3RhdGlvbnNcIiwgdGhpcy5hbm5vdGF0aW9ucyk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQW5ub0xpc3Q6ICcsIHRoaXMuYW5ub3RhdGlvbkxpc3QpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBCRUwgRXZpZGVuY2UgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBldmlkZW5jZSBvYmplY3QgdG8gYmUgcmVjcmVhdGVkIGZvciBmb3JjZSBhbiB1cGRhdGUgb2YgdGhlIG5lc3RlZFxuICAgKiBvYmplY3QgYmluZGluZyBpbiB0aGUgVmlld1xuICAgKi9cbiAgcmVmcmVzaEV2aWRlbmNlT2JqQmluZGluZyAoKSB7XG4gICAgbGV0IHRlbXAgPSB0aGlzLmV2aWRlbmNlO1xuICAgIHRoaXMuZXZpZGVuY2UgPSB7fTtcbiAgICB0aGlzLmV2aWRlbmNlID0gdGVtcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmxhbmsgYW5ub3RhdGlvbnMgKGFkZGVkIHRvIHRoZSBlbmQgLSBvciBqdXN0IGFubm90YXRpb25zIHdpdGggZW1wdHkgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICByZW1vdmVCbGFua0Fubm90YXRpb25zKG9iaikge1xuICAgIGlmIChvYmoudmFsdWUpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgZWxzZSB7cmV0dXJuIGZhbHNlO31cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJtaXQgQkVMIEV2aWRlbmNlIHRvIEFQSVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmJlbF9zdGF0ZW1lbnQgPSBgJHt0aGlzLmJlbENvbXBvbmVudHMuc3ViamVjdH0gJHt0aGlzLmJlbENvbXBvbmVudHMucmVsYXRpb25zaGlwfSAke3RoaXMuYmVsQ29tcG9uZW50cy5vYmplY3R9YDtcbiAgICB0aGlzLmV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dCA9IHRoaXMuYW5ub3RhdGlvbnMuZmlsdGVyKHRoaXMucmVtb3ZlQmxhbmtBbm5vdGF0aW9ucyk7XG4gICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZCA9IHRoaXMuY2l0YXRpb25JZDtcbiAgICB0aGlzLmRhdGEuZXZpZGVuY2VbMF0gPSB0aGlzLmV2aWRlbmNlO1xuICAgIGxvZ2dlci5kZWJ1ZygnU3VibWl0IGV2aWRlbmNlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLG51bGwsMikpO1xuICAgIHRoaXMuYXBpLmxvYWRCZWxFdmlkZW5jZSh0aGlzLmV2aWRlbmNlLCB0aGlzLmV2aWRlbmNlSWQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBjaXRhdGlvbiBpbmZvcm1hdGlvbiBtaXNtYXRjaCBvciBtaXNzaW5nIGluZm9ybWF0aW9uIGZvciBQdWJtZWQgZW50cmllc1xuICAgKlxuICAgKiBBZGQgUHVibWVkIGRhdGEgdG8gZXZpZGVuY2UuY2l0YXRpb24gaWYgZXZpZGVuY2UuY2l0YXRpb24gaW5mb3JtYXRpb24gaXMgbWlzc2luZ1xuICAgKi9cbiAgY2l0YXRpb25QdWJtZWRDaGVja3MoKSB7XG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIC8vIENoZWNrIGRhdGVcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSA9IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlICE9PSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBhdXRob3JzXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycykge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgPSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyAhPT0gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnMpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmF1dGhvcnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgcmVmU3RyaW5nXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lICE9PSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZCgpIHtcbiAgICAvLyBHZXQgUHVibWVkXG4gICAgaWYgKHRoaXMuY2l0YXRpb25JZCAmJiB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLnR5cGUgPT09ICdQdWJNZWQnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnB1Ym1lZCA9IGF3YWl0IHRoaXMucHVibWVkU2VydmljZS5nZXRQdWJtZWQodGhpcy5jaXRhdGlvbklkKTtcbiAgICAgICAgaWYgKHRoaXMucHVibWVkKSB7dGhpcy5jaXRhdGlvblB1Ym1lZENoZWNrcygpO31cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbiA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoRXZpZGVuY2VPYmpCaW5kaW5nKCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIFB1Ym1lZCBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgZGVsZXRpb24gb2YgRXZpZGVuY2UgQW5ub3RhdGlvbnMvRXhwZXJpbWVudCBDb250ZXh0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICovXG4gIHJlbW92ZUFubm90YXRpb24oaWR4KSB7XG4gICAgdGhpcy5hbm5vdGF0aW9ucy5zcGxpY2UoaWR4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmxhbmsgYW5ub3RhdGlvbiB0byBlbmQgb2YgQW5ub3RhdGlvbiBpbnB1dCBhbGxGaWVsZHNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGFkZEJsYW5rQW5ub3RhdGlvbihpZHgsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbdGhpcy5hbm5vdGF0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gVG9kbzogY29udmVydCByZXBsYWNlKiBtZXRob2RzIHdpdGggZ2V0dGVyL3NldHRlcnMgYWZ0ZXIgbWFraW5nIHN1cmUgdGhleSB3aWxsIHVwZGF0ZSB0aGUgVmlldyBjb3JyZWN0bHlcblxuICAvKipcbiAgICogUmVwbGFjZSBldmlkZW5jZSBjaXRhdGlvbiBkYXRlIHdpdGggbmV3dmFsXG4gICAqIEBwYXJhbSBuZXd2YWxcbiAgICovXG4gIHJlcGxhY2VDaXRhdGlvbkRhdGUobmV3dmFsKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlID0gbmV3dmFsO1xuICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5kYXRlID0gZmFsc2U7XG4gICAgdGhpcy5yZWZyZXNoRXZpZGVuY2VPYmpCaW5kaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBldmlkZW5jZSBjaXRhdGlvbiBkYXRlIHdpdGggbmV3dmFsXG4gICAqIEBwYXJhbSBuZXd2YWxcbiAgICovXG4gIHJlcGxhY2VDaXRhdGlvbk5hbWUobmV3dmFsKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lID0gbmV3dmFsO1xuICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGV2aWRlbmNlIGNpdGF0aW9uIGRhdGUgd2l0aCBuZXd2YWxcbiAgICogQHBhcmFtIG5ld3ZhbFxuICAgKi9cbiAgcmVwbGFjZUNpdGF0aW9uQXV0aG9ycyhuZXd2YWwpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgPSBuZXd2YWw7XG4gICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmF1dGhvcnMgPSBmYWxzZTtcbiAgICB0aGlzLnJlZnJlc2hFdmlkZW5jZU9iakJpbmRpbmcoKTtcbiAgfVxuXG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgaW4gd2VicGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqXG4gKiB1c2UgaXQgaW4gdGhlIFZpZXcgYXMgJyB8IHBpcGVEZWxpbSdcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVEZWxpbVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnUGlwZS1mcm9tVmlldzogJywgdGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3IgYXJyYXkgdG8gZnJvbSB0ZXh0IHN0cmluZyBkZWxpbWl0ZWQgYnkgJzsnXG4gKlxuICogdXNlIGl0IGluIHRoZSBWaWV3IGFzICcgfCBzdHJpbmdUb0FycmF5J1xuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nVG9BcnJheVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KGFycmF5KSB7XG4gICAgbGV0IHRleHQgPSBcIlwiO1xuICAgIGlmIChhcnJheSkge1xuICAgICAgdGV4dCA9IGFycmF5LmpvaW4oJzsgJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIGZyb21WaWV3KHRleHQpIHtcbiAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICBpZiAodGV4dCkge1xuICAgIGFycmF5ID0gdGV4dC5zcGxpdCgnOyAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBPYmplY3QgdG8gcHJldHR5LXByaW50ZWQgSlNPTiBzdHJpbmcgdG8gaW5zZXJ0IGludG8gdGhlIFZJRVdcbiAqIEBleGFtcGxlIEluc2VydCBpbnRvIHRoZSBWaWV3OiA8cHJlPiR7b2JqZWN0IHwgb2JqZWN0VG9TdHJpbmd9PC9wcmU+XG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RUb1N0cmluZ1ZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KG9iamVjdCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnSGVyZSBpbiBPYmplY3QgdG8gc3RyaW5nIGNvbnZlcnRlcicpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QsIG51bGwsIDIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=