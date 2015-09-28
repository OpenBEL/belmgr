System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './prompt', 'aurelia-dialog'], function (_export) {
  var _createClass, _classCallCheck, Prompt, DialogService, CommonDialogs;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_prompt) {
      Prompt = _prompt.Prompt;
    }, function (_aureliaDialog) {
      DialogService = _aureliaDialog.DialogService;
    }],
    execute: function () {
      'use strict';

      CommonDialogs = (function () {
        _createClass(CommonDialogs, null, [{
          key: 'inject',
          value: [DialogService],
          enumerable: true
        }]);

        function CommonDialogs(dialogService) {
          _classCallCheck(this, CommonDialogs);

          this.dialogService = dialogService;
        }

        _createClass(CommonDialogs, [{
          key: 'prompt',
          value: function prompt(question) {
            return this.dialogService.open({ viewModel: Prompt, model: question });
          }
        }]);

        return CommonDialogs;
      })();

      _export('CommonDialogs', CommonDialogs);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGlhbG9ncy9jb21tb24tZGlhbG9ncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzREQUdhLGFBQWE7Ozs7Ozs7O3VCQUhsQixNQUFNOztxQ0FDTixhQUFhOzs7OztBQUVSLG1CQUFhO3FCQUFiLGFBQWE7O2lCQUNSLENBQUMsYUFBYSxDQUFDOzs7O0FBRXBCLGlCQUhBLGFBQWEsQ0FHWixhQUFhLEVBQUU7Z0NBSGhCLGFBQWE7O0FBSXRCLGNBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1NBQ3BDOztxQkFMVSxhQUFhOztpQkFPbEIsZ0JBQUMsUUFBUSxFQUFFO0FBQ2YsbUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1dBQ3RFOzs7ZUFUVSxhQUFhIiwiZmlsZSI6ImNvbXBvbmVudHMvZGlhbG9ncy9jb21tb24tZGlhbG9ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbXB0fSBmcm9tICcuL3Byb21wdCc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJ2F1cmVsaWEtZGlhbG9nJztcblxuZXhwb3J0IGNsYXNzIENvbW1vbkRpYWxvZ3Mge1xuICBzdGF0aWMgaW5qZWN0ID0gW0RpYWxvZ1NlcnZpY2VdO1xuXG4gIGNvbnN0cnVjdG9yKGRpYWxvZ1NlcnZpY2UpIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2UgPSBkaWFsb2dTZXJ2aWNlO1xuICB9XG5cbiAgcHJvbXB0KHF1ZXN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuKHt2aWV3TW9kZWw6IFByb21wdCwgbW9kZWw6IHF1ZXN0aW9ufSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==