### SPA单页面后台模板
1. 使用ts配合react和react-router-dom搭配的单项目后台模板,组件使用的antd,请求使用的axios.
### 启动
npm run start

### 打包
npm run build

### 配置
##### 网络请求配置
      在utils文件下面的request.ts 详细请参考axios
 ##### 代理配置 
      src下的setupProxy.js 详细请参考create-react-app 脚手架
  ##### 全局css 
      src下的styles下的main.scss
##### 页面配置
      src/home/components/content 下复制PrivateRouter组件。
      然后在router.js 添加一个你需要的配置。
#### 登录权限
      在component下的PrivateRouter 文件下。
