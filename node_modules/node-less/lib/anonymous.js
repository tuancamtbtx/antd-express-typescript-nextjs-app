(function (module) {

    var Anonymous = function (string) {
        this.value = string.value || string;
    };

    Anonymous.prototype = {
        type: "Anonymous",
        toCSS: function () {
            return this.value;
        },
        eval: function () { return this },
        compare: function (x) {
            if (!x.toCSS) {
                return -1;
            }

            var left = this.toCSS(),
                right = x.toCSS();

            if (left === right) {
                return 0;
            }

            return left < right ? -1 : 1;
        }
    };

    module.exports = Anonymous;

})(module);
