(function (module) {

    var UnicodeDescriptor = function (value) {
        this.value = value;
    };

    UnicodeDescriptor.prototype = {
        type: "UnicodeDescriptor",
        toCSS: function (env) {
            return this.value;
        },
        eval: function () { return this }
    };

    module.exports = UnicodeDescriptor;

})(module);
