(function(module) {

    var Combinator = function (value) {
        if (value === ' ') {
            this.value = ' ';
        } else {
            this.value = value ? value.trim() : "";
        }
    };

    Combinator.prototype = {
        type: "Combinator",
        toCSS: function (env) {
            return {
                ''  : '',
                ' ' : ' ',
                ':' : ' :',
                '+' : env.compress ? '+' : ' + ',
                '~' : env.compress ? '~' : ' ~ ',
                '>' : env.compress ? '>' : ' > ',
                '|' : env.compress ? '|' : ' | '
            }[this.value];
        }
    };

    module.exports = Combinator;

})(module);