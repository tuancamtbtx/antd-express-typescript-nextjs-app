(function (module) {

    var Alpha = function (val) {
        this.value = val;
    };

    Alpha.prototype = {
        type: "Alpha",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        eval: function (env) {
            if (this.value.eval) { this.value = this.value.eval(env) }
            return this;
        },
        toCSS: function () {
            return "alpha(opacity=" +
                   (this.value.toCSS ? this.value.toCSS() : this.value) + ")";
        }
    };

    module.exports = Alpha;

})(module);
