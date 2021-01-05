(function(module) {

    var evalCopyProperties = [
        'silent',      // whether to swallow errors and warnings
        'verbose',     // whether to log more activity
        'compress',    // whether to compress
        'yuicompress', // whether to compress with the outside tool yui compressor
        'ieCompat',    // whether to enforce IE compatibility (IE8 data-uri)
        'strictMath',  // whether math has to be within parenthesis
        'strictUnits'  // whether units need to evaluate correctly
    ];

    var copyFromOriginal = function(original, destination, propertiesToCopy) {
        if (!original) { return; }
        for(var i = 0; i < propertiesToCopy.length; i++) {
            if (original.hasOwnProperty(propertiesToCopy[i])) {
                destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
            }
        }
    };

    var evalEnv = function(options, frames) {
        copyFromOriginal(options, this, evalCopyProperties);
        this.frames = frames || [];
    };

    evalEnv.prototype.inParenthesis = function () {
        if (!this.parensStack) {
            this.parensStack = [];
        }
        this.parensStack.push(true);
    };

    evalEnv.prototype.outOfParenthesis = function () {
        this.parensStack.pop();
    };

    evalEnv.prototype.isMathOn = function () {
        return this.strictMath ? (this.parensStack && this.parensStack.length) : true;
    };

    evalEnv.prototype.isPathRelative = function (path) {
        return !/^(?:[a-z-]+:|\/)/.test(path);
    };

    module.exports = evalEnv;

})(module);