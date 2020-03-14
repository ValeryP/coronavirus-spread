const path = require("path");
const webpack = require('webpack');
const glob = require("glob");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        "bundle.js": glob.sync("build/static/?(js|css)/*.?(js|css)").map(f => path.resolve(__dirname, f))
    },
    output: {
        filename: "build/static/js/coronavirus-spread.min.js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            filename: "[path]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
};