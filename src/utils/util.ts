// 切割获取验证码的响应参数
export const splitStr = (str: string): string => {
  let arr = str.split('，')
  let arr2 = arr[1].split('：')
  return arr2[1]
}
