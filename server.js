const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const {
    koaWebpackDevMiddleware, 
    koaWebpackHotMiddleware
} = require('@dking/koa-webpack-middleware');

const open = require('open');
const path = require('path');
const merge = require('webpack-merge');

const app = new Koa();
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const config = merge(webpackConfig(), {
    entry: [hotMiddlewareScript, path.resolve(__dirname, './src/index.js')],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

console.log(config);
const compiler = webpack(config);

app.use(koaWebpackDevMiddleware(compiler, {
    host: 'localhost',
    contentBase: './dist',
    log: false,
    stats: {
        colors: true, // webpack编译输出日志带上颜色，相当于命令行 webpack –colors
        process: true
    }
}))

app.use(koaWebpackHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000,
}))

app.listen(9999, () => {
    console.log('server listenning port 9999!');
    open('http://localhost:9999')
})