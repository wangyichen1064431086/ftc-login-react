jest.unmock('../src/js/Login');//指示模块系统不应从require（）返回指定模块的模拟版本（例如，它应始终返回实模块）。

//jest会自动mock模拟依赖包，所以真实的要测试的文件要unmock

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Login from '../src/js/Login.js';

describe('Build a Login component', () => {
  it('render', () => {
    const login = ReactTestUtils.renderIntoDocument(
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />
    );

    const loginNode = ReactDOM.findDOMNode(login);
    expect(loginNode).toBeInstanceOf(HTMLElement);

    expect(loginNode.getElementsByTagName('div')[0].className.includes('overlay-window')).toBe(true);

    expect(loginNode.querySelector('div').querySelector('div').className.includes('overlay-title')).toBe(true);//QUEST:为何querySelector('div div')就取不到要取的元素呢？？
    expect(loginNode.querySelector('div form').className.includes('overlay-form')).toBe(true);
    expect(loginNode.querySelector('div form+div').className.includes('overlay-bottom')).toBe(true);
  });

  it('click to close', () => {
    const login = ReactTestUtils.renderIntoDocument(
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />
    );

    const loginNode = ReactDOM.findDOMNode(login);
    const closeBtn = loginNode.querySelector('div').querySelector('div span');
    ReactTestUtils.Simulate.click(closeBtn);
    expect(loginNode.className.includes('bgshadow--close')).toBeTruthy;
  });

  it('test input for email', () => {
    const login = ReactTestUtils.renderIntoDocument(
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />
    );

    const loginNode = ReactDOM.findDOMNode(login);
    const emailInput = loginNode.querySelector('#ftcLoginEmail');//document.getElementById()在这里是不能用的，待认真学习
    console.log(emailInput);
    const emailErrorDiv = loginNode.querySelector('form #ftcLoginEmail+div');
    
    ReactTestUtils.Simulate.blur(emailInput);
    expect(emailErrorDiv.innerHTML).toBe('邮箱不能为空');

    ReactTestUtils.Simulate.change(emailInput, {
      target: {
        value:'aaa'
      }
    });
    ReactTestUtils.Simulate.blur(emailInput);
    expect(emailErrorDiv.innerHTML).toBe('请输入正确的邮箱');

    ReactTestUtils.Simulate.change(emailInput, {
      target: {
        value:'1064431086@qq.com'
      }
    });
    ReactTestUtils.Simulate.blur(emailInput);
    expect(emailErrorDiv.innerHTML).toBe('');
  });

  it('test input for password', () => {
    const login = ReactTestUtils.renderIntoDocument(
      <Login postUrl="/users/login" findPasswordUrl="http://www.ftchinese.com/users/findpassword" registerUrl="http://user.ftchinese.com/register" />
    );

    const loginNode = ReactDOM.findDOMNode(login);
    const passwordInput = loginNode.querySelector('#ftcLoginPassword');
    const passwordErrorDiv = loginNode.querySelector('form #ftcLoginPassword+div');
    
    ReactTestUtils.Simulate.blur(passwordInput);
    expect(passwordErrorDiv.innerHTML).toBe('密码不能为空');

    ReactTestUtils.Simulate.change(passwordInput, {
      target: {
        value:'wangyichen'
      }
    });
    ReactTestUtils.Simulate.blur(passwordInput);
    expect(passwordErrorDiv.innerHTML).toBe('');
  });
});

