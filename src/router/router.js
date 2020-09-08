// 这是单独的页面 并且不需要权限
const Nojurisdication = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false,
    },
    component: () => import('../views/login.vue')
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      requiresAuth: false,
    },
    component: () => import('../views/error.vue')
  }
]

//这是需要权限的页面 且在菜单项中的页面
const jurisdicationMenu = [{
  path: '/home',
  name: 'home',
  redirect: '/index',
  meta: {
    requiresAuth: false,
  },
  component: () => import('../views/home.vue'),
  children: [{
      path: '/index',
      name: 'index',
      meta: {
        requiresAuth: true,
        title: '首页'
      },
      component: () => import('../views/index.vue')
    },
    {
      path: '/menus',
      name: 'menus',
      meta: {
        title: '菜单管理'
      },
      children: [{
        path: '/yonghu',
        name: 'yonghu',
        meta: {
          title: '用户管理'
        },
        children: [{
          path: '/staff',
          name: 'staff',
          meta: {
            requiresAuth: true,
            title: '人员管理'
          },
          component: () => import('../views/staff/index.vue')
        }, {
          path: '/group',
          name: 'group',
          meta: {
            requiresAuth: true,
            title: '群组管理'
          },
          component: () => import('../views/group/index.vue')
        }, {
          path: '/department',
          name: 'department',
          meta: {
            requiresAuth: true,
            title: '部门管理'
          },
          component: () => import('../views/department/index.vue')
        }, {
          path: '/station',
          name: 'station',
          meta: {
            requiresAuth: true,
            title: '岗位管理'
          },
          component: () => import('../views/station/index.vue')
        }, {
          path: '/role',
          name: 'role',
          meta: {
            requiresAuth: true,
            title: '角色管理'
          },
          component: () => import('../views/role/index.vue')
        }]
      }, {
        path: '/xitong',
        name: 'xitong',
        meta: {
          title: '系统配置'
        },
        children: [{
          path: '/menu',
          name: 'menu',
          meta: {
            requiresAuth: true,
            title: '菜单配置'
          },
          component: () => import('../views/menu/index.vue')
        }, {
          path: '/dict',
          name: 'dict',
          meta: {
            requiresAuth: true,
            title: '字典配置'
          },
          component: () => import('../views/dict/index.vue')
        }, {
          path: '/log',
          name: 'log',
          meta: {
            requiresAuth: true,
            title: '日志管理'
          },
          component: () => import('../views/log/index.vue')
        }, {
          path: '/msg/:id',
          name: 'msg',
          meta: {
            requiresAuth: true,
            title: '消息通知'
          },
          component: () => import('../views/msg/index.vue')
        }]
      }]
    }
  ]
}]

//这是需要权限 不在菜单中的页面
const Nomenu = []

export const routes = [
  ...Nojurisdication,
  ...jurisdicationMenu,
  // ...Nomenu
]
