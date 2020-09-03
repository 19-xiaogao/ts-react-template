import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message as AntdMessage } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import CryptoJs from 'crypto-js'
import './index.scss'
import { isShow } from '../../index'
import { rules } from '../Login'
import { serverRegister, serverGetSms, modules } from '../../../../api/login'
import { splitStr } from '../../../../utils/util'
export interface Props {
  loggerLogin: (show: isShow) => void
}

export enum BtnStatesEnum {
  ToBegin,
  start,
  complete
}

export interface State {
  username: string,
  code: string,
  btnText: string,
  BtnStates: BtnStatesEnum
}
type NamePath = string | number | (string | number)[];


class Register extends Component<Props, State> {
  state = {
    username: '',
    code: '',
    btnText: '获取验证码',
    BtnStates: BtnStatesEnum.ToBegin
  }
  onFinish = async (value: any) => {
    const passwordSSH = CryptoJs.MD5(value.password).toString();
    console.log(passwordSSH)
    const { resCode, message } = await serverRegister({ username: value.username, password: passwordSSH, code: value.code })
    if (resCode !== 0) return AntdMessage.error(`${message}`)
    AntdMessage.success("注册成功")
    this.props.loggerLogin(isShow.login)
  }
  dataInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const types = event.target.name
    const values = event.target.value
    if (types === 'username') {
      this.setState({ username: values })
    } else if (types === 'code') {
      this.setState({ code: values })
    }
  }
  // 获取验证码
  getEMA = async () => {
    const { username } = this.state
    if (username.trim() === '') return AntdMessage.error('请输入用户名')
    this.setState((state) => ({ BtnStates: BtnStatesEnum.start, btnText: '请求中' }))
    const { resCode, message } = await serverGetSms({ username, module: modules.register })
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

  render() {
    const { loggerLogin } = this.props
    const { btnText, BtnStates } = this.state
    return (
      <div className='box_login'>
        <div className="box_login_header">
          <h4>注册</h4>
          <span onClick={() => loggerLogin(isShow.login)}>登录</span>
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入姓名" onChange={this.dataInput} name='username' />
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
            name="towPassword"
            rules={[{ required: true, message: '请在次输入密码' }, ({ getFieldValue }: { getFieldValue: (name: NamePath) => void }) => ({
              validator(rule: any, value: any) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码必须一样');
              },
            })]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请再次输入密码"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={rules.code}>
            <Row gutter={12}>
              <Col span={14}><Input prefix={<LockOutlined />} placeholder="请输入验证码" name='code' onInput={this.dataInput} /></Col>
              <Col span={10}><Button type="primary" danger block style={{ height: '36px' }} onClick={this.getEMA} disabled={BtnStates === BtnStatesEnum.start} >{btnText}</Button></Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              注册
        </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Register;