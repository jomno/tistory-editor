const path = require('path');
const url = require('url');
const webpack = require("webpack");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'renderer', 'index')
	],
	output: {
		path: path.join(__dirname, 'app'),
		publicPath: url.format({
      pathname: path.join(__dirname, 'app/'),
      protocol: 'file:',
      slashes: true
    }),
		filename: 'editor.min.js'
	},
	plugins: process.env.NODE_ENV !== "production" ? [
    new MonacoWebpackPlugin(),
  ] : [
    new MonacoWebpackPlugin(),
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		})
	],
	externals: {
    "jsdom": {},
		"codemirror": "CodeMirror",
		"highlightjs": "hljs",
		"tinymce": "tinymce"
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}
		]
	},
	target: "electron-renderer"
}
