const path = require('path');
//const express = require('express');//待修改为koa
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
//const app = express();
const app = new Koa();
const compiler = webpack(config);
const render = require('./lib/render.js');

const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

app.use(logger());

//app.use(render);

app.use(bodyParser());

//app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));

//app.use(require('webpack-hot-middleware')(compiler));
/*
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'demo', 'views', 'app.html'));
});
*/
/*
router.get('/', async ctx => {
  await ctx.render('app',{})
});
*/
router.get('/', async ctx => {
  ctx.body = await render('app.html', {
    demoName: 'Ftc-Login-React Demo'
  })
})
/*
app.listen(9000, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:9000');
});
*/
app.use(router.routes());
app.listen(9000);