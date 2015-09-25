System.register(['babel-runtime/helpers/define-decorated-property-descriptor', 'babel-runtime/helpers/create-decorated-class', 'babel-runtime/helpers/class-call-check', 'aurelia-framework'], function (_export) {
  var _defineDecoratedPropertyDescriptor, _createDecoratedClass, _classCallCheck, bindable, Pager;

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

      Pager = (function () {
        var _instanceInitializers = {};

        function Pager() {
          _classCallCheck(this, Pager);

          _defineDecoratedPropertyDescriptor(this, 'pageIndex', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'pageCount', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'setPage', _instanceInitializers);
        }

        _createDecoratedClass(Pager, [{
          key: 'pageIndex',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'pageCount',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'setPage',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        return Pager;
      })();

      _export('Pager', Pager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs0RkFFYSxLQUFLOzs7Ozs7Ozs7O21DQUZWLFFBQVE7Ozs7O0FBRUgsV0FBSzs7O2lCQUFMLEtBQUs7Z0NBQUwsS0FBSzs7Ozs7Ozs7OzhCQUFMLEtBQUs7O3VCQUNmLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O2VBSEUsS0FBSyIsImZpbGUiOiJjb21wb25lbnRzL3BhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5leHBvcnQgY2xhc3MgUGFnZXIge1xuICBAYmluZGFibGUgcGFnZUluZGV4O1xuICBAYmluZGFibGUgcGFnZUNvdW50O1xuICBAYmluZGFibGUgc2V0UGFnZTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=