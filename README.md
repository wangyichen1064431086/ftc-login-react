# ftc-login-react
[![](https://travis-ci.org/wangyichen1064431086/ftc-login-react.svg?branch=master)](https://travis-ci.org/wangyichen1064431086/ftc-login-react)

<!-- MARKDOWN 插图基础格式： [![Alt text](图片链接)](点击图片后跳转链接) -->

The login component for FTC. React version. It is a part of ftc-header-react.

## Install
```c
cd yourProject
npm install react react-dom prop-types
npm install "@ftchinese/ftc-login-react" --save 
```

## Usage
Example:

```js
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
  accountType: PropTypes.oneOf(['email', 'username', 'both']).isRequired,
  postUrl: PropTypes.string.isRequired,
  findPasswordUrl: PropTypes.string,
  registerUrl: PropTypes.string,
  closeFunc: PropTypes.func,
  show: PropTypes.bool
};

```
### accountType
Type string. Required. Default 'email'. The type of the account, which can be one of 'email', 'username', 'both'.

### postUrl
Type string. Required. The url for posting data when clicking the 'submit' button.

### findPasswordUrl
Type string. Optional.The url of the page for finding password.

### registerUrl
Type string. Optional.The url of the page for new user's registering.

### closeFunc
Type Function. Optional. Default null.

It decide this component is a smart or dumb.

If it is null, the component is smart and the <code>show</code> prop only decides the initial showing or hiding of the component. And when clicking the cross on the right left of the window or clicking the gray background, the build-in function <code>closeOverlay</code> of the component will be called.

Otherwise, if it is not null, the component is dumb and the <code>show</code> prop totally decides the showing or hiding of the component. The <code>closeFunc</code> will be a function provided by the parent component and change the state of the parent, then the <code>show</code> prop will be changed according to the state of the parent. And the closeFunc is called when clicking the close button on the right left of the login window or the gray background.

### show
Type Boolean.Optional. Default true. Only decides to show the login window or not initally when where is no <code>closeFunc</code>. However, it totally decides the showing or hiding of the component when there is <code>closeFunc</code>. More details see above **closeFunc**