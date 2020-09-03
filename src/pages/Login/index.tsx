import React, { Component } from 'react';
import LoginPage from './components/Login'; // 登录组件
import Register from './components/register';// 注册组件
import './index.scss'

export interface Props {

}
export enum isShow {
  login = 'login',
  register = 'register'
}
export interface State {
  showModuleLogin: isShow
}

class Login extends Component<Props, State> {
  state = {
    showModuleLogin: isShow.login
  }
  loggerLogin = (show: isShow): void => {
    this.setState({ showModuleLogin: show })
  }
  render() {
    const { showModuleLogin } = this.state
    return (
      <div className='login-box'>
        {showModuleLogin === isShow.login ? <LoginPage loggerLogin={this.loggerLogin} /> : <Register loggerLogin={this.loggerLogin} />}
      </div>
    );
  }
}

export default Login; 