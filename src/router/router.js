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
    },
    component: () => import('../views/index.vue')
  }, {
    path: '/staff',
    name: 'staff',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/staff/index.vue')
  }, {
    path: '/group',
    name: 'group',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/group/index.vue')
  }, {
    path: '/department',
    name: 'department',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/department/index.vue')
  }, {
    path: '/station',
    name: 'station',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/station/index.vue')
  }, {
    path: '/role',
    name: 'role',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/role/index.vue')
  }, {
    path: '/menu',
    name: 'menu',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/menu/index.vue')
  }, {
    path: '/dict',
    name: 'dict',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/dict/index.vue')
  }, {
    path: '/log',
    name: 'log',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/log/index.vue')
  }, {
    path: '/msg/:id',
    name: 'msg',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/msg/index.vue')
  }]
}]

//这是需要权限 不在菜单中的页面
const Nomenu = []

export const routes = [
  ...Nojurisdication,
  ...jurisdicationMenu,
  // ...Nomenu
]
