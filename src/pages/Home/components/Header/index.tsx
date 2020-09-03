import React, { Component } from "react";
import { Layout, Button } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import './index.scss'
const { Header } = Layout;

interface Props {
  collapsed: boolean,
  toggle: () => void,
  logout: () => void
}
// 头部组件
class Headers extends Component<Props> {
  render() {
    const { toggle, logout } = this.props
    return (
      <Header className="site-layout-background">
        <MenuFoldOutlined className='trigger' onClick={toggle} />
        <Button type="primary" className="logout" onClick={logout} >退出登录</Button>
      </Header>
    );
  }
}

export default Headers;

