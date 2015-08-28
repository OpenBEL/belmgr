System.register(['aurelia-framework', './resources/CustomLogAppender', 'aurelia-logging-console'], function (_export) {
  'use strict';

  var LogManager, CustomLogAppender, ConsoleAppender;

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
    }, function (_aureliaLoggingConsole) {
      ConsoleAppender = _aureliaLoggingConsole.ConsoleAppender;
    }],
    execute: function () {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(LogManager.logLevel.debug);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNPLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTs7QUFFakMsV0FBTyxDQUFDLEdBQUcsQ0FDUixxQkFBcUIsRUFBRSxDQUV2QixNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FDNUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRWxDLFdBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtLQUFBLENBQUMsQ0FBQztHQUN4Qzs7OztxQ0FsQk8sVUFBVTs7c0RBQ1YsaUJBQWlCOzsrQ0FDakIsZUFBZTs7O0FBR3ZCLGdCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztBQUM5QyxnQkFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xvZ01hbmFnZXJ9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Q3VzdG9tTG9nQXBwZW5kZXJ9IGZyb20gJy4vcmVzb3VyY2VzL0N1c3RvbUxvZ0FwcGVuZGVyJztcbmltcG9ydCB7Q29uc29sZUFwcGVuZGVyfSBmcm9tICdhdXJlbGlhLWxvZ2dpbmctY29uc29sZSc7XG5cbi8vIExvZ01hbmFnZXIuYWRkQXBwZW5kZXIobmV3IEN1c3RvbUxvZ0FwcGVuZGVyKCkpO1xuTG9nTWFuYWdlci5hZGRBcHBlbmRlcihuZXcgQ29uc29sZUFwcGVuZGVyKCkpO1xuTG9nTWFuYWdlci5zZXRMZXZlbChMb2dNYW5hZ2VyLmxvZ0xldmVsLmRlYnVnKTtcbi8vIExvZ01hbmFnZXIuc2V0TGV2ZWwoTG9nTWFuYWdlci5sb2dMZXZlbC5pbmZvKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhKSB7XG5cbiAgYXVyZWxpYS51c2VcbiAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbi8vICAgIC5kZXZlbG9wbWVudExvZ2dpbmcoKVxuICAgIC5wbHVnaW4oJ2F1cmVsaWEtdmFsaWRhdGlvbicpXG4gICAgLnBsdWdpbignYXVyZWxpYS1hbmltYXRvci1jc3MnKTtcblxuICBhdXJlbGlhLnN0YXJ0KCkudGhlbihhID0+IGEuc2V0Um9vdCgpKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==