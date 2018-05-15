//import Login from '../../src/js/Login.js';
import Login from '../../build/index.es.js';
import React from 'react';
import ReactDOM from 'react-dom';
/*
import Nav from '@ftchinese/ftc-nav-react';
const  testData2 = [
  {
    "name": "首页",
    "url": "http://www.ftchinese.com",
    "order":0,
    "subs":[
      {
        "name":"特别报道",
        "url":"http://www.ftchinese.com/channel/special.html",
        "order":0
      },
      {
        "name":"热门文章",
        "url":"http://www.ftchinese.com/channel/special.html",
        "order":1
      }
    ]  
  },
  {
    "name": "中国",
    "url": "http://www.ftchinese.com/channel/china.html",
    "order":1,
    "subs":[
      {
        "name":"政经",
        "url":"http://www.ftchinese.com/channel/chinareport.html",
        "order":0
      },
      {
        "name":"商业",
        "url":"http://www.ftchinese.com/channel/chinabusiness.html",
        "order":1
      }
      
    ]
  }
];
*/
ReactDOM.render(
  <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />,
  //<Nav channels={testData2} dynamicnav={true} />,
  document.getElementById('root')
);