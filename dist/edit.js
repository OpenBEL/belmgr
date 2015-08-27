System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/regenerator', 'aurelia-framework', './resources/api', './relationsList'], function (_export) {
  var _createClass, _classCallCheck, _regeneratorRuntime, inject, LogManager, Api, relationsList, logger, Edit, PipedelimValueConverter;

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
    }],
    execute: function () {
      'use strict';

      logger = LogManager.getLogger('edit');

      Edit = (function () {
        function Edit(api) {
          _classCallCheck(this, _Edit);

          this.evidenceId = null;
          this.api = api;
          this.msg = 'Edit page';
          this.evidence = {};
          this.relationsList = relationsList;
          this.annotationList = this.api.getBelAnnotations();
        }

        _createClass(Edit, [{
          key: 'activate',
          value: function activate(params) {
            var id;
            return _regeneratorRuntime.async(function activate$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:

                  logger.debug('Relation List: ', relationsList);

                  if (!params.id) {
                    context$2$0.next = 25;
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
                  context$2$0.prev = 14;
                  id = 1945500;
                  context$2$0.next = 18;
                  return _regeneratorRuntime.awrap(this.api.getPubmed(id));

                case 18:
                  this.results = context$2$0.sent;

                  logger.debug("Pubmed", this.results);
                  context$2$0.next = 25;
                  break;

                case 22:
                  context$2$0.prev = 22;
                  context$2$0.t1 = context$2$0['catch'](14);

                  logger.error('GET Pubmed error: ', context$2$0.t1);

                case 25:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, this, [[4, 11], [14, 22]]);
          }
        }, {
          key: 'submit',
          value: function submit() {
            this.api.loadBelEvidence(this.evidenceId, this.evidence);
            return true;
          }
        }]);

        var _Edit = Edit;
        Edit = inject(Api)(Edit) || Edit;
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
              text = text.replace('|', ';');
            }
            return text;
          }
        }, {
          key: 'fromView',
          value: function fromView(text) {
            if (text) {
              text = text.replace(';', '|');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtrR0FLSSxNQUFNLEVBSUcsSUFBSSxFQW9ESix1QkFBdUI7Ozs7Ozs7Ozs7aUNBN0Q1QixNQUFNO3FDQUlOLFVBQVU7OzBCQUhWLEdBQUc7O3FDQUNILGFBQWE7Ozs7O0FBR2pCLFlBQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7QUFJNUIsVUFBSTtBQUVKLGlCQUZBLElBQUksQ0FFSCxHQUFHLEVBQUU7OztBQUNmLGNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7QUFDdkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsY0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDbkMsY0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDcEQ7O3FCQVRVLElBQUk7O2lCQVdELGtCQUFDLE1BQU07Z0JBa0JYLEVBQUU7Ozs7O0FBaEJWLHdCQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDOzt1QkFFM0MsTUFBTSxDQUFDLEVBQUU7Ozs7O0FBQ1gsd0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxzQkFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDOzs7O21EQUlKLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7OztBQUE5RCxzQkFBSSxDQUFDLFFBQVE7O0FBQ2Isd0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7QUFHNUMsd0JBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLGlCQUFNLENBQUM7Ozs7QUFJMUMsb0JBQUUsR0FBRyxPQUFPOzttREFDSyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7OztBQUEzQyxzQkFBSSxDQUFDLE9BQU87O0FBQ1osd0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7QUFHckMsd0JBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLGlCQUFNLENBQUM7Ozs7Ozs7V0FHN0M7OztpQkFNSyxrQkFBRztBQUNQLGdCQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6RCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O29CQTlDVSxJQUFJO0FBQUosWUFBSSxHQURoQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ0MsSUFBSSxLQUFKLElBQUk7ZUFBSixJQUFJOzs7OztBQW9ESiw2QkFBdUI7aUJBQXZCLHVCQUF1QjtnQ0FBdkIsdUJBQXVCOzs7cUJBQXZCLHVCQUF1Qjs7aUJBQzVCLGdCQUFDLElBQUksRUFBRTtBQUNYLGdCQUFJLElBQUksRUFBRTtBQUNSLGtCQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0I7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FFYjs7O2lCQUNPLGtCQUFDLElBQUksRUFBRTtBQUNiLGdCQUFJLElBQUksRUFBRTtBQUNSLGtCQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0I7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2VBYlUsdUJBQXVCIiwiZmlsZSI6ImVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtBcGl9IGZyb20gJy4vcmVzb3VyY2VzL2FwaSc7XG5pbXBvcnQge3JlbGF0aW9uc0xpc3R9IGZyb20gJy4vcmVsYXRpb25zTGlzdCc7XG5cbmltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xubGV0IGxvZ2dlciA9IExvZ01hbmFnZXIuZ2V0TG9nZ2VyKCdlZGl0Jyk7XG5cblxuQGluamVjdChBcGkpXG5leHBvcnQgY2xhc3MgRWRpdCB7XG5cbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5ldmlkZW5jZUlkID0gbnVsbDtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLm1zZyA9ICdFZGl0IHBhZ2UnO1xuICAgIHRoaXMuZXZpZGVuY2UgPSB7fTtcbiAgICB0aGlzLnJlbGF0aW9uc0xpc3QgPSByZWxhdGlvbnNMaXN0O1xuICAgIHRoaXMuYW5ub3RhdGlvbkxpc3QgPSB0aGlzLmFwaS5nZXRCZWxBbm5vdGF0aW9ucygpO1xuICB9XG5cbiAgYXN5bmMgYWN0aXZhdGUocGFyYW1zKSB7XG5cbiAgICBsb2dnZXIuZGVidWcoJ1JlbGF0aW9uIExpc3Q6ICcsIHJlbGF0aW9uc0xpc3QpO1xuXG4gICAgaWYgKHBhcmFtcy5pZCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdJRDogJywgcGFyYW1zLmlkKTtcbiAgICAgIHRoaXMuZXZpZGVuY2VJZCA9IHBhcmFtcy5pZDtcblxuICAgICAgLy8gR2V0IEJFTCBFdmlkZW5jZVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5ldmlkZW5jZSA9IGF3YWl0IHRoaXMuYXBpLmdldEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIkJFTCBFdmlkZW5jZVwiLCB0aGlzLmV2aWRlbmNlKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKCdHRVQgQkVMIEV2aWRlbmNlIGVycm9yOiAnLCBlcnIpO1xuICAgICAgfVxuICAgICAgLy8gR2V0IFB1Ym1lZFxuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGlkID0gMTk0NTUwMDtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gYXdhaXQgdGhpcy5hcGkuZ2V0UHVibWVkKGlkKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiUHVibWVkXCIsIHRoaXMucmVzdWx0cyk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignR0VUIFB1Ym1lZCBlcnJvcjogJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3VibWl0IEJFTCBFdmlkZW5jZSB0byBBUElcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5hcGkubG9hZEJlbEV2aWRlbmNlKHRoaXMuZXZpZGVuY2VJZCwgdGhpcy5ldmlkZW5jZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGF1dGhvcnMgZGVsaW1pdGVkIGJ5ICc7JyBpbiB3ZWJwYWdlIHRvICd8JyBmb3Igc3RvcmFnZVxuICovXG5leHBvcnQgY2xhc3MgUGlwZWRlbGltVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCd8JywgJzsnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG5cbiAgfVxuICBmcm9tVmlldyh0ZXh0KSB7XG4gICAgaWYgKHRleHQpIHtcbiAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoJzsnLCAnfCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9