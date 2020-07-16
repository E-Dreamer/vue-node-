import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './index'
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'hash', // history 需要开启服务
  base: process.env.BASE_URL,
  routes
})

export default router
