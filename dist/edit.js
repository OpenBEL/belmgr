System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'aurelia-framework'], function (_export) {
  var _createClass, _classCallCheck, inject, Edit;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      'use strict';

      Edit = (function () {
        function Edit() {
          _classCallCheck(this, Edit);

          this.msg = 'Edit page';
        }

        _createClass(Edit, [{
          key: 'activate',
          value: function activate(params) {
            this.id = params.id;
          }
        }]);

        return Edit;
      })();

      _export('Edit', Edit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs2Q0FFYSxJQUFJOzs7Ozs7OztpQ0FGVCxNQUFNOzs7OztBQUVELFVBQUk7QUFFSixpQkFGQSxJQUFJLEdBRUQ7Z0NBRkgsSUFBSTs7QUFHYixjQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztTQUN4Qjs7cUJBSlUsSUFBSTs7aUJBTVAsa0JBQUMsTUFBTSxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztXQUdyQjs7O2VBVlUsSUFBSSIsImZpbGUiOiJlZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuZXhwb3J0IGNsYXNzIEVkaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubXNnID0gJ0VkaXQgcGFnZSc7XG4gIH1cblxuICBhY3RpdmF0ZShwYXJhbXMpIHtcbiAgICB0aGlzLmlkID0gcGFyYW1zLmlkO1xuXG5cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9