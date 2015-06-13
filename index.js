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

        var date = new Date();

        var months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        var mon = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        var month = date.getMonth();

        var days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        var d = [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ];
        var day = date.getDay();

        var dateObj = {
            date: date,
            year: date.getFullYear(),
            month: {
                digit: month,
                mon: mon[month],
                month: months[month]
            }
            day: {
                digit: day,
                w: d[day],
                week: days[day]
            }
        }

        // Make directories, write file.
        mkdirp(self.opts.path, function (err) {
            if (err) { return callback(err); }

            writeFile(
                path.join(self.opts.path, self.opts.filename),
                JSON.stringify(dateObj);
                { flags: "w+" },
                callback
            );
        });
    });
};

module.exports = TimestampWebpackPlugin;
