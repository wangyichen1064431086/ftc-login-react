import Login from '../../src/js/Login.js';
//import Login from '../../build/index.es.js';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />,
  //<Nav channels={testData2} dynamicnav={true} />,
  document.getElementById('root')
);