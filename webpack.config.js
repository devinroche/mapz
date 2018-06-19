const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([ 
            { from: './src/index.html', to: __dirname+'/dist' },
         ])
    ]
};