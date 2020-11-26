import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// import vue from 'vue'
// import vuex from 'vuex'

// import userStorage from '../storage/user'

// //new
// vue.use(vuex)

Vue.use(Vuex)

// // https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store


//new
// vue.use(vuex)
// export default new vuex.Store({
//   state: {
//     hiddenNavMenu: false,
//     user: userStorage.get()
//   },
//   getters: {
//     user (state) {
//       return state.user
//     },
//     login (state) {
//       return state.user.token !== ''
//     }
//   },
//   modules: modules,
//   mutations: {
//     hiddenNavMenu (state) {
//       state.hiddenNavMenu = true
//     },
//     showNavMenu (state) {
//       state.hiddenNavMenu = false
//     },
//     setUser (state, user) {
//       userStorage.setToken(user.token)
//       userStorage.setUid(user.uid)
//       userStorage.setAccount(user.account)
//       userStorage.setIsAdmin(user.isAdmin)
//       state.user = user
//     },
//     logout (state) {
//       userStorage.clear()
//       state.user = userStorage.get()
//     }
//   }
// })
