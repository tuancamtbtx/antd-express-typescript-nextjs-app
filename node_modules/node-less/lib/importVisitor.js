(function (module) {

    var visitor = require('./visitor.js'),
        evalEnvFunc = require('./evalEnv.js');

    var importVisitor = function(importer, finish, evalEnv) {
        this._visitor = new visitor(this);
        this._importer = importer;
        this._finish = finish;
        this.env = evalEnv || new evalEnvFunc();
        this.importCount = 0;
    };

    importVisitor.prototype = {
        isReplacing: true,
        run: function (root) {
            var error;
            try {
                this._visitor.visit(root);
            }
            catch(e) {
                error = e;
            }
            this.isFinished = true;
            if (this.importCount === 0) {
                this._finish(error);
            }
        },
        visitImport: function (importNode, visitArgs) {
            var me = this,
                evaldImportNode;
            if (!importNode.css) {
                try {
                    evaldImportNode = importNode.evalForImport(this.env);
                } catch(e){
                    if (!e.filename) { e.index = importNode.index; e.filename = importNode.currentFileInfo.filename; }
                    importNode.css = true;
                    importNode.error = e;
                }
                if (evaldImportNode && !evaldImportNode.css) {
                    importNode = evaldImportNode;
                    this.importCount++;
                    var env = new evalEnvFunc(this.env, this.env.frames.slice(0));
                    this._importer.push(importNode.getPath(), importNode.currentFileInfo, function (e, root, imported) {
                        if (e && !e.filename) { e.index = importNode.index; e.filename = importNode.currentFileInfo.filename; }
                        if (imported && !importNode.options.multiple) { importNode.skip = imported; }
                        var subFinish = function(e) {
                            me.importCount--;
                            if (me.importCount === 0 && me.isFinished) {
                                me._finish(e);
                            }
                        };
                        if (root) {
                            importNode.root = root;
                            new importVisitor(me._importer, subFinish, env)
                                .run(root);
                        } else {
                            subFinish();
                        }
                    });
                }
            }
            visitArgs.visitDeeper = false;
            return importNode;
        },
        visitRule: function (ruleNode, visitArgs) {
            visitArgs.visitDeeper = false;
            return ruleNode;
        },
        visitDirective: function (directiveNode, visitArgs) {
            this.env.frames.unshift(directiveNode);
            return directiveNode;
        },
        visitDirectiveOut: function (directiveNode) {
            this.env.frames.shift();
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            this.env.frames.unshift(mixinDefinitionNode);
            return mixinDefinitionNode;
        },
        visitMixinDefinitionOut: function (mixinDefinitionNode) {
            this.env.frames.shift();
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            this.env.frames.unshift(rulesetNode);
            return rulesetNode;
        },
        visitRulesetOut: function (rulesetNode) {
            this.env.frames.shift();
        },
        visitMedia: function (mediaNode, visitArgs) {
            this.env.frames.unshift(mediaNode.ruleset);
            return mediaNode;
        },
        visitMediaOut: function (mediaNode) {
            this.env.frames.shift();
        }
    };

    module.exports = importVisitor;

})(module);