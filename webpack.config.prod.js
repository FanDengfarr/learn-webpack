const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')
// process.env.NODE_ENV = 'production'
const portfinder = require('portfinder');
const TerserPlugin  = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server')

const config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		modules: [
		        path.resolve('./node_modules')
		    ],
	},
	externals:{
	        vue: "Vue"
	     },
		 
	module: {
		// resolve:{
		// 	modules:[path.resolve()]
		// },
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				include:path.resolve(__dirname,'src'),
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				// options: {
				// 	extractCSS: true
				// }
			},
			{
				test: /\.css$/,
				oneOf: [{
						resourceQuery: /module/,
						use: ['vue-style-loader', {
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[local]_[hash:base64:8]'
								}
							}
						},'postcss-loader' ]
					},
					{
						use: ['vue-style-loader', 'css-loader','postcss-loader'],
					}
				],
				exclude: [path.resolve(__dirname, '..', 'node_modules')]
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader','postcss-loader'],
				include: [path.resolve(__dirname, '..', 'node_modules')]
			},
			{
				test: /\.less$/,
				use: ['vue-style-loader', 'css-loader','postcss-loader','less-loader'],
				include: [path.resolve(__dirname, '..', 'node_modules')]
			},
			{
				test: /\.less$/,
				oneOf: [{
						resourceQuery: /module/,
						use: ['vue-style-loader', {
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[local]_[hash:base64:8]'
								}
							}
						},'postcss-loader','less-loader']
					},
					{
						use: ['vue-style-loader', 'css-loader','postcss-loader','less-loader'],
					}
				],
				exclude: [path.resolve(__dirname, '..', 'node_modules')]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name]-[hash].[ext]'
					}
				}]
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		// new ExtractTextPlugin("js/style.css"),
		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		NODE_ENV: "production",
		// 	}
		// }),
		// new ExtractTextPlugin({
		// 	// 打包后的文件路径以及文件名,路径以output的路径为基准.
		// 	filename: 'css/[name][hash:10].css',
		// 	// 禁用插件
		// 	disable: false,
		// 	allChunks: true,
		// 	//禁用顺序检查 (这对 CSS 模块很有用！)，默认 `false`
		// 	ignoreOrder: false,
		// }),
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'index.html')
		}),
	]
};
config.plugins.push(new TerserPlugin())
config.plugins.push(new CleanWebpackPlugin())
const compiler = webpack(config)

compiler.run((_, stats) => {
  console.log(
    stats.toString({
      chunks: false,
      colors: true
    })
  )
})


module.exports = config;
