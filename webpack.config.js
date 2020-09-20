var webpack = require('webpack');
var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
 
 
// Naming and path settings
var appName = 'app';
var entryPoint = './main.js';
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
      }
    }
  ));
 
  appName = appName + '.min.js';
} else {
  appName = appName + '.js';
  var mode = 'development';
}
 
// Main Settings config
module.exports = {
  mode: mode,
  entry: entryPoint,
  output: {
    path: exportPath,
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
      }
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