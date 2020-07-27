import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    isCollapse: false,
    submenu: [],
    keepRouters: [],
    screenWidth: "",
    current: null,
    tag: [{
      children: [],
      path: 'index',
      title: '首页',
      icon:'el-icon-s-home',
      id: 999
    }]
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setCollapse(state, value) {
      state.isCollapse = value;
    },
    setMenu(state, value) {
      state.submenu = value;
    },
    setkeep(state, value) {
      if (state.keepRouters.indexOf(value) == -1) {
        state.keepRouters.push(value)
      }
      sessionStorage.setItem('keepRouter', state.keepRouters)
    },
    setTag(state, value) {
      if (value.title == '首页') {
        state.current = null;
      } else {
        state.current = value;
        let result = state.tag.findIndex(item => item.title === value.title);
        result === -1 ? state.tag.push(value) : '';
      }
    },
    closeTag(state, value) {
      let result = state.tag.findIndex(item => item.title === value.title)
      state.tag.splice(result, 1)
    },
    ScreenWidth(state, width) {
      var Widthmap = new Map([
        [
          (width) => width >= 1700,
          () => {
            state.screenWidth = 'medium'
            // return 'medium'
          }
        ],
        [
          (width) => width > 1400 && width < 1700,
          () => {
            state.screenWidth = 'small'
            // return ' '
          }
        ],
        [
          (width) => width <= 1400,
          () => {
            state.screenWidth = 'mini'
            //return 'mini '
          }
        ]

      ])
      for (let [rule, action] of Widthmap) {

        rule(width) && action()
      }
    },
  },
  actions: {},
  modules: {}
})
