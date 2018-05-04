import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import login from '../scss/login';

@CSSModules(nav, {allowMultiple: true})
class Login extends React.Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: true
    };

    this.closeOverlay.bind(this);
  }
  closeOverlay() {
    this.setState({
      showOverlay:false
    });
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