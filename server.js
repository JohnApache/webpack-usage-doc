const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddle = require('webpack-dev-middleware');
const webpackHotMiddle = require('webpack-hot-middleware');
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

const applyExpressMiddleware = (expressMiddleware, req, res) => {
    const _send = res.send;
    return new Promise((resolve, reject) => {
        try {
            res.send = (...params) => {
                _send && _send.apply(res, params) && resolve(false);
            }
            expressMiddleware(req, res, () => resolve(true))
        } catch (error) {
            reject(error)
        }
    })
}


const KoaWebpackDevMiddleware = (compiler, options) => {
    const middleware = webpackDevMiddle(compiler, options);
    return async (ctx, next) => {
        const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
            ...ctx.res,
            send(content) { return ctx.body = content },
            setHeader(...params) {
                ctx.set.apply(ctx, params);
            }
        })
        hasNext && await next();
    }
}


const KoaWebpackHotMiddleware = (compiler, options) => {
    const middleware = webpackHotMiddle(compiler, options);
    return async(ctx, next) => {
        const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);
        hasNext && await next()
    }
}


app.use(KoaWebpackDevMiddleware(compiler, {
    host: 'localhost',
    contentBase: './dist',
    log: false,
    stats: {
        colors: true, // webpack编译输出日志带上颜色，相当于命令行 webpack –colors
        process: true
    }
}))

app.use(KoaWebpackHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000,
}))

app.listen(9999, () => {
    console.log('server listenning port 9999!');
    open('http://localhost:9999')
})