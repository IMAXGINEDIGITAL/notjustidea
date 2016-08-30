const webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.devtool = ['source-map'];
config.plugins = config.plugins || [];

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            host: 'http://www.notjustidea.com/apis'
        })
    })
);

module.exports = config;