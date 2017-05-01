module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style!css",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
