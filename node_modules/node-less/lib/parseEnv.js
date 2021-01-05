(function(module) {

    var parseCopyProperties = [
        'paths',            // option - unmodified - paths to search for imports on
        'optimization',     // option - optimization level (for the chunker)
        'files',            // list of files that have been imported, used for import-once
        'contents',         // browser-only, contents of all the files
        'relativeUrls',     // option - whether to adjust URL's to be relative
        'strictImports',    // option -
        'dumpLineNumbers',  // option - whether to dump line numbers
        'compress',         // option - whether to compress
        'processImports',   // option - whether to process imports. if false then imports will not be imported
        'syncImport',       // option - whether to import synchronously
        'mime',             // browser only - mime type for sheet import
        'currentFileInfo'   // information about the current file - for error reporting and importing and making urls relative etc.
    ];

    var copyFromOriginal = function(original, destination, propertiesToCopy) {
        if (!original) { return; }
        for(var i = 0; i < propertiesToCopy.length; i++) {
            if (original.hasOwnProperty(propertiesToCopy[i])) {
                destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
            }
        }
    };

    var parseEnv = function(options) {
        copyFromOriginal(options, this, parseCopyProperties);
        if (!this.contents) { this.contents = {}; }
        if (!this.files) { this.files = {}; }
        if (!this.currentFileInfo) {
            var filename = (options && options.filename) || "input";
            var entryPath = filename.replace(/[^\/\\]*$/, "");
            if (options) {
                options.filename = null;
            }
            this.currentFileInfo = {
                filename: filename,
                relativeUrls: this.relativeUrls,
                rootpath: (options && options.rootpath) || "",
                currentDirectory: entryPath,
                entryPath: entryPath,
                rootFilename: filename
            };
        }
    };

    parseEnv.prototype.toSheet = function (path) {
        var env = new parseEnv(this);
        env.href = path;
        env.type = this.mime;
        return env;
    };

    module.exports = parseEnv;

})(module);