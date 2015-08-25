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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9PLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTs7QUFFakMsV0FBTyxDQUFDLEdBQUcsQ0FDUixxQkFBcUIsRUFBRSxDQUV2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FDNUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRWxDLFdBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtLQUFBLENBQUMsQ0FBQztHQUN4Qzs7OztxQ0FoQk8sVUFBVTs7c0RBQ1YsaUJBQWlCOzs7O0FBRXpCLGdCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELGdCQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9nTWFuYWdlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtDdXN0b21Mb2dBcHBlbmRlcn0gZnJvbSAnLi9yZXNvdXJjZXMvY3VzdG9tLWxvZy1hcHBlbmRlcic7XG5cbkxvZ01hbmFnZXIuYWRkQXBwZW5kZXIobmV3IEN1c3RvbUxvZ0FwcGVuZGVyKCkpO1xuTG9nTWFuYWdlci5zZXRMZXZlbChMb2dNYW5hZ2VyLmxvZ0xldmVsLmRlYnVnKTtcbi8vIExvZ01hbmFnZXIuc2V0TGV2ZWwoTG9nTWFuYWdlci5sb2dMZXZlbC5pbmZvKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhKSB7XG5cbiAgYXVyZWxpYS51c2VcbiAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbi8vICAgIC5kZXZlbG9wbWVudExvZ2dpbmcoKVxuICAgIC5wbHVnaW4oJ2F1cmVsaWEtdmFsaWRhdGlvbicpXG4gICAgLnBsdWdpbignYXVyZWxpYS1hbmltYXRvci1jc3MnKTtcblxuICBhdXJlbGlhLnN0YXJ0KCkudGhlbihhID0+IGEuc2V0Um9vdCgpKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==