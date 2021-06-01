import axios from 'axios'

let table = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getTable({commit}, payload) {
      return await axios.get('/api/table', payload)
    }
  }
}

export default table