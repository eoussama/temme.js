const path = require('path');

module.exports = {
	entry: './src/temme.ts',
	output: {
		filename: 'temme.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
