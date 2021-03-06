//自定义菜单配置 
menuData = [
  {
    id:999,
    icon:'el-icon-s-home',
    title:'首页',
    path:'index',
    children:[]
  },
  {
  id: 1,
  icon: "el-icon-s-tools",
  title: "菜单管理",
  path: '',
  children: [{
      id: 2,
      pid:1,
      icon: " ",
      title: "用户管理",
      children: [{
          id: 7,
          pid:2,
          icon: " ",
          title: "群组管理",
          path: 'group',
          children: []
        },
        {
          id: 8,
          pid:2,
          icon: " ",
          title: "部门管理",
          path: 'department',
          children: []
        },
        {
          id: 9,
          pid:2,
          icon: " ",
          title: "岗位管理",
          path: 'station',
          children: []
        },
        {
          id: 10,
          pid:2,
          icon: " ",
          title: "角色管理",
          path: 'role',
          children: []
        },
        {
          id: 11,
          pid:2,
          icon: " ",
          title: "人员管理",
          path: 'staff',
          children: []
        }
      ]
    },
    {
      id: 3,
      pid:1,
      icon: " ",
      title: "系统配置",
      children: [{
          id: 4,
          pid:3,
          icon: " ",
          title: "菜单配置",
          path: 'menu',
          children: []
        },
        {
          id: 5,
          pid:3,
          icon: " ",
          title: "字典配置",
          path: 'dict',
          children: []
        },
        {
          id: 6,
          pid:3,
          icon: " ",
          title: "日志管理",
          path: 'log',
          children: []
        }
      ]
    }
  ]
}]
