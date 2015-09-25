System.register(['aurelia-framework', './resources/CustomLogAppender', 'aurelia-logging-console'], function (_export) {
  'use strict';

  var LogManager, CustomLogAppender, ConsoleAppender;

  _export('configure', configure);

  function configure(aurelia) {

    aurelia.use.standardConfiguration().plugin('aurelia-validation').plugin("aurelia-gravatar").plugin('aurelia-animator-css');

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }

  return {
    setters: [function (_aureliaFramework) {
      LogManager = _aureliaFramework.LogManager;
    }, function (_resourcesCustomLogAppender) {
      CustomLogAppender = _resourcesCustomLogAppender.CustomLogAppender;
    }, function (_aureliaLoggingConsole) {
      ConsoleAppender = _aureliaLoggingConsole.ConsoleAppender;
    }],
    execute: function () {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(LogManager.logLevel.debug);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNPLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTs7QUFFakMsV0FBTyxDQUFDLEdBQUcsQ0FDUixxQkFBcUIsRUFBRSxDQUV2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FDNUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQzFCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOztBQUdsQyxXQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7S0FBQSxDQUFDLENBQUM7R0FDeEM7Ozs7cUNBcEJPLFVBQVU7O3NEQUNWLGlCQUFpQjs7K0NBQ2pCLGVBQWU7OztBQUd2QixnQkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7QUFDOUMsZ0JBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0N1c3RvbUxvZ0FwcGVuZGVyfSBmcm9tICcuL3Jlc291cmNlcy9DdXN0b21Mb2dBcHBlbmRlcic7XG5pbXBvcnQge0NvbnNvbGVBcHBlbmRlcn0gZnJvbSAnYXVyZWxpYS1sb2dnaW5nLWNvbnNvbGUnO1xuXG4vLyBMb2dNYW5hZ2VyLmFkZEFwcGVuZGVyKG5ldyBDdXN0b21Mb2dBcHBlbmRlcigpKTtcbkxvZ01hbmFnZXIuYWRkQXBwZW5kZXIobmV3IENvbnNvbGVBcHBlbmRlcigpKTtcbkxvZ01hbmFnZXIuc2V0TGV2ZWwoTG9nTWFuYWdlci5sb2dMZXZlbC5kZWJ1Zyk7XG4vLyBMb2dNYW5hZ2VyLnNldExldmVsKExvZ01hbmFnZXIubG9nTGV2ZWwuaW5mbyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYSkge1xuXG4gIGF1cmVsaWEudXNlXG4gICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICBcdC8vIC5kZXZlbG9wbWVudExvZ2dpbmcoKVxuICAgIC5wbHVnaW4oJ2F1cmVsaWEtdmFsaWRhdGlvbicpXG4gICAgLnBsdWdpbihcImF1cmVsaWEtZ3JhdmF0YXJcIilcbiAgICAucGx1Z2luKCdhdXJlbGlhLWFuaW1hdG9yLWNzcycpO1xuICAgIC8vIC5wbHVnaW4oJ2F1cmVsaWEtZGlhbG9nJyk7XG5cbiAgYXVyZWxpYS5zdGFydCgpLnRoZW4oYSA9PiBhLnNldFJvb3QoKSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=