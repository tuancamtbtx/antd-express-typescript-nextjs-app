(function (module) {

    var Anonymous = require('./anonymous.js'),
        functions = require('./functions.js'),
        functionCall = require('./functionCall.js');

    var Call = function (name, args, index, currentFileInfo) {
        this.name = name;
        this.args = args;
        this.index = index;
        this.currentFileInfo = currentFileInfo;
    };

    Call.prototype = {
        type: "Call",
        accept: function (visitor) {
            this.args = visitor.visit(this.args);
        },
        eval: function (env) {
            var args = this.args.map(function (a) { return a.eval(env); }),
                nameLC = this.name.toLowerCase(),
                result, func;

            if (nameLC in functions) {
                try {
                    func = new functionCall(env, this.currentFileInfo);
                    result = func[nameLC].apply(func, args);
                    if (result != null) {
                        return result;
                    }
                } catch (e) {
                    throw { type: e.type || "Runtime",
                            message: "error evaluating function `" + this.name + "`" +
                                     (e.message ? ': ' + e.message : ''),
                            index: this.index, filename: this.currentFileInfo.filename };
                }
            }

            return new Anonymous(this.name +
                "(" + args.map(function (a) { return a.toCSS(env); }).join(', ') + ")");
        },

        toCSS: function (env) {
            return this.eval(env).toCSS();
        }
    };

    module.exports = Call;

})(module);
