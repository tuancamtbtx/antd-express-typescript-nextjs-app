(function (module) {

    var Dimension = require('./dimension.js'),
        Operation = require('./operation.js');

    var Negative = function (node) {
        this.value = node;
    };

    Negative.prototype = {
        type: "Negative",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        toCSS: function (env) {
            return '-' + this.value.toCSS(env);
        },
        eval: function (env) {
            if (env.isMathOn()) {
                return (new Operation('*', [new Dimension(-1), this.value])).eval(env);
            }
            return new Negative(this.value.eval(env));
        }
    };

    module.exports = Negative;

})(module);
