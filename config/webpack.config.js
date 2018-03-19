var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var ENV = process.env.NODE_ENV;
var ROOT = process.cwd();
var ENTRY = ROOT + '/src/server.js';

var plugins = [
  new webpack.WatchIgnorePlugin([path.resolve(ROOT, 'dist')])
];

if (ENV === 'production') {
  plugins.push(
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        ecma: 5,
        warnings: false,
        ie8: false,
        mangle: true,
        output: {
          ascii_only: true,
          comments: false
        }
      }
    })
  );
}

module.exports = {
  entry: ENTRY,
  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve( __dirname, 'node_modules' )
    ],
    alias: {
      '@core': `${ROOT}/src/core`
    }
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  plugins: plugins
};
