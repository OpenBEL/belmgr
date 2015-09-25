System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'aurelia-dialog'], function (_export) {
  var _createClass, _classCallCheck, DialogController, EditPerson;

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

      EditPerson = (function () {
        _createClass(EditPerson, null, [{
          key: 'inject',
          value: [DialogController],
          enumerable: true
        }]);

        function EditPerson(controller) {
          _classCallCheck(this, EditPerson);

          this.person = { firstName: '' };

          this.controller = controller;
        }

        _createClass(EditPerson, [{
          key: 'activate',
          value: function activate(person) {
            this.person = person;
          }
        }]);

        return EditPerson;
      })();

      _export('EditPerson', EditPerson);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRwZXJzb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt1REFFYSxVQUFVOzs7Ozs7Ozt3Q0FGZixnQkFBZ0I7Ozs7O0FBRVgsZ0JBQVU7cUJBQVYsVUFBVTs7aUJBQ0wsQ0FBQyxnQkFBZ0IsQ0FBQzs7OztBQUV2QixpQkFIQSxVQUFVLENBR1QsVUFBVSxFQUFDO2dDQUhaLFVBQVU7O2VBRXJCLE1BQU0sR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7O0FBRXhCLGNBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQzlCOztxQkFMVSxVQUFVOztpQkFNYixrQkFBQyxNQUFNLEVBQUM7QUFDZCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7V0FDdEI7OztlQVJVLFVBQVUiLCJmaWxlIjoiZWRpdHBlcnNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSAnYXVyZWxpYS1kaWFsb2cnO1xuXG5leHBvcnQgY2xhc3MgRWRpdFBlcnNvbiB7XG4gIHN0YXRpYyBpbmplY3QgPSBbRGlhbG9nQ29udHJvbGxlcl07XG4gIHBlcnNvbiA9IHsgZmlyc3ROYW1lOiAnJyB9O1xuICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKXtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICB9XG4gIGFjdGl2YXRlKHBlcnNvbil7XG4gICAgdGhpcy5wZXJzb24gPSBwZXJzb247XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=