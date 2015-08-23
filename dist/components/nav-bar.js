System.register(['babel-runtime/helpers/define-decorated-property-descriptor', 'babel-runtime/helpers/create-decorated-class', 'babel-runtime/helpers/class-call-check', 'aurelia-framework'], function (_export) {
  var _defineDecoratedPropertyDescriptor, _createDecoratedClass, _classCallCheck, bindable, NavBar;

  return {
    setters: [function (_babelRuntimeHelpersDefineDecoratedPropertyDescriptor) {
      _defineDecoratedPropertyDescriptor = _babelRuntimeHelpersDefineDecoratedPropertyDescriptor['default'];
    }, function (_babelRuntimeHelpersCreateDecoratedClass) {
      _createDecoratedClass = _babelRuntimeHelpersCreateDecoratedClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      'use strict';

      NavBar = (function () {
        var _instanceInitializers = {};

        function NavBar() {
          _classCallCheck(this, NavBar);

          _defineDecoratedPropertyDescriptor(this, 'router', _instanceInitializers);
        }

        _createDecoratedClass(NavBar, [{
          key: 'router',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }], null, _instanceInitializers);

        return NavBar;
      })();

      _export('NavBar', NavBar);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmF2LWJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzRGQUVhLE1BQU07Ozs7Ozs7Ozs7bUNBRlgsUUFBUTs7Ozs7QUFFSCxZQUFNOzs7aUJBQU4sTUFBTTtnQ0FBTixNQUFNOzs7Ozs4QkFBTixNQUFNOzt1QkFDaEIsUUFBUTs7bUJBQVUsSUFBSTs7Ozs7ZUFEWixNQUFNIiwiZmlsZSI6ImNvbXBvbmVudHMvbmF2LWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuZXhwb3J0IGNsYXNzIE5hdkJhciB7XG4gIEBiaW5kYWJsZSByb3V0ZXIgPSBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9