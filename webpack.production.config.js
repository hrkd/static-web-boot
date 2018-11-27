var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var banner = require('./config/banner.js');

module.exports = {
  content: path.resolve(__dirname, 'source'),
  devtool: 'cheap-module-source-map',
  entry: './source/javascripts/main',
  output: {
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  /* プラグインの設定 */
  plugins: [
    /* DefinePluginの実行 */
    new webpack.DefinePlugin({
      // process.env.NODE_ENVを'production'に置き換える
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /* UglifyJsPluginの実行 */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        unused: true,
        warnings: true
      }
    }),
    new webpack.BannerPlugin(banner)
  ]
};
