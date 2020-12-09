import Vue from 'vue'

import VueLodash from 'vue-lodash'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import PictureView from './components/PicetureView/'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/errorLog'// error log
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(VueLodash)
Vue.use(require('vue-moment'))
Vue.use(ElementUI, { locale })
Vue.use(PictureView)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
