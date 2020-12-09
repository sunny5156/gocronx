import Vue from 'vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import permission from '@/directive/permission'
import getPageTitle from '@/utils/get-page-title'
import debounce from '@/directive/debounce'
import dragMove from '@/directive/dragMove'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const isAdmin = !!JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).is_admin : false

  if (hasToken) {
    // 用户登录根据是否管理员设置路由
    store.commit('SET_ROUTERS')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (to.meta.need_permission && !isAdmin) {
        next({ path: '/401' })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${ to.path }`, { replace: true })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

Vue.directive('permission', permission)
Vue.directive('debounce', debounce)
Vue.directive('dragMove', dragMove)
