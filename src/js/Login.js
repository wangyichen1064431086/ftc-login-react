import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import login from '../scss/login.scss';//虽然在webpack构建本地测试环境时该文件找得到，但是在rollup构建生产环境时该文件找不到。

@CSSModules(login, {allowMultiple: true})
class Login extends React.Component {
  static propTypes = {
    accountType: PropTypes.oneOf(['email', 'username', 'both']).isRequired,
    postUrl: PropTypes.string.isRequired,
    findPasswordUrl: PropTypes.string,
    registerUrl: PropTypes.string,
    closeFunc: PropTypes.func,
    show: PropTypes.bool,
    validateFailed: PropTypes.bool
  };

  static defaultProps = {
    //closeFunc: this.closeOverlay NOTE:这样会报错，因为这里还无法访问this
    accountType:'email',
    closeFunc: null,
    show: true
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      showBySelf:this.props.show,
      account:'',
      password:'',
      saveme:'1',
      errorForAccount: '',
      errorForPassword: ''
    };

    this.closeOverlay = this.closeOverlay.bind(this);
  }

  componentWillReceiveProps(nextProps) { //点击后该生命周期函数也会调用
    console.log('componentWillReceiveProps');
    if('show' in nextProps) {
      this.setState({
        show: nextProps.show
      })
    }
  }
  closeOverlay(e) {
    let match = false;
    /*
    if(e.target.matches ) {
      match = e.target.matches('div.bgshadow, span.overlay-close');
    } else if (e.target.matchesSelector) {
      match = e.target.matchesSelector('div.bgshadow, span.overlay-close');
    } else {
      match = e.target.className.indexOf('bgshadow') > -1 || e.target.className.indexOf('overlay-close') > -1 
    }
    */

    
   const targetClass = e.target.className;
   console.log(targetClass);
   if(targetClass.includes('bgshadow') || targetClass.includes('overlay-close') ) {
     match = true;
   }
    console.log(`match:${match}`);
   
    console.log('closeOverlay');
    if (match) {
      this.setState({
        showBySelf: false 
      });
    }
    
  }

  handleChange(fieldname, e) {
    switch(fieldname) {
      case 'account':
      case 'password':
        const {value} = e.target;
        this.setState({
          [fieldname]: value
        });
        break;
      case 'saveme':
        const {checked} = e.target; 
        if (checked) {
          this.setState({
            saveme: '1'
          });
        } else {
          this.setState({
            saveme: '0'
          });
        }
    }
  }

  validateAccount(account, accountType, e) {
    let emptyErr;
    let wrongErr;
    let validateReg;
    switch (accountType) {
      case 'email':
        emptyErr = '邮箱不能为空';
        validateReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        wrongErr = '请输入正确的邮箱';
        break;
      case 'username':
        emptyErr = '用户名不能为空';
        validateReg = /^[A-Za-z0-9_-]{4,16}$/;//4到16位（字母，数字，下划线，减号）
        wrongErr = '请输入格式正确的用户名(4-16位数字字母下划线减号)';
        break;
      case 'both' :
        emptyErr = '邮箱/用户名不能为空';
        validateReg = /(^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$)|(^[A-Za-z0-9_-]{4,16}$)/;
        wrongErr = '请输入正确的邮箱/用户名(4-16位数字字母下划线减号)';
        break;
      default:
        emptyErr = '邮箱不能为空';
        validateReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        wrongErr = '请输入正确的邮箱';
    }

    if (account === '') {
      this.setState({
        errorForAccount: emptyErr
      });
      return false;
    }

    if (!validateReg.test(account)) {
      this.setState({
        errorForAccount: wrongErr
      })
      return false;
    }

    this.setState({
      errorForAccount: ''
    })
    return true;
  }

  validatePassword(password) {
    if (password === '') {
      this.setState({
        errorForPassword: '密码不能为空'
      });
      return false;
    }

    if (!/^[A-Za-z0-9_]{4,16}$/.test(password)) {
      this.setState({
        errorForPassword: '请输入格式正确的密码(4-16位数字字母下划线)'
      })
      return false;
    }
    this.setState({
      errorForPassword: ''
    });
    return true;
  }

  

  renderOverlayHead() {
    const {closeFunc} = this.props;
    return (
      <div styleName="overlay-title">
        登录
        <span styleName="overlay-close" onClick={closeFunc ? closeFunc : this.closeOverlay}>×</span>
      </div>
    )
  }

  renderOverlayForm() {
    const {postUrl, accountType, validateFailed} = this.props;
    console.log('accountType:')
    console.log(accountType);
    const {account, password, saveme, errorForAccount, errorForPassword} = this.state;
    let accountLabel = '';
    let accountPlaceHolder = '';
    switch (accountType) { 
      case 'email':
        accountLabel = '电子邮箱';
        accountPlaceHolder = '有效的电子邮箱地址';
        break;
      case 'username':
        accountLabel = '用户名';
        accountPlaceHolder = '4~16位字母/数字/下划线/减号';
        break;
      default:
        accountLabel = '电子邮箱/用户名';
        accountPlaceHolder = '有效的电子邮箱或用户名';
    }
    return ( //待进一步拆分组件
      <form method="post" styleName="overlay-form" action={postUrl} autoComplete="on">
       
        <div styleName="form-item">
          <label htmlFor="ftcLoginAccount">
              {accountLabel}
          </label>
          <input autoComplete="on" type="text" name="account" id="ftcLoginAccount" value={account} onChange = {this.handleChange.bind(this, 'account')} onBlur = {this.validateAccount.bind(this, account, accountType)} placeholder = {accountPlaceHolder}/>
          <div styleName = "inputerror">{errorForAccount}</div>
        </div>

        <div styleName="form-item">
          <label htmlFor="ftcLoginPassword">
            密码
          </label>
          <input autoComplete="on" type="password"  name="password" id="ftcLoginPassword" value={password} onChange = {this.handleChange.bind(this,'password')} onBlur = {this.validatePassword.bind(this, password)} placeholder = {'4~16位字母数字下划线'} />
          <div styleName = "inputerror">{errorForPassword}</div>
        </div>

        { validateFailed && (
          <div styleName="validate--failed">
            用户不存在或密码错误，请重新输入
          </div>
          )
        }
        <div styleName="saveandsub">
          <input styleName="saveme" type="checkbox" value={saveme} checked={saveme==='1'} name="saveme" id="ftcLoginSaveme" onChange={this.handleChange.bind(this,'saveme')}/>
          <label htmlFor="ftcLoginSaveme">记住我</label>
          {/*此处如果勾选了记住我，服务器端要设置用户名和密码的cookie发送过来*/}
          <input styleName="submit" type="submit" value="提交" />
          {/*此处采用默认submit事件，待练习写preventDefault()情况下的提交事件*/}
        </div>
      </form>
    )
  }

  renderBottom() {
    const { findPasswordUrl, registerUrl } = this.props;
    return (
      <div styleName="overlay-bottom">
        { findPasswordUrl && (
          <div styleName="overlay-bottomline">
            <a href={findPasswordUrl}>
              找回密码
            </a>
          </div>
        )}
        { registerUrl && (
          <div styleName="overlay-bottomline">
            <a href={registerUrl}>
              免费注册
            </a>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { show, showBySelf} = this.state;
    const {closeFunc} = this.props;

    console.log(`show:${show}`);
    console.log(`showBySelf:${showBySelf}`);
    
    const realShow = closeFunc ? show : (show && showBySelf);
    const bgStyle = classnames({
      'bgshadow': true,
      'bgshadow--close': !realShow
    });
    return (
      <div styleName={bgStyle} onClick={closeFunc ? closeFunc : this.closeOverlay}>
        <div styleName="overlay-window">
          {this.renderOverlayHead()}
          {this.renderOverlayForm()}
          {this.renderBottom()}
        </div>
      </div>
    )
  }
}

export default Login;