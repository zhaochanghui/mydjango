var webpack = require('webpack');
const path = require('path');
module.exports = {
	entry: './app/index.js',
	devtool: 'eval-source-map',
	output: {
		path: path.join(__dirname,'/dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	watch: true,
	devServer: {
		contentBase: "./",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 9090
	},
	module: {
        rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ["es2015","react"],
				"plugins": ["transform-runtime"]
			}
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}
		]
	},

	plugins: [
    new webpack.HotModuleReplacementPlugin(),
   	new  webpack.NoEmitOnErrorsPlugin()
  ]
};