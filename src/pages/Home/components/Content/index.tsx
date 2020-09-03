import React, { lazy, Suspense } from 'react'
import { Layout } from 'antd';
import './index.scss'
import PrivateRouter from './../../../../components/privateRouter'
const { Content } = Layout;
const User = lazy(() => import('../../../../views/user'))
class Contexts extends React.Component {
  render() {
    return (
      <Content className="site-layout-background Contexts_box">
        <Suspense fallback={<div>Loading...</div>}>
          <PrivateRouter path="/user" component={User} />
        </Suspense>
      </Content >)


  }
}
export default Contexts;
