// import axios from 'axios'
const USERS = {
  SET_LOGIN: 'setLogin',
  SET_ACCOUNT_LEVEL: 'setAccountLevel'
}
let user = {
    namespaced: true,
    state: {
        isLogin: false,
        loginName: '',
        level: ''
    },
    mutations: {
      [USERS.SET_LOGIN](state, data) {
        state.isLogin = data
      },
      [USERS.SET_ACCOUNT_LEVEL](state, data) {
        state.level = data
      },
    },
    actions: {
    }
}

export default user