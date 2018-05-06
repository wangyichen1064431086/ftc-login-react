const path = require('path');
//const express = require('express');//待修改为koa
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');

//const app = express();
const app = new Koa();
const compiler = webpack(config);

const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

app.user(logger());

app.user(bodyParser());

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));

app.use(require('webpack-hot-middleware')(compiler));
/*
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'demo', 'views', 'app.html'));
});
*/
router.get('/', ctx => {
  ctx.body = path.join(__dirname, 'demo', 'views', 'app.html');
});
/*
app.listen(9000, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:9000');
});
*/
app.user(router);
app.listen(9000);