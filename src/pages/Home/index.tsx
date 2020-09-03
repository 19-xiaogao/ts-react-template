import React, { Component } from 'react';
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import { Layout, message as AntdMessage } from 'antd';

import { deleteToken } from '../../utils/session'
import Header from './components/Header'
import Menus from './components/Menu'
import Contents from './components/Content'

interface Props extends RouteComponentProps { }

class Home extends Component<Props> {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  logout = () => {
    this.props.history.push('/login')
    AntdMessage.success('退出成功')
    deleteToken()
  }
  render() {
    const { collapsed } = this.state
    return (
      <Layout className="home-baxBox">
        <Menus collapsed={collapsed} />
        <Layout className="site-layout">
          <Header collapsed={collapsed} toggle={this.toggle} logout={this.logout} />
          <Contents />
        </Layout>
      </Layout>
    );
  }
}
export default Home