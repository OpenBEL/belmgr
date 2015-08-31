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
                    context$2$0.next = 24;
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
                  return _regeneratorRuntime.awrap(this.getPubmed());

                case 10:
                  logger.debug('Evidence: ', this.evidence);
                  logger.debug('PubmedAwait: ', this.pubmed);
                  this.annotations = this.evidence.experiment_context;

                  this.annotations.push({ 'name': '', 'value': '' });

                  context$2$0.next = 16;
                  return _regeneratorRuntime.awrap(this.api.getBelAnnotations());

                case 16:
                  this.annotationList = context$2$0.sent;

                  logger.debug("BEL Annotations", this.annotations);
                  logger.debug('AnnoList: ', this.annotationList);
                  context$2$0.next = 24;
                  break;

                case 21:
                  context$2$0.prev = 21;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 24:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 21]]);
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
            this.evidence.experiment_context = this.annotations.filter(this.removeBlankAnnotations);
            logger.debug('Submit evidence', JSON.stringify(this.evidence, null, 2));

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
              logger.debug('Anno1: ', this.annotations);
              this.annotations.push({ 'name': '', 'value': '' });
              logger.debug('Anno2: ', this.annotations);
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
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUNkLElBQUksS0FBSixJQUFJO2VBQUosSUFBSTs7Ozs7QUEySUosNkJBQXVCO2lCQUF2Qix1QkFBdUI7Z0NBQXZCLHVCQUF1Qjs7O3FCQUF2Qix1QkFBdUI7O2lCQUM1QixnQkFBQyxJQUFJLEVBQUU7QUFDWCxnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFFTyxrQkFBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLG9CQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztlQWRVLHVCQUF1Qjs7Ozs7QUFxQnZCLGtDQUE0QjtpQkFBNUIsNEJBQTRCO2dDQUE1Qiw0QkFBNEI7OztxQkFBNUIsNEJBQTRCOztpQkFDakMsZ0JBQUMsTUFBTSxFQUFFO0FBQ2Isa0JBQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNuRCxtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDeEM7OztlQUpVLDRCQUE0QiIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtyZWxhdGlvbnNMaXN0fSBmcm9tICcuL3JlbGF0aW9uc0xpc3QnO1xuaW1wb3J0IHtQdWJtZWRTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlcy9QdWJtZWRTZXJ2aWNlJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2VkaXQnKTtcblxuXG5AaW5qZWN0KEFwaSwgUHVibWVkU2VydmljZSlcbmV4cG9ydCBjbGFzcyBFZGl0IHtcblxuICBjb25zdHJ1Y3RvcihBcGksIFB1Ym1lZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFwaSA9IEFwaTtcbiAgICB0aGlzLnB1Ym1lZFNlcnZpY2UgPSBQdWJtZWRTZXJ2aWNlO1xuICAgIHRoaXMuZXZpZGVuY2VJZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcblxuICB9XG5cblxuICBhc3luYyBhY3RpdmF0ZShwYXJhbXMpIHtcblxuICAgIGxvZ2dlci5kZWJ1ZygnUmVsYXRpb24gTGlzdDogJywgcmVsYXRpb25zTGlzdCk7XG5cbiAgICBpZiAocGFyYW1zLmlkKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0lEOiAnLCBwYXJhbXMuaWQpO1xuICAgICAgdGhpcy5ldmlkZW5jZUlkID0gcGFyYW1zLmlkO1xuXG4gICAgICAvLyBHZXQgQkVMIEV2aWRlbmNlYVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZSA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0UHVibWVkKCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnRXZpZGVuY2U6ICcsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ1B1Ym1lZEF3YWl0OiAnLCB0aGlzLnB1Ym1lZCk7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbnMgPSB0aGlzLmV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dDtcblxuICAgICAgICAvLyBBZGRpbmcgYmxhbmsgaW5wdXQgZmllbGQgdG8gYWxsb3cgYWRkaW5nIG5ldyBBbm5vdGF0aW9uc1xuICAgICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goeyduYW1lJzogJycsICd2YWx1ZSc6ICcnfSk7XG5cbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uTGlzdCA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEFubm90YXRpb25zKCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIkJFTCBBbm5vdGF0aW9uc1wiLCB0aGlzLmFubm90YXRpb25zKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdBbm5vTGlzdDogJywgdGhpcy5hbm5vdGF0aW9uTGlzdCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIEJFTCBFdmlkZW5jZSBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJsYW5rIGFubm90YXRpb25zIChhZGRlZCB0byB0aGUgZW5kIC0gb3IganVzdCBhbm5vdGF0aW9ucyB3aXRoIGVtcHR5IHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcmVtb3ZlQmxhbmtBbm5vdGF0aW9ucyhvYmopIHtcbiAgICBpZiAob2JqLnZhbHVlKSB7cmV0dXJuIHRydWU7fVxuICAgIGVsc2Uge3JldHVybiBmYWxzZTt9XG4gIH1cblxuICAvKipcbiAgICogU3VibWl0IEJFTCBFdmlkZW5jZSB0byBBUElcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQgPSB0aGlzLmFubm90YXRpb25zLmZpbHRlcih0aGlzLnJlbW92ZUJsYW5rQW5ub3RhdGlvbnMpO1xuICAgIGxvZ2dlci5kZWJ1ZygnU3VibWl0IGV2aWRlbmNlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5ldmlkZW5jZSxudWxsLDIpKTtcbiAgICAvLyB0aGlzLmFwaS5sb2FkQmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkLCB0aGlzLmV2aWRlbmNlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgY2l0YXRpb24gaW5mb3JtYXRpb24gbWlzbWF0Y2ggb3IgbWlzc2luZyBpbmZvcm1hdGlvbiBmb3IgUHVibWVkIGVudHJpZXNcbiAgICpcbiAgICogQWRkIFB1Ym1lZCBkYXRhIHRvIGV2aWRlbmNlLmNpdGF0aW9uIGlmIGV2aWRlbmNlLmNpdGF0aW9uIGluZm9ybWF0aW9uIGlzIG1pc3NpbmdcbiAgICovXG4gIGNpdGF0aW9uUHVibWVkQ2hlY2tzKCkge1xuICAgIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLnR5cGUgPT09ICdQdWJNZWQnKSB7XG4gICAgICAvLyBDaGVjayBkYXRlXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmRhdGUgPSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSAhPT0gdGhpcy5wdWJtZWQuam91cm5hbEluZm8ucHJpbnRQdWJsaWNhdGlvbkRhdGUpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmRhdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgYXV0aG9yc1xuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzID0gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgIT09IHRoaXMucHVibWVkLmJlbC5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5hdXRob3JzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIHJlZlN0cmluZ1xuICAgICAgaWYgKCF0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUpIHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lID0gdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSAhPT0gdGhpcy5wdWJtZWQuYmVsLnJlZlN0cmluZykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2gucmVmU3RyaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRQdWJtZWQoKSB7XG4gICAgLy8gR2V0IFB1Ym1lZFxuICAgIGlmICh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLnR5cGUgPT09ICdQdWJNZWQnICYmIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucHVibWVkID0gYXdhaXQgdGhpcy5wdWJtZWRTZXJ2aWNlLmdldFB1Ym1lZCh0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmlkKTtcbiAgICAgICAgdGhpcy5jaXRhdGlvblB1Ym1lZENoZWNrcygpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBQdWJtZWQgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93IGRlbGV0aW9uIG9mIEV2aWRlbmNlIEFubm90YXRpb25zL0V4cGVyaW1lbnQgQ29udGV4dFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqL1xuICByZW1vdmVBbm5vdGF0aW9uKGlkeCkge1xuICAgIHRoaXMuYW5ub3RhdGlvbnMuc3BsaWNlKGlkeCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGJsYW5rIGFubm90YXRpb24gdG8gZW5kIG9mIEFubm90YXRpb24gaW5wdXQgYWxsRmllbGRzXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBhZGRCbGFua0Fubm90YXRpb24oaWR4LCBldmVudCkge1xuLy8gICAgbG9nZ2VyLmRlYnVnKCdFdmVudCcsIGV2ZW50KTtcbi8vICAgIHRoaXMuYW5ub3RhdGlvbnNbaWR4XS52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbi8vICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIGlmICh0aGlzLmFubm90YXRpb25zW3RoaXMuYW5ub3RhdGlvbnMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnQW5ubzE6ICcsIHRoaXMuYW5ub3RhdGlvbnMpO1xuICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuICAgICAgbG9nZ2VyLmRlYnVnKCdBbm5vMjogJywgdGhpcy5hbm5vdGF0aW9ucyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgaW4gd2VicGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVEZWxpbVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnUGlwZS1mcm9tVmlldzogJywgdGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBPYmplY3QgdG8gcHJldHR5LXByaW50ZWQgSlNPTiBzdHJpbmcgdG8gaW5zZXJ0IGludG8gdGhlIFZJRVdcbiAqIEBleGFtcGxlIEluc2VydCBpbnRvIHRoZSBWaWV3OiA8cHJlPiR7b2JqZWN0IHwgb2JqZWN0VG9TdHJpbmd9PC9wcmU+XG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RUb1N0cmluZ1ZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KG9iamVjdCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnSGVyZSBpbiBPYmplY3QgdG8gc3RyaW5nIGNvbnZlcnRlcicpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QsIG51bGwsIDIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=