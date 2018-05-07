const views = require('koa-views');

const path = require('path');

module.exports = views(
  path.join(__dirname, '../demo/views'), {
    map: {
      html: 'nunjucks'
    }
});

