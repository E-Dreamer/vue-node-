import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
import '@/assets/common.css'
import ajax from '../tool/ajax'
import api from '../tool/api'
import tool from '../tool/tool'
import bus from '../tool/bus'
Vue.use(bus)
NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.1 // 初始化时的最小百分比
})
Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;

router.beforeEach((to, form, next) => {
  // if (!to.name) return router.push('/error')
  if (!to.meta.requiresAuth) return next() // 不需要验证的直接走
  let token = sessionStorage.getItem('token')
  if (token) {
    NProgress.start(); // 开启进度条
    next()
  } else {
    next({
      path: "/login"
    })

  }
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    let width = window.document.body.offsetWidth //window.screen.width
    this.$store.commit('ScreenWidth', width);
    var that = this
    window.onresize = function () {
      let width = window.document.body.offsetWidth
      that.$store.commit('ScreenWidth', width);
    }
  }
}).$mount('#app')
