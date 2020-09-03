const router = [
  {
    title: "控制台",
    icon: 'home',
    key: '/home'
  },
  {
    title: "用户管理",
    icon: 'laptop',
    key: '/user/index',
    child: [
      {
        key: '/user/index', title: '用户列表', icon: ''
      },
      {
        key: '/user/general/icon', title: '添加用户', icon: ''
      }
    ]
  }
]

export default router