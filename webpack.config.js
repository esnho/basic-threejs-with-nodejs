var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin	= require('html-webpack-plugin');

var src             = './src',
    entry 		      = path.resolve(src, 'js/index.js'),
    jsPath		      = './js/',
    outputName		  = 'bundle.min.js',
    nodeModulesPath	= path.join(__dirname, 'node_modules'),
    base		        = path.join(__dirname, 'dist'),
    templates       = path.join(__dirname, src+'/index.html');

module.exports = {
    entry: entry,
    output: {
        path: base,
        filename: path.join(jsPath, outputName),
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.(glsl|vs|fs)$/,
              loader: 'shader-loader',
              options: {
                glsl: {
                  chunkPath: path.resolve('/glsl/chunks')
                }
              }
            }
        ],
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({template: templates, filename: "./index.html"})
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
