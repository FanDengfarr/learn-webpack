const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV == 'development'
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"',
			}
		}),
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
if (isDev) {
	portfinder.getPort(function(err, port) {
			config.devtool = '#cheap-module-eval-source-map',
			config.devServer = {
				clientLogLevel: 'none',
				port: port,
				host: '127.0.0.1',
				overlay: {
					errors: true
				},
				noInfo: true,
				quiet: true,
				compress:true,
				open:true,  //每次都打开一个网页
				hot: true //只渲染一个组件
			}
		// config.plugins.push(
		// 	new webpack.HotModuleReplacementPlugin(),
		// )
		// config.plugins.push(new BundleAnalyzerPlugin({
		//     analyzerMode: 'disabled',
		//     generateStatsFile: true,
		//     statsOptions: { source: false }
		// }))
		config.plugins.push(new FriendlyErrorsWebpackPlugin({
			 compilationSuccessInfo: {
			        messages: [`You application is running here http://0.0.0.0:${port}`]
			      }
		}
		))
		config.plugins.push(
			new ProgressBarPlugin(),
		)
		const compiler = webpack(config)
		const server = new WebpackDevServer(compiler, config.devServer)
		server.listen(port)
	});
	
} else{
	config.plugins.push(new TerserPlugin())
	config.plugins.push(new CleanWebpackPlugin())
}


module.exports = config;
