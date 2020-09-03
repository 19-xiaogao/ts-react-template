import server from '../utils/request'

import Response from './responseInterface'

export enum modules {
  login = 'login',
  register = 'register'
}

/**
 * 登录接口
 */
export const serverLogin = (data: { username: string, password: string, code: string }): Promise<Response> => {
  return server.request({
    url: '/login/',
    method: 'post',
    data
  })
}
/**
  * 获取验证码
 */
export const serverGetSms = (data: { username: string, module: modules }): Promise<Response> => {
  return server.request({
    url: '/getSms/',
    method: 'post',
    data
  })
}
/**
  * 注册 
 */
export const serverRegister = (data: { username: string, password: string, code: string }): Promise<Response> => server.request({
  url: '/register/',
  method: 'post',
  data
})