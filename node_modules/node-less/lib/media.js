(function (module) {

    var Ruleset = require('./ruleset.js'),
        Anonymous = require('./anonymous.js'),
        Expression = require('./expression.js'),
        Element = require('./element.js'),
        Selector = require('./selector.js'),
        Value = require('./value.js');

    var Media = function (value, features) {
        var selectors = this.emptySelectors();
        this.features = new Value(features);
        this.ruleset = new Ruleset(selectors, value);
        this.ruleset.allowImports = true;
    };

    Media.prototype = {
        type: "Media",
        accept: function (visitor) {
            this.features = visitor.visit(this.features);
            this.ruleset = visitor.visit(this.ruleset);
        },
        toCSS: function (env) {
            var features = this.features.toCSS(env);
            return '@media ' + features + (env.compress ? '{' : ' {\n  ') +
                   this.ruleset.toCSS(env).trim().replace(/\n/g, '\n  ') +
                               (env.compress ? '}': '\n}\n');
        },
        eval: function (env) {
            if (!env.mediaBlocks) {
                env.mediaBlocks = [];
                env.mediaPath = [];
            }
            var media = new Media([], []);
            if(this.debugInfo) {
                this.ruleset.debugInfo = this.debugInfo;
                media.debugInfo = this.debugInfo;
            }
            var strictMathBypass = false;
            if (!env.strictMath) {
                strictMathBypass = true;
                env.strictMath = true;
            }
            try {
                media.features = this.features.eval(env);
            }
            finally {
                if (strictMathBypass) {
                    env.strictMath = false;
                }
            }
            env.mediaPath.push(media);
            env.mediaBlocks.push(media);
            env.frames.unshift(this.ruleset);
            media.ruleset = this.ruleset.eval(env);
            env.frames.shift();
            env.mediaPath.pop();
            return env.mediaPath.length === 0 ? media.evalTop(env) :
                        media.evalNested(env)
        },
        variable: function (name) { return Ruleset.prototype.variable.call(this.ruleset, name) },
        find: function () { return Ruleset.prototype.find.apply(this.ruleset, arguments) },
        rulesets: function () { return Ruleset.prototype.rulesets.apply(this.ruleset) },
        emptySelectors: function() {
            var el = new Element('', '&', 0);
            return [new Selector([el])];
        },
        evalTop: function (env) {
            var result = this;
            if (env.mediaBlocks.length > 1) {
                var selectors = this.emptySelectors();
                result = new Ruleset(selectors, env.mediaBlocks);
                result.multiMedia = true;
            }
            delete env.mediaBlocks;
            delete env.mediaPath;
            return result;
        },
        evalNested: function (env) {
            var i, value,
                path = env.mediaPath.concat([this]);
            for (i = 0; i < path.length; i++) {
                value = path[i].features instanceof Value ?
                            path[i].features.value : path[i].features;
                path[i] = Array.isArray(value) ? value : [value];
            }
            this.features = new Value(this.permute(path).map(function (path) {
                path = path.map(function (fragment) {
                    return fragment.toCSS ? fragment : new Anonymous(fragment);
                });
                for(i = path.length - 1; i > 0; i--) {
                    path.splice(i, 0, new Anonymous("and"));
                }
                return new Expression(path);
            }));
            return new Ruleset([], []);
        },
        permute: function (arr) {
          if (arr.length === 0) {
              return [];
          } else if (arr.length === 1) {
              return arr[0];
          } else {
              var result = [];
              var rest = this.permute(arr.slice(1));
              for (var i = 0; i < rest.length; i++) {
                  for (var j = 0; j < arr[0].length; j++) {
                      result.push([arr[0][j]].concat(rest[i]));
                  }
              }
              return result;
          }
        },
        bubbleSelectors: function (selectors) {
          this.ruleset = new Ruleset(selectors.slice(0), [this.ruleset]);
        }
    };

    module.exports = Media;

})(module);
