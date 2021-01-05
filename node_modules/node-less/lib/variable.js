(function (module) {


    var find = require('./find.js');

    var Variable = function (name, index, currentFileInfo) {
        this.name = name;
        this.index = index;
        this.currentFileInfo = currentFileInfo;
    };

    Variable.prototype = {
        type: "Variable",
        eval: function (env) {
            var variable, v, name = this.name;
            if (name.indexOf('@@') == 0) {
                name = '@' + new Variable(name.slice(1)).eval(env).value;
            }
            if (this.evaluating) {
                throw { type: 'Name',
                        message: "Recursive variable definition for " + name,
                        filename: this.currentFileInfo.file,
                        index: this.index };
            }
            this.evaluating = true;
            if (variable = find(env.frames, function (frame) {
                if (v = frame.variable(name)) {
                    return v.value.eval(env);
                }
            })) {
                this.evaluating = false;
                return variable;
            }
            else {
                throw { type: 'Name',
                        message: "variable " + name + " is undefined",
                        filename: this.currentFileInfo.filename,
                        index: this.index };
            }
        }
    };

    module.exports = Variable;

})(module);
