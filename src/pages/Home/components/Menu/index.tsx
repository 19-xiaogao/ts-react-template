import React, { Component, Fragment } from "react";
import { Menu, Layout } from 'antd';
import routers from '../../../../router'
import { Link } from 'react-router-dom'
import {
  UserOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;

interface MenusProps {
  collapsed: boolean
}

class Menus extends Component<MenusProps> {
  render() {
    const { collapsed } = this.props
    return (
      <Sider collapsible collapsed={collapsed} width='250px'>
        <div className={['logo', (collapsed ? 'logo_show' : null)].join(' ')}>
          <h2>人事后台管理系统</h2>
        </div>
        <Fragment>
          <Menu theme="dark" mode="inline">
            {
              routers.map(item => (item.child && item.child.length > 0) ? renderSubMenu(item.key, item.title, item.child) : renderMenuItem(item.key, item.title))
            }
          </Menu>
        </Fragment>
      </Sider>
    );
  }
}
// 无级菜单
const renderMenuItem = (key: string, title: string) => (<Menu.Item key={key}><Link to={key}>{title}</Link></Menu.Item>)
// 有子属性菜单
interface arr {
  key: string,
  icon?: string,
  title: string
}
const renderSubMenu = (key: string, title: string, child: arr[]) =>
  (<SubMenu key={key} icon={<UserOutlined />} title={title}>
    {child.map(items => (<Menu.Item key={items.key}><Link to={items.key}>{title}</Link></Menu.Item>))}
  </SubMenu>)


export default Menus;