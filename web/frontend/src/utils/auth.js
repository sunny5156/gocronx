import Cookies from 'js-cookie'
import axios from 'axios'

const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token') || ''
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  localStorage.setItem('token', token)
  return this
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/* 获取base_api地址，区分dev和生产模式 */
export function getBaseApi() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      localStorage.removeItem('BASE_API')
      localStorage.setItem('BASE_API', process.env.VUE_APP_BASE_API)
      resolve(process.env.VUE_APP_BASE_API)
    }
  })
}

