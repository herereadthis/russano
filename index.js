var fs, path, Plugin;

fs = require('fs');
path = require('path');

Plugin = function(options) {
    this.options = options || {};
    this.options.path = options.path || '';
    this.options.filename = options.filename || 'timestamp.json';
};

Plugin.prototype.apply = function(compiler) {
    var _this, output;

    _this = this;
    output = path.join(_this.options.path, _this.options.filename);

    compiler.plugin('emit', function(compiler, callback) {
        _this.createDateObj(compiler, output);
        callback();
    });
};

leadDecimal = function(num) {
    newNum = num.toString();
    if (newNum.length === 1) {
        newNum = '0' + newNum;
    }
    return newNum;
};

Plugin.prototype.createDateObj = function(compiler, outputFull) {

    var date,
        m, mm, mon, months,
        d, dd, ddd, dddd,
        dateObj,
        json;

    date = new Date();

    m = date.getMonth();
    mm = leadDecimal(m);
    mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    d = date.getDay();
    dd = leadDecimal(d);
    if (dd.length === 1) {
        dd = '0' + d;
    }

    ddd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dddd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
        'Saturday'];

    dateObj = {
        date: date,
        year: date.getFullYear(),
        month: {
            m: m,
            mm: mm,
            mon: mon[m],
            month: months[m]
        },
        day: {
            d: d,
            dd: dd,
            ddd: ddd[d],
            dddd: dddd[d]
        }
    }

    json = JSON.stringify(dateObj);

    fs.writeFile(outputFull, json, function(err) {
        if (err) {
            compiler.errors.push(new Error('Timestamp Webpack Plugin: Unable to save to ' + outputFull));
        }
    });
};



module.exports = Plugin;
