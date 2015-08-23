System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'aurelia-framework'], function (_export) {
  var _createClass, _classCallCheck, computedFrom, Welcome, UpperValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      'use strict';

      Welcome = (function () {
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.heading = 'Welcome to the BEL Manager!';
          this.firstName = 'John';
          this.lastName = 'Doe';
          this.previousValue = this.fullName;
        }

        _createClass(Welcome, [{
          key: 'submit',
          value: function submit() {
            this.previousValue = this.fullName;
            alert('Welcome, ' + this.fullName + '!');
          }
        }, {
          key: 'canDeactivate',
          value: function canDeactivate() {
            if (this.fullName !== this.previousValue) {
              return confirm('Are you sure you want to leave?');
            }
          }
        }, {
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        return Welcome;
      })();

      _export('Welcome', Welcome);

      UpperValueConverter = (function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        _createClass(UpperValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return value && value.toUpperCase();
          }
        }]);

        return UpperValueConverter;
      })();

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjttREFFYSxPQUFPLEVBMEJQLG1CQUFtQjs7Ozs7Ozs7dUNBNUJ4QixZQUFZOzs7OztBQUVQLGFBQU87aUJBQVAsT0FBTztnQ0FBUCxPQUFPOztlQUNsQixPQUFPLEdBQUcsNkJBQTZCO2VBQ3ZDLFNBQVMsR0FBRyxNQUFNO2VBQ2xCLFFBQVEsR0FBRyxLQUFLO2VBQ2hCLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUTs7O3FCQUpsQixPQUFPOztpQkFjWixrQkFBRTtBQUNOLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDbkMsaUJBQUssZUFBYSxJQUFJLENBQUMsUUFBUSxPQUFJLENBQUM7V0FDckM7OztpQkFFWSx5QkFBRztBQUNkLGdCQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN4QyxxQkFBTyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUNuRDtXQUNGOzs7ZUFiVyxlQUFFO0FBQ1osbUJBQVUsSUFBSSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsUUFBUSxDQUFHO1dBQzdDOzs7ZUFaVSxPQUFPOzs7OztBQTBCUCx5QkFBbUI7aUJBQW5CLG1CQUFtQjtnQ0FBbkIsbUJBQW1COzs7cUJBQW5CLG1CQUFtQjs7aUJBQ3hCLGdCQUFDLEtBQUssRUFBQztBQUNYLG1CQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7V0FDckM7OztlQUhVLG1CQUFtQiIsImZpbGUiOiJ3ZWxjb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21wdXRlZEZyb219IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuZXhwb3J0IGNsYXNzIFdlbGNvbWV7XG4gIGhlYWRpbmcgPSAnV2VsY29tZSB0byB0aGUgQkVMIE1hbmFnZXIhJztcbiAgZmlyc3ROYW1lID0gJ0pvaG4nO1xuICBsYXN0TmFtZSA9ICdEb2UnO1xuICBwcmV2aW91c1ZhbHVlID0gdGhpcy5mdWxsTmFtZTtcblxuICAvL0dldHRlcnMgY2FuJ3QgYmUgb2JzZXJ2ZWQgd2l0aCBPYmplY3Qub2JzZXJ2ZSwgc28gdGhleSBtdXN0IGJlIGRpcnR5IGNoZWNrZWQuXG4gIC8vSG93ZXZlciwgaWYgeW91IHRlbGwgQXVyZWxpYSB0aGUgZGVwZW5kZW5jaWVzLCBpdCBubyBsb25nZXIgbmVlZHMgdG8gZGlydHkgY2hlY2sgdGhlIHByb3BlcnR5LlxuICAvL1RvIG9wdGltaXplIGJ5IGRlY2xhcmluZyB0aGUgcHJvcGVydGllcyB0aGF0IHRoaXMgZ2V0dGVyIGlzIGNvbXB1dGVkIGZyb20sIHVuY29tbWVudCB0aGUgbGluZSBiZWxvdy5cbiAgLy9AY29tcHV0ZWRGcm9tKCdmaXJzdE5hbWUnLCAnbGFzdE5hbWUnKVxuICBnZXQgZnVsbE5hbWUoKXtcbiAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICB9XG5cbiAgc3VibWl0KCl7XG4gICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gdGhpcy5mdWxsTmFtZTtcbiAgICBhbGVydChgV2VsY29tZSwgJHt0aGlzLmZ1bGxOYW1lfSFgKTtcbiAgfVxuXG4gIGNhbkRlYWN0aXZhdGUoKSB7XG4gICAgaWYgKHRoaXMuZnVsbE5hbWUgIT09IHRoaXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgcmV0dXJuIGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZT8nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVwcGVyVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUpe1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=