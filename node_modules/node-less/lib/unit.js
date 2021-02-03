(function(module) {

    var UnitConversions = require('./unitConversions.js');

    var Unit = function (numerator, denominator, backupUnit) {
        this.numerator = numerator ? numerator.slice(0).sort() : [];
        this.denominator = denominator ? denominator.slice(0).sort() : [];
        this.backupUnit = backupUnit;
    };

    Unit.prototype = {
        type: "Unit",
        clone: function () {
            return new Unit(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit);
        },
        toCSS: function (env) {
            if (this.numerator.length >= 1) {
                return this.numerator[0];
            }
            if (this.denominator.length >= 1) {
                return this.denominator[0];
            }
            if ((!env || !env.strictUnits) && this.backupUnit) {
                return this.backupUnit;
            }
            return "";
        },
        toString: function () {
            var i, returnStr = this.numerator.join("*");
            for (i = 0; i < this.denominator.length; i++) {
                returnStr += "/" + this.denominator[i];
            }
            return returnStr;
        },
        compare: function (other) {
            return this.is(other.toString()) ? 0 : -1;
        },
        is: function (unitString) {
            return this.toString() === unitString;
        },
        isAngle: function () {
            return UnitConversions.angle.hasOwnProperty(this.toCSS());
        },
        isEmpty: function () {
            return this.numerator.length == 0 && this.denominator.length == 0;
        },
        isSingular: function() {
            return this.numerator.length <= 1 && this.denominator.length == 0;
        },
        map: function(callback) {
            var i;
            for (i = 0; i < this.numerator.length; i++) {
                this.numerator[i] = callback(this.numerator[i], false);
            }
            for (i = 0; i < this.denominator.length; i++) {
                this.denominator[i] = callback(this.denominator[i], true);
            }
        },
        usedUnits: function() {
            var group, groupName, result = {};
            for (groupName in UnitConversions) {
                if (UnitConversions.hasOwnProperty(groupName)) {
                    group = UnitConversions[groupName];
                    this.map(function (atomicUnit) {
                        if (group.hasOwnProperty(atomicUnit) && !result[groupName]) {
                            result[groupName] = atomicUnit;
                        }
                        return atomicUnit;
                    });
                }
            }
            return result;
        },
        cancel: function () {
            var counter = {}, atomicUnit, i, backup;
            for (i = 0; i < this.numerator.length; i++) {
                atomicUnit = this.numerator[i];
                if (!backup) {
                    backup = atomicUnit;
                }
                counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
            }
            for (i = 0; i < this.denominator.length; i++) {
                atomicUnit = this.denominator[i];
                if (!backup) {
                    backup = atomicUnit;
                }
                counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
            }
            this.numerator = [];
            this.denominator = [];
            for (atomicUnit in counter) {
                if (counter.hasOwnProperty(atomicUnit)) {
                    var count = counter[atomicUnit];
                    if (count > 0) {
                        for (i = 0; i < count; i++) {
                            this.numerator.push(atomicUnit);
                        }
                    } else if (count < 0) {
                        for (i = 0; i < -count; i++) {
                            this.denominator.push(atomicUnit);
                        }
                    }
                }
            }
            if (this.numerator.length === 0 && this.denominator.length === 0 && backup) {
                this.backupUnit = backup;
            }
            this.numerator.sort();
            this.denominator.sort();
        }
    };

    module.exports = Unit;

})(module);