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
        yyyy, yy,
        M, MMM, MMMM,
        w, www, wwww,
        d, ddd, dddd,
        H, h, a, m, mm, s, ss, sss, ssss,
        timezone,
        dateObj,
        json;

    date = new Date();

    // years
    yyyy = date.getFullYear();
    yy = yyyy.toString().substring(2,4);

    // months
    M = date.getMonth();
    MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'];
    MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    // days of the week
    w = date.getDay();
    www = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    wwww = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
        'Saturday'];

    // date
    d = date.getDate();

    // hours
    H = date.getHours();
    h = H;
    a = 'AM';
    if (h >= 12) {
        h = h - 12;
        a = 'PM';
    }
    if (h === 0) {
        h = 12;
    }

    // minutes
    m = date.getMinutes();

    // seconds
    s = date.getSeconds();
    sss = date.getMilliseconds();

    // timezone
    timezone = date.getTimezoneOffset();
    
    dateObj = {
        date: date,
        yyyy: yyyy,
        yy: yy,
        M: M + 1,
        MM: leadDecimal(M + 1),
        MMM: MMM[M],
        MMMM: MMMM[M],
        w: w + 1,
        ww: leadDecimal(w + 1),
        www: www[w],
        wwww: wwww[w],
        d: d,
        dd: leadDecimal(d),
        H: H,
        HH: leadDecimal(H),
        h: h,
        hh: leadDecimal(h),
        a: a,
        m: m,
        mm: leadDecimal(m),
        s: s,
        ss: leadDecimal(s),
        sss: sss,
        ssss: leadDecimal(sss),
        timezone: timezone
    }

    json = JSON.stringify(dateObj);

    fs.writeFile(outputFull, json, function(err) {
        if (err) {
            compiler.errors.push(new Error('Timestamp Webpack Plugin: Unable to save to ' + outputFull));
        }
    });
};

module.exports = Plugin;
