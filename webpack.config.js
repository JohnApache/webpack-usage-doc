const path = require('path');
const merge = require('webpack-merge');
const dev = require('./config/webpack.dev');
const prod = require('./config/webpack.prod');
const webpack = require('webpack');
module.exports = env => {
    const isProd = env && env.NODE_ENV === 'prod';
    const InjectConfig = {
        module: {
            rules: [
                {
                    test: require.resolve('./src/alert.js'),
                    use: 'imports-loader?this=>window'
                },
                {
                    test: require.resolve('./src/global.js'),
                    use: 'exports-loader?username,fn,exec=ddd.exec'
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            })
        ]
    }
    return merge(isProd ? prod : dev, InjectConfig);
}