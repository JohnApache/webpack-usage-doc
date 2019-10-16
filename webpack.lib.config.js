const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 构建工具库 配置
const BaseConfig = {
    entry: path.resolve(__dirname, './lib/index.js'),
    output: {
        filename: 'utils.js',
        path: path.resolve(__dirname, 'distLib'),
        library: "MyLibrary",
        libraryTarget: "umd",
        globalObject: "this"
    },
    devtool: 'source-map',
    externals: {
        lodash: {
            root: '_',
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        }
    },
}

const DevConfig = merge(BaseConfig, {
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
    ]
})

const ProdConfig = merge(BaseConfig, {
    mode: 'production',
    output: {
        filename: 'utils.min.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                include: path.resolve(__dirname, './lib'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3
                                }
                            ]
                        ],
                        ignore: ['node_modules/**']
                    }
                }]
            }, 
        ]
    },
});

module.exports = [DevConfig, ProdConfig];