"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.values");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextI18NextRewrites = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var nextI18NextRewrites = function nextI18NextRewrites(localeSubpaths) {
  var rewrites = [];

  if (localeSubpaths !== null && (0, _typeof2["default"])(localeSubpaths) === 'object') {
    var subpaths = Object.values(localeSubpaths);

    for (var _i = 0, _subpaths = subpaths; _i < _subpaths.length; _i++) {
      var value = _subpaths[_i];
      rewrites = [].concat((0, _toConsumableArray2["default"])(rewrites), [{
        source: "/:lang(".concat(value, "){/}?"),
        destination: '/'
      }, {
        source: "/:lang(".concat(value, ")/:path*"),
        destination: '/:path*'
      }]);
    }
  }

  return rewrites;
};

exports.nextI18NextRewrites = nextI18NextRewrites;