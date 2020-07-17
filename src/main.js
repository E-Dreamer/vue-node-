import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
import '@/assets/common.css'
import ajax from '../tool/ajax'
import api from '../tool/api'
import tool from '../tool/tool'
NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.1 // 初始化时的最小百分比
})
Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;

router.beforeEach((to,form,next)=>{
  NProgress.start();
  next();
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
