# ftc-login-react
[![](https://travis-ci.org/wangyichen1064431086/ftc-login-react.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-login-react)

<!-- MARKDOWN 插图基础格式： [![Alt text](图片链接)](点击图片后跳转链接) -->

The login component for FTC. React version. It is a part of ftc-header-react.

## Install
```
cd yourProject
npm install react react-dom prop-types
npm install "@ftchinese/ftc-login-react" --save 
```

## Usage
Example:

```
import Login from '@ftchinese/ftc-login-react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />,
  document.getElementById('root')
);
```

## Props of Login
You can know about it by the proptypes:

```js
static propTypes = {
  postUrl: PropTypes.string,
  findPasswordUrl: PropTypes.string,
  registerUrl: PropTypes.string,
  closeFunc: PropTypes.func,
  forcedShow: PropTypes.bool
};

```

### postUrl
Type string. Required. The url for posting data when clicking the 'submit' button.

### findPasswordUrl
Type string. Optional.The url of the page for finding password.

### registerUrl
Type string. Optional.The url of the page for new user's registering.

### closeFunc
Type Function. Optional. Default null. The function called when clicking the close button on the right left of the login window. If it is lacking, the Login component will use the default function <code>closeOverlay</code>.


### forcedShow
Type Boolean.Optional. Default true. Decide to show the login window or not initially.