System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'bootstrap'], function (_export) {
  var _createClass, _classCallCheck, App;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_bootstrap) {}],
    execute: function () {
      'use strict';

      App = (function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'BEL Manager';
            config.map([{ route: ['', 'welcome'], moduleId: './welcome', name: 'home', nav: true, title: 'Welcome' }, { route: 'search', moduleId: './search', name: 'search', nav: true, title: 'Search' }, { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit BEL' }, { route: 'create', moduleId: './edit', name: 'create', nav: true, title: 'New BEL' }, { route: 'about', moduleId: './about', name: 'about', nav: true, title: 'About' }]);

            this.router = router;
          }
        }]);

        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3FDQUdhLEdBQUc7Ozs7Ozs7Ozs7O0FBQUgsU0FBRztpQkFBSCxHQUFHO2dDQUFILEdBQUc7OztxQkFBSCxHQUFHOztpQkFDQyx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDO0FBQzdCLGtCQUFNLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztBQUM3QixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFHLFFBQVEsRUFBRSxXQUFXLEVBQUssSUFBSSxFQUFFLE1BQU0sRUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBQyxTQUFTLEVBQUUsRUFDbkcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFTLFFBQVEsRUFBRSxVQUFVLEVBQU0sSUFBSSxFQUFFLFFBQVEsRUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBQyxRQUFRLEVBQUUsRUFDbEcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFPLFFBQVEsRUFBRSxRQUFRLEVBQVEsSUFBSSxFQUFFLE1BQU0sRUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFHLEtBQUssRUFBQyxVQUFVLEVBQUUsRUFDckcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFTLFFBQVEsRUFBRSxRQUFRLEVBQVEsSUFBSSxFQUFFLFFBQVEsRUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBQyxTQUFTLEVBQUUsRUFDbkcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFVLFFBQVEsRUFBRSxTQUFTLEVBQU8sSUFBSSxFQUFFLE9BQU8sRUFBSyxHQUFHLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBQyxPQUFPLEVBQUUsQ0FDbEcsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2VBWlUsR0FBRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2Jvb3RzdHJhcCc7XG4vLyBpbXBvcnQgJ2Jvb3RzdHJhcC9jc3MvYm9vdHN0cmFwLmNzcyEnO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKXtcbiAgICBjb25maWcudGl0bGUgPSAnQkVMIE1hbmFnZXInO1xuICAgIGNvbmZpZy5tYXAoW1xuICAgICAgeyByb3V0ZTogWycnLCd3ZWxjb21lJ10sICBtb2R1bGVJZDogJy4vd2VsY29tZScsICAgIG5hbWU6ICdob21lJywgICAgIG5hdjogdHJ1ZSwgIHRpdGxlOidXZWxjb21lJyB9LFxuICAgICAgeyByb3V0ZTogJ3NlYXJjaCcsICAgICAgICBtb2R1bGVJZDogJy4vc2VhcmNoJywgICAgIG5hbWU6ICdzZWFyY2gnLCAgIG5hdjogdHJ1ZSwgIHRpdGxlOidTZWFyY2gnIH0sXG4gICAgICB7IHJvdXRlOiAnZWRpdC86aWQnLCAgICAgIG1vZHVsZUlkOiAnLi9lZGl0JywgICAgICAgbmFtZTogJ2VkaXQnLCAgICAgbmF2OiBmYWxzZSwgIHRpdGxlOidFZGl0IEJFTCcgfSxcbiAgICAgIHsgcm91dGU6ICdjcmVhdGUnLCAgICAgICAgbW9kdWxlSWQ6ICcuL2VkaXQnLCAgICAgICBuYW1lOiAnY3JlYXRlJywgICBuYXY6IHRydWUsICB0aXRsZTonTmV3IEJFTCcgfSxcbiAgICAgIHsgcm91dGU6ICdhYm91dCcsICAgICAgICAgbW9kdWxlSWQ6ICcuL2Fib3V0JywgICAgICBuYW1lOiAnYWJvdXQnLCAgICBuYXY6IHRydWUsICB0aXRsZTonQWJvdXQnIH1cbiAgICBdKTtcblxuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB9XG59XG5cblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=