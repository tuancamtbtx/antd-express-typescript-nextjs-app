(function (module) {

    var Variable = require('./variable.js'),
        JavaScript = require('./javascript.js');

    var Quoted = function (str, content, escaped, index, currentFileInfo) {
        this.escaped = escaped;
        this.value = content || '';
        this.quote = str.charAt(0);
        this.index = index;
        this.currentFileInfo = currentFileInfo;
    };

    Quoted.prototype = {
        type: "Quoted",
        toCSS: function () {
            if (this.escaped) {
                return this.value;
            } else {
                return this.quote + this.value + this.quote;
            }
        },
        eval: function (env) {
            var that = this;
            var value = this.value.replace(/`([^`]+)`/g, function (_, exp) {
                return new JavaScript(exp, that.index, true).eval(env).value;
            }).replace(/@\{([\w-]+)\}/g, function (_, name) {
                var v = new Variable('@' + name, that.index, that.currentFileInfo).eval(env, true);
                return (v instanceof Quoted) ? v.value : v.toCSS();
            });
            return new Quoted(this.quote + value + this.quote, value, this.escaped, this.index);
        },
        compare: function (x) {
            if (!x.toCSS) {
                return -1;
            }

            var left = this.toCSS(),
                right = x.toCSS();

            if (left === right) {
                return 0;
            }

            return left < right ? -1 : 1;
        }
    };

    module.exports = Quoted;

})(module);
