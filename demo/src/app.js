import Login from '../../src/js/Login.js';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Login postUrl="/users/login" findPasswordUrl="/users/findpassword" registerUrl="http://user.ftchinese.com/register" />,
  document.getElementById('root')
);