import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button, Row, Col, message as AntdMessage } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import CryptoJs from 'crypto-js'
import './index.scss'
import { isShow } from '../../index'
import { validateNumStr, ValidateEmail } from '../../../../utils/validate'
import { serverLogin, serverGetSms, modules } from '../../../../api/login'
import { BtnStatesEnum } from '../register'
import { splitStr } from '../../../../utils/util'
import { setToken } from '../../../../utils/session'

export interface Props extends RouteComponentProps {
  loggerLogin: (show: isShow) => void
}

export interface State {
  btnText: string,
  BtnStates: BtnStatesEnum
}


export const rules = {
  username: [
    {
      required: true,
      message: "用户名必填"
    },
    {
      pattern: ValidateEmail,
      message: '请输入正确的邮箱'
    }
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      max: 12,
      min: 6,
      message: "用户名不能小于6位或者大于12位"
    },
    {
      pattern: validateNumStr,
      message: '请包含数字和字母'
    }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { len: 6, message: '请输入6位数验证码' }
  ]
}
class Login extends Component<Props, State> {
  state = {
    btnText: '获取验证码',
    BtnStates: BtnStatesEnum.ToBegin
  }
  private username: string = ''
  onFinish = async (value: any) => {
    value.password = CryptoJs.MD5(value.password).toString()
    const { resCode, message, data } = await serverLogin(value)
    if (resCode !== 0) return AntdMessage.error(`${message}`)
    AntdMessage.success("登录成功！！")
    setToken(data.token)
    this.props.history.push('/')
  }

  getSEM = async () => {
    if (this.username.trim() === '') return AntdMessage.error('请输入用户名')
    this.setState((state) => ({ BtnStates: BtnStatesEnum.start, btnText: '请求中' }))
    const { resCode, message } = await serverGetSms({ username: this.username, module: modules.login })
    if (resCode !== 0) {
      this.setState((state) => ({ BtnStates: BtnStatesEnum.ToBegin, btnText: '重新发送' }))
      return AntdMessage.error("数据请求失败");
    }
    this.setState((state) => ({ btnText: '以发送' }))
    let code = splitStr(message)
    AntdMessage.success(`验证码为： ${code} `)
    let nums = 60;
    let time = setInterval(() => {
      this.setState(() => ({ btnText: `${nums--}后` }))
    }, 1000)
    setTimeout(() => {
      this.setState(() => ({ BtnStates: BtnStatesEnum.complete, btnText: "再次发送" }))
      clearInterval(time)
    }, 1000 * 60)
  }

  inputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.username = event.target.value
  }
  render() {
    const { loggerLogin } = this.props
    const { btnText, BtnStates } = this.state
    return (
      <div className='box_login'>
        <div className="box_login_header">
          <h4>登录</h4>
          <span onClick={() => loggerLogin(isShow.register)}>注册</span>
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={rules.username}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" onChange={this.inputUsername} />
          </Form.Item>


          <Form.Item
            name="password"
            rules={rules.password}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={rules.code}>
            <Row gutter={12}>
              <Col span={14}><Input prefix={<LockOutlined />} placeholder="请输入验证码" /></Col>
              <Col span={10}><Button type="primary" danger block style={{ height: '36px' }} onClick={this.getSEM} disabled={BtnStates === BtnStatesEnum.start} >{btnText}</Button></Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登录
        </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);