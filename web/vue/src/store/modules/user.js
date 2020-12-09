import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const user = {
  namespaced: true,

  state: {
    token: getToken(),
    name: '',
    avatar: '',
    permissions: [],
    info: null,
    isAdmin: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    }
  },

  actions: {
    // 登录
    Login({ commit,state }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setToken(response.data.token)
          localStorage.setItem('userInfo',JSON.stringify(response.data))
          commit('SET_TOKEN', response.data.token)
          commit('SET_NAME', response.data.account)
          commit('SET_ADMIN', response.data.is_admin)
          commit('SET_INFO', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          // data.permissions.forEach(v => {
          //   v.enable = true
          // })
          if (data.permissions && data.permissions.length > 0) { // 验证返回的permissions是否是一个非空数组
            commit('SET_PERMISSIONS', data.permissions)
          } else {
            reject('getInfo: permissions must be a non-null array !')
          }
          const { info } = data
          commit('SET_NAME', info.name)
          commit('SET_INFO', info)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ADMIN', false)
        commit('SET_INFO', {})
        localStorage.setItem('userInfo','{}')
        removeToken()
        resetRouter()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
