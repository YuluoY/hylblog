/**
 * webpack: 5.71.0
 * webpack-cli: 4.9.2
 */
const path = require("path");
module.exports = {
    entry: './docs/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./docs/"),
    },
    mode: "development",
};
