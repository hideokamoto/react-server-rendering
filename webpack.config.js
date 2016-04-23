var path = require('path');

var assetsPath = path.join(__dirname, 'public', 'assets');
var publicPath = 'assets/';
var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    include: path.join(__dirname,  'src')
  },{
    test: /\.json$/,
    loader: 'json-loader'
  }
];

module.exports = [
  {
    name: 'browser',
    devtool: 'source-map',
    context: path.join(__dirname,  'src'),

    entry: {
      src: './client'
    },

    output: {
      path: assetsPath,
      filename: 'app.js',
      publicPath: publicPath
    },

    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: [
        'src', 'node_modules'
      ]
    }
  },{
    name: 'server-side rendering',
    context: path.join(__dirname, 'src'),
    entry: {
      src: './server'
    },
    target: 'node',
    output: {
      path: assetsPath,
      filename: 'app.server.js',
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: [
        'src', 'node_modules'
      ]
    }
  }
];
