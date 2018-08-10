const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const ENV = process.env.NODE_ENV;
const ROOT = process.cwd();
const ENTRY = `${ROOT}/src/server.js`;
const isProd = ENV === 'production';

const plugins = [new webpack.WatchIgnorePlugin([path.resolve(ROOT, 'dist')])];

if (isProd) {
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
} else {
	plugins.push(new NodemonPlugin());
}

module.exports = {
	entry: ENTRY,
	devtool: isProd ? false : 'eval',
	watch: !isProd,
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
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					retainLines: true
				}
			}
		]
	},
	resolve: {
		extensions: ['.js'],
		modules: [path.resolve(__dirname, 'node_modules')],
		alias: {
			'@core': `${ROOT}/src/core`,
			'@auth': `${ROOT}/src/core/auth`
		}
	},
	stats: {
		colors: true
	},
	plugins
};
