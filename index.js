var path = require("path");

var TimestampWebpackPlugin = function (opts) {
    opts = opts || {};
    this.opts = {};
    this.opts.path = opts.path || "";
    this.opts.filename = opts.filename || "stats.json";
};

TimestampWebpackPlugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin("after-emit", function (curCompiler, callback) {
        // FS aliases from webpack.
        var mkdirp = compiler.outputFileSystem.mkdirp;
        var writeFile = compiler.outputFileSystem.writeFile;


        // Make directories, write file.
        mkdirp(self.opts.path, function (err) {
            if (err) { return callback(err); }

            var d = new Date();
            writeFile(
                path.join(self.opts.path, self.opts.filename),
                d,
                { flags: "w+" },
                callback
            );
        });
    });
};

module.exports = TimestampWebpackPlugin;
