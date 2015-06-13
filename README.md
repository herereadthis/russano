# Timestamp Webpack Plugin

Generates a JSON file that contains a timestamp of your Webpack Build

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