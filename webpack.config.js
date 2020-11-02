import webpack from 'webpack';
var path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// Naming and path settings
var appName = 'app';
var entryPoint = './src/main.js';
var exportPath = path.resolve(__dirname, './build');
 
// Enviroment flag
var plugins = [];
var env = process.env.WEBPACK_ENV;
 
// Differ settings based on production flag
if (env === 'production') {

  var mode = 'production';
  // var UglifyJsPlugin = webpack.optimization;
 
  // plugins.push(new UglifyJsPlugin({ minimize: true }));
  plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
        // loading remaining from .env.production
      }
    }
  ));
  appName = appName + '.min.js';

} else {

  var mode = 'development';
  plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.WEBPACK_ENV
        // loading remaining from .env.development
      }
    }
  ));
  appName = appName + '.js';

}
 
// Main Settings config
module.exports = {
  mode: mode,
  /*
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/static/baseUrl/' // prod
    : '/', // dev
    */
  entry: entryPoint,
  output: {
    path: exportPath,
    publicPath: mode === 'production'
    ? '/static/publicPath/'
    : '/',
    filename: appName
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};