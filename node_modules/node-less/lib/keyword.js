(function (module) {

    var Keyword = function (value) {
        this.value = value
    };

    Keyword.prototype = {
        type: "Keyword",
        eval: function () {
            return this;
        },
        toCSS: function () {
            return this.value;
        },
        compare: function (other) {
            if (other instanceof Keyword) {
                return other.value === this.value ? 0 : 1;
            } else {
                return -1;
            }
        }
    };

    module.exports = Keyword;

})(module);
