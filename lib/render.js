
const path = require('path');
const nunjucks = require('nunjucks');
var env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, '../demo/views')
    ],
    {
      watch:false,
      noCache: true
    }
  ),
  {autoescape: false}
);

function render(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}


module.exports = render;

/** 如果使用koa-views, 本文件应该这么写：
  const views = require('koa-views');

  const path = require('path');

  module.exports = views(
    path.join(__dirname, '../demo/views'), {
      map: {
        html: 'nunjucks'
      }
  });

** server.js应该这么写：
  app.use(logger());
  app.use(render);
  app.use(bodyParser());
  ...
  router.get('/', async ctx => {
    await ctx.render('app',{})
  });
*/