"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCIMode = void 0;

// Detects if in CI mode due language used
// https://www.i18next.com/overview/api#changelanguage
var isCIMode = function isCIMode(language) {
  return language === 'cimode';
};

exports.isCIMode = isCIMode;