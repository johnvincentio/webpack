# Udemy Course - Webpack2 - The complete Developers Guide

https://www.udemy.com/webpack-2-the-complete-developers-guide

Github Accounts

* https://github.com/StephenGrider/WebpackCasts
* https://github.com/StephenGrider/WebpackProject

Directory:

/Users/jv/Desktop/MyDevelopment/github/webpack/webpack2-course

Webpack runs within the NodeJS environment.

## Notes

* loaders are applied right to left.
* only referenced code will be in bundle.js

## Start

mkdir -p 1/js_modules

cd 1/js_modules

npm init

npm install --save-dev webpack@2.2.0-rc.3

do not use:

npm install webpack@2.2.0-rc.0 --save-dev

index.js

```
const sum = require('./sum');

let a = sum (2,5);
console.log("total "+a);
```

sum.js

```
const sum = (a, b) => a + b;
module.exports = sum;
```

node index

### Using Webpack

webpack.config.js

```
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
};

module.exports = config;
```

### To run webpack

package.json:

```
  "scripts": {
    "build": "webpack"
  },
```

npm run build

Generates bundle.js

### bundle.js

Horrendous pile of code

### Run the app from the browser

index.html

```
<head>
</head>
<body>
  <script src="build/bundle.js"></script>
</body>
```

open index.html

## Loaders

### Babel Transpiler

ES2015 code into ES5

* babel-loader
* babel-core
* babel-preset-env

npm install webpack@2.2.0-rc.3 --save-dev 
npm install babel-loader babel-core babel-preset-env --save-dev 

package.json:

```
  "scripts": {
    "build": "webpack"
  },
```

.babelrc

```
{
  "presets": ["babel-preset-env"]
}
```

webpack.config.js

```
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            }
        ]
    }
};

module.exports = config;
```

npm run build

bundle.js has ES5 code.

## Refactor to ES2015 Modules

/Users/jv/Desktop/MyDevelopment/github/webpack/webpack2-course/es2015/1

sum.js

```
const sum = (a, b) => a + b;
export default sum;
```

index.js

```
import sum from './sum';

let a = sum (2,5);
console.log("total "+a);
```

Build project

```
npm run build
```

## Style and CSS loaders

/Users/jv/Desktop/MyDevelopment/github/webpack/webpack2-course/es2015/2

image_viewer.js

```
const image = document.createElement('img');
image.src = 'http://lorempixel.com/400/400';
document.body.appendChild(image);
```

index.js

```
import sum from './sum';
import './image_viewer';

let a = sum (2,5);
console.log("total "+a);
```

build

```
npm run build
```

mkdir js_modules/styles

image_viewer.css

```
img {
    border: 10px solid black;
}
```

Install modules

* css-loader
* style-loader

npm install css-loader style-loader --save-dev

webpack.config.js

```
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
```

build

```
npm run build
```

CSS is in a style tag in head section of the dom.

## CSS in a Separate File

/Users/jv/Desktop/MyDevelopment/github/webpack/webpack2-course/es2015/3

Install modules

* extract-text-webpack-plugin@2.0.0-beta.4


npm extract-text-webpack-plugin@2.0.0-beta.4 --save-dev

webpack.config.js

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = config;
```

add to index.html

```
<link rel="stylesheet" href="build/style.css" />
```

build

```
npm run build
```

open index.html and notice the style tag inside head tag.

## Process Images

/Users/jv/Desktop/MyDevelopment/github/webpack/webpack2-course/es2015/4

image-webpack-loader; compacts an image
url-loader; small images included in bundle.js as raw data, else include raw imge in output directory.

Install modules

* image-webpack-loader
* url-loader

npm install image-webpack-loader url-loader --save-dev

I also had to do:

* brew install libpng
* npm install --save-dev file-loader

webpack.config.js

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'url-loader',
                    options: { limit: 40000 }
                  },
                  'image-webpack-loader?{}'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = config;
```

Note that also had to:

* change 'image-webpack-loader' to 'image-webpack-loader?{}' to get around a bug.

mkdir js_modules/assets

* Get large image from [lorempixel](http://lorempixel/1200/1200)
* Drag to js_modules/assets as big.jpg
* Get small image from [lorempixel](http://lorempixel/200/200)
* Drag to js_modules/assets as small.jpg

image_viewer.js

```
import big from '../assets/big.jpg';
import small from '../assets/small.jpg';

import '../styles/image_viewer.css';

const smallImage = document.createElement('img');
smallImage.src = small;
document.body.appendChild(smallImage);

const bigImage = document.createElement('img');
bigImage.src = big;
document.body.appendChild(bigImage);
```

build

```
npm run build
```

open index.html and notice the style tag inside head tag.




