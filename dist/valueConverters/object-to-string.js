System.register(["babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], function (_export) {
  var _createClass, _classCallCheck, ObjectToStringValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass["default"];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
    }],
    execute: function () {
      "use strict";

      ObjectToStringValueConverter = (function () {
        function ObjectToStringValueConverter() {
          _classCallCheck(this, ObjectToStringValueConverter);
        }

        _createClass(ObjectToStringValueConverter, [{
          key: "toView",
          value: function toView(object) {
            return JSON.stringify(object, null, 2);
          }
        }]);

        return ObjectToStringValueConverter;
      })();

      _export("ObjectToStringValueConverter", ObjectToStringValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlQ29udmVydGVycy9vYmplY3QtdG8tc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7cUNBSWEsNEJBQTRCOzs7Ozs7Ozs7OztBQUE1QixrQ0FBNEI7aUJBQTVCLDRCQUE0QjtnQ0FBNUIsNEJBQTRCOzs7cUJBQTVCLDRCQUE0Qjs7aUJBQ2pDLGdCQUFDLE1BQU0sRUFBRTtBQUNiLG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztXQUN4Qzs7O2VBSFUsNEJBQTRCIiwiZmlsZSI6InZhbHVlQ29udmVydGVycy9vYmplY3QtdG8tc3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb252ZXJ0IE9iamVjdCB0byBwcmV0dHktcHJpbnRlZCBKU09OIHN0cmluZyB0byBpbnNlcnQgaW50byB0aGUgVklFV1xuICogQGV4YW1wbGUgSW5zZXJ0IGludG8gdGhlIFZJRVc6IDxwcmU+JHtvYmplY3QgfCBvYmplY3RUb1N0cmluZ308L3ByZT5cbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFRvU3RyaW5nVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcob2JqZWN0KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgbnVsbCwgMik7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2FnZVxuICpcbiAqIDxyZXF1aXJlIGZyb209XCJPYmplY3RUb1N0cmluZ1wiPjwvcmVxdWlyZT5cbiAqIDxwcmU+JHtvYmplY3QgfCBvYmplY3RUb1N0cmluZ308L3ByZT5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9