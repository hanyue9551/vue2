import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import table from './modules/table'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    copyright: '小韩 vue2.0'
  },
  modules: {
    user,
    table
  },
  getters
})