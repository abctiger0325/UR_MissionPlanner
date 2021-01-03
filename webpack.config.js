var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    entry: {
        mainWindow: ['./app/mainWindow.jsx']
    },
    output: {
        path: __dirname + '/app/built',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-react"],
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                }
            }
        ]
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', ['fs']),
        new webpack.IgnorePlugin(/vertx/)
    ],
    target: 'electron-renderer',
    mode: 'development'
}
module.exports = config;