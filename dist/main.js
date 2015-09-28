System.register(['aurelia-framework', './resources/CustomLogAppender', 'aurelia-logging-console'], function (_export) {
  'use strict';

  var LogManager, CustomLogAppender, ConsoleAppender;

  _export('configure', configure);

  function configure(aurelia) {

    aurelia.use.standardConfiguration().plugin('aurelia-validation').plugin("aurelia-gravatar").plugin('aurelia-animator-css').plugin('aurelia-dialog');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNPLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTs7QUFFakMsV0FBTyxDQUFDLEdBQUcsQ0FDUixxQkFBcUIsRUFBRSxDQUV2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FDNUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQzFCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUM5QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFNUIsV0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0tBQUEsQ0FBQyxDQUFDO0dBQ3hDOzs7O3FDQXBCTyxVQUFVOztzREFDVixpQkFBaUI7OytDQUNqQixlQUFlOzs7QUFHdkIsZ0JBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLGdCQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtDdXN0b21Mb2dBcHBlbmRlcn0gZnJvbSAnLi9yZXNvdXJjZXMvQ3VzdG9tTG9nQXBwZW5kZXInO1xuaW1wb3J0IHtDb25zb2xlQXBwZW5kZXJ9IGZyb20gJ2F1cmVsaWEtbG9nZ2luZy1jb25zb2xlJztcblxuLy8gTG9nTWFuYWdlci5hZGRBcHBlbmRlcihuZXcgQ3VzdG9tTG9nQXBwZW5kZXIoKSk7XG5Mb2dNYW5hZ2VyLmFkZEFwcGVuZGVyKG5ldyBDb25zb2xlQXBwZW5kZXIoKSk7XG5Mb2dNYW5hZ2VyLnNldExldmVsKExvZ01hbmFnZXIubG9nTGV2ZWwuZGVidWcpO1xuLy8gTG9nTWFuYWdlci5zZXRMZXZlbChMb2dNYW5hZ2VyLmxvZ0xldmVsLmluZm8pO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcblxuICBhdXJlbGlhLnVzZVxuICAgIC5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgXHQvLyAuZGV2ZWxvcG1lbnRMb2dnaW5nKClcbiAgICAucGx1Z2luKCdhdXJlbGlhLXZhbGlkYXRpb24nKVxuICAgIC5wbHVnaW4oXCJhdXJlbGlhLWdyYXZhdGFyXCIpXG4gICAgLnBsdWdpbignYXVyZWxpYS1hbmltYXRvci1jc3MnKVxuICAgIC5wbHVnaW4oJ2F1cmVsaWEtZGlhbG9nJyk7XG5cbiAgYXVyZWxpYS5zdGFydCgpLnRoZW4oYSA9PiBhLnNldFJvb3QoKSk7XG59XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9