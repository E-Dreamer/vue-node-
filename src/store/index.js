import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    isCollapse: false
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setCollapse(state, value) {
      state.isCollapse = value;
    }
  },
  actions: {},
  modules: {}
})
