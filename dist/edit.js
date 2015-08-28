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
          this.annotationList = this.api.getBelAnnotations();
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
                    context$2$0.next = 15;
                    break;
                  }

                  logger.debug('ID: ', params.id);
                  this.evidenceId = params.id;

                  context$2$0.prev = 4;
                  context$2$0.next = 7;
                  return _regeneratorRuntime.awrap(this.api.getBelEvidence(this.evidenceId));

                case 7:
                  this.evidence = context$2$0.sent;

                  logger.debug("BEL Evidence", this.evidence);
                  context$2$0.next = 14;
                  break;

                case 11:
                  context$2$0.prev = 11;
                  context$2$0.t0 = context$2$0['catch'](4);

                  logger.error('GET BEL Evidence error: ', context$2$0.t0);

                case 14:
                  this.getPubmed();

                case 15:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 11]]);
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

              logger.debug(this.evidence.citation.authors, '!==', this.pubmed.bel.authors);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtpSEFNSSxNQUFNLEVBSUcsSUFBSSxFQXNHSix1QkFBdUI7Ozs7Ozs7Ozs7aUNBaEg1QixNQUFNO3FDQUtOLFVBQVU7OzBCQUpWLEdBQUc7O3FDQUNILGFBQWE7OzhDQUNiLGFBQWE7Ozs7O0FBR2pCLFlBQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7QUFJNUIsVUFBSTtBQUVKLGlCQUZBLElBQUksQ0FFSCxHQUFHLEVBQUUsYUFBYSxFQUFFOzs7QUFDOUIsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzs7QUFFbkMsY0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsY0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDbkMsY0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDbkQsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEI7O3FCQVhVLElBQUk7O2lCQWFELGtCQUFDLE1BQU07Ozs7O0FBRW5CLHdCQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDOzt1QkFFM0MsTUFBTSxDQUFDLEVBQUU7Ozs7O0FBQ1gsd0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxzQkFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDOzs7O21EQUlKLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7OztBQUE5RCxzQkFBSSxDQUFDLFFBQVE7O0FBQ2Isd0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7QUFHNUMsd0JBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLGlCQUFNLENBQUM7OztBQUdoRCxzQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7Ozs7O1dBRXBCOzs7aUJBTUssa0JBQUc7QUFDUCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekQsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFjb0IsZ0NBQUc7QUFDdEIsZ0JBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUU1QyxrQkFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtBQUNqQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDO2VBQzVFLE1BQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUU7QUFDckYsb0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2VBQ3RDOztBQUVELG9CQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0Usa0JBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDcEMsb0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7ZUFDMUQsTUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDbkUsb0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2VBQ3pDOztBQUVELGtCQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ2pDLG9CQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2VBQ3pELE1BQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO0FBQ2xFLG9CQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztlQUMzQzthQUNGO1dBQ0Y7OztpQkFFYzs7Ozt3QkFFVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTs7Ozs7OzttREFFakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDOzs7QUFBM0Usc0JBQUksQ0FBQyxNQUFNOzs7Ozs7OztBQUdYLHdCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixpQkFBTSxDQUFDOzs7O0FBRzFDLHNCQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7Ozs7OztXQUUvQjs7O29CQTlGVSxJQUFJO0FBQUosWUFBSSxHQURoQixNQUFNLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUNkLElBQUksS0FBSixJQUFJO2VBQUosSUFBSTs7Ozs7QUFzR0osNkJBQXVCO2lCQUF2Qix1QkFBdUI7Z0NBQXZCLHVCQUF1Qjs7O3FCQUF2Qix1QkFBdUI7O2lCQUM1QixnQkFBQyxJQUFJLEVBQUU7QUFDWCxnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBRWI7OztpQkFDTyxrQkFBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxJQUFJLEVBQUU7QUFDUixrQkFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO0FBQ0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztlQWJVLHVCQUF1QiIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7QXBpfSBmcm9tICcuL3Jlc291cmNlcy9hcGknO1xuaW1wb3J0IHtyZWxhdGlvbnNMaXN0fSBmcm9tICcuL3JlbGF0aW9uc0xpc3QnO1xuaW1wb3J0IHtQdWJtZWRTZXJ2aWNlfSBmcm9tICcuL3Jlc291cmNlcy9QdWJtZWRTZXJ2aWNlJztcblxuaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5sZXQgbG9nZ2VyID0gTG9nTWFuYWdlci5nZXRMb2dnZXIoJ2VkaXQnKTtcblxuXG5AaW5qZWN0KEFwaSwgUHVibWVkU2VydmljZSlcbmV4cG9ydCBjbGFzcyBFZGl0IHtcblxuICBjb25zdHJ1Y3RvcihBcGksIFB1Ym1lZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFwaSA9IEFwaTtcbiAgICB0aGlzLnB1Ym1lZFNlcnZpY2UgPSBQdWJtZWRTZXJ2aWNlO1xuXG4gICAgdGhpcy5ldmlkZW5jZUlkID0gbnVsbDtcbiAgICB0aGlzLmV2aWRlbmNlID0ge307XG4gICAgdGhpcy5yZWxhdGlvbnNMaXN0ID0gcmVsYXRpb25zTGlzdDtcbiAgICB0aGlzLmFubm90YXRpb25MaXN0ID0gdGhpcy5hcGkuZ2V0QmVsQW5ub3RhdGlvbnMoKTtcbiAgICB0aGlzLnB1Ym1lZCA9IG51bGw7XG4gIH1cblxuICBhc3luYyBhY3RpdmF0ZShwYXJhbXMpIHtcblxuICAgIGxvZ2dlci5kZWJ1ZygnUmVsYXRpb24gTGlzdDogJywgcmVsYXRpb25zTGlzdCk7XG5cbiAgICBpZiAocGFyYW1zLmlkKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0lEOiAnLCBwYXJhbXMuaWQpO1xuICAgICAgdGhpcy5ldmlkZW5jZUlkID0gcGFyYW1zLmlkO1xuXG4gICAgICAvLyBHZXQgQkVMIEV2aWRlbmNlXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlID0gYXdhaXQgdGhpcy5hcGkuZ2V0QmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiQkVMIEV2aWRlbmNlXCIsIHRoaXMuZXZpZGVuY2UpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBCRUwgRXZpZGVuY2UgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG4gICAgICAvLyBHZXQgUHVibWVkXG4gICAgICB0aGlzLmdldFB1Ym1lZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJtaXQgQkVMIEV2aWRlbmNlIHRvIEFQSVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLmFwaS5sb2FkQmVsRXZpZGVuY2UodGhpcy5ldmlkZW5jZUlkLCB0aGlzLmV2aWRlbmNlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4vLyAgYXV0aG9yczogXCJcIlxuLy8gIGNvbW1lbnQ6IFwiXCJcbi8vICBkYXRlOiBcIlwiXG4vLyAgaWQ6IFwiMTE3OTI3MTZcIlxuLy8gIG5hbWU6IFwiSiBMaXBpZCBSZXMgMjAwMiBKYW4gNDMoMSkgMi0xMlwiXG4vLyAgdHlwZTogXCJQdWJNZWRcIlxuXG4gIC8qKlxuICAgKiBDaGVjayBmb3IgY2l0YXRpb24gaW5mb3JtYXRpb24gbWlzbWF0Y2ggb3IgbWlzc2luZyBpbmZvcm1hdGlvbiBmb3IgUHVibWVkIGVudHJpZXNcbiAgICpcbiAgICogQWRkIFB1Ym1lZCBkYXRhIHRvIGV2aWRlbmNlLmNpdGF0aW9uIGlmIGV2aWRlbmNlLmNpdGF0aW9uIGluZm9ybWF0aW9uIGlzIG1pc3NpbmdcbiAgICovXG4gIGNpdGF0aW9uUHVibWVkQ2hlY2tzICgpIHtcbiAgICBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi50eXBlID09PSAnUHViTWVkJykge1xuICAgICAgLy8gQ2hlY2sgZGF0ZVxuICAgICAgaWYgKCEgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uZGF0ZSA9IHRoaXMucHVibWVkLmpvdXJuYWxJbmZvLnByaW50UHVibGljYXRpb25EYXRlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5kYXRlICE9PSB0aGlzLnB1Ym1lZC5qb3VybmFsSW5mby5wcmludFB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBhdXRob3JzXG4gICAgICBsb2dnZXIuZGVidWcodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzLCAnIT09JywgdGhpcy5wdWJtZWQuYmVsLmF1dGhvcnMpO1xuICAgICAgaWYgKCEgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzKSB7XG4gICAgICAgIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uYXV0aG9ycyA9IHRoaXMucHVibWVkLmJlbC5hdXRob3JzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5hdXRob3JzICE9PSB0aGlzLnB1Ym1lZC5iZWwuYXV0aG9ycykge1xuICAgICAgICB0aGlzLnB1Ym1lZC5iZWwubWlzbWF0Y2guYXV0aG9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBDaGVjayByZWZTdHJpbmdcbiAgICAgIGlmICghIHRoaXMuZXZpZGVuY2UuY2l0YXRpb24ubmFtZSkge1xuICAgICAgICB0aGlzLmV2aWRlbmNlLmNpdGF0aW9uLm5hbWUgPSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5uYW1lICE9PSB0aGlzLnB1Ym1lZC5iZWwucmVmU3RyaW5nKSB7XG4gICAgICAgIHRoaXMucHVibWVkLmJlbC5taXNtYXRjaC5yZWZTdHJpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFB1Ym1lZCgpIHtcbiAgICAvLyBHZXQgUHVibWVkXG4gICAgaWYgKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24udHlwZSA9PT0gJ1B1Yk1lZCcgJiYgdGhpcy5ldmlkZW5jZS5jaXRhdGlvbi5pZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5wdWJtZWQgPSBhd2FpdCB0aGlzLnB1Ym1lZFNlcnZpY2UuZ2V0UHVibWVkKHRoaXMuZXZpZGVuY2UuY2l0YXRpb24uaWQpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ0dFVCBQdWJtZWQgZXJyb3I6ICcsIGVycik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2l0YXRpb25QdWJtZWRDaGVja3MoKTtcbiAgICB9XG4gIH1cblxuXG59XG5cbi8qKlxuICogQ29udmVydCBhdXRob3JzIGRlbGltaXRlZCBieSAnOycgaW4gd2VicGFnZSB0byAnfCcgZm9yIHN0b3JhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBpcGVkZWxpbVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHRleHQpIHtcbiAgICBpZiAodGV4dCkge1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx8L2csICc7Jyk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuXG4gIH1cbiAgZnJvbVZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXDsvZywgJ3wnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==