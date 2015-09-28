System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'aurelia-dialog'], function (_export) {
  var _createClass, _classCallCheck, DialogController, Prompt;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_aureliaDialog) {
      DialogController = _aureliaDialog.DialogController;
    }],
    execute: function () {
      'use strict';

      Prompt = (function () {
        _createClass(Prompt, null, [{
          key: 'inject',
          value: [DialogController],
          enumerable: true
        }]);

        function Prompt(controller) {
          _classCallCheck(this, Prompt);

          this.controller = controller;
          this.answer = null;

          controller.settings.lock = false;
        }

        _createClass(Prompt, [{
          key: 'activate',
          value: function activate(question) {
            this.question = question;
          }
        }]);

        return Prompt;
      })();

      _export('Prompt', Prompt);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGlhbG9ncy9wcm9tcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt1REFFYSxNQUFNOzs7Ozs7Ozt3Q0FGWCxnQkFBZ0I7Ozs7O0FBRVgsWUFBTTtxQkFBTixNQUFNOztpQkFDRCxDQUFDLGdCQUFnQixDQUFDOzs7O0FBRXZCLGlCQUhBLE1BQU0sQ0FHTCxVQUFVLEVBQUU7Z0NBSGIsTUFBTTs7QUFJZixjQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbkIsb0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNsQzs7cUJBUlUsTUFBTTs7aUJBVVQsa0JBQUMsUUFBUSxFQUFFO0FBQ2pCLGdCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztXQUMxQjs7O2VBWlUsTUFBTSIsImZpbGUiOiJjb21wb25lbnRzL2RpYWxvZ3MvcHJvbXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaWFsb2dDb250cm9sbGVyfSBmcm9tICdhdXJlbGlhLWRpYWxvZyc7XG5cbmV4cG9ydCBjbGFzcyBQcm9tcHQge1xuICBzdGF0aWMgaW5qZWN0ID0gW0RpYWxvZ0NvbnRyb2xsZXJdO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIHRoaXMuYW5zd2VyID0gbnVsbDtcblxuICAgIGNvbnRyb2xsZXIuc2V0dGluZ3MubG9jayA9IGZhbHNlO1xuICB9XG5cbiAgYWN0aXZhdGUocXVlc3Rpb24pIHtcbiAgICB0aGlzLnF1ZXN0aW9uID0gcXVlc3Rpb247XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==