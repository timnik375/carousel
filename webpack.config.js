const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: "development",
	entry: "./index.js",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html"
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {}
				}, 'css-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {}
				}, 'css-loader', 'sass-loader']
			}
		]
	}
}