(function (module) {

    var Value = function (value) {
        this.value = value;
    };

    Value.prototype = {
        type: "Value",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        eval: function (env) {
            if (this.value.length === 1) {
                return this.value[0].eval(env);
            } else {
                return new Value(this.value.map(function (v) {
                    return v.eval(env);
                }));
            }
        },
        toCSS: function (env) {
            return this.value.map(function (e) {
                return e.toCSS(env);
            }).join(env.compress ? ',' : ', ');
        }
    };

    module.exports = Value;

})(module);
