import axios from "axios";

let listService = {
  // 登录接口
  login(info) {
    return axios({
      method: 'post',
      data: info,
      url: 'api/login'
    })
  },
  list() {
    return axios({
      url: "/api/list",
      method: "get",
    })
  },
  userUpdate(params) {
    return axios({
      url: '/api/userUpdate',
      method: 'post',
      data: params
    })
  },
  userDelete(params) {
    return axios({
      url: '/api/userDelete',
      method: 'post',
      data: params
    })
  }
}

export default listService