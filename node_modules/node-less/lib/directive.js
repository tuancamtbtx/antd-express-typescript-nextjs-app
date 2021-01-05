(function (module) {

    var Ruleset = require('./ruleset.js');

    var Directive = function (name, value) {
        this.name = name;

        if (Array.isArray(value)) {
            this.ruleset = new Ruleset([], value);
            this.ruleset.allowImports = true;
        } else {
            this.value = value;
        }
    };

    Directive.prototype = {
        type: "Directive",
        accept: function (visitor) {
            this.ruleset = visitor.visit(this.ruleset);
            this.value = visitor.visit(this.value);
        },
        toCSS: function (env) {
            if (this.ruleset) {
                this.ruleset.root = true;
                return this.name + (env.compress ? '{' : ' {\n  ') +
                       this.ruleset.toCSS(env).trim().replace(/\n/g, '\n  ') +
                                   (env.compress ? '}': '\n}\n');
            } else {
                return this.name + ' ' + this.value.toCSS() + ';\n';
            }
        },
        eval: function (env) {
            var evaldDirective = this;
            if (this.ruleset) {
                env.frames.unshift(this);
                evaldDirective = new Directive(this.name);
                evaldDirective.ruleset = this.ruleset.eval(env);
                env.frames.shift();
            }
            return evaldDirective;
        },
        variable: function (name) { return Ruleset.prototype.variable.call(this.ruleset, name) },
        find: function () { return Ruleset.prototype.find.apply(this.ruleset, arguments) },
        rulesets: function () { return Ruleset.prototype.rulesets.apply(this.ruleset) }
    };

    module.exports = Directive;

})(module);
