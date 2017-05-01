module.exports = {
    entry: "./js/controller.js",
    output: {
        path: __dirname,
        filename: "/bundles/code.js"
    },
    
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};