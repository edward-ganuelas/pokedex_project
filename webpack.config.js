const path = require('path');

module.exports = {
    entry: ['babel-polyfill','./js/main.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.vue$/, loader: 'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            vue: 'vue/dist/vue.js'
        }
    }
};