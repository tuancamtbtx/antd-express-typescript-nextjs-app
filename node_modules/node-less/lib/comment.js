(function (module) {

    var Comment = function (value, silent) {
        this.value =  value;
        this.silent = !!silent;
    };

    Comment.prototype = {
        type: "Comment",
        toCSS: function (env) {
            return env.compress ? '' : this.value;
        },
        eval: function () { return this }
    };

    module.exports = Comment;

})(module);
