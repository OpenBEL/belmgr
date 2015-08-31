System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', './resources/api', './relationsList', './resources/PubmedService'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, Api, relationsList, PubmedService, logger, Edit, PipeDelimValueConverter, ObjectToStringValueConverter;

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
                    context$2$0.next = 28;
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
                  return _regeneratorRuntime.awrap(this.api.getBelComponents(this.evidence.bel_statement));

                case 10:
                  this.belComponents = context$2$0.sent;

                  logger.debug('BC: ', this.belComponents);
                  context$2$0.next = 14;
                  return _regeneratorRuntime.awrap(this.getPubmed());

                case 14:
                  logger.debug('Evidence: ', this.evidence);
                  logger.debug('PubmedAwait: ', this.pubmed);
                  this.annotations = this.evidence.experiment_context;

                  this.annotations.push({ 'name': '', 'value': '' });

                  context$2$0.next = 20;
                  return _regeneratorRuntime.awrap(this.api.getBelAnnotations());

                case 20:
                  this.annotationList = context$2$0.sent;

                  logger.debug("BEL Annotations", this.annotations);
                  logger.debug('AnnoList: ', this.annotationList);
                  context$2$0.next = 28;
                  break;

                case 25:
                  context$2$0.prev = 25;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 28:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 25]]);
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
            logger.debug('Submit evidence', JSON.stringify(this.evidence, null, 2));
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

                  this.citationPubmedChecks();
                  context$2$0.next = 11;
                  break;

                case 8:
                  context$2$0.prev = 8;
                  context$2$0.t0 = context$2$0['catch'](1);

                  logger.error('GET Pubmed error: ', context$2$0.t0);

                case 11:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[1, 8]]);
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
//# sourceMappingURL=data:application/json;base64,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QiIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtyZWxhdGlvbnNMaXN0fSBmcm9tICcuL3JlbGF0aW9uc0xpc3QnO1xuaW1wb3J0IHtQdWJtZWRTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlcy9QdWJtZWRTZXJ2aWNlJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2VkaXQnKTtcblxuXG5AaW5qZWN0KEFwaSwgUHVibWVkU2VydmljZSlcbmV4cG9ydCBjbGFzcyBFZGl0IHtcblxuICBjb25zdHJ1Y3RvcihBcGksIFB1Ym1lZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFwaSA9IEFwaTtcbiAgICB0aGlzLnB1Ym1lZFNlcnZpY2UgPSBQdWJtZWRTZXJ2aWNlO1xuICAgIHRoaXMuZXZpZGVuY2VJZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcblxuICB9XG5cblxuICBhc3luYyBhY3RpdmF0ZShwYXJhbXMpIHtcblxuICAgIGxvZ2dlci5kZWJ1ZygnUmVsYXRpb24gTGlzdDogJywgcmVsYXRpb25zTGlzdCk7XG5cbiAgICBpZiAocGFyYW1zLmlkKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0lEOiAnLCBwYXJhbXMuaWQpO1xuICAgICAgdGhpcy5ldmlkZW5jZUlkID0gcGFyYW1zLmlkO1xuXG4gICAgICAvLyBHZXQgQkVMIEV2aWRlbmNlYVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZSA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgICAgIHRoaXMuYmVsQ29tcG9uZW50cyA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbENvbXBvbmVudHModGhpcy5ldmlkZW5jZS5iZWxfc3RhdGVtZW50KTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdCQzogJywgdGhpcy5iZWxDb21wb25lbnRzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRQdWJtZWQoKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdFdmlkZW5jZTogJywgdGhpcy5ldmlkZW5jZSk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnUHVibWVkQXdhaXQ6ICcsIHRoaXMucHVibWVkKTtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9ucyA9IHRoaXMuZXZpZGVuY2UuZXhwZXJpbWVudF9jb250ZXh0O1xuXG4gICAgICAgIC8vIEFkZGluZyBibGFuayBpbnB1dCBmaWVsZCB0byBhbGxvdyBhZGRpbmcgbmV3IEFubm90YXRpb25zXG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaCh7J25hbWUnOiAnJywgJ3ZhbHVlJzogJyd9KTtcblxuICAgICAgICB0aGlzLmFubm90YXRpb25MaXN0ID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiQkVMIEFubm90YXRpb25zXCIsIHRoaXMuYW5ub3RhdGlvbnMpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0Fubm9MaXN0OiAnLCB0aGlzLmFubm90YXRpb25MaXN0KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgQkVMIEV2aWRlbmNlIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmxhbmsgYW5ub3RhdGlvbnMgKGFkZGVkIHRvIHRoZSBlbmQgLSBvciBqdXN0IGFubm90YXRpb25zIHdpdGggZW1wdHkgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBvYmpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICByZW1vdmVCbGFua0Fubm90YXRpb25zKG9iaikge1xuICAgIGlmIChvYmoudmFsdWUpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgZWxzZSB7cmV0dXJuIGZhbHNlO31cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJtaXQgQkVMIEV2aWRlbmNlIHRvIEFQSVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmJlbF9zdGF0ZW1lbnQgPSBgJHt0aGlzLmJlbENvbXBvbmVudHMuc3ViamVjdH0gJHt0aGlzLmJlbENvbXBvbmVudHMucmVsYXRpb25zaGlwfSAke3RoaXMuYmVsQ29tcG9uZW50cy5vYmplY3R9YDtcbiAgICB0aGlzLmV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dCA9IHRoaXMuYW5ub3RhdGlvbnMuZmlsdGVyKHRoaXMucmVtb3ZlQmxhbmtBbm5vdGF0aW9ucyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdTdWJtaXQgZXZpZGVuY2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmV2aWRlbmNlLG51bGwsMikpO1xuICAgIHRoaXMuYXBpLmxvYWRCZWxFdmlkZW5jZSh0aGlzLmV2aWRlbmNlSWQsIHRoaXMuZXZpZGVuY2UpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBjaXRhdGlvbiBpbmZvcm1hdGlvbiBtaXNtYXRjaCBvciBtaXNzaW5nIGluZm9ybWF0aW9uIGZvciBQdWJtZWQgZW50cmllc1xuICAgKlxuICAgKiBBZGQgUHVibWVkIGRhdGEgdG8gZXZpZGVuY2UuY2l0YXRpb24gaWYgZXZpZGVuY2UuY2l0YXRpb24gaW5mb3JtYXRpb24gaXMgbWlzc2luZ1xuICAgKi9cbiAgY2l0YXRpb25QdWJtZWRDaGVja3MoKSB7XG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIC8vIENoZWNrIGRhdGVcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSA9IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlICE9PSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBhdXRob3JzXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycykge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgPSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyAhPT0gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnMpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmF1dGhvcnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgcmVmU3RyaW5nXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lICE9PSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZCgpIHtcbiAgICAvLyBHZXQgUHVibWVkXG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcgJiYgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLnB1Ym1lZFNlcnZpY2UuZ2V0UHVibWVkKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQpO1xuICAgICAgICB0aGlzLmNpdGF0aW9uUHVibWVkQ2hlY2tzKCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIFB1Ym1lZCBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgZGVsZXRpb24gb2YgRXZpZGVuY2UgQW5ub3RhdGlvbnMvRXhwZXJpbWVudCBDb250ZXh0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICovXG4gIHJlbW92ZUFubm90YXRpb24oaWR4KSB7XG4gICAgdGhpcy5hbm5vdGF0aW9ucy5zcGxpY2UoaWR4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmxhbmsgYW5ub3RhdGlvbiB0byBlbmQgb2YgQW5ub3RhdGlvbiBpbnB1dCBhbGxGaWVsZHNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGFkZEJsYW5rQW5ub3RhdGlvbihpZHgsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbdGhpcy5hbm5vdGF0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYXV0aG9ycyBkZWxpbWl0ZWQgYnkgJzsnIGluIHdlYnBhZ2UgdG8gJ3wnIGZvciBzdG9yYWdlXG4gKi9cbmV4cG9ydCBjbGFzcyBQaXBlRGVsaW1WYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcfC9nLCAnOycpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGZyb21WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFw7L2csICd8Jyk7XG4gICAgICBsb2dnZXIuZGVidWcoJ1BpcGUtZnJvbVZpZXc6ICcsIHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgT2JqZWN0IHRvIHByZXR0eS1wcmludGVkIEpTT04gc3RyaW5nIHRvIGluc2VydCBpbnRvIHRoZSBWSUVXXG4gKiBAZXhhbXBsZSBJbnNlcnQgaW50byB0aGUgVmlldzogPHByZT4ke29iamVjdCB8IG9iamVjdFRvU3RyaW5nfTwvcHJlPlxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0VG9TdHJpbmdWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhvYmplY3QpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0hlcmUgaW4gT2JqZWN0IHRvIHN0cmluZyBjb252ZXJ0ZXInKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9