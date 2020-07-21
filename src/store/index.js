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
