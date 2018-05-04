import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import login from '../scss/login';

@CSSModules(nav, {allowMultiple: true})
class Login extends React.Component {
  static propTypes = {
    postUrl:PropTypes.string
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: true,
      username:'',
      password:'',
      saveme:'1'
    };

    this.closeOverlay.bind(this);
  }

  closeOverlay() {
    this.setState({
      showOverlay:false
    });
  }

  handleChange(fieldname, e) {
    switch(fieldname) {
      case 'username':
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

  renderOverlayHead() {
    return (
      <div styleName="overlay-title">
        登录
        <span styleName="overlay-close" onClick={this.closeOverlay}>×</span>
      </div>
    )
  }

  renderOverlayForm() {
    const {postUrl} = this.props;
    const {username, password, saveme} = this.state;

    return ( //待进一步拆分组件
      <form method="post" styleName="overlay-form" action={postUrl}>
      
        <div styleName="form-item">
          <label htmlFor="ftcLoginUsername">
              电子邮件/用户名
          </label>
          <input type="text" name="username" id="ftcLoginUsername" value={username} onChange = {this.handleChange.bind(this, 'username')} />
        </div>

        <div styleName="form-item">
          <label htmlFor="ftcLoginPassword">
            密码
          </label>
          <input type="password" styleName="oneline" name="password" id="ftcLoginPassword" value={password} onChange = {this.handleChange.bind(this,'password')} />
        </div>
    
        <div styleName="saveandsub">
          <input styleName="saveme" type="checkbox" value={saveme} checked={saveme==='1'} name="saveme" id="ftcLoginSaveme" onChange={this.handleChange.bind(this,'saveme')}/>
          <label htmlFor="ftcLoginSaveme">记住我</label>

          <input styleName="submit" type="submit" value="提交" />
        </div>
      </form>
    )
  }

  render() {
    return (
      <div styleName="bgshadow" >
        <div styleName="overlay-window">
          {this.renderOverlayHead()}
          {this.renderOverlayForm()}
        </div>
      </div>
    )
  }
}