# Timestamp Webpack Plugin

[![Dependency Status](https://david-dm.org/herereadthis/russano.svg)](https://david-dm.org/herereadthis/russano)
[![npm version](https://badge.fury.io/js/timestamp-webpack-plugin.svg)](https://www.npmjs.com/package/timestamp-webpack-plugin)

Emits a JSON file that contains timestamps of your Webpack build

## Install

```bash
npm install --save-dev timestamp-webpack-plugin 
```

## Configuration

```js
// Add to your Webpack config file
var path = require("path");
var TimestampWebpackPlugin = require('timestamp-webpack-plugin');

module.exports = {
  plugins: [new TimestampWebpackPlugin()]
};  
```

## Options

Timestamp Webpack Plugin accepts two options, path and filename

```js
new TimestampWebpackPlugin({
    path: path.join(__dirname, 'app'),
    // default output is timestamp.json
    filename: 'timestamp.json'
})
```

## Output

* ```date``` - returns full date
* ```yyyy``` - year, 4 digits
* ```yy``` - year, 2 digits
* ```d``` - date (0-31)
* ```dd``` - date, leading zero
* ```M``` - month (0-12)
* ```MM```  - month, leading zero
* ```MMM``` - month (abbreviated)
* ```MMMM``` - month (full name)
* ```w``` - day of the week (1-7)
* ```ww``` - day of the week, leading zero
* ```www``` - day of the week (abbreviated)
* ```wwww``` - day of the week (full name)
* ```H``` - 24-hour time (0-23)
* ```HH``` - 24-hour time, leading zero
* ```h``` - 12-hour time
* ```hh``` - 12-hour time, leading zero
* ```a``` - AM/PM designation
* ```m```  - minutes
* ```mm``` - minutes, leading zero
* ```s``` - seconds
* ```ss``` - seconds, leading zero
* ```sss``` - milliseconds
* ```ssss``` - milliseconds, leading zero
* ```timezone``` - timezone offset in minutes

## Sample JSON Output

(4:44pm, Saturday 13 June 2015 EST)

```json
{  
   "date": "2015-06-13T20:44:37.423Z",
   "yyyy": 2015,
   "yy": "15",
   "d": 13,
   "dd": "13",
   "M": 6,
   "MM":" 06",
   "MMM": "Jun",
   "MMMM": "June",
   "w": 7,
   "ww": "07",
   "www": "Sat",
   "wwww": "Saturday",
   "H": 16,
   "HH": "16",
   "h": 4,
   "hh": "04",
   "a": "PM",
   "m": 44,
   "mm":"44",
   "s": 37,
   "ss": "37",
   "sss": 423,
   "ssss": "423",
   "timezone": 240
}
```

