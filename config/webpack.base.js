const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
              ddd: {
                test: /\/node_modules\//,
                name: 'vendors',
                chunks: 'all',
              },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, '../src')
                ],
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: Math.random(),
            template: path.resolve(__dirname, './index.html'),
            hash: true
        }),
        new ManifestWebpackPlugin(),
    ]
}