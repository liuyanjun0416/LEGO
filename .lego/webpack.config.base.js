let paths = require('../config/paths');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		require.resolve('../config/polyfills'),
		paths.deskPagePath
	],
	output: {
		path: paths.deskBuildPath,
		pathinfo: true,
		filename: 'bundle.js',
		publicPath: '/lego-dev/dist'
	},
	resolve:{
		fallback:paths.nodePaths,
		extensions: ['.js', '.json', '.jsx', ''],
		alias: {
			'react-native': 'react-native-web',
			'resources': paths.componentPath
		}
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				include: [paths.deskSrcPath,paths.appSrc],
				loader: 'babel',
				query: {
					plugins: [],
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css?importLoaders=1!postcss'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
		]
	},
	postcss: function () {
		return [
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9', // React doesn't support IE8 anyway
				]
			}),
		];
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			// make fetch available
			fetch: 'exports?self.fetch!whatwg-fetch',
		}),
		new WatchMissingNodeModulesPlugin(paths.appNodeModules),
		new CaseSensitivePathsPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.deskHtmlPath,
		}),
	]
};