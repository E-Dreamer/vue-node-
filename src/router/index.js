import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './router'
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'hash', // history 需要开启服务
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
