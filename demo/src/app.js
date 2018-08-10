import Login from '../../src/js/Login.js';
//import Login from '../../build/index.es.js';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Login accountType='email' postUrl="/users/login" findPasswordUrl="/users/findpassword" registerUrl="/users/register"/>,
  document.getElementById('root')
);