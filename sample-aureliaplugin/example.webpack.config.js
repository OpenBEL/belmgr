/*eslint-disable no-var*/

var path = require('path');
var AureliaWebpackPlugin = require('aurelia-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      //   '/api/v1/^([^.]+)$': {
      '/api/v1*': {
        target: 'http://127.0.0.1:3001',
        secure: false,
      },
      '/auth/*': {
        target: 'http://127.0.0.1:3001',
        secure: false,
      },
    }
  },
  entry: {
    main: [
      './src/main'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new AureliaWebpackPlugin({
      includeSubModules: [{
          moduleId: 'aurelia-dialog',
          include: /[^\.]\.(js|html)$/
        }, {
          moduleId: 'aurelia-auth'
        }, {
          moduleId: 'aurelia-polymer'
        }

      ],
      contextMap: {
        // 'spoonx/aurelia-api': 'node_modules/aurelia-api/dist/commonjs/index.js',
        'aurelia-dialog': 'node_modules/aurelia-dialog/dist/commonjs/aurelia-dialog.js',
        'aurelia-polymer': 'node_modules/aurelia-polymer/dist/commonjs/index.js',
        'aurelia-auth': 'node_modules/aurelia-auth/dist/commonjs/aurelia-auth.js'
      }
    }),
    new ProvidePlugin({
      Promise: 'bluebird'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015-loose', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.css?$/,
      loader: 'style!css'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|gif|jpg|ico)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff2'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  }
};
