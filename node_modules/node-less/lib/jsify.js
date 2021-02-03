(function(module) {

    module.exports = function (obj) {
        if (Array.isArray(obj.value) && (obj.value.length > 1)) {
            return '[' + obj.value.map(function (v) { return v.toCSS(false) }).join(', ') + ']';
        } else {
            return obj.toCSS(false);
        }
    };

})(module);