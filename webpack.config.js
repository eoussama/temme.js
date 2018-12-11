const path = require('path');

module.exports = {
	entry: './src/temme.ts',
	output: {
		filename: 'temme.js',
		libraryTarget: 'var',
    	library: 'Temme',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production',
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
