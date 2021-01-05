(function (module) {

    var Quoted = require('./quoted.js'),
        Media = require('./media.js'),
        URL = require('./url.js');

    var Import = function (path, features, options, index, currentFileInfo) {
        this.options = options;
        this.index = index;
        this.path = path;
        this.features = features;
        this.currentFileInfo = currentFileInfo;
        if (this.options.less !== undefined) {
            this.css = !this.options.less;
        } else {
            var pathValue = this.getPath();
            if (pathValue && /css([\?;].*)?$/.test(pathValue)) {
                this.css = true;
            }
        }
    };

    Import.prototype = {
        type: "Import",
        accept: function (visitor) {
            this.features = visitor.visit(this.features);
            this.path = visitor.visit(this.path);
            this.root = visitor.visit(this.root);
        },
        toCSS: function (env) {
            var features = this.features ? ' ' + this.features.toCSS(env) : '';

            if (this.css) {
                return "@import " + this.path.toCSS() + features + ';\n';
            } else {
                return "";
            }
        },
        getPath: function () {
            if (this.path instanceof Quoted) {
                var path = this.path.value;
                return (this.css !== undefined || /(\.[a-z]*$)|([\?;].*)$/.test(path)) ? path : path + '.less';
            } else if (this.path instanceof URL) {
                return this.path.value.value;
            }
            return null;
        },
        evalForImport: function (env) {
            return new Import(this.path.eval(env), this.features, this.options, this.index, this.currentFileInfo);
        },
        evalPath: function (env) {
            var path = this.path.eval(env);
            var rootpath = this.currentFileInfo && this.currentFileInfo.rootpath;
            if (rootpath && !(path instanceof URL)) {
                var pathValue = path.value;
                // Add the base path if the import is relative
                if (pathValue && env.isPathRelative(pathValue)) {
                    path.value =  rootpath + pathValue;
                }
            }
            return path;
        },
        eval: function (env) {
            var ruleset, features = this.features && this.features.eval(env);

            if (this.skip) { return []; }

            if (this.css) {
                var newImport = new Import(this.evalPath(env), features, this.options, this.index);
                if (!newImport.css && this.error) {
                    throw this.error;
                }
                return newImport;
            } else {

                var Ruleset = require('./ruleset.js')
                ruleset = new Ruleset([], this.root.rules.slice(0));

                ruleset.evalImports(env);

                return this.features ? new Media(ruleset.rules, this.features.value) : ruleset.rules;
            }
        }
    };

    module.exports = Import;

})(module);
