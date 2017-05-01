#Webpack

## Reference
[Webpack Tutorial](
https://webpack.github.io/docs/tutorials/getting-started)

[Getting Started](https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic)

[List of Webpack Loaders](https://webpack.github.io/docs/list-of-loaders.html)

## Install Webpack

```
npm install webpack --save-dev
or:
npm install webpack g
```

## Run Webpack

```
./node_modules/.bin/webpack ./entry.js bundle.js
```

for the style loader:

```
npm install css-loader style-loader
```

then:

```
./node_modules/.bin/webpack ./entry.js bundle.js --module-bind 'css=style!css'
```
## Use webpack.config.js

build webpack.config.js, for example:

```
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
```

 to run:

```
./node_modules/.bin/webpack
```

Watching for a change:

```
./node_modules/.bin/webpack --watch
```

## Loaders
Loaders must be installed with npm

## For ES6, load Babel:
```
npm install --save-dev babel-loader babel-core babel-preset-es2015
```

## Development Server
```
npm install webpack-dev-server
or:
npm install webpack-dev-server -g
```

To run:
```
./node_modules/.bin/webpack-dev-server
```

Note that changes will automatically:

* cause a rebuild
* reload the application in the browser

### Browser
```
http://localhost:8080/webpack-dev-server/
```


