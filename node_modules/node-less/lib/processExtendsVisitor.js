(function(module) {

    var visitor = require('./visitor.js'),
        Extend = require('./extend.js'),
        Selector = require('./selector.js'),
        Element = require('./element.js'),
        extendFinderVisitor = require('./extendFinderVisitor.js'),
        Attribute = require('./attribute.js');

    var processExtendsVisitor = function() {
        this._visitor = new visitor(this);
    };

    processExtendsVisitor.prototype = {
        run: function(root) {
            var extendFinder = new extendFinderVisitor();
            extendFinder.run(root);
            if (!extendFinder.foundExtends) { return root; }
            root.allExtends = root.allExtends.concat(this.doExtendChaining(root.allExtends, root.allExtends));
            this.allExtendsStack = [root.allExtends];
            return this._visitor.visit(root);
        },
        doExtendChaining: function (extendsList, extendsListTarget, iterationCount) {
            var extendIndex, targetExtendIndex, matches, extendsToAdd = [], newSelector, extendVisitor = this, selectorPath, extend, targetExtend, newExtend;
            iterationCount = iterationCount || 0;
            for(extendIndex = 0; extendIndex < extendsList.length; extendIndex++){
                for(targetExtendIndex = 0; targetExtendIndex < extendsListTarget.length; targetExtendIndex++){
                    extend = extendsList[extendIndex];
                    targetExtend = extendsListTarget[targetExtendIndex];
                    if (this.inInheritanceChain(targetExtend, extend)) { continue; }
                    selectorPath = [targetExtend.selfSelectors[0]];
                    matches = extendVisitor.findMatch(extend, selectorPath);
                    if (matches.length) {
                        extend.selfSelectors.forEach(function(selfSelector) {
                            newSelector = extendVisitor.extendSelector(matches, selectorPath, selfSelector);
                            newExtend = new Extend(targetExtend.selector, targetExtend.option, 0);
                            newExtend.selfSelectors = newSelector;
                            newSelector[newSelector.length-1].extendList = [newExtend];
                            extendsToAdd.push(newExtend);
                            newExtend.ruleset = targetExtend.ruleset;
                            newExtend.parents = [targetExtend, extend];
                            if (targetExtend.firstExtendOnThisSelectorPath) {
                                newExtend.firstExtendOnThisSelectorPath = true;
                                targetExtend.ruleset.paths.push(newSelector);
                            }
                        });
                    }
                }
            }
            if (extendsToAdd.length) {
                this.extendChainCount++;
                if (iterationCount > 100) {
                    var selectorOne = "{unable to calculate}";
                    var selectorTwo = "{unable to calculate}";
                    try
                    {
                        selectorOne = extendsToAdd[0].selfSelectors[0].toCSS();
                        selectorTwo = extendsToAdd[0].selector.toCSS();
                    }
                    catch(e) {}
                    throw {message: "extend circular reference detected. One of the circular extends is currently:"+selectorOne+":extend(" + selectorTwo+")"};
                }
                return extendsToAdd.concat(extendVisitor.doExtendChaining(extendsToAdd, extendsListTarget, iterationCount+1));
            } else {
                return extendsToAdd;
            }
        },
        inInheritanceChain: function (possibleParent, possibleChild) {
            if (possibleParent === possibleChild) {
                return true;
            }
            if (possibleChild.parents) {
                if (this.inInheritanceChain(possibleParent, possibleChild.parents[0])) {
                    return true;
                }
                if (this.inInheritanceChain(possibleParent, possibleChild.parents[1])) {
                    return true;
                }
            }
            return false;
        },
        visitRule: function (ruleNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitSelector: function (selectorNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (rulesetNode.root) {
                return;
            }
            var matches, pathIndex, extendIndex, allExtends = this.allExtendsStack[this.allExtendsStack.length-1], selectorsToAdd = [], extendVisitor = this, selectorPath;
            for(extendIndex = 0; extendIndex < allExtends.length; extendIndex++) {
                for(pathIndex = 0; pathIndex < rulesetNode.paths.length; pathIndex++) {
                    selectorPath = rulesetNode.paths[pathIndex];
                    if (selectorPath[selectorPath.length-1].extendList.length) { continue; }
                    matches = this.findMatch(allExtends[extendIndex], selectorPath);
                    if (matches.length) {
                        allExtends[extendIndex].selfSelectors.forEach(function(selfSelector) {
                            selectorsToAdd.push(extendVisitor.extendSelector(matches, selectorPath, selfSelector));
                        });
                    }
                }
            }
            rulesetNode.paths = rulesetNode.paths.concat(selectorsToAdd);
        },
        findMatch: function (extend, haystackSelectorPath) {
            var haystackSelectorIndex, hackstackSelector, hackstackElementIndex, haystackElement,
                targetCombinator, i,
                extendVisitor = this,
                needleElements = extend.selector.elements,
                potentialMatches = [], potentialMatch, matches = [];
            for(haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath.length; haystackSelectorIndex++) {
                hackstackSelector = haystackSelectorPath[haystackSelectorIndex];
                for(hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector.elements.length; hackstackElementIndex++) {
                    haystackElement = hackstackSelector.elements[hackstackElementIndex];
                    if (extend.allowBefore || (haystackSelectorIndex == 0 && hackstackElementIndex == 0)) {
                        potentialMatches.push({pathIndex: haystackSelectorIndex, index: hackstackElementIndex, matched: 0, initialCombinator: haystackElement.combinator});
                    }
                    for(i = 0; i < potentialMatches.length; i++) {
                        potentialMatch = potentialMatches[i];
                        targetCombinator = haystackElement.combinator.value;
                        if (targetCombinator == '' && hackstackElementIndex === 0) {
                            targetCombinator = ' ';
                        }
                        if (!extendVisitor.isElementValuesEqual(needleElements[potentialMatch.matched].value, haystackElement.value) ||
                            (potentialMatch.matched > 0 && needleElements[potentialMatch.matched].combinator.value !== targetCombinator)) {
                            potentialMatch = null;
                        } else {
                            potentialMatch.matched++;
                        }
                        if (potentialMatch) {
                            potentialMatch.finished = potentialMatch.matched === needleElements.length;
                            if (potentialMatch.finished &&
                                (!extend.allowAfter && (hackstackElementIndex+1 < hackstackSelector.elements.length || haystackSelectorIndex+1 < haystackSelectorPath.length))) {
                                potentialMatch = null;
                            }
                        }
                        if (potentialMatch) {
                            if (potentialMatch.finished) {
                                potentialMatch.length = needleElements.length;
                                potentialMatch.endPathIndex = haystackSelectorIndex;
                                potentialMatch.endPathElementIndex = hackstackElementIndex + 1; // index after end of match
                                potentialMatches.length = 0; // we don't allow matches to overlap, so start matching again
                                matches.push(potentialMatch);
                            }
                        } else {
                            potentialMatches.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            return matches;
        },
        isElementValuesEqual: function(elementValue1, elementValue2) {
            if (typeof elementValue1 === "string" || typeof elementValue2 === "string") {
                return elementValue1 === elementValue2;
            }
            if (elementValue1 instanceof Attribute) {
                if (elementValue1.op !== elementValue2.op || elementValue1.key !== elementValue2.key) {
                    return false;
                }
                if (!elementValue1.value || !elementValue2.value) {
                    if (elementValue1.value || elementValue2.value) {
                        return false;
                    }
                    return true;
                }
                elementValue1 = elementValue1.value.value || elementValue1.value;
                elementValue2 = elementValue2.value.value || elementValue2.value;
                return elementValue1 === elementValue2;
            }
            return false;
        },
        extendSelector:function (matches, selectorPath, replacementSelector) {
            var currentSelectorPathIndex = 0,
                currentSelectorPathElementIndex = 0,
                path = [],
                matchIndex,
                selector,
                firstElement,
                match;
            for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                match = matches[matchIndex];
                selector = selectorPath[match.pathIndex];
                firstElement = new Element(
                    match.initialCombinator,
                    replacementSelector.elements[0].value,
                    replacementSelector.elements[0].index
                );
                if (match.pathIndex > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) {
                    path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
                path = path.concat(selectorPath.slice(currentSelectorPathIndex, match.pathIndex));
                path.push(new Selector(
                    selector.elements
                        .slice(currentSelectorPathElementIndex, match.index)
                        .concat([firstElement])
                        .concat(replacementSelector.elements.slice(1))
                ));
                currentSelectorPathIndex = match.endPathIndex;
                currentSelectorPathElementIndex = match.endPathElementIndex;
                if (currentSelectorPathElementIndex >= selector.elements.length) {
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
            }
            if (currentSelectorPathIndex < selectorPath.length && currentSelectorPathElementIndex > 0) {
                path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                currentSelectorPathElementIndex = 0;
                currentSelectorPathIndex++;
            }
            path = path.concat(selectorPath.slice(currentSelectorPathIndex, selectorPath.length));
            return path;
        },
        visitRulesetOut: function (rulesetNode) {
        },
        visitMedia: function (mediaNode, visitArgs) {
            var newAllExtends = mediaNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length-1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, mediaNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitMediaOut: function (mediaNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        },
        visitDirective: function (directiveNode, visitArgs) {
            var newAllExtends = directiveNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length-1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, directiveNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitDirectiveOut: function (directiveNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        }
    };

    module.exports = processExtendsVisitor;

})(module);