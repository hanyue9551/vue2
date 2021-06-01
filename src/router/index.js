import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import routes from './routes'
const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

Vue.use(Router)

// 前置导航守卫 路由拦截器 所有路由跳转前经过其处理
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('login')
  if (to.path !== '/login') {
    if (isLogin) {
      //已登录
      next()
    } else {
      //未登录
      if (to.name !== 'Login' && !isLogin) next({ name: 'Login' })
      else next()
    }
  } else {
    next()
  }

})

export default router