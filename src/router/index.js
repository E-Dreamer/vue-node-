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
  meta: {
    requiresAuth: true,
  },
  component: () => import('../views/home.vue'),
  children: [{
    path: '/staff',
    name: 'staff',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/staff/index.vue')
  }]
}]

//这是需要权限 不在菜单中的页面
const Nomenu = []

export const routes = [
  ...Nojurisdication,
  ...jurisdicationMenu,
  // ...Nomenu
]
