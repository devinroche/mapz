module.exports = {
    entry: './src/main.js',
    output: {
        filename: './js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};