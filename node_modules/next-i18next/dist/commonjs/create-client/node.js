"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _cjs = _interopRequireDefault(require("i18next-fs-backend/cjs"));

var _cjs2 = _interopRequireDefault(require("i18next-http-middleware/cjs"));

var _default = function _default(config) {
  var initPromise;

  if (!_i18next["default"].isInitialized) {
    _i18next["default"].use(_cjs["default"]);

    if (config.serverLanguageDetection) {
      var serverDetectors = new _cjs2["default"].LanguageDetector();
      config.customDetectors.forEach(function (detector) {
        return serverDetectors.addDetector(detector);
      });

      _i18next["default"].use(serverDetectors);
    }

    config.use.forEach(function (x) {
      return _i18next["default"].use(x);
    });
    initPromise = _i18next["default"].init(config);
  }

  return {
    i18n: _i18next["default"],
    initPromise: initPromise
  };
};

exports["default"] = _default;