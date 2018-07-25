import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import login from '../scss/login.scss';//虽然在webpack构建本地测试环境时该文件找得到，但是在rollup构建生产环境时该文件找不到。

@CSSModules(login, {allowMultiple: true})
class Login extends React.Component {
  static propTypes = {
    postUrl: PropTypes.string.isRequired,
    findPasswordUrl: PropTypes.string,
    registerUrl: PropTypes.string,
    closeFunc: PropTypes.func,
    forcedShow: PropTypes.bool
  };

  static defaultProps = {
    //closeFunc: this.closeOverlay NOTE:这样会报错，因为这里还无法访问this
    closeFunc: null,
    forcedShow: true
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.forcedShow,
      email:'',
      password:'',
      saveme:'1',
      errorForEmail: '',
      errorForPassword: ''
    };

    this.closeOverlay = this.closeOverlay.bind(this);
  }

  closeOverlay() {
    this.setState({
      show: false 
    });
  }

  handleChange(fieldname, e) {
    switch(fieldname) {
      case 'email':
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

  validateEmail(email, e) {
    if (email === '') {
      this.setState({
        errorForEmail:'邮箱不能为空'
      });
      return false;
    }

    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      this.setState({
        errorForEmail: '请输入正确的邮箱'
      })
      return false;
    }

    this.setState({
      errorForEmail: ''
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
    const {postUrl} = this.props;
    const {email, password, saveme, errorForEmail, errorForPassword} = this.state;

    return ( //待进一步拆分组件
      <form method="post" styleName="overlay-form" action={postUrl}>
       
        <div styleName="form-item">
          <label htmlFor="ftcLoginEmail">
              电子邮件
          </label>
          <input type="text" name="email" id="ftcLoginEmail" value={email} onChange = {this.handleChange.bind(this, 'email')} onBlur = {this.validateEmail.bind(this, email)}/>
          <div styleName = "inputerror">{errorForEmail}</div>
        </div>

        <div styleName="form-item">
          <label htmlFor="ftcLoginPassword">
            密码
          </label>
          <input type="password"  name="password" id="ftcLoginPassword" value={password} onChange = {this.handleChange.bind(this,'password')} onBlur = {this.validatePassword.bind(this, password)} />
          <div styleName = "inputerror">{errorForPassword}</div>
        </div>
    
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
    const { show } = this.state;
    console.log(`show:${show}`);
    const bgStyle = classnames({
      'bgshadow': true,
      'bgshadow--close': !show
    });
    return (
      <div styleName={bgStyle} >
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