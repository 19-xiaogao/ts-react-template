import axios from 'axios'

// import CustomResponse from '../api/responseInterface'

// 我想把AxiosResponse的接口重写
// interface AddAxiosResponse<T = customResponse> extends AxiosResponse {
//   data: T
// }

const server = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 2000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})


// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



export default server