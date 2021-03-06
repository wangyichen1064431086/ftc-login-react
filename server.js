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

const simulateDatabase =[
  {
    email: '88888888@qq.com',
    password: '123456'
  },
  {
    email: '1234567@163.com',
    password: 'abcdefg'
  }
];

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
  console.log('get!!!!')
  ctx.body = await render('app.html', {
    demoName: 'Ftc-Login-React Demo'
  })
});

router.post('/users/login', async ctx => {
  const inputData = await ctx.request.body;
  console.log('inputData:'); //QUEST:这是无法输出的，寻找koa中间件中打印信息的方法
  console.log(inputData);
  let successLogin = false
  for (let dataItem of simulateDatabase) {
    console.log('dataItem:');
    console.log(dataItem);
    if (dataItem.email === inputData.email && dataItem.password === inputData.password) {
      ctx.body = '登录成功';
      ctx.cookies.set('username',inputData.email);//设置cookie发送到前端
      //退出的时候记得在前端删除cookie
      /* TODO:
       * 待处理有无勾选“记住我”，勾选了表示关闭浏览器再打开还处于登录状态；不勾选表示关闭浏览器再打开就不是登录状态了。这应该是需要设置cookie的max-age或expires
       * 待问祥云，这里是不是要进行用户名的加密工作
      */

      successLogin = true;
      break;
    }
  }
  if(!successLogin) {
    ctx.body = '登录失败';
  }
  
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
app.use(router.routes());

const server = app.listen(8000);
server.on('listening', () => { //NOTE: 'listening'事件，Node的原生事件，在调用server.listen()后触发
  console.log('Listening 8000');
})
