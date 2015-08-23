System.register(['aurelia-framework', './resources/custom-log-appender'], function (_export) {
  'use strict';

  var LogManager, CustomLogAppender;

  _export('configure', configure);

  function configure(aurelia) {

    aurelia.use.standardConfiguration().plugin('aurelia-validation').plugin('aurelia-animator-css');

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }

  return {
    setters: [function (_aureliaFramework) {
      LogManager = _aureliaFramework.LogManager;
    }, function (_resourcesCustomLogAppender) {
      CustomLogAppender = _resourcesCustomLogAppender.CustomLogAppender;
    }],
    execute: function () {

      LogManager.addAppender(new CustomLogAppender());
      LogManager.setLevel(LogManager.logLevel.debug);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1PLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTs7QUFFakMsV0FBTyxDQUFDLEdBQUcsQ0FDUixxQkFBcUIsRUFBRSxDQUV2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FDNUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRWxDLFdBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtLQUFBLENBQUMsQ0FBQztHQUN4Qzs7OztxQ0FmTyxVQUFVOztzREFDVixpQkFBaUI7Ozs7QUFFekIsZ0JBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7QUFDaEQsZ0JBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2dNYW5hZ2VyfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0N1c3RvbUxvZ0FwcGVuZGVyfSBmcm9tICcuL3Jlc291cmNlcy9jdXN0b20tbG9nLWFwcGVuZGVyJztcblxuTG9nTWFuYWdlci5hZGRBcHBlbmRlcihuZXcgQ3VzdG9tTG9nQXBwZW5kZXIoKSk7XG5Mb2dNYW5hZ2VyLnNldExldmVsKExvZ01hbmFnZXIubG9nTGV2ZWwuZGVidWcpO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcblxuICBhdXJlbGlhLnVzZVxuICAgIC5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuLy8gICAgLmRldmVsb3BtZW50TG9nZ2luZygpXG4gICAgLnBsdWdpbignYXVyZWxpYS12YWxpZGF0aW9uJylcbiAgICAucGx1Z2luKCdhdXJlbGlhLWFuaW1hdG9yLWNzcycpO1xuXG4gIGF1cmVsaWEuc3RhcnQoKS50aGVuKGEgPT4gYS5zZXRSb290KCkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9