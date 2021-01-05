(function (module) {

    var Unit = require('./unit.js'),
        Color = require('./color.js'),
        UnitConversions = require('./unitConversions.js'),
        operate = require('./operate.js');

    var Dimension = function (value, unit) {
        this.value = parseFloat(value);
        this.unit = (unit && unit instanceof Unit) ? unit :
          new Unit(unit ? [unit] : undefined);
    };

    Dimension.prototype = {
        type: "Dimension",
        accept: function (visitor) {
            this.unit = visitor.visit(this.unit);
        },
        eval: function (env) {
            return this;
        },
        toColor: function () {
            return new Color([this.value, this.value, this.value]);
        },
        toCSS: function (env) {
            if ((env && env.strictUnits) && !this.unit.isSingular()) {
                throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: "+this.unit.toString());
            }
            var value = this.value,
                strValue = String(value);
            if (value !== 0 && value < 0.000001 && value > -0.000001) {
                strValue = value.toFixed(20).replace(/0+$/, "");
            }
            if (env && env.compress) {
                if (value === 0 && !this.unit.isAngle()) {
                    return strValue;
                }
                if (value > 0 && value < 1) {
                    strValue = (strValue).substr(1);
                }
            }
            return strValue + this.unit.toCSS(env);
        },
        operate: function (env, op, other) {
            var value = operate(env, op, this.value, other.value),
                unit = this.unit.clone();
            if (op === '+' || op === '-') {
                if (unit.numerator.length === 0 && unit.denominator.length === 0) {
                    unit.numerator = other.unit.numerator.slice(0);
                    unit.denominator = other.unit.denominator.slice(0);
                } else if (other.unit.numerator.length == 0 && unit.denominator.length == 0) {

                } else {
                    other = other.convertTo(this.unit.usedUnits());
                    if(env.strictUnits && other.unit.toString() !== unit.toString()) {
                      throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + unit.toString() +
                        "' and '" + other.unit.toString() + "'.");
                    }
                    value = operate(env, op, this.value, other.value);
                }
            } else if (op === '*') {
                unit.numerator = unit.numerator.concat(other.unit.numerator).sort();
                unit.denominator = unit.denominator.concat(other.unit.denominator).sort();
                unit.cancel();
            } else if (op === '/') {
                unit.numerator = unit.numerator.concat(other.unit.denominator).sort();
                unit.denominator = unit.denominator.concat(other.unit.numerator).sort();
                unit.cancel();
            }
            return new Dimension(value, unit);
        },
        compare: function (other) {
            if (other instanceof Dimension) {
                var a = this.unify(), b = other.unify(),
                    aValue = a.value, bValue = b.value;
                if (bValue > aValue) {
                    return -1;
                } else if (bValue < aValue) {
                    return 1;
                } else {
                    if (!b.unit.isEmpty() && a.unit.compare(b.unit) !== 0) {
                        return -1;
                    }
                    return 0;
                }
            } else {
                return -1;
            }
        },
        unify: function () {
          return this.convertTo({ length: 'm', duration: 's', angle: 'rad' });
        },
        convertTo: function (conversions) {
          var value = this.value, unit = this.unit.clone(),
              i, groupName, group, conversion, targetUnit, derivedConversions = {};
          if (typeof conversions === 'string') {
              for(i in UnitConversions) {
                  if (UnitConversions[i].hasOwnProperty(conversions)) {
                      derivedConversions = {};
                      derivedConversions[i] = conversions;
                  }
              }
              conversions = derivedConversions;
          }
          for (groupName in conversions) {
            if (conversions.hasOwnProperty(groupName)) {
              targetUnit = conversions[groupName];
              group = UnitConversions[groupName];
              unit.map(function (atomicUnit, denominator) {
                if (group.hasOwnProperty(atomicUnit)) {
                  if (denominator) {
                    value = value / (group[atomicUnit] / group[targetUnit]);
                  } else {
                    value = value * (group[atomicUnit] / group[targetUnit]);
                  }
                  return targetUnit;
                }
                return atomicUnit;
              });
            }
          }
          unit.cancel();
          return new Dimension(value, unit);
        }
    };

    module.exports = Dimension;

})(module);
