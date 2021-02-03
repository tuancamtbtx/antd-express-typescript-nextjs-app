(function(module) {
    var functionCall = function(env, currentFileInfo) {
        this.env = env;
        this.currentFileInfo = currentFileInfo;
    };

    functionCall.prototype = require('./functions.js');

    module.exports = functionCall;

})(module);