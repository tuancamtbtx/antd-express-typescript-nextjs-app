(function (module) {

    var URL = function (val, currentFileInfo) {
        this.value = val;
        this.currentFileInfo = currentFileInfo;
    };

    URL.prototype = {
        type: "Url",
        accept: function (visitor) {
            this.value = visitor.visit(this.value);
        },
        toCSS: function () {
            return "url(" + this.value.toCSS() + ")";
        },
        eval: function (ctx) {
            var val = this.value.eval(ctx), rootpath;
            rootpath = this.currentFileInfo && this.currentFileInfo.rootpath;
            if (rootpath && typeof val.value === "string" && ctx.isPathRelative(val.value)) {
                if (!val.quote) {
                    rootpath = rootpath.replace(/[\(\)'"\s]/g, function(match) {
                        return "\\"+match;
                    });
                }
                val.value = rootpath + val.value;
            }
            return new URL(val, null);
        }
    };

    module.exports = URL;

})(module);
