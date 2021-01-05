(function (module) {

    var Value = require('./value.js');

    var Rule = function (name, value, important, index, currentFileInfo, inline) {
        this.name = name;
        this.value = (value instanceof Value) ? value : new Value([value]);
        this.important = important ? ' ' + important.trim() : '';
        this.index = index;
        this.currentFileInfo = currentFileInfo;
        this.inline = inline || false;
        if (name.charAt(0) === '@') {
            this.variable = true;
        } else {
            this.variable = false
        }
    };

    Rule.prototype = {
        type: "Rule",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        toCSS: function (env) {
            if (this.variable) { return "" }
            else {
                try {
                    return this.name + (env.compress ? ':' : ': ') +
                       this.value.toCSS(env) +
                       this.important + (this.inline ? "" : ";");
                }
                catch(e) {
                    e.index = this.index;
                    e.filename = this.currentFileInfo.filename;
                    throw e;
                }
            }
        },
        eval: function (env) {
            var strictMathBypass = false;
            if (this.name === "font" && !env.strictMath) {
                strictMathBypass = true;
                env.strictMath = true;
            }
            try {
                return new Rule(this.name, this.value.eval(env), this.important, this.index, this.currentFileInfo, this.inline);
            }
            finally {
                if (strictMathBypass) {
                    env.strictMath = false;
                }
            }
        },
        makeImportant: function () {
            return new Rule(this.name, this.value, "!important", this.index, this.currentFileInfo, this.inline);
        }
    };

    module.exports = Rule;

})(module);
