System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'aurelia-framework', 'aurelia-validation'], function (_export) {
  var _createClass, _classCallCheck, inject, Validation, TestForm;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaValidation) {
      Validation = _aureliaValidation.Validation;
    }],
    execute: function () {
      'use strict';

      TestForm = (function () {
        function TestForm(validation) {
          _classCallCheck(this, _TestForm);

          this.heading = 'Welcome to the Test Form!';
          this.firstName = 'John';
          this.lastName = 'Doe';

          this.validation = validation.on(this).ensure('firstName').isNotEmpty().hasMinLength(3).hasMaxLength(10).ensure('lastName').isNotEmpty().hasMinLength(3).hasMaxLength(10);
        }

        _createClass(TestForm, [{
          key: 'activate',
          value: function activate(params, routeConfig) {
            this.params = params;
            console.log('Params: ' + routeConfig);
            console.log('Here');
          }
        }, {
          key: 'welcome',
          value: function welcome() {
            var _this = this;

            this.validation.validate().then(function () {
              alert('Welcome, ' + _this.fullName + '! ');
            })['catch'](alert('Problem with form'));
          }
        }, {
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        var _TestForm = TestForm;
        TestForm = inject(Validation)(TestForm) || TestForm;
        return TestForm;
      })();

      _export('TestForm', TestForm);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QtZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3lEQUlhLFFBQVE7Ozs7Ozs7O2lDQUpiLE1BQU07O3NDQUNOLFVBQVU7Ozs7O0FBR0wsY0FBUTtBQUNSLGlCQURBLFFBQVEsQ0FDUCxVQUFVLEVBQUM7OztBQUNyQixjQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0FBQzNDLGNBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLGNBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztBQUV0QixjQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FDbkIsVUFBVSxFQUFFLENBQ1osWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUNmLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FDaEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixVQUFVLEVBQUUsQ0FDWixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQ2YsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFFO1NBRXRCOztxQkFoQlUsUUFBUTs7aUJBa0JYLGtCQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDNUIsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLG1CQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztBQUN0QyxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUNyQjs7O2lCQU1NLG1CQUFFOzs7QUFDUCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FDdkIsSUFBSSxDQUFFLFlBQU07QUFDWCxtQkFBSyxlQUFhLE1BQUssUUFBUSxRQUFLLENBQUM7YUFDdEMsQ0FBQyxTQUNJLENBQ0osS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQzdCLENBQUM7V0FFSDs7O2VBYlcsZUFBRTtBQUNaLG1CQUFVLElBQUksQ0FBQyxTQUFTLFNBQUksSUFBSSxDQUFDLFFBQVEsQ0FBRztXQUM3Qzs7O3dCQTFCVSxRQUFRO0FBQVIsZ0JBQVEsR0FEcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNOLFFBQVEsS0FBUixRQUFRO2VBQVIsUUFBUSIsImZpbGUiOiJ0ZXN0LWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtWYWxpZGF0aW9ufSBmcm9tICdhdXJlbGlhLXZhbGlkYXRpb24nO1xuXG5AaW5qZWN0KFZhbGlkYXRpb24pXG5leHBvcnQgY2xhc3MgVGVzdEZvcm17XG4gIGNvbnN0cnVjdG9yKHZhbGlkYXRpb24pe1xuICAgIHRoaXMuaGVhZGluZyA9ICdXZWxjb21lIHRvIHRoZSBUZXN0IEZvcm0hJztcbiAgICB0aGlzLmZpcnN0TmFtZSA9ICdKb2huJztcbiAgICB0aGlzLmxhc3ROYW1lID0gJ0RvZSc7XG5cbiAgICB0aGlzLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uLm9uKHRoaXMpXG4gICAgICAuZW5zdXJlKCdmaXJzdE5hbWUnKVxuICAgICAgLmlzTm90RW1wdHkoKVxuICAgICAgLmhhc01pbkxlbmd0aCgzKVxuICAgICAgLmhhc01heExlbmd0aCgxMClcbiAgICAgIC5lbnN1cmUoJ2xhc3ROYW1lJylcbiAgICAgIC5pc05vdEVtcHR5KClcbiAgICAgIC5oYXNNaW5MZW5ndGgoMylcbiAgICAgIC5oYXNNYXhMZW5ndGgoMTApIDtcblxuICB9XG5cbiAgYWN0aXZhdGUocGFyYW1zLCByb3V0ZUNvbmZpZykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIGNvbnNvbGUubG9nKCdQYXJhbXM6ICcgKyByb3V0ZUNvbmZpZyk7XG4gICAgY29uc29sZS5sb2coJ0hlcmUnKTtcbiAgfVxuXG4gIGdldCBmdWxsTmFtZSgpe1xuICAgIHJldHVybiBgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWA7XG4gIH1cblxuICB3ZWxjb21lKCl7XG4gICAgdGhpcy52YWxpZGF0aW9uLnZhbGlkYXRlKCkgLy90aGUgdmFsaWRhdGUgd2lsbCBmdWxmaWwgd2hlbiB2YWxpZGF0aW9uIGlzIHZhbGlkLCBhbmQgcmVqZWN0IGlmIG5vdFxuICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgYWxlcnQoYFdlbGNvbWUsICR7dGhpcy5mdWxsTmFtZX0hIGApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChcbiAgICAgICAgYWxlcnQoJ1Byb2JsZW0gd2l0aCBmb3JtJylcbiAgICApO1xuXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==