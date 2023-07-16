const path = require('path')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'] 
            }
        ]
    }
}