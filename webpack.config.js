var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './source/javascripts/main',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
  resolve: {
    extensions: ['.js']
  },
  watch: false,
  devtool: '#eval'
};
