import Login from '../../src/js/Login.js';
//import Login from '../../build/index.es.js';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Login accountType='both' postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />,
  document.getElementById('root')
);