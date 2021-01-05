(function (module) {

    var Paren = function (node) {
        this.value = node;
    };

    Paren.prototype = {
        type: "Paren",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        toCSS: function (env) {
            return '(' + this.value.toCSS(env).trim() + ')';
        },
        eval: function (env) {
            return new Paren(this.value.eval(env));
        }
    };

    module.exports = Paren;

})(module);
