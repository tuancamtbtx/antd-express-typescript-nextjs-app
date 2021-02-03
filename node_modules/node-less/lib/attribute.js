(function(module) {

    var Attribute = function (key, op, value) {
        this.key = key;
        this.op = op;
        this.value = value;
    };

    Attribute.prototype = {
        type: "Attribute",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        eval: function (env) {
            return new Attribute(this.key.eval ? this.key.eval(env) : this.key,
                this.op, (this.value && this.value.eval) ? this.value.eval(env) : this.value);
        },
        toCSS: function (env) {
            var value = this.key.toCSS ? this.key.toCSS(env) : this.key;
            if (this.op) {
                value += this.op;
                value += (this.value.toCSS ? this.value.toCSS(env) : this.value);
            }
            return '[' + value + ']';
        }
    };

    module.exports = Attribute;

})(module);