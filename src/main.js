import Vue from 'vue'
import Antd, { message } from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import zh from './language/zh'
import en from './language/en'
import './css/base.less'
import { getCookie } from '@/common/utils'

Vue.config.productionTip = false

Vue.use(Antd).use(VueI18n)
Vue.prototype.$message = message
const locale = getCookie('locale')

const i18n = new VueI18n({
  locale: locale === 'en' ? 'en' : 'zh',
  messages: {
    zh: zh,
    en: en
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
