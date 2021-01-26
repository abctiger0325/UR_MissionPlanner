var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var path = require("path");

var config = {
    context: __dirname,
    entry: {
        mainWindow: ['./app/mainWindow.jsx'],
        "pdf.worker": "pdfjs-dist/build/pdf.worker.entry",
        // pdfViewer: ['./app/pdfViewer.jsx'] 
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
            },
            { 
                test: /\.xml$/, 
                loader: 'xml-loader' 
            } // will load all .xml files with xml-loader by default
        ]
    },
    plugins: [
        new webpack.ExternalsPlugin('commonjs', ['fs']),
        new webpack.IgnorePlugin(/vertx/)
    ],
    target: 'electron-renderer',
    mode: 'development',
    // output: {
    //     path: path.join(__dirname, "../../build/webpack"),
    //     publicPath: "../../build/webpack/",
    //     filename: "[name].bundle.js",
    // }
}
module.exports = config;