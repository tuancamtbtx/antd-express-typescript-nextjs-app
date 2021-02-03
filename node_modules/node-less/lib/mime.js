(function(module) {

    var Mime = {
        _types: {
            '.htm' : 'text/html',
            '.html': 'text/html',
            '.gif' : 'image/gif',
            '.jpg' : 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png' : 'image/png'
        },
        lookup: function (filepath) {
            var ext = require('path').extname(filepath),
                type = Mime._types[ext];
            if (type === undefined) {
                throw new Error('Optional dependency "mime" is required for ' + ext);
            }
            return type;
        },
        charsets: {
            lookup: function (type) {
                return type && (/^text\//).test(type) ? 'UTF-8' : '';
            }
        }
    };

    module.exports = Mime;

})(module);