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
          this.evidence = {};
          this.annotations = [];
          this.relationsList = relationsList;
          this.pubmed = null;
        }

        _createClass(Edit, [{
          key: 'evidenceChanged',
          value: function evidenceChanged() {
            var temp = this.evidence;
            this.evidence = {};
            this.evidence = temp;
          }
        }, {
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
          key: 'reset',
          value: function reset() {
            this.evidence = {};
            logger.debug('Evidence: ', this.evidence);
            return true;
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
//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxvQkFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QztBQUNELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7ZUFkVSx1QkFBdUI7Ozs7O0FBcUJ2QixrQ0FBNEI7aUJBQTVCLDRCQUE0QjtnQ0FBNUIsNEJBQTRCOzs7cUJBQTVCLDRCQUE0Qjs7aUJBQ2pDLGdCQUFDLE1BQU0sRUFBRTtBQUNiLGtCQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDbkQsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3hDOzs7ZUFKVSw0QkFBNEIiLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2FjdGl2YXRpb25TdHJhdGVneX0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5pbXBvcnQge0FwaX0gZnJvbSAnLi9yZXNvdXJjZXMvYXBpJztcbmltcG9ydCB7cmVsYXRpb25zTGlzdH0gZnJvbSAnLi9yZWxhdGlvbnNMaXN0JztcbmltcG9ydCB7UHVibWVkU2VydmljZX0gZnJvbSAnLi9yZXNvdXJjZXMvUHVibWVkU2VydmljZSc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGksIFB1Ym1lZFNlcnZpY2UpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgZGV0ZXJtaW5lQWN0aXZhdGlvblN0cmF0ZWd5KCl7XG4gICAgcmV0dXJuIGFjdGl2YXRpb25TdHJhdGVneS5yZXBsYWNlO1xuICB9XG4gIFxuICBjb25zdHJ1Y3RvcihBcGksIFB1Ym1lZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFwaSA9IEFwaTtcbiAgICB0aGlzLnB1Ym1lZFNlcnZpY2UgPSBQdWJtZWRTZXJ2aWNlO1xuICAgIHRoaXMuZXZpZGVuY2VJZCA9IG51bGw7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIHRoaXMuYW5ub3RhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMucHVibWVkID0gbnVsbDtcblxuLy8gICAgbGV0IGV2aWRlbmNlX3N1YnNjcmlwdGlvbiA9IHRoaXMub2JzZXJ2ZXJMb2NhdG9yXG4vLyAgICAgIC5nZXRPYnNlcnZlcih0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmlkKVxuLy8gICAgICAuc3Vic2NyaWJlKHRoaXMuY2l0YXRpb25DaGFuZ2VkKTtcblxuICB9XG5cbi8vICBvbkZlYXR1cmVzQ2hhbmdlZChtdXRhdGlvbnMpIHtcbi8vICAgIGxldCB0ZW1wID0gdGhpcy5zZWxlY3RlZEZlYXR1cmVzO1xuLy8gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVzID0gW107XG4vLyAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZXMgPSB0ZW1wO1xuLy8gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobXV0YXRpb25zKSk7XG4vLyAgfVxuXG5cbiAgZXZpZGVuY2VDaGFuZ2VkKCkge1xuICAgIGxldCB0ZW1wID0gdGhpcy5ldmlkZW5jZTtcbiAgICB0aGlzLmV2aWRlbmNlID0ge307XG4gICAgdGhpcy5ldmlkZW5jZSA9IHRlbXA7XG4gIH1cblxuICBhc3luYyBhY3RpdmF0ZShwYXJhbXMpIHtcblxuICAgIGxvZ2dlci5kZWJ1ZygnUmVsYXRpb24gTGlzdDogJywgcmVsYXRpb25zTGlzdCk7XG5cbiAgICBpZiAocGFyYW1zLmlkKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0lEOiAnLCBwYXJhbXMuaWQpO1xuICAgICAgdGhpcy5ldmlkZW5jZUlkID0gcGFyYW1zLmlkO1xuXG4gICAgICAvLyBHZXQgQkVMIEV2aWRlbmNlXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkKTtcbiAgICAgICAgdGhpcy5iZWxDb21wb25lbnRzID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsQ29tcG9uZW50cyh0aGlzLmV2aWRlbmNlLmJlbF9zdGF0ZW1lbnQpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0JDOiAnLCB0aGlzLmJlbENvbXBvbmVudHMpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFB1Ym1lZCgpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0V2aWRlbmNlOiAnLCB0aGlzLmV2aWRlbmNlKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdQdWJtZWRBd2FpdDogJywgdGhpcy5wdWJtZWQpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25zID0gdGhpcy5ldmlkZW5jZS5leHBlcmltZW50X2NvbnRleHQ7XG5cbiAgICAgICAgLy8gQWRkaW5nIGJsYW5rIGlucHV0IGZpZWxkIHRvIGFsbG93IGFkZGluZyBuZXcgQW5ub3RhdGlvbnNcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuXG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkxpc3QgPSBhd2FpdCB0aGlzLmFwaS5nZXRCZWxBbm5vdGF0aW9ucygpO1xuICAgICAgICBsb2dnZXIuZGVidWcoXCJCRUwgQW5ub3RhdGlvbnNcIiwgdGhpcy5hbm5vdGF0aW9ucyk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQW5ub0xpc3Q6ICcsIHRoaXMuYW5ub3RhdGlvbkxpc3QpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBCRUwgRXZpZGVuY2UgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBibGFuayBhbm5vdGF0aW9ucyAoYWRkZWQgdG8gdGhlIGVuZCAtIG9yIGp1c3QgYW5ub3RhdGlvbnMgd2l0aCBlbXB0eSB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIG9ialxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHJlbW92ZUJsYW5rQW5ub3RhdGlvbnMob2JqKSB7XG4gICAgaWYgKG9iai52YWx1ZSkge3JldHVybiB0cnVlO31cbiAgICBlbHNlIHtyZXR1cm4gZmFsc2U7fVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5ldmlkZW5jZSA9IHt9O1xuICAgIGxvZ2dlci5kZWJ1ZygnRXZpZGVuY2U6ICcsIHRoaXMuZXZpZGVuY2UpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBTdWJtaXQgQkVMIEV2aWRlbmNlIHRvIEFQSVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLmV2aWRlbmNlLmJlbF9zdGF0ZW1lbnQgPSBgJHt0aGlzLmJlbENvbXBvbmVudHMuc3ViamVjdH0gJHt0aGlzLmJlbENvbXBvbmVudHMucmVsYXRpb25zaGlwfSAke3RoaXMuYmVsQ29tcG9uZW50cy5vYmplY3R9YDtcbiAgICB0aGlzLmV2aWRlbmNlLmV4cGVyaW1lbnRfY29udGV4dCA9IHRoaXMuYW5ub3RhdGlvbnMuZmlsdGVyKHRoaXMucmVtb3ZlQmxhbmtBbm5vdGF0aW9ucyk7XG4gICAgbG9nZ2VyLmRlYnVnKCdTdWJtaXQgZXZpZGVuY2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmV2aWRlbmNlLG51bGwsMikpO1xuICAgIHRoaXMuYXBpLmxvYWRCZWxFdmlkZW5jZSh0aGlzLmV2aWRlbmNlSWQsIHRoaXMuZXZpZGVuY2UpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBjaXRhdGlvbiBpbmZvcm1hdGlvbiBtaXNtYXRjaCBvciBtaXNzaW5nIGluZm9ybWF0aW9uIGZvciBQdWJtZWQgZW50cmllc1xuICAgKlxuICAgKiBBZGQgUHVibWVkIGRhdGEgdG8gZXZpZGVuY2UuY2l0YXRpb24gaWYgZXZpZGVuY2UuY2l0YXRpb24gaW5mb3JtYXRpb24gaXMgbWlzc2luZ1xuICAgKi9cbiAgY2l0YXRpb25QdWJtZWRDaGVja3MoKSB7XG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcpIHtcbiAgICAgIC8vIENoZWNrIGRhdGVcbiAgICAgIGlmICghdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSA9IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlICE9PSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBhdXRob3JzXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycykge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLmF1dGhvcnMgPSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyAhPT0gdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnMpIHtcbiAgICAgICAgdGhpcy5wdWJtZWQuYmVsLm1pc21hdGNoLmF1dGhvcnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgcmVmU3RyaW5nXG4gICAgICBpZiAoIXRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lICE9PSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZCgpIHtcbiAgICAvLyBHZXQgUHVibWVkXG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcgJiYgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLnB1Ym1lZFNlcnZpY2UuZ2V0UHVibWVkKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQpO1xuICAgICAgICB0aGlzLmNpdGF0aW9uUHVibWVkQ2hlY2tzKCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIFB1Ym1lZCBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3cgZGVsZXRpb24gb2YgRXZpZGVuY2UgQW5ub3RhdGlvbnMvRXhwZXJpbWVudCBDb250ZXh0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICovXG4gIHJlbW92ZUFubm90YXRpb24oaWR4KSB7XG4gICAgdGhpcy5hbm5vdGF0aW9ucy5zcGxpY2UoaWR4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYmxhbmsgYW5ub3RhdGlvbiB0byBlbmQgb2YgQW5ub3RhdGlvbiBpbnB1dCBhbGxGaWVsZHNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGFkZEJsYW5rQW5ub3RhdGlvbihpZHgsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbdGhpcy5hbm5vdGF0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKHsnbmFtZSc6ICcnLCAndmFsdWUnOiAnJ30pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYXV0aG9ycyBkZWxpbWl0ZWQgYnkgJzsnIGluIHdlYnBhZ2UgdG8gJ3wnIGZvciBzdG9yYWdlXG4gKi9cbmV4cG9ydCBjbGFzcyBQaXBlRGVsaW1WYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcfC9nLCAnOycpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGZyb21WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFw7L2csICd8Jyk7XG4gICAgICBsb2dnZXIuZGVidWcoJ1BpcGUtZnJvbVZpZXc6ICcsIHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgT2JqZWN0IHRvIHByZXR0eS1wcmludGVkIEpTT04gc3RyaW5nIHRvIGluc2VydCBpbnRvIHRoZSBWSUVXXG4gKiBAZXhhbXBsZSBJbnNlcnQgaW50byB0aGUgVmlldzogPHByZT4ke29iamVjdCB8IG9iamVjdFRvU3RyaW5nfTwvcHJlPlxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0VG9TdHJpbmdWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhvYmplY3QpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0hlcmUgaW4gT2JqZWN0IHRvIHN0cmluZyBjb252ZXJ0ZXInKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBudWxsLCAyKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9