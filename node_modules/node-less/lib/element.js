(function(module) {

    var Combinator = require('./combinator.js');

    var Element = function (combinator, value, index) {
        this.combinator = combinator instanceof Combinator ?
            combinator : new Combinator(combinator);
        if (typeof(value) === 'string') {
            this.value = value.trim();
        } else if (value) {
            this.value = value;
        } else {
            this.value = "";
        }
        this.index = index;
    };

    Element.prototype = {
        type: "Element",
        accept: function (visitor) {
            this.combinator = visitor.visit(this.combinator);
            this.value = visitor.visit(this.value);
        },
        eval: function (env) {
            return new Element(this.combinator,
                this.value.eval ? this.value.eval(env) : this.value,
                this.index);
        },
        toCSS: function (env) {
            var value = (this.value.toCSS ? this.value.toCSS(env) : this.value);
            if (value == '' && this.combinator.value.charAt(0) == '&') {
                return '';
            } else {
                return this.combinator.toCSS(env || {}) + value;
            }
        }
    };

    module.exports = Element;

})(module);