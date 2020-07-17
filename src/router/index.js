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
  }
]

//这是需要权限的页面 且在菜单项中的页面
const jurisdicationMenu = []

//这是需要权限 不在菜单中的页面
const Nomenu = [{
  path: '/home',
  name: 'home',
  meta: {
    requiresAuth: true,
  },
  component: () => import('../views/home.vue')
}]

export const routes = [
  ...Nojurisdication,
  // ...jurisdicationMenu,
  ...Nomenu
]
